"use client";
import React, { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import useCommunityStore from "@/store/communityStore";

interface CommunityContent {
  id: number;
  communityContent: string;
  created_at: string;
}

const CommunityForm = () => {
  const [inputValue, setInputValue] = useState("");
  const { user, isLoggedIn } = useAuthStore();
  const { communityContent, fetchCommunity, addCommunityContent } =
    useCommunityStore();

  useEffect(() => {
    fetchCommunity();
  }, [fetchCommunity]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      alert("내용을 입력해주세요!");
      return;
    }

    if (!isLoggedIn) {
      alert("로그인 후 이용해주시기 바랍니다.");
      return;
    }
    await addCommunityContent(inputValue, user!);
    setInputValue("");
    fetchCommunity();
  };

  return (
    <div className="max-w-screen-lg mx-auto p-10 rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="  flex flex-col relative">
          <textarea
            className="h-52 border-3 border-blue-500 rounded-xl p-5 mb-4 focus:outline-none resize-none"
            maxLength={200}
            value={inputValue}
            onChange={handleInputChange}
            placeholder="내용을 입력하세요..."
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold 
            py-2 px-4 rounded focus:outline-none focus:shadow-outline 
            absolute bottom-2 right-0 mr-4 mb-4 w-20"
            type="submit"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};
export default CommunityForm;
