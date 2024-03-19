import { create } from "zustand";

import type { PostBasicImageStore } from "@/types/writePage";

const usePostBasicImageStore = create<PostBasicImageStore>()((set) => ({
  postBasicImage: "",
  setPostBasicImage: (arg) => set({ postBasicImage: arg }),
}));

export default usePostBasicImageStore;
