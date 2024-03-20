"use client";

import { Post } from "@/types/writePage";
import useInput from "../useInput";
import { useRouter } from "next/navigation";
import { useState } from "react";
import usePostBasicImageStore from "@/store/postBasicImageStore";
import { insertWriting } from "@/util/writeSupaBase/writeSupaBase";

const useWriteInputForm = () => {
  const { postBasicImage } = usePostBasicImageStore();
  const [title, onChangeTitle, setTitle] = useInput();
  const [startDate, onChangeStartDate, setStartDate] = useInput();
  const [endDate, onChangeEndDate, setEndDate] = useInput();
  const [travelPlace, onChangeTravelPlace, setTravelPlace] = useInput();
  const [content, onChangeContent, setContent] = useInput();
  const [postMainContent, setPostMainContent] = useState("");

  const onChangePostMainContent = (arg: string) => {
    setPostMainContent(arg);
  };

  const router = useRouter();

  const inputValue = {
    title,
    startDate,
    endDate,
    travelPlace,
    content,
    postMainContent,
  };
  const inputOnChange = {
    onChangeTitle,
    onChangeStartDate,
    onChangeEndDate,
    onChangeTravelPlace,
    onChangeContent,
    onChangePostMainContent,
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !title ||
      !content ||
      !startDate ||
      !endDate ||
      !travelPlace ||
      !postMainContent
    ) {
      alert("내용을 입력해주세요");
      return;
    }
    const newPost: Post = {
      title,
      content,
      travelDate: `${startDate} ~ ${endDate}`,
      travelPlace,
      userId: crypto.randomUUID(),
      userName: crypto.randomUUID(),
      userProfile: crypto.randomUUID(),
      postMainContent,
      postBasicImage,
    };
    const addWrite: any = await insertWriting(newPost);
    setTitle("");
    setStartDate("");
    setEndDate("");
    setTravelPlace("");
    setContent("");
    setPostMainContent("");
    router.push(`/detail/${addWrite[0].id}`);
  };

  return { inputValue, inputOnChange, onSubmit };
};

export default useWriteInputForm;
