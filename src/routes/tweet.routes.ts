import { Router } from "express";
import passport from "passport";
import Tweet from "../models/tweet";
import { models } from "mongoose";

const router = Router();

router.post(
  "/tweet", // Create new tweet
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (!req.body.description) {
      return res.status(400).json({ msg: "Some fields are invalid." });
    } else {
      const newTweet = new Tweet(req.body);
      await newTweet.save();
      return res.status(201).json(newTweet);
    }
  }
);

router.get(
  "/tweet", // Get all tweets
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const Tweets = await Tweet.find().sort({create_date: -1});;
    res.json(Tweets);
  }
);

router.get(
  "/tweet/:tweetId", // Get tweet by ID
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { tweetId } = req.params;
    const tweet = await Tweet.findById(tweetId);
    res.status(200).json(tweet);
  }
);

router.get(
  "/tweet/:owner", // Get tweets by user ID
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const tweets = await Tweet.find({owner: req.params.owner}).sort({create_date: -1});
    return res.json(tweets);
  }
);


router.delete(
  "/tweet/:tweetId", // Delete tweet by ID
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { tweetId } = req.params;
    await Tweet.findByIdAndDelete(tweetId);
    res.status(200).json();
  }
);

export default router;
