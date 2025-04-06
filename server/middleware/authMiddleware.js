const jwt = require("jsonwebtoken");

const authenticateToken = (req, res , next) => {
  try {
    const authToken = req.headers["authorization"];

    if (!authToken) {
      return res
        .status(401)
        .json({ message: "Access Denied: No token provided" });
    }

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = decoded; // Attach user ID to request 
    next(); // Continue to next middleware
  } catch (error) {
    console.log(error)
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = {authenticateToken};
