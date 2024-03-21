// import { create } from "zustand";

// interface User {
//   id: string;
//   nickname: string;
//   email: string;
//   avatar: string;
// }

// interface ProfileState {
//   userInfo: User | null;
//   setUserInfo: (userInfo: User | null) => void;
// }

// const getUserFromStorage = (): User | null => {
//   const userString = localStorage.getItem("user");
//   if (userString) {
//     try {
//       const user: User = JSON.parse(userString);
//       return user;
//     } catch (error) {
//       console.error(
//         "로컬 스토리지에서 사용자 정보를 파싱하는 중 오류가 발생했습니다:",
//         error
//       );
//       return null;
//     }
//   }
//   return null;
// };

// export const useProfileStore = create<ProfileState>((set) => ({
//   userInfo: getUserFromStorage(),
//   setUserInfo: (userInfo) => {
//     set({ userInfo });
//     if (userInfo) {
//       localStorage.setItem("user", JSON.stringify(userInfo));
//     }
//   },
// }));
