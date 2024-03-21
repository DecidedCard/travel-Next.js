import CommunityForm from "@/components/communityComponents/CommunityForm";
import CommunityList from "@/components/communityComponents/CommunityList";
import React from "react";

const Community = () => {
  return (
    <div>
      <h1>Community</h1>
      <div>
        <CommunityForm />
        <CommunityList />
      </div>
    </div>
  );
};

export default Community;
