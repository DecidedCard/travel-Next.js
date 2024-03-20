"use client";

import usePostBasicImageStore from "@/store/postBasicImageStore";
import useWriteInputForm from "../../hook/detail-write-hook/useWriteInputForm";
import { Button, Input, Textarea } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { Post } from "@/types/writePage";
const QuillEditor = dynamic(() => import("./QuillEditor"), {
  loading: () => <p>로딩중입니다.</p>,
  ssr: false,
});

const InputForm = ({
  post,
  onClickCancelHandler,
}: {
  post: Post;
  onClickCancelHandler: () => void;
}) => {
  const { inputValue, inputOnChange, onSubmit } = useWriteInputForm(post);
  const { postBasicImage, setPostBasicImage } = usePostBasicImageStore();

  return (
    <form className="w-5/6 mx-auto" onSubmit={onSubmit}>
      <Input
        type="text"
        label="제목을 입력해주세요"
        className="border-b-2 border-solid border-gray-500"
        value={inputValue.title}
        onChange={inputOnChange.onChangeTitle}
      />
      <div className="flex justify-evenly border-b-2 border-solid border-gray-500">
        <div>
          <div className="flex items-center">
            <Input
              type="date"
              className="w-36"
              value={inputValue.startDate}
              onChange={inputOnChange.onChangeStartDate}
            />
            <p>~</p>
            <Input
              type="date"
              className="w-36"
              value={inputValue.endDate}
              onChange={inputOnChange.onChangeEndDate}
            />
          </div>
          <Input
            type="text"
            label="여행지를 적어주세요~"
            value={inputValue.travelPlace}
            onChange={inputOnChange.onChangeTravelPlace}
          />
        </div>
        <Textarea
          type="text"
          label="설명을 입력해주세요."
          className="w-96"
          value={inputValue.content}
          onChange={inputOnChange.onChangeContent}
        />
      </div>
      <QuillEditor
        postMainContent={inputValue.postMainContent}
        onChangePostMainContent={inputOnChange.onChangePostMainContent}
        postBasicImage={postBasicImage}
        setPostBasicImage={setPostBasicImage}
      />
      <div className="flex justify-center">
        {post ? (
          <div>
            <Button type="button" onClick={onClickCancelHandler}>
              취소
            </Button>
            <Button type="button">수정하기</Button>
          </div>
        ) : (
          <Button type="submit">등록하기</Button>
        )}
      </div>
    </form>
  );
};

export default InputForm;
