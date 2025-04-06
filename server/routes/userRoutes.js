const express = require("express");
const { getUsers, SignUpUser, loginUser, getSingleUserDetails, deleteAllUsers } = require("../controllers/userController");
const {authenticateToken } = require("../middleware/authMiddleware");

///router object
const router = express.Router();

///routes
router.get("/users" , getUsers);

router.post("/users",SignUpUser);

router.post("/login" , loginUser);

router.get("/userDetails" , authenticateToken , getSingleUserDetails)

router.delete("/deleteAll" , deleteAllUsers)

module.exports = router;