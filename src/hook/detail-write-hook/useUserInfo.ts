import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const useUserInfo = () => {
  const userInfo = useRef({ avatar: "", id: "", email: "", nickname: "" });

  useEffect(() => {
    userInfo.current = JSON.parse(localStorage.getItem("user")!);
  }, []);

  return { userInfo };
};

export default useUserInfo;
