import type { Request, Response } from "express";
import { User } from "../model/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../lib/streamConfig";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, role, email, password, profilePic } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ succes: false, message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      role,
      email,
      password,
      profilePic: profilePic || "./user.svg",
    });

    try {
      await upsertStreamUser({
        id: user._id.toString(),
        name: user.username,
        role: user.role,
        profilePic: user.profilePic,
      });
      console.log(`Stream user created for ${user.username}`);
    } catch (error) {
      console.log("Error creating Stream user:", error);
    }
    await user.save();

    res.json({ success: true, message: "User registered successfully", user });
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res.status(400).json({ pass: isMatch, error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.cookie("jwt", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: false,
      sameSite: "lax",
      secure: false,
    });

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
