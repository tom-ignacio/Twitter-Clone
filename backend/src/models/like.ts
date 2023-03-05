import mongoose, { model, Schema, Document } from "mongoose";

export interface I_Like extends Document {
  owner: string;
  tweet_id: string;
  create_date: Date;
}

const likeSchema = new Schema({
  owner: {
    type: String,
    require: true,
  },

  tweet_id: {
    type: String,
    require: true,
  },

  create_date: {
    type: Date,
    default: Date.now()
  },
});
likeSchema.pre<I_Like>("save", async function (next) {});

export default model<I_Like>("reply", likeSchema);