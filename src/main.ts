import "dotenv/config";
import express from "express";
import passport from "passport";

import {
  authRoutes,
  userRoutes,
} from "./features/authentication/routes/index.js";

const app = express();
app.use(express.json());
app.use(passport.initialize());

const port = process.env.PORT;

app.use("/api", authRoutes);
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
