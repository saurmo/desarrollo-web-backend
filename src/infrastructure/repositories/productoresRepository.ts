import { Productor } from "../../domain/models/Productores";
import { prisma } from '../database/prismaClient';

export const productoresRepository = {

    create: async (productor: Productor) => {
        const productorCreado = await prisma.productores.create({ data: productor })
        console.log("Productores Repository create")
        return productorCreado
    }


}