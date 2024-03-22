"use client";

import { useEffect, useMemo, useRef } from "react";
import imageHandler from "@/util/quillImageHandler";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "background",
  "color",
  "link",
  "image",
  "float",
  "width",
  "height",
];

const toolbarOptions = [
  [{ header: "1" }, { header: "2" }],
  [{ size: [] }],
  ["bold", "italic", "underline", "strike"],
  ["blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ["link", "image", "video"],
];

const QuillEditor = ({
  postMainContent,
  onChangePostMainContent,
  postBasicImage,
  setPostBasicImage,
}: {
  postMainContent: string;
  onChangePostMainContent: (arg: string) => void;
  postBasicImage: string;
  setPostBasicImage: (arg: string) => void;
}) => {
  let dataPath: any = useRef();
  let imgUrl = useRef({ publicUrl: "" });
  const quillRef = useRef(null);
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: () => imageHandler(quillRef, dataPath, imgUrl),
        },
      },
      // imageActions: {},
      imageFormats: {},
    };
  }, []);

  useEffect(() => {
    if (!postBasicImage && imgUrl.current.publicUrl) {
      setPostBasicImage(imgUrl.current.publicUrl);
    }
  }, [postBasicImage, setPostBasicImage, imgUrl.current.publicUrl]);

  return (
    <ReactQuill
      className="h-[550px] w-[900px] mx-auto"
      modules={modules}
      formats={formats}
      value={postMainContent}
      onChange={onChangePostMainContent}
      ref={quillRef}
    />
  );
};

export default QuillEditor;
