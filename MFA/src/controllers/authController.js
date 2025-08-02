import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { registerZSchema } from "../lib/registerZSchema.js";
import { config, success } from "zod";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const register = async (req, res) => {
  try {
    const Registrationdata = registerZSchema.safeParse(req.body);
    if (!Registrationdata.success) {
      const errorMessage =
        Registrationdata.error?.errors?.[0]?.message || "Invalid input";
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }
    const { username, password } = Registrationdata.data;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already taken",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      isMfaActive: false,
    });
    console.log("New User: ", newUser);
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log("Registration Error: ", error);
    res
      .status(500)
      .json({ success: false, message: "Error occures while regestering" });
  }
};
export const login = async (req, res) => {
  console.log("The authenticated user is : ", req.user);
  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    isMfaActive: req.user.isMfaActive,
  });
};
export const authStatus = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "User logged in sucessfully",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({ success: false, message: "Unauthorized user" });
  }
};
export const logout = async (req, res) => {
  if (!req.user)
    return res
      .status(401)
      .json({ success: false, message: "Already logged out" });
  req.logout((err) => {
    if (err)
      return res
        .status(400)
        .json({ success: false, message: "User not logged in" });
  });
  res.status(200).json({ success: false, message: "Logout successfully" });
};
export const setup2FA = async (req, res) => {
  try {
    console.log("The req.user is:", req.user);
    const user = req.user;
    var secret = speakeasy.generateSecret();
    console.log("The secret object is : ", secret);
    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "www.bishalmagar.com",
      encoding: "base32",
    });
    const qrImageUrl = await qrCode.toDataURL(url);
    res.status(200).json({ secret: secret.base32, qrCode: qrImageUrl });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error while setting up 2FA",
      message: error,
    });
  }
};
export const verify2FA = async (req, res) => {
  const { token } = req.body;
  const user = req.user;
  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
  });
  if (verified) {
    const jwtTokent = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1hr",
      }
    );
    res
      .status(200)
      .json({ success: true, message: "2FA Successful", token: jwtTokent });
  } else {
    res.status(400).json({ success: false, message: "Invalid 2FA token" });
  }
};
export const reset2FA = async (req, res) => {
  try {
    const user = req.user;
    user.twoFactorSecret = "";
    user.isMfaActive = false,
    await user.save();
    res.status(200).json({success: true, message:"2fA reset successful"});
  } catch (error) {
    res.status(500).json({error: "Error reseting 2FA", message:error});
  }
};
