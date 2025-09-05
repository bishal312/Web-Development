import { Request, Response } from "express";
// import { serverClient } from "../lib/streamConfig";

import { generateStreamToken } from "../lib/streamConfig";

export async function getStreamToken(req: Request, res: Response) {
  try {
    const token = generateStreamToken(req.user?.id);

    res.status(200).json({ token });
  } catch (error:any) {
    console.log("Error in getStreamToken controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// export const createChannel = async (req: Request, res: Response) => {
//   try {
//     const senderId = req.user?.id;

//     if (!senderId || !receiverId) {
//       return res.status(400).json({
//         success: false,
//         message: "Student Id and Mendtor id are required"
//       })
//     }

//     const channel = serverClient.channel(
//       "messaging",
//       `chat-${STUDENT_ID}-${MENTOR_ID}`,
//       {
//         members: [STUDENT_ID, MENTOR_ID],
//         created_by: { id: STUDENT_ID },
//       }
//     );
//     await channel.create();
//     res.json({ success: true, channelId: channel.id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error occures while creating chat channel",
//       error,
//     });
//   }
// };

// export const sendMessage = async (req: Request, res: Response) => {
//   try {
//     const {channelId, userId, text} = req.body;
//     const channel = serverClient.channel("messaging", channelId);

//     await channel.sendMessage({
//       user: {id: userId},
//       text,
//     });
//     res.json({succes: true, message: text});
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Error occures while Sending message",
//       error,
//     });
//   }
// };
