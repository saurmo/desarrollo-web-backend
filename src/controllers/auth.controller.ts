import { Request, Response } from "express";
import { JwtService } from "../business/services/jwt.services";
import { ResponseModel } from "../business/models/response.model";
import { AdarterData } from "../business/adapter/AdapterData";
import { JsonWebTokenError } from "jsonwebtoken";

const jwtService = new JwtService()
const service = AdarterData.getDataAccess("pg")

export const login = (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Bienvenido.");
    const { id, pass } = req.body
    service.getUserByCredentiales(id, pass).then(user => {
        const token = jwtService.createToken(user)
        responseModel.info = { token, ...user }
        return res.send(responseModel)
    }).catch(error => {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al ingresar."
        return res.status(500).send(responseModel)
    })
}

export const verifyToken = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Consulta exitosa.");
    try {
        const token = req.headers.authorization?.replace('Bearer ', '')
        if (token) {
            const user = jwtService.verifyToken(token)
            console.log(user);

            responseModel.info = user
            return res.send(responseModel)
        } else {
            responseModel.ok = false
            responseModel.message = "Error en el token."
            return res.status(400).send(responseModel)
        }

    } catch (error: any) {
        responseModel.ok = false
        responseModel.message = "Error al verificar."
        console.log(error);
        if (error.message === "invalid token" || error.message === 'jwt expired') {
            return res.status(401).send(responseModel)
        }
        return res.status(500).send(responseModel)
    }
}

