import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Gallery, UsersPrompts, Prompt } from "./pages";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider";

const router = createBrowserRouter(
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
      path: "/prompt/:id",
      element: <Prompt />,
    },
  ],
  {
    basename: "/imagine",
  }
);

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);
