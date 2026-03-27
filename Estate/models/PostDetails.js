 
 import mongoose from "mongoose";

 const postDetailsSchema = new mongoose.Schema({
    id: { type: String, unique: true },
     desc: { type: String, required: true },
     utilities: { type: [String], required: true },
     pet: { type: Boolean, required: true },
     income: { type: Number, required: true },
     size: { type: Number, required: true },
     school: { type:  Number, required: true },
     bus: { type: Number, required: true },
     resturant: { type:  Number, required: true },
     post : { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
     }, { timestamps: true });     

    const PostDetails = mongoose.model("PostDetails", postDetailsSchema);
    export default PostDetails;

 

