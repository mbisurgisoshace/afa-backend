import bcrypt from "bcrypt";
import { PrismaClient, User } from "@prisma/client";

import { NewUser } from "../models/index.js";
import { PassportUser } from "../../../auth/passport.js";

const prisma = new PrismaClient();

export default class UserService {
  constructor() {}

  public async createUser(newUser: NewUser): Promise<Partial<User>> {
    const { email, nombre, apellido, rol, password } = newUser;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          nombre,
          apellido,
          rol,
          password: hashedPassword,
        },
      });

      return {
        id: user.id,
        rol: user.rol,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
      };
    } catch (err) {
      throw err;
    }
  }
}
