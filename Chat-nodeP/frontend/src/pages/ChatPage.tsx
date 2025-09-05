import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import {
  Channel as StreamChannel,
  Chat,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat, Channel } from "stream-chat";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import ChatLoader from "../components/ChatLoader";

const Stream_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUid } = useParams();
  const { authUser } = useAuthUser();

  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const imageUrl = authUser?.profilePic
    ? `${BASE_URL}/uploads/${authUser.profilePic}`
    : `${BASE_URL}/uploads/user.svg`;

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  const chatClientRef = useRef<StreamChat | null>(null);
  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        const client = StreamChat.getInstance(Stream_API_KEY);


        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.username,
            image: imageUrl,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUid].sort().join("-");
        const currentChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUid],
        });

        await currentChannel.watch();
        chatClientRef.current = client;
        setChatClient(client);
        setChannel(currentChannel);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    initChat();

    return () => {
      chatClientRef.current?.disconnectUser();
    };
  }, [authUser, targetUid, tokenData?.token, imageUrl]);
  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <Chat client={chatClient!}>
      {channel && (
        <StreamChannel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </StreamChannel>
      )}
    </Chat>
  );
};

export default ChatPage;
