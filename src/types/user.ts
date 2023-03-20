type ROLE_USER = "user";
type ROLE_ADMIN = "admin";

export type UserRole = ROLE_USER | ROLE_ADMIN;

export interface UserInfo {
  username: string;
  userAge: number;
  role: UserRole;
}

export interface User {
  id: string;
  password: string;
  userInfo: UserInfo;
}
