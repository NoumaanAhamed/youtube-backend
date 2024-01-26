import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";
import { verifyAccessToken } from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

const router = Router();

router.route("/health").get(
  asyncHandler(async (req, res, next) => {
    res.status(200).json({
      status: "success",
      message: "Server is running",
    });
  })
);

//intentionaly thow error in asyncHandler
router.route("/test").get(
  asyncHandler(async (req, res) => {
    throw new ApiError(500, "Test error");
  })
);

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// secured routes
router.route("/logout").post(verifyAccessToken, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);

export default router;
