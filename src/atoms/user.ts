import { UserInfo } from "./../types/user";
import { atom } from "recoil";

export const UserAtom = atom<UserInfo | null>({
  key: "user-atom",
  default: null,
});
