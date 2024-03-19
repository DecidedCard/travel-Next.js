"use client";
import { supabase } from "@/util/supabase";
import React, { useEffect, useState } from "react";

interface CommunityContent {
  id: number;
  communityContent: string;
  created_at: Date;
}

const CommunityForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [communityContent, setCommunityContent] = useState<CommunityContent[]>(
    []
  );

  useEffect(() => {
    fetchCommunity();
  }, []);

  const fetchCommunity = async () => {
    const { data, error } = await supabase.from("community").select("*");
    if (error) {
      console.error("Error fetching posts:", error.message);
    } else {
      setCommunityContent(data);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const { data, error } = await supabase
      .from("community")
      .insert([{ communityContent: inputValue, created_at: new Date() }]);
    if (error) {
      console.error("Error inserting community:", error.message);
    } else {
      console.log("Post inserted successfully:", data);
      setInputValue("");
      fetchCommunity();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg">
        <input
          className="w-full border-2 border-blue-500 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="입력하세요..."
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          등록
        </button>
      </div>
    </form>
  );
};

export default CommunityForm;
