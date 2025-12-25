import mongoose from "mongoose";
import { Schema } from "mongoose";

const SubscriptionSchema = new Schema({
  userId: {
    type:String ,
  },

  regtoken: [
    {
      type: String,
    },
  ]
});

export const deviceNotifi = mongoose.model(
  "deviceNotifications",
  SubscriptionSchema
);
