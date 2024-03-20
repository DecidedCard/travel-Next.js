import PostDetail from "@/components/detailComponents/PostDetail";
import React from "react";

const Detail = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <PostDetail id={id} />
    </div>
  );
};

export default Detail;
