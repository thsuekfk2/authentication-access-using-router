import { createBrowserRouter } from "react-router-dom";
import { Router as RemixRouter } from "@remix-run/router/dist/router";
import { Login } from "./pages/Login";
import { Common } from "./pages/Common";
import { AuthLayout } from "./layout/AuthLayout";
import { Admin } from "./pages/Admin";
import { SidebarElement } from "./types/\bsidebar";
import { Home } from "./pages/Home";

interface AdminAccessibleRouterElement extends RouterBase {
  withAuth: boolean;
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
    id: 0,
    path: "/home",
    element: <Home />,
    label: "홈",
  },
  {
    id: 1,
    path: "/",
    element: <Login />,
    label: "로그인",
    withAuth: false,
  },
  {
    id: 2,
    path: "/common",
    element: <Common />,
    label: "공용",
    withAuth: true,
  },
  {
    id: 3,
    path: "/admin",
    element: <Admin />,
    label: "어드민",
    withAuth: true,
    isAdminPage: true,
  },
];

// 어드민 전용 페이지이거나 auth가 필요한 페이지는 AuthLayout으로 감싸기
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

export const SidebarContent: SidebarElement[] = routerData.reduce(
  (prev, router) => {
    if (!router.withAuth) return prev;
    return [
      ...prev,
      {
        id: router.id,
        path: router.path,
        label: router.label,
        withAuth: router.label,
        isAdminOnly: "isAdminPage" in router && router.isAdminPage,
      },
    ];
  },
  [] as SidebarElement[]
);
