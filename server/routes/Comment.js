import express from 'express'

import { postComment } from '../controllers/Comment.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.patch('/post', auth,  postComment)

export default router