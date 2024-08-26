import express from 'express';
import { addComment, getComments, addReply } from '../controllers/commentController.js';
import auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/:blogId', auth, addComment);
router.get('/:blogId', getComments);
router.post('/:commentId/reply', auth, addReply);

export default router;