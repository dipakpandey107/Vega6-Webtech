import Blog from '../models/Blog.js';

export const createBlog = async (req, res) => {
  try {
    const { title, image, description } = req.body;
    const blog = new Blog({
      title,
      image,
      description,
      author: req.user.id,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'email');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'email');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { title, image, description } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, image, description },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};