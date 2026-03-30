import mongoose from "mongoose";
// import SavePost from "./SavePost.js";


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // createdAt:{ type: Date, default: Date.now },
  avatar:   { type: String },
  isAdmin:  { type: Boolean, default: false }   ,
  // it is means that one user can have many posts, and the posts are referenced by their ObjectId
    posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
      
    }
  ],
  // it is means that one user can have many saved posts, and the saved posts are referenced by their ObjectId
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SavePost"
      }
    ]
}, { timestamps: true });


// it is a model which is used to create a collection in the database, and it is used to perform CRUD operations on the collection
const User = mongoose.model("User", userSchema);

export default User;
