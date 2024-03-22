"use client";
import ContentList from "@/components/profile/ContentList";
import Profile from "@/components/profile/Profile";

const userProfile = () => {
  return (
    <div className="flex min-w-full m-5">
      <Profile />
      <ContentList />
    </div>
  );
};

export default userProfile;
