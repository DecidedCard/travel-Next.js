import { supabase } from "@/util/supabase";
import { create } from "zustand";

interface CommunityContent {
  id: string;
  communityContent: string;
  created_at: Date;
  // user_nickname: string;
}

interface CommunityStore {
  communityContent: CommunityContent[];
  fetchCommunity: () => Promise<void>;
  addCommunityContent: (content: string) => Promise<void>;
  deleteCommunityContent: (postId: string) => Promise<void>;
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
  deleteCommunityContent: async (postId) => {
    const response = await supabase.from("community").delete().eq("id", postId);
    if (!response.error) {
      console.log("Post deleted successfully:", postId);
    } else {
      console.error("Error deleting post:", response.error.message);
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
