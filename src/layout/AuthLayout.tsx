import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getUserInfo } from "../api/login";
import { UserAtom } from "../atoms/user";
import { Sidebar } from "../components/Sidebar";
import { SidebarContent } from "../router";
import { getAccessTokenFromLocalStorage } from "../utils/accessToken";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  const navigate = useNavigate();
  const [_, setUserProfile] = useRecoilState(UserAtom);

  const fetchUserProfile = async (accessToken: string) => {
    const userInfoResult = await getUserInfo(accessToken);
    setUserProfile(userInfoResult);

    if (userInfoResult == null) {
      navigate("/");
      return;
    }

    return userInfoResult ? true : false;
  };

  useEffect(() => {
    fetchUserProfile(getAccessTokenFromLocalStorage());
  }, [children]);

  return (
    <div className="auth-layout">
      <Sidebar sidebarContent={SidebarContent} />
      <div className="auth-layout-body">{children}</div>
    </div>
  );
};
