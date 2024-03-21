import CommentInputForm from "@/components/detailComponents/CommentInputForm";
import CommentList from "@/components/detailComponents/CommentList";
import PostDetail from "@/components/detailComponents/PostDetail";
import React from "react";

const Detail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div className="max-w-7xl min-w-[800px] min-h-96 mx-auto">
      <PostDetail id={id} />
      <CommentInputForm id={id} />
      <CommentList id={id} />
    </div>
  );
};

export default Detail;
