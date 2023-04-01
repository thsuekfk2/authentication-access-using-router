import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../atoms/user";
import { SidebarElement } from "../types/\bsidebar";

interface SidebarProps {
  sidebarContent: SidebarElement[];
}

export const Sidebar = ({ sidebarContent }: SidebarProps) => {
  const navigate = useNavigate();

  const userProfile = useRecoilValue(UserAtom);

  const sidebarHomeClickHandler = () => {
    navigate("/home");
  };

  const sidebarMenuClickHandler = (path: string) => {
    navigate(path);
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
        </Toolbar>
      </AppBar>
    </Box>
  );
};
