import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserAnnouncementSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  announcementId: { type: Schema.Types.ObjectId, ref: 'Announcement', required: true },
  isCleared: { type: Boolean, default: false },
  isSeen: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 18 * 24 * 60 * 60, // The document will be automatically deleted after 5 minutes of its creation time
  }
});

export const UserAnnouncement = mongoose.model('UserAnnouncement', UserAnnouncementSchema);


const AnnouncementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  customLinks: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 18 * 24 * 60 * 60, // The document will be automatically deleted after 5 minutes of its creation time
  },
  postId:{ type: Schema.Types.ObjectId, ref: 'Posts' },
});

export const Announcement = mongoose.model('Announcement', AnnouncementSchema);


