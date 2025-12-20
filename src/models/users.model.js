import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
        required: true,
      },
    ],
    username: {
      type: String,
      required: true,
      distinct: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      distinct: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true, // cloudinary url
    },
    coverImage: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    refreshTokens: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.plugin(mongooseAggregatePaginate);

// mongoose hook like event listener in js dom
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  this.password = bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  if (!isPasswordCorrect(this.password)) return;

  return (jwt_token = jwt.sign(
    { _id: this._id, password: this.password, username: this.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  ));
};
userSchema.methods.generateRefreshToken = async function () {
  if (!isPasswordCorrect(this.password)) return;

  return (jwt_token = jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  ));
};

const User = mongoose.model("User", userSchema);
