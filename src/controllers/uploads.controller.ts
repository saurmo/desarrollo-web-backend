
import { Request, Response } from "express";
import { ResponseModel } from "../business/models/response.model";
import { AdarterData } from "../business/adapter/AdapterData";
import { SubjectDto } from "../business/models/Subject.dto";
import { UploadedFile } from "express-fileupload";

const service = AdarterData.getDataAccess()
const COLLECTION = "uploads"

export const getUploads = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Consulta exitosa", []);
    try {
        const uploads: any[] = await service.getItems(COLLECTION);
        responseModel.info = uploads
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al consultar las materias"
        return res.status(500).send(responseModel)
    }
}

export const getOneUpload = async (req: any, res: Response) => {
    const responseModel = new ResponseModel(true, "Consulta exitosa", []);
    try {
        const info_user = req.info_user._id
        let upload = await service.getItems(COLLECTION, { user: info_user });
        upload = upload.map(item => {
            item.image = "http://localhost:3001/uploads/" + item.path.replace("./docs/", "")
            return item
        })
        responseModel.info = upload
        if (upload) {

            return res.send(responseModel)
        }
        return res.status(404).send(responseModel)

    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al consultar la materia"
        return res.status(500).send(responseModel)
    }
}

export const createUpload = async (req: any, res: Response) => {



    const responseModel = new ResponseModel(true, "Archivo cargado", null);
    try {
        const info_user = req.info_user

        let saveResponse = null
        const files = req.files
        let payload = {
            user: info_user._id,
            image: saveResponse,
            path: ''
        }

        if (files?.image) {
            let image: UploadedFile = Array.isArray(files?.image) ? files?.image[0] : files?.image
            saveResponse = await image.mv(`./docs/${image.name}`)
            saveResponse = image.name
            payload.path = `./docs/${image.name}`
        }


        const upload = await service.createItem(COLLECTION, payload);
        responseModel.info = { ...payload, _id: upload.insertedId }
        return res.status(201).send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al crear la materia"
        return res.status(500).send(responseModel)
    }
}


export const deleteUpload = async (req: Request, res: Response) => {
    const responseModel = new ResponseModel(true, "Eliminación exitosa", []);
    try {
        const { id } = req.params
        await service.deleteItem(COLLECTION, id);
        responseModel.info = id
        return res.send(responseModel)
    } catch (error) {
        console.log(error);
        responseModel.ok = false
        responseModel.message = "Error al eliminar la materia"
        return res.status(500).send(responseModel)
    }
}