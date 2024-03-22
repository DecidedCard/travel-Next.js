"use client";
import React, { useState } from "react";
interface Props {
  onSearch: (searchTerm: string) => void;
}

const SearchCommunity: React.FC<Props> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex flex-row justify-between max-w-screen-lg mx-auto px-10">
      <div className="basis-1/4 text-xl font-bold">게시글</div>
      <div className="basis-3/4 flex items-center justify-end">
        <input
          className=" border p-1 rounded mr-4"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="커뮤니티 검색"
        />
        <button
          onClick={handleSearch}
          className=" bg-blue-500 hover:bg-blue-600 text-white font-bold 
            py-2 px-4 rounded
          w-16"
        >
          검색
        </button>
      </div>
    </div>
  );
};

export default SearchCommunity;
