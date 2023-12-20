import express, { Request, Response, NextFunction } from "express";

import UserService from "../services/UserService.js";
import { validateCreateUser } from "../validation/userValidation.js";
import { isAdminUser, isAuthenticated } from "../../../auth/passport.js";

export const userRoutes = express.Router();

userRoutes.post(
  "/users",
  isAuthenticated,
  isAdminUser,
  validateCreateUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await new UserService().createUser(req.body);

      return res.status(201).json(newUser);
    } catch (err) {
      return res.status(500).json({
        status: err,
      });
    }
  }
);
