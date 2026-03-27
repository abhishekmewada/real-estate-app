 import Post from '../models/Post.js';
 import jwt from 'jsonwebtoken';
 import SavePost from '../models/SavePost.js';
//  import PostDetails from '../models/postDetails.js';
   
  // get all posts
export const getPosts = async (req, res) =>{
      try {
        const posts = await Post.find();
         res.status(200).json(posts);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });   
    }
}


// get only one post by id 
    // api/routes/posts.js or similar
  export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate("userId");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let userId = null;

    const token = req.cookies?.token;

    // ✅ Agar token hai tab verify karo
    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        userId = payload.id;
      } catch (err) {
        userId = null;
      }
    }

    let saved = null;

    // ✅ Tabhi check karo jab userId ho
    if (userId) {
      saved = await SavePost.findOne({ userId, postId });
    }

    res.status(200).json({
      ...post._doc,
      isSaved: !!saved,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
    

// export const getPost = async (req, res) =>{
//     const id = req.params._id
//     try {
//        const post = await Post.findById(id)
//         .populate({
//         path: 'userId',
//         select: 'username email avatar' // only select username and email fields
//        }); // populate user details (only username and email)
      
//        if(!post) {
//         return res.status(404).json({ message: "Post not found" });
//        }

//        console.log("there is a post==================", post);
//        res.status(200).json(post);
   
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: "server error"}) 
//     } 
// }


// there uses for add post
export const addPost = async (req, res) => {
  try {
    const { postData, postDetails } = req.body;

    const newPost = await Post.create({
      ...postData,
      postDetails,
      userId: req.userId,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};



 


// it is for update post
export const updatePost = async (req, res) =>{
    const id = req.params.id; 
        const body = req.body;
        const tokenId = req.userId;
     try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not  found" });
        }
        if (post.userId.toString() !== tokenId) {
             return res.status(403).json({ message: "You are not authorized to update this post" });
        }
        const updatedPost = await Post.findByIdAndUpdate(id, body, {  returnDocument: "after" });
        res.status(200).json(updatedPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}


// it is for delete post...
export const deletePost = async (req, res) =>{
    const id = req.params.id;
    const tokenId = req.userId;
    const body = req.body;

    try {
        const post = await Post.findById(id); 
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (post.user == tokenId) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }
         await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
         console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}