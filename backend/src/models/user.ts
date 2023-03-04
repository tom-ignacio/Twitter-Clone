import mongoose, { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface I_User extends Document {
  email: string;
  password: string;
  username: string;
  name: string;
  profile_picture: string;
  create_date: Date;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true, 
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },

  password: {
    type: String,
    required: true,
    minLength: 6
  },

  username: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    maxLength: 15
  },

  name: {
    type: String,
    required: true,
    maxLength: 15
  },

  profile_picture: {
    type: String,
    required: true,
    default: "https://i.pinimg.com/474x/ee/cf/13/eecf132f812bdf4ca87b339563f1ffa5.jpg"
  },

  create_date: {
    type: Date,
    default: Date.now()
  },

});

userSchema.pre<I_User>("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const contraseñaCifrada = await bcrypt.hash(user.password, salt);
  user.password = contraseñaCifrada;
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<I_User>("User", userSchema);
