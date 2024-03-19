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

  input.addEventListener("change", async () => {
    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();
    const file = input.files![0];
    try {
      const dataPath = await uploadFile(file);
      const imgUrl = getUrlImage(dataPath!.path);
      editor.insertEmbed(range.index, "image", imgUrl.publicUrl);
      editor.setSelection(range.index + 1);
      if (!postBasicImage) {
        setPostBasicImage(imgUrl.publicUrl);
      }
    } catch (error) {
      console.error(error);
      alert("이미지를 저장하는데 실패했습니다.");
    }
  });
};

export default imageHandler;
