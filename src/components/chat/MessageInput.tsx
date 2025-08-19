import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MessageInputProps } from "@/types/types";

const MessageInput = ({
  message,
  setMessage,
  sendMessage,
  socket,
  user,
  userId,
}: MessageInputProps) => {
  return (
    <div className="p-4 flex flex-col sm:flex-row gap-2">
      <Input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          if (user && userId)
            socket.emit("typing", {
              room: [user.id, userId].sort().join("-"),
              username: user.username,
            });
        }}
        placeholder="Type a message"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
          }
        }}
      />
      <Button onClick={sendMessage}>Send</Button>
    </div>
  );
};

export default MessageInput;
