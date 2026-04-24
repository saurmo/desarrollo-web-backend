import { Donacion } from "../../domain/models/Donacion"
import { prisma } from "../database/prismaClient"


export const donacionesRepository = {

    create: (donacion: Donacion) => {
        return prisma.donaciones.create({ data: donacion })
    }

}