import { Outlet } from "react-router";

const ChatLayout = () => {
  return (
    <div className=" min-h-screen flex flex-col">
      <Outlet />
    </div>
  );
};

export default ChatLayout;
