import axios from "axios";

type LoginResult = "success" | "fail";

export interface LoginRequest {
  id: string;
  password: string;
}

export const login = async (args: LoginRequest): Promise<LoginResult> => {
  const loginResult = await axios.post(`/login`, {
    body: JSON.stringify(args),
  });

  return loginResult ? "success" : "fail";
};
