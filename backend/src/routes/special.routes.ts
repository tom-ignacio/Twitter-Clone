import { Router } from "express";
import passport from "passport";
import User, { I_User } from "../models/user";

const router = Router();

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const Users = await User.find();
    res.json(Users);
  }
);

export default router;
