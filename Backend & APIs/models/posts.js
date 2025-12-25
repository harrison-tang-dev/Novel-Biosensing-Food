import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    likes: [
      {
        userId: {
          type: String,
          required: true,
        },
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    likes: [
      {
        userId: {
          type: String,
          required: true,
        },
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    replies: [ReplySchema],
  },
  { timestamps: true }
);

const PostsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String
    },
    name: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
    },
    message: {
      type: String,
    },
    postimage: {
      type: String,
    },
    likes: [
      {
        userId: {
          type: String,
          required: true,
        },
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    comments: [CommentSchema],
    approved:{type:Boolean, default: true},
  },
  
  { timestamps: true }
);

export const Posts = mongoose.model("Posts", PostsSchema);
