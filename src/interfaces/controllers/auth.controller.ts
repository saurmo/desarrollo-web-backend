import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { usuarioRepository } from '../../infrastructure/repositories/usuarioRepository';
import { usuarioUseCase } from '../../application/usuarios/usuarioUseCase';
import { createToken } from '../../infrastructure/tokens';

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const usuario = await usuarioRepository.findByEmail(email);
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const valida = await bcrypt.compare(password, usuario.password);
    if (!valida) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = createToken({
      id: usuario.id,
      name: usuario.nombre,
      email: usuario.email,
      password: '',
    });

    res.json({
      data: { token },
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { nombre, apellidos, email, password, acepta_terminos } = req.body;

    const usuario = await usuarioUseCase.create({
      nombre,
      apellidos,
      email,
      password,
      acepta_terminos: Boolean(acepta_terminos),
    });

    const token = createToken({
      id: usuario.id,
      name: usuario.nombre,
      email: usuario.email,
      password: '',
    });

    res.status(201).json({
      data: { token, usuario },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error interno';
    const status = message === 'El correo ya está registrado' ? 409 : 500;
    res.status(status).json({ message });
  }
};
