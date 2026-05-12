import { Request, Response } from 'express';
import { DonacionUseCase } from '../../application/donacionUseCase';
import {
  isS3ObjectStorageConfigured,
  uploadDonacionComprobanteToS3,
} from '../../infrastructure/storage/s3ObjectStorageService';
import { saveDonacionComprobanteLocally } from '../../infrastructure/storage/localComprobanteStorage';

const donacionUseCase = new DonacionUseCase();

export const crearDonacionHandler = async (req: Request, res: Response) => {
  try {
    const total = Number(req.body.total);
    if (Number.isNaN(total) || total < 0) {
      res.status(400).json({ message: 'El monto total es inválido.' });
      return;
    }

    const userIdRaw = req.body.user_id;
    const user_id =
      userIdRaw === undefined || userIdRaw === null || String(userIdRaw).trim() === ''
        ? null
        : String(userIdRaw);

    const descripcionRaw = req.body.descripcion;
    const descripcion =
      descripcionRaw === undefined || descripcionRaw === null || String(descripcionRaw).trim() === ''
        ? null
        : String(descripcionRaw);

    let comprobante_url: string | null = null;
    if (req.file) {
      if (isS3ObjectStorageConfigured()) {
        comprobante_url = await uploadDonacionComprobanteToS3({
          buffer: req.file.buffer,
          contentType: req.file.mimetype,
          originalName: req.file.originalname,
        });
      } else {
        comprobante_url = await saveDonacionComprobanteLocally({
          buffer: req.file.buffer,
          originalName: req.file.originalname,
        });
      }
    }

    const data = await donacionUseCase.create({
      total,
      user_id,
      descripcion,
      comprobante_url,
    });

    res.json({
      data,
      message: 'Donación creada',
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Internal server error',
    });
  }
};


