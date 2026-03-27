
import jwt from "jsonwebtoken";

// shouldBeLoggedIn route can be accessed by any logged in user, while shouldBeAdmin route can only be accessed by admin users.
export const shouldBeLoggedIn = (req, res) => {
    console.log("req.userId=========: ", req.userId);
     res.status(200).json({ message: "You are logged in and can access this route." });
    };




    // shouldBeAdmin route can be accessed by any logged in user, while shouldBeAdmin route can only be accessed by admin users.
export const shouldBeAdmin = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("there is a payload okk............., payload: ", payload.isAdmin);
      if (!payload.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json({ message: "Welcome Admin" });

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
