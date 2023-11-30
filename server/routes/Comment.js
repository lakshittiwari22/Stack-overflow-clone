import express from 'express'

import { deleteComment, postComment } from '../controllers/Comment.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.patch('/post', auth,  postComment)
router.patch('/delete/:id', deleteComment)

export default router