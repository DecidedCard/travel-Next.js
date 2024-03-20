"use client";

import { useMemo } from "react";
import { getUrlImage, uploadFile } from "./writeSupaBase/writeSupaBase";

const imageHandler = (quillRef: any, dataPath: any, imgUrl: any) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  input.addEventListener("change", async () => {
    const file = input.files![0];
    const editor = await quillRef.current.getEditor();
    const range = await editor.getSelection();
    try {
      dataPath.current = await uploadFile(file);
      imgUrl.current = getUrlImage(dataPath.current.path);
    } catch (error) {
      console.error(error);
      alert("이미지를 저장하는데 실패했습니다.");
    }
    await editor.insertEmbed(range.index, "image", imgUrl.current.publicUrl);
    await editor.setSelection(range.index + 1);
  });
};

export default imageHandler;
