export interface CreateUserDto {
  tipoUsuarioId: string;
  nome: string;
  email: string;
  senha: string;
}

export interface UpdateUserDto {
  tipoUsuarioId?: string;
  nome?: string;
  email?: string;
  senha?: string;
}

export interface UserDto {
  id: string;
  tipoUsuarioId: string;
  nome: string;
  email: string;
  tipoUsuario: {
    id: string;
    label: string;
  };
  criadoEm: Date;
  atualizadoEm: Date;
}
