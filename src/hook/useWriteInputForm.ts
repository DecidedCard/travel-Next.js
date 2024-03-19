"use client";

import { post } from "@/types/writePage";
import useInput from "./useInput";
import usePostTestStore from "@/store/postTestStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useWriteInputForm = () => {
  const { setWritePost } = usePostTestStore();
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost: post = {
      id: crypto.randomUUID(),
      content,
      postDate: new Date(),
      travelDate: `${startDate} ~ ${endDate}`,
      userId: crypto.randomUUID(),
      userName: crypto.randomUUID(),
      userProfile: crypto.randomUUID(),
      postMainContent,
    };
    setWritePost(newPost);
    setTitle("");
    setStartDate("");
    setEndDate("");
    setTravelPlace("");
    setContent("");
    setPostMainContent("");
    router.push("/detail");
  };

  return { inputValue, inputOnChange, onSubmit };
};

export default useWriteInputForm;
