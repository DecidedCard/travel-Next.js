import { useState, useEffect } from "react";

export const useMdeia = () => {
  const [media, setMedia] = useState("pc");
  const getMediaType = (width: number): string => {
    if (width <= 640) {
      return "mobile";
    } else if (width <= 1007) {
      return "tablet";
    } else {
      return "pc";
    }
  };
  useEffect(() => {
    setMedia(getMediaType(window.innerWidth));
  }, []);
  return media;
};
