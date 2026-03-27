import mongoose from "mongoose";
// import SavePost from "./SavePost.js";


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // createdAt:{ type: Date, default: Date.now },
  avatar:   { type: String },
  isAdmin:  { type: Boolean, default: false }   ,
    posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
      
    }
  ],
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SavePost"
      }
    ]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
