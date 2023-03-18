import { NextFunction, Request, Response } from "express";
import User, { I_User } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../config/config";

function createToken(user: I_User) {
  return jwt.sign({ id: user.id, username: user.username }, config.jwtSecret, {
    expiresIn: 604800,
  });
}

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.username ||
    !req.body.name
  ) {
    return res.status(400).json({ msg: "Some fields are empty." });
  }

  const user = await User.findOne({ username: req.body.username });
  console.log(user);
  if (user) {
    return res.status(400).json({ msg: "This username is already in use." });
  }

  const email = await User.findOne({ email: req.body.email });
  console.log(email);
  if (email) {
    return res.status(400).json({ msg: "This email is already in use." });
  }

  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json(newUser);
};

export const getUsers = async (req: Request, res: Response) => {
  const Users = await User.find();
  res.json(Users);
};

export const signIn = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ msg: "Invalid username or password." });
  }

  const user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.status(400).json({ msg: "Invalid username or password" });
  }

  const isMatch = await user.comparePassword(req.body.password);

  if (isMatch) {
    return res.status(200).json({ token: createToken(user) });
    //return res.status(200).json(createToken(user));
  }

  return res.status(400).json({
    msg: "Invalid username or password",
  });
};

export const searchUsers = async (req: Request, res: Response) => {
  const user = await User.find({username: { $regex: req.params.username }});
  if (user) {
    res.status(200).json(user);
  } else {
    return res.status(400).json({ msg: "No users were found..." });
  }
};