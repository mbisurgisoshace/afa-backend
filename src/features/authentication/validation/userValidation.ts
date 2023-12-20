import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const createUserSchema = Joi.object({
  nombre: Joi.string().required(),
  password: Joi.string().required(),
  apellido: Joi.string().required(),
  email: Joi.string().email().required(),
  rol: Joi.string().valid("USER", "ADMIN").required(),
});

export function validateCreateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error, value } = createUserSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(500).json(error);
  }

  next();
}
