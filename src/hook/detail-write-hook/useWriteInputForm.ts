"use client";

import { Post } from "@/types/writePage";
import useInput from "../useInput";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import usePostBasicImageStore from "@/store/postBasicImageStore";
import { insertWriting, updateWrite } from "@/util/writeSupaBase/writeSupaBase";
import useSetMutation from "../useSetMutation";
import { postQueryKey } from "./useDetailQuery";

const useWriteInputForm = (post?: Post | null) => {
  const { postBasicImage, setPostBasicImage } = usePostBasicImageStore();
  const [title, onChangeTitle, setTitle] = useInput();
  const [startDate, onChangeStartDate, setStartDate] = useInput();
  const [endDate, onChangeEndDate, setEndDate] = useInput();
  const [travelPlace, onChangeTravelPlace, setTravelPlace] = useInput();
  const [content, onChangeContent, setContent] = useInput();
  const [postMainContent, setPostMainContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setStartDate(post.travelDate.slice(0, 10));
      setEndDate(post.travelDate.slice(13));
      setContent(post.content);
      setPostMainContent(post.postMainContent);
      setTravelPlace(post.travelPlace);
      setPostBasicImage(post.postBasicImage);
    }
  }, [
    post,
    setTitle,
    setStartDate,
    setEndDate,
    setContent,
    setPostMainContent,
    setTravelPlace,
    setPostBasicImage,
  ]);

  const onChangePostMainContent = (arg: string) => {
    setPostMainContent(arg);
  };

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

  const { mutate: updateMutate } = useSetMutation(updateWrite, postQueryKey);

  const onClickUpdateHandler = (id: string) => {
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
    const result = window.confirm("수정하시겠습니까?");
    if (result) {
      const post: Post = {
        title,
        content,
        travelDate: `${startDate} ~ ${endDate}`,
        travelPlace,
        postMainContent,
        postBasicImage,
      };
      updateMutate({ id, post });
    }
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

  return { inputValue, inputOnChange, onSubmit, onClickUpdateHandler };
};

export default useWriteInputForm;
