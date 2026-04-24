import bcrypt from 'bcrypt';
import { usuarioRepository } from '../../infrastructure/repositories/usuarioRepository';
import { ActualizarUsuarioDto, CrearUsuarioDto } from '../../domain/models/Usuario';

export const usuarioUseCase = {
  getAll: () =>
    usuarioRepository.findAll(),

  getById: async (id: string) => {
    const usuario = await usuarioRepository.findById(id);
    if (!usuario) throw new Error('Usuario no encontrado');
    return usuario;
  },

  create: async (data: CrearUsuarioDto) => {
    const existe = await usuarioRepository.findByEmail(data.email);
    if (existe) throw new Error('El correo ya está registrado');

    // 
    const hash = await bcrypt.hash(data.password, 10);
    const { password: _, ...usuario } = await usuarioRepository.create({
      ...data,
      password: hash,
    });
    return usuario;
  },

  update: async (id: string, data: ActualizarUsuarioDto) => {
    const existe = await usuarioRepository.findById(id);
    if (!existe) throw new Error('Usuario no encontrado');
    return usuarioRepository.update(id, data);
  },

  remove: async (id: string) => {
    const existe = await usuarioRepository.findById(id);
    if (!existe) throw new Error('Usuario no encontrado');
    await usuarioRepository.remove(id);
  },
};
