import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  userId: { type: String },
  filename: { type: String, required: true },
  postId: { type: String},
  type: { type: String},
  data: { type: Buffer },
  contentType: { type: String },
  uploadDate: { type: Date, default: Date.now }
});

export const Image = mongoose.model('Image', imageSchema);


  