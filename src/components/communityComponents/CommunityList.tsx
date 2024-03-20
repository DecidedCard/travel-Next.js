"use client";
import useCommunityStore from "@/store/communityStore";
import React, { useEffect } from "react";

const CommunityList = () => {
  const { communityContent, fetchCommunity, deleteCommunityContent } =
    useCommunityStore();

  useEffect(() => {
    fetchCommunity();
  }, []);

  const handleDelete = async (postId: string) => {
    if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      await deleteCommunityContent(postId);
      fetchCommunity(); // 게시물 삭제 후 목록 다시 불러오기
    }
  };

  return (
    <div>
      <h2>Community List</h2>
      <ul>
        {communityContent.map((post) => (
          <li key={post.id}>
            <p>{post.communityContent}</p>
            <p>작성자: 임시test123</p>
            <p>작성일: {new Date(post.created_at).toLocaleString()}</p>
            <button onClick={() => handleDelete(post.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityList;
