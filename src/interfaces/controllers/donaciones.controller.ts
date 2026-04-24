import { Request, Response } from 'express';
import { DonacionUseCase } from '../../application/donacionUseCase';

const donacionUseCase = new DonacionUseCase()

export const crearDonacionHandler = async (req: Request, res: Response) => {
  try {
    const payload = req.body
    const data = await donacionUseCase.create(payload)
    res.json({
      data,
      message: "Donación creada"
    })

  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      message: "Internal server error"
    })
  }


};


