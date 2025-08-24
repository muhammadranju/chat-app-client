import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./routes/index.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>
  // </StrictMode>
);
