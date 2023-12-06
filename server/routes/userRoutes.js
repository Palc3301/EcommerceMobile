import express from "express";
import {
  getUserProfileController,
  loginController,
  logoutController,
  registerController,
  updateProfileController,
  udpatePasswordController,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routes
// register
router.post("/register", registerController);

//login
router.post("/login", loginController);

//profile
router.get("/profile", isAuth, getUserProfileController);

//logout
router.get("/logout", isAuth, logoutController);

// uopdate profile
router.put("/profile-update", isAuth, updateProfileController);

// updte password
router.put("/update-password", isAuth, udpatePasswordController);

//export
export default router;
