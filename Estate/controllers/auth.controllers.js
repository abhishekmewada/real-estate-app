import bcrypt from  "bcrypt";
import jwt from "jsonwebtoken";
 import User from "../models/User.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log("Hashed Password:", hashedPassword);
    // check if  user with the same email already exists
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: "Username or email already exists" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

 // LOGIN
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by email
    const user = await User.findOne({ username});
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

    // res.setHeader("Set-Cookie", "test=" + "myValue")
    const age = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
//    jwt token generation can go here, and then set the token in a cookie
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "7d" });

const { password: userPassword, ...userInfo } = user._doc;

     res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: age,
    })
    .status(200).json({ message: "Login successful", user: userInfo });

   } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
 
// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logged out successfully" });

  // Mongoose + JWT / session logic can go here
  console.log("Logout route works");
  res.status(200).json({ message: "Logged out successfully" });
};