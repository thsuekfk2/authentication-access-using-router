import { UserInfo } from "./../types/user";
import { saveAccessTokenToLocalStorage } from "./../utils/accessToken";
import axios from "axios";

type LoginResult =
  | {
      status: string;
      accessToken: string;
    }
  | "fail";

export interface LoginRequest {
  id: string;
  password: string;
}

export const login = async (args: LoginRequest): Promise<LoginResult> => {
  const loginResult = await axios.post(`/login`, {
    id: args.id,
    password: args.password,
  });
  saveAccessTokenToLocalStorage(loginResult.data.accessToken);
  return loginResult ? loginResult.data : "fail";
};

export const getUserInfo = async (accessToken: string): Promise<UserInfo> => {
  const userInfoResult = await axios
    .get(`/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .catch(() => {
      return null;
    });

  return userInfoResult ? userInfoResult.data : null;
};
