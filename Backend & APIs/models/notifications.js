import mongoose from "mongoose";
import { Schema } from "mongoose";

const NotifSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: {
      type: String,
      required: true,
    },
    isCleared: { type: Boolean, default: false },
    isSeen: { type: Boolean, default: false },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 18 * 24 * 60 * 60, // The document will be automatically deleted after 5 minutes of its creation time
    },
    postId:{ type: Schema.Types.ObjectId, ref: 'Posts' },
  });
  
  export const Notifications = mongoose.model('Notifications', NotifSchema);
  