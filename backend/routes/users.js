import express from "express";
import { authenticate, authorized } from "../middlewares/auth.js";
import {
  deleteUser,
  deleteUserById,
  getUser,
  getUsers,
  login,
  logout,
  register,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

// ********** PUBLIC **********
// /api/users/
router.route("/").post(register);

// /api/users/auth
router.route("/auth").post(login);

// /api/users/logout
router.route("/logout").post(logout);

// ********** PRIVATE **********
// /api/users/profile
router
  .route("/profile")
  .get(authenticate, getUser)
  .put(authenticate, updateUser)
  .delete(authenticate, deleteUser);

// ********** ADMIN **********
// /api/users/admin
router.route("/admin").get(authenticate, authorized, getUsers);

// /api/users/admin/profile/:id
router
  .route("/admin/profile/:id")
  .delete(authenticate, authorized, deleteUserById);
export default router;
