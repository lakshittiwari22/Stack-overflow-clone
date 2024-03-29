import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, unique: true },
  password: {
    type: String,
    required: function () {
      return this.googleID ? false : true; // Make password required only if there is no Google ID
    },
  },
  googleID: { type: String },
  profileImg: { type: String, default: "" },
  about: { type: String },
  tags: { type: [String] },
  joinedOn: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
