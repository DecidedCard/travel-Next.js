import { supabase } from "@/util/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useProfileImage = (userId: string) => {
  return useQuery(["profileImage", userId], async () => {
    const { data, error } = await supabase.storage
      .from("userProfile")
      .download(`user_${userId}/profile_image`);

    if (error) {
      throw new Error("Error fetching profile image");
    }

    return data;
  });
};

export const useUploadProfileImage = () => {
  return useMutation(
    async ({ file, userId }: { file: File; userId: string }) => {
      const { data, error } = await supabase.storage
        .from("profile_images")
        .upload(`user_${userId}/profile_image`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw new Error("Error uploading profile image");
      }

      return data;
    }
  );
};
