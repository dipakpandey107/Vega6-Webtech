import Comment from '../models/Comment.js';

export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { blogId } = req.params;
    
    const comment = new Comment({
      content,
      author: req.user.id,
      blog: blogId,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getComments = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blog: blogId })
      .populate('author', 'email')
      .sort({ createdAt: -1 });
    
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addReply = async (req, res) => {
  try {
    const { content } = req.body;
    const { commentId } = req.params;
    
    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      return res.status(404).json({ message: 'Parent comment not found' });
    }

    const reply = new Comment({
      content,
      author: req.user.id,
      blog: parentComment.blog,
      parentComment: commentId,
    });

    await reply.save();
    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};