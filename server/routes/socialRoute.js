import express from "express";
import { createPost, deletePost, getAllPosts, likePost } from "../controllers/Posts.js";

const router = express.Router();

router.post("/Create", createPost)
router.get("/getAllposts", getAllPosts)
router.delete("/delete/:id", deletePost);
router.patch("/like", likePost)

export default router

