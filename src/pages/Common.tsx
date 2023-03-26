import { Box, Container } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { getCatData } from "../api/cat";
import { CAT_BASE_URL } from "../api/const";

export const Common = () => {
  const [catUrl, setCatUrl] = useState<String | null>(null);
  const isCatImageFetched = useRef(false);

  const getCatImage = useCallback(async () => {
    const catData = await getCatData();
    if (catData.url) setCatUrl(catData.url);

    isCatImageFetched.current = true;
  }, []);

  useEffect(() => {
    if (!isCatImageFetched.current) getCatImage();
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={CAT_BASE_URL + catUrl}
        style={{
          maxHeight: "500px",
          maxWidth: "70vw",
        }}
      />
    </Container>
  );
};
