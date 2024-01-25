import { asyncHandler } from "../utils/asyncHandler";
import { UserSchema } from "../types/zod.types.ts";
import { ApiError } from "../utils/ApiError.ts";
import { UserModel } from "../models/user.model.ts";
import type { NextFunction, Request, Response } from "express";
import { uploadOnCloudinary } from "../utils/cloudinary.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  //get user data from request body
  // validate user data - not empty, valid email, password length
  // check if user already exists
  // check for images, check for avatar
  // upload images to cloudinary, get url
  // create user object
  // save user to database
  // remove password and refresh token from user object
  // check for user creation
  // return response

  const { username, password, fullName, email } = req.body;

  console.log(req.body);

  if (
    [username, password, fullName, email].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Please fill all fields");
  }

  // import other validations from seperate files

  const existingUser = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // multer middleware provides req.files object

  //* console.log(req.files);
  // {
  //   avatar: [
  //     {
  //       fieldname: "avatar",
  //       originalname: "noumaan.jpg",
  //       encoding: "7bit",
  //       mimetype: "image/jpeg",
  //       destination: "./public/temp",
  //       filename: "avatar-1706210114897-267807041-noumaan.jpg",
  //       path: "public/temp/avatar-1706210114897-267807041-noumaan.jpg",
  //       size: 144907,
  //     }
  //   ],
  // }

  //@ts-ignore
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  //@ts-ignore
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Please provide an avatar image");
  }

  // upload to cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(500, "Something went wrong while uploading avatar");
  }

  let coverImage;
  if (coverImageLocalPath !== undefined) {
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if (!coverImage) {
      throw new ApiError(500, "Something went wrong while uploading cover");
    }
  }

  console.log(avatar, coverImage);

  console.log("creating user");

  const newUser = await UserModel.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  // if (!newUser) {
  //   throw new ApiError(500, "Something went wrong while creating user");
  // }

  const createdUser = await UserModel.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating user");
  }

  console.log("user created", createdUser);

  return res
    .status(201)
    .json(new ApiResponse(201, "User created", createdUser));
});

export { registerUser };
