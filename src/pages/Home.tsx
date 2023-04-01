import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const goToLoginClickHandler = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box>홈화면</Box>
      <Button color="inherit" onClick={goToLoginClickHandler}>
        로그인 하러 가기
      </Button>
    </Container>
  );
};
