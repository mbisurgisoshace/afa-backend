import express, { Request, Response, NextFunction } from "express";

import passport from "../../../auth/passport.js";

export const authRoutes = express.Router();

authRoutes.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return res.status(500).json(err);
      }

      if (!user) {
        return res.status(401).json(info.message);
      }

      if (user) {
        res.status(200).json({
          user,
          status: "success",
        });
      }
    })(req, res, next);
  }
);
