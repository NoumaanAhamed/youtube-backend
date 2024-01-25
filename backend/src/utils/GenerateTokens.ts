import type { User } from "../models/user.model";
import { ApiError } from "./ApiError";

export const generateAccessAndRefreshToken = async (user: User) => {
  try {
    //@ts-ignore
    const accessToken = await user.generateAccessToken();
    //@ts-ignore
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    // validateBeforeSave: false - to avoid mongoose validation error on required fields
    //@ts-ignore
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Internal Server Error - Token Generation Failed");
  }
};
