import mongoose from "mongoose";
import User from "../models/auth.js";
import axios from "axios";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    const allUserDetails = [];

    allUsers.forEach((user) => {
      allUserDetails.push({
        _id: user.id,
        name: user.name,
        about: user.about,
        tags: user.tags,
        profileImg : user.profileImg,
        joinedOn: user.joinedOn,
      });
    });
    res.status(200).json(allUserDetails);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const { name, about, tags, profileImg } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable..");
  }

  try {
    const updatedProfile = await User.findByIdAndUpdate(
      _id,
      {
        $set: { name: name, about: about, tags: tags, profileImg: profileImg },
      },
      { new: true } // 'new' parameter is used so as to get an record from the database
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};


export const getAvatars = () => {

}



