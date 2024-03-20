"use client";
import useCommunityStore from "@/store/communityStore";
import React, { useEffect } from "react";

const CommunityList = () => {
  const { communityContent, fetchCommunity } = useCommunityStore();

  useEffect(() => {
    fetchCommunity();
  }, []);

  return (
    <div>
      <h2>Community List</h2>
      <ul>
        {communityContent.map((post) => (
          <li key={post.id}>
            <p>{post.communityContent}</p>
            <p>작성자: 임시test123</p>
            <p>작성일: {new Date(post.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityList;
