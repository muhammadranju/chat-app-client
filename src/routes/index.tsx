import App from "@/App";
import Chat from "@/pages/Chat";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
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
        Component: Login,
        path: "/login",
      },
      {
        index: true,
        Component: Signup,
        path: "/signup",
      },
      {
        Component: Chat,
        path: "chat/:userId",
      },
    ],
  },
]);
