import { asyncHandler } from "../utils/asyncHandler";
// import { UserSchema } from "../types/zod.types.ts";
import { ApiError } from "../utils/ApiError.ts";
import { UserModel } from "../models/user.model.ts";
import type { NextFunction, Request, Response } from "express";
import { uploadOnCloudinary } from "../utils/cloudinary.ts";
import { ApiResponse } from "../utils/ApiResponse.ts";
import { generateAccessAndRefreshToken } from "../utils/GenerateTokens.ts";
import { cookieOptions } from "../utils/cookieOptions.ts";
import jwt from "jsonwebtoken";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

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

  // console.log(req.body);
  // console.log(username, password, fullName, email);

  if (
    !username ||
    !password ||
    !fullName ||
    !email ||
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof fullName !== "string" ||
    typeof email !== "string"
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
  // ? -> optional chaining , returns undefined if any of the properties are undefined instead of throwing error
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

  // console.log(avatar);

  // {
  //   asset_id: "2671c0172cf7e32d9ae971b9c56a35e2",
  //   public_id: "ahqvvjenruxc3hsrz7gq",
  //   version: 1706213651,
  //   version_id: "bdcf6b9fe2551edaec2c58d0e1a2e78a",
  //   signature: "3bf78541e9c0799d4b255ebfc8ab2fa5f74c880d",
  //   width: 1280,
  //   height: 720,
  //   format: "jpg",
  //   resource_type: "image",
  //   created_at: "2024-01-25T20:14:11Z",
  //   tags: [],
  //   bytes: 144907,
  //   type: "upload",
  //   etag: "55b342ea71acec22553daecd76110afa",
  //   placeholder: false,
  //   url: "http://res.cloudinary.com/dpuhvqdlu/image/upload/v1706213651/ahqvvjenruxc3hsrz7gq.jpg",
  //   secure_url: "https://res.cloudinary.com/dpuhvqdlu/image/upload/v1706213651/ahqvvjenruxc3hsrz7gq.jpg",
  //   folder: "",
  //   original_filename: "avatar-1706213645894-624938109-noumaan",
  //   api_key: "448288738994353",
  // }

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

  return res
    .status(201)
    .json(new ApiResponse(201, "User created", createdUser));
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  // get user data from request body
  // validate user data - not empty, valid email, password length
  // check if user exists
  // check if password matches
  // generate access token and refresh token
  // send cookies

  const { username, password, email } = req.body;

  // console.log(req.body);
  // either username or email will be present but password will always be present

  if ((!username && !email) || !password) {
    throw new ApiError(400, "Please fill all fields");
  }

  const existingUser = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!existingUser) {
    throw new ApiError(401, "User does not exist");
  }

  //@ts-ignore
  const isPasswordValid = await existingUser.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshToken(existingUser);

  //loggedInUser will contain the refresh token but existingUser will not
  const loggedInUser = await UserModel.findById(existingUser._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(200, "User logged in", {
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    );
  // send tokens in response body as well for mobile apps
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  // clear cookies
  // send response
  await UserModel.findByIdAndUpdate(
    //@ts-ignore
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    { new: true }
  );

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, "User logged out", {}));
});

const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  const incomingRefreshToken =
    req.cookies.refreshToken ||
    req.headers.authorization?.split(" ")[1] ||
    req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(400, "Refresh token not found");
  }

  // check if refresh token is valid
  try {
    const decodedToken = jwt.verify(incomingRefreshToken, REFRESH_TOKEN_SECRET);

    if (!decodedToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    //@ts-ignore
    const user = await UserModel.findById(decodedToken._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // check if refresh token is in database
    if (user?.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Refresh token is expired or invalid");
    }

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshToken(user);

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(200, "Access token refreshed", {
          accessToken,
          refreshToken,
        })
      );
  } catch (error: Error | any) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
