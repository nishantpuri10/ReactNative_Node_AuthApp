const User = require("../database/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) {
      return res.status(404).send({
        success: false,
        message: "no record found",
      });
    }
    return res.status(201).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting all students",
      error,
    });
  }
};

const SignUpUser = async (req, res) => {
  try {
    const { userName, email, password, balance } = req.body;
  
    if (!userName || !email || !password ) {
      return res.status(500).send({
        success: false,
        message: "fields are missing",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      balance,
    });

    if (!newUser) {
      return res.status(500).send({
        success: false,
        message: "Error in creating new user",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in creating new user",
      error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    ///check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ message: "user does not exists" });
    }

    ///validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "password is wrong" });
    }

    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", jwtToken });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in loging user",
      error,
    });
  }
};

const getSingleUserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    const data = await User.findByPk(id, {
      attributes: ["id", "userName", "email", "balance"], /// this send only these fields
    });
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "error in geting a user details", error });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    const data = await User.destroy({
      where: {}, // No condition means all records
      truncate: true, // Set to true to reset auto-increment ID
    });

    return res.status(200).json({ message: "Deleted all records" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "error in deleting all enteries", error });
  }
};

module.exports = { getUsers, SignUpUser, loginUser, getSingleUserDetails , deleteAllUsers};
