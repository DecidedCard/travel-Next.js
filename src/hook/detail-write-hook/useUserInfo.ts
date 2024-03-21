import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const useUserInfo = () => {
  const userInfo = useRef({ avatar: "", id: "", email: "", nickname: "" });
  const router = useRouter();

  useEffect(() => {
    userInfo.current = JSON.parse(localStorage.getItem("user")!);
    if (!userInfo) {
      alert("로그인 해주시기 바랍니다.");
      router.replace("/login");
    }
  }, [router]);

  return { userInfo };
};

export default useUserInfo;
