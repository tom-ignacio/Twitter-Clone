import { Router } from "express";
import {
  searchUsers,
  signIn,
  signUp
} from "../controller/user.controller";
import { searchTweets } from "../controller/tweet.controller";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

router.get("/searchTweets/:description", searchTweets);

router.get("/searchUsers/:username", searchUsers);

export default router;