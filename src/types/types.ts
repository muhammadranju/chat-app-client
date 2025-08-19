import type { RefObject } from "react";
import type { Socket } from "socket.io-client";

export interface User {
  id: string;
  _id: string;
  username: string;
}

export interface Message {
  _id?: string;
  sender: {
    _id: string;
    username: string;
  };
  content: string;
  timestamp?: Date;
}

export interface Receiver {
  _id: string;
  username: string;
}

export interface MessageListProps {
  messages: Message[];
  user: User;
  messagesEndRef: RefObject<HTMLDivElement>;
  chatContainerRef: RefObject<HTMLDivElement>;
  timestamp?: Date;
}

export interface MessageListProps {
  messages: Message[];
  user: User;
  messagesEndRef: RefObject<HTMLDivElement>;
  chatContainerRef: RefObject<HTMLDivElement>;
  timestamp?: Date;
}

export interface TypingIndicatorProps {
  username?: string;
}

export interface MessageInputProps {
  message: string;
  setMessage: (v: string) => void;
  sendMessage: () => void;
  socket: Socket;
  user: User | null;
  userId?: string;
}
