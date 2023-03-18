import { Router } from "express";
import passport from "passport";
import User from "../models/user";

const router = Router();


router.get(
  "/user", // Get all users
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const Users = await User.find();
    res.json(Users);
  }
);

router.get(
  "/user/:userId", // Get user by ID
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
  }
);

router.put(
  "/user/:userId", // Update user by ID
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  }
);

router.delete(
  "/user/:userId", // Delete user by ID
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).json();
  }
);

export default router;
