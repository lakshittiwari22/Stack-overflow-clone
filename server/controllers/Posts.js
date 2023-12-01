import Posts from "../models/Post.js";
import mongoose from "mongoose";
import { emitNewPostNotification } from "../sockets/socket.js";

export const createPost = async (req, res) => {
  const createPostData = req.body;
  const userPosted = createPostData.userPosted;
  const createPost = new Posts({
    ...createPostData,
  });

  try {
    await createPost.save();
    emitNewPostNotification(userPosted);
    res.status(200).json("Posted a public post successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Could't post a new public post");
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Posts.find();
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable..");
  }

  try {
    await Posts.findByIdAndRemove(_id);
    res.status(200).json({ message: "successfully deleted the post" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id: _id, userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable..");
  }
  try {
    const post = await Posts.findById(_id);
    const upIndex = post.likes.findIndex((id) => id === String(userId)); //looping through each element of likes array

    if (upIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(userId));
    }
    await Posts.findByIdAndUpdate(_id, post);
    res.status(200).json({ message: "liked post successfully" });
  } catch (error) {}
};
