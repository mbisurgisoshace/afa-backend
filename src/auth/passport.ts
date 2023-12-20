import bcrypt from "bcrypt";
import moment from "moment";
import jwt from "jwt-simple";
import passport from "passport";
import { PrismaClient, User, Role } from "@prisma/client";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const prisma = new PrismaClient();

const options = {
  usernameField: "email",
  secretOrKey: process.env.TOKEN_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
};

export interface PassportUser {
  rol: Role;
  email: string;
  token: string;
  nombre: string;
  apellido: string;
}

passport.use(
  new LocalStrategy(options, async function (email, password, done) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user)
        return done(null, false, {
          message: "El email ingresado no es un usuario registrado.",
        });

      if (!bcrypt.compareSync(password, user.password))
        return done(null, false, {
          message: "La contrasena ingresada es incorrecta",
        });

      const passportUser: PassportUser = {
        rol: user.rol,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        token: encodeToken(user),
      };
      return done(null, passportUser);
    } catch (err) {
      done(err);
    }
  })
);

function encodeToken(user: User) {
  const playload = {
    exp: moment().add(7, "days").unix(),
    iat: moment().unix(),
    sub: user.id,
  };

  return jwt.encode(playload, process.env.TOKEN_SECRET);
}

export default passport;
