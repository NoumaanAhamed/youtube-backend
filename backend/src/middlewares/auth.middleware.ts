import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { UserModel } from "../models/user.model";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

// _ is used to ignore the second parameter
export const verifyAccessToken = asyncHandler(async (req, _, next) => {
  // get access token from cookies
  // check if token exists
  // verify token
  // if token is valid, set req.user to the user in the token
  // else throw error
  // call next()

  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.headers.authorization?.split(" ")[1] ||
      req.body.accessToken;

    if (!accessToken) {
      throw new ApiError(401, "Access token not found - Unauthorized");
    }

    const decodedToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

    //@ts-ignore
    const loggedInUser = await UserModel.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!loggedInUser) {
      throw new ApiError(401, "Invalid access token - Unauthorized");
    }

    //@ts-ignore
    req.user = loggedInUser;

    next();
  } catch (error: Error | any) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
