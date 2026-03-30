 import mongoose from "mongoose";
import { PROPERTY, TYPE } from "../constants/enum.js";
import savePost from "./SavePost.js";


const postSchema = new mongoose.Schema(
  {
    title: { type: String },
    price: { type: Number },
    images: [{ type: String } ],

    address: { type: String},
    city: { type: String },
    state: { type: String },
 
    bedrooms: { type: Number },
    bathrooms: { type: Number },

    latitude: { type:Number  },
    longitude: { type: Number },

    type: {
      type: String,
      enum: TYPE,
      required: true,
    },

    property: {
      type: String,
      enum: PROPERTY,
      required: true,
    },

 
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

      postDetails: {
      desc: { type: String },
      utilities: [{ type: String }],
      pet: { type: Boolean },
      income: { type: Number },
      size: { type: String},
      school: { type:String},
      bus: { type: String },
      restaurant: { type: String },
      createdAt : { type: Date, default: Date.now },
    },
      // postDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'PostDetails',unique: true },
        savePost: [{ type: mongoose.Schema.Types.ObjectId, ref: "SavePost" }],

     
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;