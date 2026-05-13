import { Request, Response } from 'express';
import { usuarioUseCase } from '../../application/usuarios/usuarioUseCase';
import { isS3ObjectStorageConfigured, uploadFileToS3 } from '../../infrastructure/storage/s3ObjectStorageService';

export const getAllUsuariosHandler = async (_req: Request, res: Response) => {
  try {
    const usuarios = await usuarioUseCase.getAll();
    res.json({ data: usuarios });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

export const getOneUsuarioHandler = async (req: Request, res: Response) => {
  try {
    const usuario = await usuarioUseCase.getById(req.params.id as string);
    res.json({ data: usuario });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error interno';
    const status = message === 'Usuario no encontrado' ? 404 : 500;
    res.status(status).json({ message });
  }
};

export const createUsuarioHandler = async (req: Request, res: Response) => {
  try {
    const { nombre, apellidos, email, password, acepta_terminos } = req.body;
    const usuario = await usuarioUseCase.create({
      nombre,
      apellidos,
      email,
      password,
      acepta_terminos: Boolean(acepta_terminos),
    });
    res.status(201).json({ data: usuario });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error interno';
    const status = message === 'El correo ya está registrado' ? 409 : 500;
    res.status(status).json({ message });
  }
};

export const updateUsuarioHandler = async (req: Request, res: Response) => {
  try {
    const { nombre, apellidos, email } = req.body;
    const usuario = await usuarioUseCase.update(req.params.id as string, {
      nombre,
      apellidos,
      email,
    });
    res.json({ data: usuario });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error interno';
    const status = message === 'Usuario no encontrado' ? 404 : 500;
    res.status(status).json({ message });
  }
};

export const removeUsuarioHandler = async (req: Request, res: Response) => {
  try {
    await usuarioUseCase.remove(req.params.id as string);
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error interno';
    const status = message === 'Usuario no encontrado' ? 404 : 500;
    res.status(status).json({ message });
  }
};

export const imageProfileHandler = async (req: Request, res: Response) => {
  const file = req.file
  let foto_perfil;
  if (file && isS3ObjectStorageConfigured()) {
    foto_perfil = await uploadFileToS3({
      buffer: file.buffer,
      contentType: file.mimetype,
      originalName: file.originalname,
      folder: 'fotos-perfil'
    });
  } else {
    res.status(400).json({
      message: "No se logro cargar la imágen"
    })
    return
  }

  const usuario = await usuarioUseCase.update(req.params.id as string, {
    foto_perfil
  });
  res.json({
    success: true,
    data: usuario
  })
}
