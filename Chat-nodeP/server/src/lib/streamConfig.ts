import { StreamChat } from "stream-chat";
import dotenv from "dotenv";

dotenv.config();

export const serverClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY!,
  process.env.STREAM_API_SECRET!
);

export const upsertStreamUser = async (userData: any) => {
  try {
    await serverClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const generateStreamToken = (userId: any) => {
  try {
    const useridStr = userId.toString();
    return serverClient.createToken(useridStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
  }
};
