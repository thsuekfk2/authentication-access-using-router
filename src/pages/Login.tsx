import { Box, TextField, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { login } from "../api/login";

export const Login = () => {
  const navigate = useNavigate();

  const loginSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const loginResult = await login({
      id: formData.get("id") as string,
      password: formData.get("password") as string,
    });

    if (loginResult === "fail") {
      navigate("/");
      return;
    }
    navigate("/common");
  };

  return (
    <Container maxWidth={"sm"}>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box component="form" onSubmit={loginSubmitHandler} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            name="id"
            id="id"
            label="id"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            LOGIN
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
