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
