import { CardHeader, CardTitle } from "@/components/ui/card";
import { IoNotifications } from "react-icons/io5";
import type { Receiver } from "@/types/types";
import { FaCircle } from "react-icons/fa";

type Notification = { username: string; message: string };

interface ChatHeaderProps {
  receiver: Receiver | null;
  notifications: Notification[];
  showPopup: boolean;
  setShowPopup: (v: boolean) => void;
}

const ChatHeader = ({
  receiver,
  notifications,
  showPopup,
  setShowPopup,
}: ChatHeaderProps) => {
  return (
    <CardHeader className="">
      <div className="flex flex-row justify-between relative">
        <CardTitle className="flex">
          <span>Chat with {receiver?.username || "Offline"}</span>{" "}
          <FaCircle
            className={`${
              receiver?.username ? "text-green-500" : "text-red-500"
            }  text-xs`}
          />
        </CardTitle>
        <div
          className="relative cursor-pointer"
          onClick={() => setShowPopup(!showPopup)}
        >
          <IoNotifications className="text-2xl sm:text-3xl relative" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs sm:text-sm font-bold w-5 h-5 flex items-center justify-center rounded-full pointer-events-none">
              {notifications.length}
            </span>
          )}
          {showPopup && (
            <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white shadow-lg rounded-lg border max-h-64 overflow-y-auto z-50">
              {notifications.length > 0 ? (
                notifications.map((n, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 hover:bg-gray-100 border-b text-sm"
                  >
                    <strong>{n.username}</strong>: {n.message}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">
                  No notifications
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </CardHeader>
  );
};

export default ChatHeader;
