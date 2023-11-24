import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  caption: { type: String, required: "Post must have a cation" },
  postImg: { type: String },
  noOfComments: { type: Number, default: 0 },
  likes: { type: [String], default: [] },
  userPosted: { type: String, required: "Post must have an user" },
  userId: { type: String },
  postedOn: { type: Date, default: Date.now },
  comments: [
    {
      commentBody: String,
      userCommented: String,
      userId: String,
      commentedOn: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("Post", PostSchema);
