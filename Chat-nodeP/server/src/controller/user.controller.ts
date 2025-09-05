import { Request, Response } from "express";
import { User } from "../model/user.model";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const currentUserId = req.user?.id;
    const currentUserRole = req.user?.role;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // Excluding current User id
        { role: { $nin: currentUserRole } },
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        messagee: "Error occurs while fetching users",
        error,
      });
  }
}
