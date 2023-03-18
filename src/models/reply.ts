import mongoose, { model, Schema, Document } from "mongoose";

export interface I_Reply extends Document {
  owner: string;
  description: string;
  tweet_id: string;
  create_date: Date;
}

const replySchema = new Schema({
  owner: {
    type: String,
    require: true,
  },

  description: {
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
replySchema.pre<I_Reply>("save", async function (next) {});

export default model<I_Reply>("reply", replySchema);