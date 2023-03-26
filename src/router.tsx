import { createBrowserRouter } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router/dist/router";
import { Login } from "./pages/Login";
import { Common } from "./pages/Common";
import { AuthLayout } from "./layout/AuthLayout";

interface AdminAccessibleRouterElement extends RouterBase {
  withAuth: true;
  isAdminPage?: boolean;
}
interface RouterBase {
  id: number;
  path: string;
  label: string;
  element: React.ReactNode;
}

interface UserAccessibleRouterElement extends RouterBase {
  withAuth?: boolean;
}

type RouterElement = UserAccessibleRouterElement | AdminAccessibleRouterElement;

const routerData: RouterElement[] = [
  {
    id: 1,
    path: "/",
    element: <Login />,
    label: "로그인",
  },
  {
    id: 2,
    path: "/common",
    element: <Common />,
    label: "공용",
  },
];
export const router: RemixRouter = createBrowserRouter(
  routerData.map((router) => {
    if (router.withAuth) {
      return {
        path: router.path,
        element: <AuthLayout>{router.element}</AuthLayout>,
      };
    } else {
      return {
        path: router.path,
        element: router.element,
      };
    }
  })
);
