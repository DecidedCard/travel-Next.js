import { create } from "zustand";

import type { Store } from "@/types";

const useStore = create<Store>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

export default useStore;

// 위의 방식처럼 타입을 선언 한 뒤에 사용해 주셔야 합니다.
