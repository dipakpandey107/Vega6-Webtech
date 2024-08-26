import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;