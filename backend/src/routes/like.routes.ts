import { Router } from "express";
import passport from "passport";
import Like from "../models/like";

const router = Router();

router.post(
  "/like", // Like a tweet
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
      const newLike = new Like(req.body);
      await newLike.save();
      return res.status(201).json(newLike);
  }
);

router.delete(
  "/like/:likeId", // Unlike a tweet
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { likeId } = req.params;
    await Like.findByIdAndDelete(likeId);
    res.status(200).json();
  }
);

router.get(
  "/like/:tweet_id", // Get amount of likes by tweet ID
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const likes = await Like.countDocuments({tweet_id: req.params.tweet_id});
    return res.json(likes);
  }
);

export default router;
