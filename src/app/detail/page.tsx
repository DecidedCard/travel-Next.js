"use client";

import usePostTestStore from "@/store/postTestStore";
import React from "react";

const Detail = () => {
  const { writePost } = usePostTestStore();
  console.log(writePost);
  return <div>Detail</div>;
};

export default Detail;
