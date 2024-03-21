"use client";
import useCommunityStore from "@/store/communityStore";
import { supabase } from "@/util/supabase";
import React, { useEffect, useState } from "react";

interface CommunityContent {
  id: number;
  communityContent: string;
  created_at: string;
}

const CommunityForm = () => {
  const [inputValue, setInputValue] = useState("");
  const { communityContent, fetchCommunity, addCommunityContent } =
    useCommunityStore();

  useEffect(() => {
    fetchCommunity();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      alert("내용을 입력해주세요!");
      return;
    }

    await addCommunityContent(inputValue);
    setInputValue("");
    fetchCommunity();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center h-screen"
    >
      <div className="max-w-screen-lg mx-auto mt-10 p-4 border rounded-lg flex flex-col items-center">
        <textarea
          className="w-[800px] h-52 border-2 border-blue-500 rounded-xl px-3 py-3 mb-4 focus:outline-none focus:border-blue-500 resize-none"
          maxLength={200}
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-auto"
          type="submit"
        >
          등록
        </button>
      </div>
    </form>
  );
};

export default CommunityForm;
