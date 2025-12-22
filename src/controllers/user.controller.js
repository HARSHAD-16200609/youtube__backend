import { async_handler } from "../utils/async-handler.js";
import { API_Error } from "../utils/Api_error.js";
import { User } from "../models/users.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const register_user = async_handler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { username, email, fullName, password } = req.body;

  if (
    [username, email, fullName, password].some((field) => field.trim() === "")
  ) {
    throw new API_Error(400, "All fields are required");
  }

  const existing_user = await User.findOne({ $or: [{ username:username }, { email:email }] });


  if (existing_user) {
    throw new API_Error(409, "User already registered");
  }

  const avatar_local_path = req.files?.avatar[0]?.path;
let coverImage_local_path ;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImage_local_path = req.files?.coverImage[0]?.path;
  }

  const avatar_url = await uploadOnCloudinary(avatar_local_path);
  const coverImage_url = await uploadOnCloudinary(coverImage_local_path);
console.log(avatar_url);
console.log(coverImage_url);


  if (!(avatar_url && coverImage_url)) {
    throw new API_Error(
      500,
      "Internal server Error : Files failed to upload try again !!!"
    );
  }

  const user = await User.create({
    fullName: fullName,
    email: email,
    username: username.toLowerCase(),
    password: password,
    avatar: avatar_url,
    coverImage: coverImage_url,
  });
  // IMP for futher reference new syntax
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new API_Error(500, "Something went wrong while registering the user");
  }

  res.status(201).json(createdUser);
});

export default register_user;
