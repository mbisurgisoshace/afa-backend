import { Role } from "@prisma/client";

export interface NewUser {
  email: string;
  nombre: string;
  apellido: string;
  password: string;
  rol: Role;
}
