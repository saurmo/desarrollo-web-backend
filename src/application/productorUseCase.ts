import { Productor } from "../domain/models/Productores";
import { productoresRepository } from "../infrastructure/repositories/productoresRepository";


export class ProductorUseCase {
    constructor() {

    }

    async crearProductor(productor: Productor) {
        // validacion -- 
        const data = await productoresRepository.create(productor)
        console.log(data)
        return data

    }
}

