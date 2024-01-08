import express, { Request, Response, NextFunction } from "express";

import UserService from "../services/UserService.js";
import { validateCreateUser } from "../validation/userValidation.js";
import {
  AuthorizedRequest,
  isAdminUser,
  isAuthenticated,
} from "../../../auth/passport.js";

export const userRoutes = express.Router();

userRoutes.get(
  "/users",
  isAuthenticated,
  isAdminUser,
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
    try {
      const users = await new UserService().getUsers();
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).json({
        status: err,
      });
    }
  }
);

userRoutes.post(
  "/users",
  isAuthenticated,
  isAdminUser,
  validateCreateUser,
  async (req: AuthorizedRequest, res: Response, next: NextFunction) => {
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
