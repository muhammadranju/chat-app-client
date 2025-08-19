import { io } from "socket.io-client";
import Logo from "@/assets/Logo";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageInput from "@/components/chat/MessageInput";
import MessageList from "@/components/chat/MessageList";
import TypingIndicator from "@/components/chat/TypingIndicator";
import { nonfictionLogo } from "@/hooks/Logo";
import { BASE_URL, SOCKET_BASE_URL } from "@/lib/base_url";
import type { Message, Receiver, User } from "@/types/types";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import ChatsListSkeleton from "@/components/chat/ChatsListSkeleton";

const Chat = () => {
  const { userId } = useParams<{ userId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [receiver, setReceiver] = useState<Receiver | null>(null);
  const [notifications, setNotifications] = useState<
    { username: string; message: string }[]
  >([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement
  );
  const chatContainerRef = useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement
  );

  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();
  const [getMessage, setGetMessage] = useState(false);

  const socket = useMemo(() => io(SOCKET_BASE_URL), []);

  useEffect(() => {
    if (getMessage)
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [getMessage]);

  useEffect(() => {
    if (Notification.permission === "default") Notification.requestPermission();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      toast.error("You are not authorized to access this page");
      return;
    }

    const fetchData = async () => {
      try {
        // fetch all users
        const usersRes = await axios.get(`${BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersRes.data);

        // fetch chat messages only if userId exists
        if (userId) {
          const [msgsRes, userRes] = await Promise.all([
            axios.get(`${BASE_URL}/messages/${userId}`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${BASE_URL}/users/${userId}`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          setMessages(msgsRes.data);
          setReceiver(userRes.data);
        }
      } catch (err) {
        toast.error("Error fetching data");
        console.error("Error fetching data:", err);
      }
    };

    fetchData();

    if (userId) {
      const room = [user.id, userId].sort().join("-");
      socket.emit("joinRoom", { room });
    }

    socket.on(
      "message",
      (data: {
        message: string;
        sender: { _id: string; username: string };
      }) => {
        setMessages((prev) => [
          ...prev,
          { content: data.message, sender: data.sender },
        ]);

        const container = chatContainerRef.current;
        if (!container) return;
        const isAtBottom =
          container.scrollHeight -
            container.scrollTop -
            container.clientHeight <
          50;
        if (isAtBottom)
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    );

    socket.on("nonfiction", (data: { username: string; message: string }) => {
      if (data.username === user?.username) return;
      setNotifications((prev) => [
        { username: data.username, message: data.message },
        ...prev,
      ]);
      if (Notification.permission === "granted") {
        new Notification(`${data.username} sent a new message`, {
          body: data.message,
          icon: nonfictionLogo,
        });
      }
      setGetMessage(true);
    });

    socket.on("typing", (data: { username: string }) => {
      if (data.username === user?.username) return;
      setIsTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 2000);
    });

    return () => {
      socket.off("message");
      socket.off("nonfiction");
      socket.off("chatMessage");
      socket.off("typing");
    };
  }, [userId, socket, navigate]);

  const sendMessage = async () => {
    if (!user || !message.trim() || !userId) return;

    const room = [user.id, userId].sort().join("-");
    const newMsg = {
      message,
      sender: { _id: user.id, username: user.username },
      receiver: { _id: userId, username: receiver?.username },
      timestamp: new Date(),
    };

    socket.emit("chatMessage", { room, ...newMsg });
    console.log(newMsg);

    try {
      setTimeout(
        () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }),
        100
      );

      setMessage("");
    } catch (err) {
      toast.error("Error sending message");
      console.error("Error sending message:", err);
    }
  };

  if (!user) return null;

  return (
    <div className="w-full h-[90vh] flex border rounded-lg overflow-hidden">
      <Helmet>
        <title>Chat with - {receiver?.username || ""}</title>
      </Helmet>
      {/* LEFT: user list */}
      <div className="hidden md:flex flex-col w-1/3 lg:w-1/4 border-r bg-white">
        <div className="p-3 font-semibold text-lg border-b flex flex-col">
          <Link
            to="/users"
            className="text-foreground font-black hover:text-primary/90 flex items-center gap-2"
          >
            <Logo /> Chatify
          </Link>
          <span className="text-xs ml-11 -mt-3">Hello! {user?.username}😉</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {users.map((u) => (
            <div
              key={u._id}
              onClick={() => navigate(`/chat/${u._id}`)}
              className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition ${
                u._id === userId ? "bg-gray-200" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-sm">
                {u.username.charAt(0).toUpperCase()}
              </div>
              <span className="truncate">{u.username}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: chat */}
      <div className="flex-1 flex flex-col bg-gray-50 pt-5 px-10">
        {receiver ? (
          <>
            <ChatHeader
              receiver={receiver}
              notifications={notifications}
              showPopup={showPopup}
              setShowPopup={setShowPopup}
            />

            <MessageList
              messages={messages}
              user={user}
              messagesEndRef={messagesEndRef}
              chatContainerRef={chatContainerRef}
            />

            {isTyping && <TypingIndicator username={receiver?.username} />}

            <MessageInput
              message={message}
              setMessage={setMessage}
              sendMessage={sendMessage}
              socket={socket}
              user={user}
              userId={userId}
            />
          </>
        ) : (
          // <div className="flex flex-1 items-center justify-center text-gray-500">
          //   Select a user to start chatting
          // </div>
          <>
            <ChatsListSkeleton />
            <ChatsListSkeleton />
            <ChatsListSkeleton />
            <ChatsListSkeleton />
            <ChatsListSkeleton />
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
