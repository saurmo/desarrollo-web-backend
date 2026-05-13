export interface Usuario {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  acepta_terminos: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface UsuarioPublico {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  created_at: Date;
}

export interface CrearUsuarioDto {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  acepta_terminos: boolean;
}

export interface ActualizarUsuarioDto {
  nombre?: string;
  apellidos?: string;
  email?: string;
  foto_perfil?: string;
}
