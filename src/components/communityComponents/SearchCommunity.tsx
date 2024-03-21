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
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="커뮤니티 검색"
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchCommunity;
