"use client";

import imageHandler from "@/util/quillImageHandler";
import { useMemo, useRef } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

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
  "video",
  "width",
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
}: {
  postMainContent: string;
  onChangePostMainContent: (arg: string) => void;
}) => {
  const quillRef = useRef(null);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: () => imageHandler(quillRef),
        },
      },
    }),
    []
  );
  console.log(postMainContent);

  return (
    <ReactQuill
      className="h-96"
      modules={modules}
      formats={formats}
      value={postMainContent}
      onChange={onChangePostMainContent}
      ref={quillRef}
    />
  );
};

export default QuillEditor;
