import mongoose, { model, Schema, Document } from "mongoose";

export interface I_Follow extends Document {
  follower: string;
  following: string;
  create_date: Date;
}

const followSchema = new Schema({
  follower: {
    type: String,
    require: true,
  },

  following: {
    type: String,
    require: true,
  },

  create_date: {
    type: Date,
    default: Date.now()
  },
});
followSchema.pre<I_Follow>("save", async function (next) {});

export default model<I_Follow>("follow", followSchema);