import { createBrowserRouter } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router/dist/router";
import { Login } from "./pages/Login";

export const router: RemixRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
]);
