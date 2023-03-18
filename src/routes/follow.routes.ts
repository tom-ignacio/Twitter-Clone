import { Router } from "express";
import passport from "passport";
import Follow from "../models/follow";

const router = Router();

router.post(
  "/follow", // Follow a user
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
      const newFollow = new Follow(req.body);
      await newFollow.save();
      return res.status(201).json(newFollow);
  }
);

router.delete(
  "/follow/:follower/:following", // Unfollow a user
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const Unfollow = await Follow.findOneAndDelete({follower: req.params.follower, following: req.params.following});
    res.status(200).json();
  }
);

router.get(
  "/followers/:user_id", // Get amount of followers by user ID
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const followers = await Follow.countDocuments({following: req.params.user_id});
    return res.json(followers);
  }
);

router.get(
    "/following/:user_id", // Get amount of following by user ID
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const following = await Follow.countDocuments({follower: req.params.user_id});
      return res.json(following);
    }
  );

router.get(
    "/followingList/:user_id", // Get list of following by user ID
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const following = await Follow.find({follower: req.params.user_id});
      return res.json(following);
    }
  );

router.get(
    "/followersList/:user_id", // Get list of followers by user ID
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const followers = await Follow.find({following: req.params.user_id});
      return res.json(followers);
    }
  );

export default router;
