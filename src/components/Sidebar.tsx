import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserAtom } from "../atoms/user";
import { SidebarElement } from "../types/\bsidebar";
import { logout } from "../api/login";

interface SidebarProps {
  sidebarContent: SidebarElement[];
}

export const Sidebar = ({ sidebarContent }: SidebarProps) => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useRecoilState(UserAtom);

  const sidebarHomeClickHandler = () => {
    navigate("/home");
  };

  const sidebarMenuClickHandler = (path: string) => {
    navigate(path);
  };

  const logoutHandler = async () => {
    await logout();
    setUserProfile(null);
    navigate("/");
  };

  return (
    <Box>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={sidebarHomeClickHandler}
          >
            고얌미
          </Typography>
          {sidebarContent
            .filter((element) => {
              return element.isAdminOnly
                ? userProfile?.role.includes("admin")
                : !!userProfile;
            })
            .map((element) => {
              return (
                <Button
                  color="inherit"
                  key={element.path}
                  onClick={() => sidebarMenuClickHandler(element.path)}
                >
                  {element.label}
                </Button>
              );
            })}
          {userProfile ? (
            <div className="sidebar-footer">
              {userProfile?.username}
              {userProfile?.role.includes("admin") && "(어드민)"}님 환영합니다.
              <Button onClick={logoutHandler}>로그아웃</Button>
            </div>
          ) : (
            <div onClick={sidebarHomeClickHandler}>로그인이 필요합니다.</div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
