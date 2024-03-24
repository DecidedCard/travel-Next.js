"use client";
import React, { useEffect, useState } from "react";
import useCommunityStore, { CommunityContent } from "@/store/communityStore";
import SearchCommunity from "./SearchCommunity";
import useUserInfo from "@/hook/detail-write-hook/useUserInfo";

const CommunityList: React.FC = () => {
  const {
    communityContent: initialCommunityContent,
    fetchCommunity,
    deleteCommunityContent,
    updateCommunityContent,
  } = useCommunityStore();
  const { userInfo } = useUserInfo();

  useEffect(() => {
    fetchCommunity();
    console.log(userInfo);
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
      <SearchCommunity onSearch={handleSearch} />
      <ul className="max-w-screen-lg mx-auto px-10 mb-5">
        {communityContent.map((post) => (
          <li
            className="py-2 my-1 leading-7"
            style={{ borderBottom: "1px solid black" }}
            key={post.id}
          >
            {userInfo!.nickname === post.nickname ? (
              editId === post.id ? (
                <>
                  <textarea
                    className="h-20 w-[400px] p-2 border-3 border-blue-500 rounded-xl focus:outline-none resize-none"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <br></br>
                  <button
                    onClick={() => handleSaveEdit(post.id)}
                    className=" bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded w-10 text-xs mr-2"
                  >
                    저장
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className=" bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded w-10 text-xs mr-2"
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <p className="font-semibold">{post.communityContent}</p>
                  <p className="text-slate-400 mb-2">
                    {post.nickname} |{" "}
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleEdit(post.id, post.communityContent)}
                    className=" bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded w-10 text-xs mr-2"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className=" bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded w-10 text-xs mr-2"
                  >
                    삭제
                  </button>
                </>
              )
            ) : (
              <>
                <p className="font-semibold">{post.communityContent}</p>
                <p className="text-slate-400 mb-2">
                  {post.nickname} | {new Date(post.created_at).toLocaleString()}
                </p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityList;
