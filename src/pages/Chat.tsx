/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { nonfictionLogo } from "@/hooks/Logo";
import { BASE_URL } from "@/lib/base_url";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import io from "socket.io-client";

interface User {
  id: string;
  username: string;
}

interface Message {
  [x: string]: any;
  _id?: string;
  sender: {
    _id: string;
    username: string;
  };
  receiver?: {
    _id: string;
    username: string;
  };
  content: string;
  timestamp?: Date;
}

interface Receiver {
  _id: string;
  username: string;
}

const Chat = () => {
  const { userId } = useParams<{ userId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [receiver, setReceiver] = useState<Receiver | null>(null);
  const storedUser = localStorage.getItem("user");
  const user: User | null = storedUser ? JSON.parse(storedUser) : null;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [getMessage, setGetMessage] = useState(false);

  const socket = useMemo(() => io(BASE_URL), []);

  // Request notification permission once
  useEffect(() => {
    if (
      Notification.permission === "default" ||
      Notification.permission === "granted"
    ) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification granted");
        } else {
          console.log("Notification denied");
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const [msgsRes, userRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/messages/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setMessages(msgsRes.data as Message[]);
        setReceiver(userRes.data as Receiver);
      } catch (err) {
        console.error("Error fetching data:", err);
        setReceiver({ username: "Unknown User" });
      }
    };

    fetchData();

    // Join chat room
    const room = [user.id, userId].sort().join("-");
    socket.emit("joinRoom", { room });

    // Handle incoming messages
    const handleMessage = (data: {
      message: string;
      sender: { _id: string; username: string };
    }) => {
      // Only notify if the message is from the other user

      setMessages((prev) => [
        ...prev,
        { content: data.message, sender: data.sender },
      ]);

      // Scroll if user is near bottom
      const container = chatContainerRef.current;
      if (!container) return;
      const isAtBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        50;
      if (isAtBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    };

    return () => {
      socket.off("message", handleMessage);
    };
  }, [userId, socket, navigate, getMessage, user]);

  const sendMessage = async () => {
    if (!user || !message.trim()) return;

    const room = [user.id, userId].sort().join("-");
    const newMsg = {
      message,
      sender: { _id: user.id, username: user.username },
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/messages`,
        { receiver: userId, content: message },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      // Optimistic UI update
      const sentMessage = {
        _id: response.data._id,
        sender: { _id: user.id, username: user.username },
        content: message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, sentMessage]);

      // Scroll to bottom after sending
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);

      // Emit message to other users
      socket.emit("chatMessage", { room, ...newMsg });

      socket.emit("nonfiction", { username: user.username, message });

      socket.on("nonfiction", (data) => {
        if (receiver?._id === userId) {
          setGetMessage(false);
          if (
            Notification.permission === "default" ||
            Notification.permission === "granted"
          ) {
            new Notification(`${data.username} send a new message`, {
              body: data.message,
              icon: nonfictionLogo,
            });
          }
        }
        setGetMessage(true);
      });
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  if (!user) return null;

  return (
    <Card className="w-[600px] h-[80vh] mx-auto mt-10 flex flex-col">
      <CardHeader>
        <CardTitle>Chat with {receiver?.username || "Loading..."}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto" ref={chatContainerRef}>
        {messages.map((msg, idx) => {
          const isMe = msg.sender.username === user.username;
          const key = msg._id ? `${msg._id}-${idx}` : `msg-${idx}`; // unique key
          return (
            <div
              key={key}
              className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}
            >
              <div
                className={`max-w-[70%] p-2 rounded-lg ${
                  isMe ? "bg-foreground text-white" : "bg-gray-200"
                }`}
              >
                <div className="flex items-center">
                  <Avatar className="inline-block mr-2">
                    <AvatarFallback>
                      {msg.sender.username?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span>{msg.content}</span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </CardContent>

      <div className="p-4 flex">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <Button onClick={sendMessage} className="ml-2">
          Send
        </Button>
      </div>
    </Card>
  );
};

export default Chat;
