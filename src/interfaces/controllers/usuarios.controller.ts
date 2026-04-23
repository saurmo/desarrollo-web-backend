import { Request, Response } from 'express';
import { usuarioService } from '../../application/usuarios/usuarioService';

export const getAllUsuariosHandler = async (_req: Request, res: Response) => {
  try {
    const usuarios = await usuarioService.getAll();
    res.json({ data: usuarios });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

export const getOneUsuarioHandler = async (req: Request, res: Response) => {
  try {
    const usuario = await usuarioService.getById(req.params.id as string);
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
    const usuario = await usuarioService.create({
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
    const usuario = await usuarioService.update(req.params.id as string, {
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
    await usuarioService.remove(req.params.id as string );
    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error interno';
    const status = message === 'Usuario no encontrado' ? 404 : 500;
    res.status(status).json({ message });
  }
};
