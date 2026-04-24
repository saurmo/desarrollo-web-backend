import { Donacion } from "../domain/models/Donacion";
import { donacionesRepository } from "../infrastructure/repositories/donacionesRepository";


export class DonacionUseCase {



    async create(donacion: Donacion) {
        try {


            // logica de negocio cuando voy a crear una donacion

            const data = await donacionesRepository.create(donacion)

            return data
        } catch (error) {
            throw new Error("Error al crear la donación" + error,);

        }
    }

}