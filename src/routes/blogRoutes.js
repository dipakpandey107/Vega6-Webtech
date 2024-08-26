import express from 'express';
import { createBlog, getBlogs, updateBlog, deleteBlog, getBlogById } from '../controllers/blogController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', auth, createBlog);
router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.put('/:id', auth, updateBlog);
router.delete('/:id', auth, deleteBlog);

export default router;