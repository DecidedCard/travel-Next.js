"use client";

import { getUrlImage, uploadFile } from "./writeSupaBase/writeSupaBase";

const imageHandler = (
  quillRef: any,
  postBasicImage: string,
  setPostBasicImage: (arg: string) => void
) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();
  let dataPath;
  let imgUrl = { publicUrl: "" };
  input.addEventListener("change", async () => {
    const file = input.files![0];
    const editor = await quillRef.current.getEditor();
    const range = await editor.getSelection();

    try {
      dataPath = await uploadFile(file);
      imgUrl = getUrlImage(dataPath!.path);
    } catch (error) {
      console.error(error);
      alert("이미지를 저장하는데 실패했습니다.");
    }
    await editor.insertEmbed(range.index, "image", imgUrl!.publicUrl);
    await editor.setSelection(range.index + 1);
  });

  if (!postBasicImage && imgUrl) {
    setPostBasicImage(imgUrl.publicUrl);
  }
};

export default imageHandler;
