import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

const ChatLayout = () => {
  const url = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (url.pathname === "/chat" || url.pathname === "/chat/") {
      navigate("/users");
    }
  }, [url, navigate]);

  return (
    <div className=" min-h-screen flex flex-col">
      <Outlet />
    </div>
  );
};

export default ChatLayout;
