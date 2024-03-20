"use client";

import { useDetailQuery } from "@/hook/useDetailQuery";
import React from "react";

const PostDetail = ({ id }: { id: string }) => {
  const { post, isLoading } = useDetailQuery(id);
  if (isLoading) {
    return <div>로딩중입니다.</div>;
  }
  console.log(post);

  return (
    <main className="border border-solid border-slate-950 max-w-7xl min-w-[800px] min-h-96 mx-auto">
      <section className="flex justify-between items-center m-2 py-4 border-b border-solid border-gray-700">
        <h2 className="text-4xl font-bold">{post!.title}</h2>
        <div>
          <button className="border-r border-solid border-gray-700 w-14">
            수정
          </button>
          <button className="w-14">삭제</button>
        </div>
      </section>
      <section className="flex flex-col gap-5 m-2 pb-1 border-b border-solid border-gray-700">
        <h3 className="text-2xl">여행일정</h3>
        <div className="flex flex-col gap-2">
          <p>
            <label>일정: </label>
            {post?.travelDate}
          </p>
          <p>
            <label>여행지: </label>
            {post?.travelPlace}
          </p>
        </div>
      </section>
      <section className="m-2 border-b border-solid border-gray-700">
        <div dangerouslySetInnerHTML={{ __html: post!.postMainContent }}></div>
      </section>
      <section className="m-2">
        <p>댓글 작성란</p>
      </section>
    </main>
  );
};

export default PostDetail;
