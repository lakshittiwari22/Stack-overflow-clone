import mongoose from "mongoose";
import Posts from "../models/Post.js";

export const postComment = async (req, res) => {
//   const { id: _id } = req.params;
//   console.log(req.body.id);
  const { id:_id, commentBody, noOfComments, userCommented, userId } = req.body.id;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Post unavailable..");
  }

  updateNoOfComments(_id, noOfComments);

  try {
    const updatedPost = await Posts.findByIdAndUpdate(_id, {
      $addToSet: { comments: [{ commentBody, userCommented, userId }] },
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json(error);
  }

};

const updateNoOfComments = async (_id, noOfComments) => {
    try {
      await Posts.findByIdAndUpdate(_id, {
        $set: { noOfComments: noOfComments },
      });
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteComment = async (req, res) => {
    const { id: _id } = req.params;
    const { commentId, noOfComments } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("question unavailable..");
    }
  
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(404).send("answer unavailable..");
    }
    updateNoOfComments(_id, noOfComments);
  
    try {
      await Posts.updateOne(
        { _id },
        { $pull: { comments: { _id: commentId } } }
      );
      res.status(200).json({ message: " Successfully deleted your comment..."})
    } catch (error) { 
      res.status(405).json(error);
    }
  };
  
