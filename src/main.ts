import "dotenv/config";
//import passport from "passport";
import express, { Request, Response, NextFunction } from "express";

import passport from "./auth/passport.js";

const app = express();
app.use(express.json());
app.use(passport.initialize());

const port = process.env.PORT;

app.post(
  "/api/login",
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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
