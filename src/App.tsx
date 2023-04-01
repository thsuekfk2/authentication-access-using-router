import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { router } from "./router";

function App() {
  return (
    <>
      <RecoilRoot>
        <CssBaseline />
        <RouterProvider router={router} />
      </RecoilRoot>
    </>
  );
}

export default App;
