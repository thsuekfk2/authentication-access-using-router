import { Container } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import { getCatData } from "../api/cat";
import { CAT_BASE_URL } from "../api/const";

export const Common = () => {
  const [catUrl, setCatUrl] = useState("");
  const isCatImageFetched = useRef(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const getCatImage = useCallback(async () => {
    const catData = await getCatData();
    if (catData.url) setCatUrl(CAT_BASE_URL + catData.url);

    isCatImageFetched.current = true;
    setImageLoading(false);
  }, []);

  useEffect(() => {
    if (!isCatImageFetched.current) getCatImage();
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        height: "90vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {imageLoading && <div>로딩중</div>}
      <img
        src={catUrl}
        style={{
          maxHeight: "500px",
          maxWidth: "70vw",
          visibility: imageLoading ? "hidden" : "visible",
        }}
        onLoad={handleImageLoad}
      />
    </Container>
  );
};
