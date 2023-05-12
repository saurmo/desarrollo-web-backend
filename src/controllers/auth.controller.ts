import { NextFunction, Request, Response } from "express";
import { JwtService } from "../business/services/jwt.services";
import { ResponseModel } from "../business/models/response.model";
import { AdarterData } from "../business/adapter/AdapterData";
import { JsonWebTokenError } from "jsonwebtoken";
import { BCrypt } from "../business/services/bcrypt";

const jwtService = new JwtService()
const service = AdarterData.getDataAccess("pg")
const bcrypt = new BCrypt()

export const login = (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Bienvenido.");
    if (req.body == undefined || Object.keys(req.body).length == 0) {
        responseModel.ok = false
        responseModel.message = "Se requiere información"
        return res.status(400).send(responseModel)
    }

    const { id, pass } = req.body

    service.getUserByCredentiales(id, pass).then((user: any) => {
        if (Object.keys(user).length > 0) {
            const isPasswordValid = bcrypt.compareHash(pass, user.pass)
            if (isPasswordValid) {
                delete user.pass
                const token = jwtService.createToken(user)
                responseModel.info = { token, ...user }
                return res.send(responseModel)
            }else{
                responseModel.ok = false
                responseModel.message = "Usuario o contraseña incorrectos"
                return res.status(404).send(responseModel)
            }
           
        } else {
            responseModel.ok = false
            responseModel.message = "Usuario o contraseña incorrectos"
            return res.status(404).send(responseModel)
        }

    }).catch(error => {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al ingresar."
        return res.status(500).send(responseModel)
    })
}

export const isValidToken = async (req: Request, res: Response, next?: NextFunction) => {
    const responseModel = new ResponseModel(true, "Consulta exitosa.");
    try {
        const token = req.headers.authorization?.replace('Bearer ', '')
        if (token) {
            const user = jwtService.verifyToken(token)
            if (next) {
                next()
            } else {
                return user;
            }
        } else {
            responseModel.ok = false
            responseModel.message = "Error validando el token."
            return res.status(400).send(responseModel)
        }
    } catch (error: any) {
        responseModel.ok = false
        responseModel.message = "Error al verificar."
        if (error.message === "invalid token" || error.message === 'jwt expired') {
            return res.status(401).send(responseModel)
        }
        return res.status(500).send(responseModel)
    }


}
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const responseModel = new ResponseModel(true, "Consulta exitosa.");
    const user = await isValidToken(req, res)
    responseModel.info = user
    return res.send(responseModel)

}

