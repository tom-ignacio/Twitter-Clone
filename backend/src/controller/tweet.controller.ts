import Follow from "../models/follow";
import Tweet from "../models/tweet";
import { Request, Response } from "express";

export const searchTweets = async (req: Request, res: Response) => {
  const tweet = await Tweet.find({description: { $regex: req.params.description }}).sort({create_date:'desc'});
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    return res.status(400).json({ msg: "No tweets were found..." });
  }
};
