import App from "@/App";
import ChatLayout from "@/components/layout/ChatLayout";
import About from "@/pages/About";
import Chat from "@/pages/Chat";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Users from "@/pages/Users";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,

    path: "/",
    children: [
      {
        index: true,
        Component: Home,
        path: "/",
      },
      {
        index: true,
        Component: Home,
        path: "/home",
      },
      {
        Component: Users,
        path: "/users",
      },
      {
        Component: About,
        path: "/about",
      },
      {
        Component: Login,
        path: "/login",
      },
      {
        index: true,
        Component: Signup,
        path: "/signup",
      },
    ],
  },
  {
    Component: ChatLayout,
    path: "chat",
    children: [
      {
        Component: Chat,
        path: ":userId",
      },
    ],
  },
]);
