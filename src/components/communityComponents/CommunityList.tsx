"use client";
import React, { useEffect, useState } from "react";
import useCommunityStore, { CommunityContent } from "@/store/communityStore";
import SearchCommunity from "./SearchCommunity";

const CommunityList: React.FC = () => {
  const {
    communityContent: initialCommunityContent,
    fetchCommunity,
    deleteCommunityContent,
    updateCommunityContent,
  } = useCommunityStore();

  useEffect(() => {
    fetchCommunity();
  }, []);

  const [editId, setEditId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [communityContent, setCommunityContent] = useState<CommunityContent[]>(
    initialCommunityContent
  );

  useEffect(() => {
    setCommunityContent(initialCommunityContent);
  }, [initialCommunityContent]);

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    if (searchTerm.trim() === "") {
      setCommunityContent(initialCommunityContent);
    } else {
      const results = initialCommunityContent.filter((post) =>
        post.communityContent.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCommunityContent(results);
    }
  };

  const handleDelete = async (postId: string) => {
    if (window.confirm("정말로 이 게시물을 삭제하시겠습니까?")) {
      await deleteCommunityContent(postId);
      fetchCommunity();
    }
  };

  const handleEdit = (postId: string, content: string) => {
    setEditId(postId);
    setEditedContent(content);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditedContent("");
  };

  const handleSaveEdit = async (postId: string) => {
    if (!editedContent.trim()) {
      alert("내용을 입력해주세요!");
      return;
    }

    if (editId !== null) {
      await updateCommunityContent(editId, editedContent);
      setEditId(null);
      setEditedContent("");
      fetchCommunity();
    }
  };

  return (
    <div>
      <h2>Community List</h2>
      <SearchCommunity onSearch={handleSearch} />
      <ul>
        {communityContent.map((post) => (
          <li key={post.id}>
            {editId === post.id ? (
              <>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(post.id)}>저장</button>
                <button onClick={handleCancelEdit}>취소</button>
              </>
            ) : (
              <>
                <p>{post.communityContent}</p>
                <p>작성자: {post.nickname}</p>
                <p>작성일: {new Date(post.created_at).toLocaleString()}</p>
                <button
                  onClick={() => handleEdit(post.id, post.communityContent)}
                >
                  수정
                </button>
                <button onClick={() => handleDelete(post.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityList;
