import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CardContent } from "@/components/ui/card";
import type { MessageListProps } from "@/types/types";
import { format, parseISO } from "date-fns";

const MessageList = ({
  messages,
  user,
  messagesEndRef,
  chatContainerRef,
}: MessageListProps) => {
  return (
    <CardContent
      className="flex-1 overflow-y-auto px-2 mt-5"
      ref={chatContainerRef}
    >
      {messages.map((msg, idx) => {
        const isMe = msg.sender.username === user.username;
        const key = msg._id ? `${msg._id}-${idx}` : `msg-${idx}`;
        return (
          <div
            key={key}
            className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}
          >
            <div
              className={`max-w-[70%] sm:max-w-[60%] p-2 rounded-lg ${
                isMe ? "bg-foreground text-white" : "bg-gray-200"
              }`}
            >
              <div className="flex items-center">
                <Avatar className="inline-block mr-2">
                  <AvatarFallback className="text-foreground">
                    {msg?.sender.username?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span>{msg?.content}</span>
                  <small>
                    {msg?.timestamp
                      ? format(
                          msg.timestamp instanceof Date
                            ? msg.timestamp
                            : parseISO(msg.timestamp),
                          "dd MMM yyyy, hh:mm a"
                        )
                      : ""}
                  </small>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </CardContent>
  );
};

export default MessageList;
