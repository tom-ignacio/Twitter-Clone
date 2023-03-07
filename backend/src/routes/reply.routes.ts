import { Router } from "express";
import passport from "passport";
import Reply from "../models/reply";

const router = Router();

router.post(
  "/reply", // Create new reply
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (!req.body.description) {
      return res.status(400).json({ msg: "Some fields are invalid." });
    } else {
      const newReply = new Reply(req.body);
      await newReply.save();
      return res.status(201).json(newReply);
    }
  }
);

router.get(
  "/reply/:tweet_id", // Get replies by tweet ID
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const replies = await Reply.find({tweet_id: req.params.tweet_id});
    return res.json(replies);
  }
);

router.delete(
  "/reply/:replyId", // Delete reply by ID
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { replyId } = req.params;
    await Reply.findByIdAndDelete(replyId);
    res.status(200).json();
  }
);

router.get(
  "/replyCount/:tweet_id", // Get amount of replies by tweet ID
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const replies = await Reply.countDocuments({tweet_id: req.params.tweet_id});
    return res.json(replies);
  }
);

export default router;
