import { create } from "zustand";

import type { writePostStore } from "@/types/writePage";

const usePostTestStore = create<writePostStore>()((set) => ({
  writePost: null,
  setWritePost: (state) => set({ writePost: state }),
}));

export default usePostTestStore;

// 위의 방식처럼 타입을 선언 한 뒤에 사용해 주셔야 합니다.
