import bcrypt from "bcrypt";
import moment from "moment";
import jwt from "jwt-simple";
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { PrismaClient, User, Role } from "@prisma/client";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const prisma = new PrismaClient();

const options = {
  usernameField: "email",
  secretOrKey: process.env.TOKEN_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
};

export interface AuthorizedRequest extends Request {
  authenticatedUser: User;
}
export interface PassportUser {
  rol: Role;
  id: number;
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
        id: user.id,
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

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id as number,
      },
    });

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

function encodeToken(user: User) {
  const playload = {
    exp: moment().add(7, "days").unix(),
    iat: moment().unix(),
    sub: user.id,
  };

  return jwt.encode(playload, process.env.TOKEN_SECRET);
}

function decodeToken(token: string) {
  return jwt.decode(token, process.env.TOKEN_SECRET);
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!(req.headers && req.headers.authorization))
      return res.status(401).json({
        status: "Por favor inicie sesion.",
        redirect: "login",
      });

    const token = req.headers.authorization;

    const decodedToken = decodeToken(token);

    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.sub,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: "Por favor inicie sesion.",
        redirect: "login",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("err", err);

    return res.status(401).json({
      status: err,
      redirect: "login",
    });
  }
}

export async function isAdminUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user as User;

  if (user.rol !== "ADMIN")
    return res.status(401).json({
      status:
        "El usuario no tiene los privilegios necesarios para realizar esta accion.",
    });

  next();
}

export default passport;
