import expressAsyncHandler from "express-async-handler";
import createToken from "../utils/createToken.js";
import User from "../models/users.js";

// ********** PUBLIC **********
// @desc     Auth user/set token
// route     POST /api/users/auth
// @access   Public
export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    createToken(res, user._id),
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
      });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @desc     Register a new user
// route     POST /api/users/
// @access   Public
export const register = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    createToken(res, user._id),
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
      });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc     Logout user
// route     POST /api/users/logout
// @access   Public
export const logout = expressAsyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

// ********** PRIVATE CONTROLLERS **********

// @desc     Get user profile
// route     GET /api/users/profile
// @access   Private
export const getUser = expressAsyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    image: req.user.image,
    isAdmin: req.user.isAdmin,
  };

  res.status(200).json(user);
});

// @desc     Update user profile
// route     PUT /api/users/profile
// @access   Private
export const updateUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.image = req.body.image || user.image;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      image: updatedUser.image,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc     Delete user profile
// route     DELETE /api/users/profile
// @access   Private
export const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Admin user can't be deleted");
    } else {
      await user.deleteOne();
      res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.status(200).json({ message: "User deleted" });
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// ********** ADMIN CONTROLLERS **********

// @desc     Get all users profile
// route     GET /api/users/admin
// @access   Private/Admin
export const getUsers = expressAsyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 1;
  const limit = 6;
  const skip = (page - 1) * limit;

  const users = await User.find()
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit);

  const count = await User.countDocuments();

  res.status(200).json({
    users,
    page,
    pages: Math.ceil(count / limit),
    totalUsers: count,
  });
});

// @desc     Delete user profile
// route     DELETE /api/users/admin/profile/:id
// @access   Private/Admin
export const deleteUserById = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    try {
      await user.deleteOne({});
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(404);
      throw new Error("User not found");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
