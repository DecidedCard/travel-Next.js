"use client";
import MyContentList from "@/components/profile/MyContentList";
import Profile from "@/components/profile/Profile";

const userProfile = () => {
  return (
    <div className="flex min-w-full m-5">
      <Profile />
      <MyContentList />
    </div>
  );
};

export default userProfile;
