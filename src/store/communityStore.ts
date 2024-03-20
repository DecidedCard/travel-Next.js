import { supabase } from "@/util/supabase";
import { create } from "zustand";

interface CommunityContent {
  id: number;
  communityContent: string;
  created_at: Date;
  // user_nickname: string;
}

interface CommunityStore {
  communityContent: CommunityContent[];
  fetchCommunity: () => Promise<void>;
  addCommunityContent: (content: string) => Promise<void>;
}

const useCommunityStore = create<CommunityStore>((set) => ({
  communityContent: [],
  fetchCommunity: async () => {
    const response = await fetchCommunity();
    set({ communityContent: response.data });
  },
  addCommunityContent: async (content) => {
    const response = await supabase.from("community").insert([
      {
        communityContent: content,
        created_at: new Date(),
      },
    ]);
    if (!response.error) {
      await fetchCommunity();
    } else {
      console.error("Error inserting community:", response.error.message);
    }
  },
}));

const fetchCommunity = async () => {
  const { data, error } = await supabase.from("community").select("*");
  if (error) {
    console.error("Error fetching posts:", error.message);
    return { data: [] };
  } else {
    return { data };
  }
};

export default useCommunityStore;
