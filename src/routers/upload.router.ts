
import { Router } from "express";
import { ResponseModel } from "../business/models/response.model";
import { UploadedFile } from "express-fileupload";


const uploadRouter: Router = Router();

uploadRouter.post("/uploads/profile", async (req: any, res) => {
    const responseModel = new ResponseModel(true, "Archivo cargado", null);
    const info_user = req.info_user
    try {
        let saveResponse = null
        const files = req.files
        if (files?.image) {
            let image: UploadedFile = Array.isArray(files?.image) ? files?.image[0] : files?.image
            saveResponse = await image.mv(`./docs/${image.name}`)
            saveResponse = image.name
        }
        responseModel.info = {
            user: info_user._id,
            image: saveResponse
        }
        return res.send(responseModel)
    } catch (error) {
        console.log(error);

        responseModel.ok = false
        responseModel.message = "Error al cargar el archivo"
        return res.status(500).send(responseModel)
    }

});



export default uploadRouter;