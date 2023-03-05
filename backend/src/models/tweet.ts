import mongoose, { model, Schema, Document } from "mongoose";

export interface I_Tweet extends Document {
  owner: string;
  description: string;
  picture: string;
  create_date: Date;
}

const tweetSchema = new Schema({
  owner: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    require: true,
  },

  picture: {
    type: String
  },

  create_date: {
    type: Date,
    default: Date.now()
  },
});
tweetSchema.pre<I_Tweet>("save", async function (next) {});

export default model<I_Tweet>("tweet", tweetSchema);