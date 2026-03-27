 import User from "../models/User.js"
 import SavePost from "../models/SavePost.js"
 import bcrypt from "bcrypt";


//  get all users
export const getUsers = async (req, res) =>{ 
   try {

    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
     console.log(err)
     res.status(500).json({message: "Failed to get user!"})
  }
}


// get user by id
export const getUser = async (req, res) =>{
  try {
    const id = req.params._id;
    const user = await User.findById(id);
    res.status(200).json(user);
    
  } catch (err) { 
     console.log(err)
     res.status(500).json({message: "Failed to get user!"})
  }
}


// update user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const body = req.body;
//   console.log("there is a req.body============", body);
 
  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  try {
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    res.status(200).json({
      message: "User has been updated!",
      user: updatedUser,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update user!" });
  }
};


// delete user
export const deleteUser = async (req, res) =>{

     const id = req.params.id;
  const tokenUserId = req.userId;
  
  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized" });
  }

  try {
const deletedUser = await User.findByIdAndDelete(id);

if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User has been deleted!",
      user: updatedUser,
    });

  }
   catch (err) {
     console.log(err)
     res.status(500).json({message: "Failed to delete user!"})
  }
}

// savePost
export const savePost = async (req, res) =>{
   const postId = req.body.postId;
   const tokenUserId = req.userId;
  try {
     
    // check if already save
    const savedPost = await SavePost.findOne({
      user: tokenUserId,
      post: postId,
    })

    if(savedPost) {
      await SavePost.findByIdAndDelete(savedPost._id);

      return res.status(200).json({
        message: "Post removed from saved list",
      })
    } else {
      await SavePost.create({
        user: tokenUserId,
        post: postId,
      });

      console.log("REQ BODY:-----------", req.body);
console.log("postId:-------------", req.body.postId);
console.log("userId:-------------", req.userId);
      
      return res.status(200).json({
        savePost: postId, message: "Post saved successfully"
      })
    }
  }
   catch (err) {
   console.log(err);
   res.status(500).json({
    message: "Failed to toggle save post"
   })
  }
}

// profile posts
// export const profilePosts = async (req, res) => {
//   try {
//     const userId = req.user.id; // ya token se nikalo

//     const userPosts = await Post.find({ userId });
//     const savedPosts = await SavePost.find({ userId }).populate("postId");

//     res.status(200).json({
//       userPosts,
//       savedPosts
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

export const profilePosts = async (req, res) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const userId = payload.id;
    console.log('usrerId from paload.id ------------------', userId);

// const userPosts = await Post.find({ userId }).populate("userId");
    const userPosts = await Post.find({ user: userId }).populate("user");

    // const savedPostsRaw = await SavePost.find({user:userId }).populate("post");

    // const savedPosts = savedPostsRaw.map(item => item.post);

    console.log("USER POSTS------------------:", userPosts);
    console.log("SAVED POSTS-----------------:", savedPosts);
     
    return res.status(200).json({
      userPosts,
      // savedPosts
    });

  } catch (error) {
    console.log("PROFILE ERROR:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};