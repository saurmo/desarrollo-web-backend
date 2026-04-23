import { Request, Response } from 'express';
import { ProductorUseCase } from '../../application/productorUseCase';

const productorUseCase = new ProductorUseCase()

export const crearProductorHandler = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const data = await productorUseCase.crearProductor(payload)

    res.json({
      data,
      message: "Productor creado"
    })


  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
