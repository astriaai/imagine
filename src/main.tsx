import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Gallery, UsersPrompts, Prompt } from "./pages";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";

const router = createHashRouter(
  [
    {
      path: "/",
      element: <UsersPrompts />,
    },
    {
      path: "/gallery",
      element: <Gallery />,
    },
    {
      path: "/prompt/:id/:index",
      element: <Prompt />,
    },
  ]
);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
