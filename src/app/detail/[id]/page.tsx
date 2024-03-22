import Comments from "@/components/detailComponents/Comments";
import PostDetail from "@/components/detailComponents/PostDetail";
import React from "react";

const Detail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div className="flex flex-col md: max-w-7xl min-w-[600px] min-h-96 mx-auto">
      <PostDetail id={id} />
      <Comments id={id} />
    </div>
  );
};

export default Detail;
