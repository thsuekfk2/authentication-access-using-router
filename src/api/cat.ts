import { CAT_BASE_URL } from "./const";
import axios from "axios";

export const getCatData = async () => {
  const catData = await axios.get(CAT_BASE_URL + `/cat?type=cute&json=true`);
  console.log("catData", catData.data);
  return catData ? catData.data : null;
};
