import React from "react";

const Detail = ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  return <div>Detail</div>;
};

export default Detail;
