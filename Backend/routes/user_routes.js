import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user_controllers.js";
import isauthentication from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isauthentication, updateProfile);

export default router;
