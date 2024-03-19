import Image from "next/image";
import React, { useState } from "react";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { TbCameraSearch } from "react-icons/tb";
import { Input } from "@nextui-org/react";
import defaultUser from "../../assets/defaultUser.png";
import { supabase } from "@/util/supabase";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isEditingImageUrl, setIsEditingImageUrl] = useState(false);
  const [nickName, setNickName] = useState("");
  const [newNickName, setNewNickName] = useState("");
  const [isEditingNickName, setIsEditingNickName] = useState(false);

  // 프로필
  const imgSelectehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (newFile) {
      setSelectedFile(newFile);
    }
  };

  const imgUploadHandler = async () => {
    if (!selectedFile) return;

    const { data, error } = await supabase.storage
      .from("userProfile")
      .upload(`images/${selectedFile.name}`, selectedFile);

    if (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  // 닉네임
  const nickNameOnClickHandler = () => {
    if (!isEditingNickName) {
      setIsEditingNickName(true);
      return;
    }
    setIsEditingNickName(false);
  };

  const onClickDone = () => {
    if (!newNickName.trim()) {
      alert("변경할 닉네임을 입력하세요");
      return;
    }
    setIsEditingNickName(false);
  };

  return (
    <div className="p-4 flex flex-col items-center border-r-4 border-gray-500">
      <p className="text-xl/6 font-bold ">안녕하세요 여행한탕 님 :D</p>
      <div>
        <Image
          src={defaultUser}
          alt="유저프로필"
          className="w-20 h-20 rounded-full"
        />
        <input
          type="file"
          id="file"
          accept="image/jpg,image/png,image/jpeg"
          onChange={imgSelectehandler}
          style={{ display: "none" }}
        />
        <TbCameraSearch
          size={25}
          className="ml-70 cursor-pointer"
          onClick={imgUploadHandler}
        />
        {/* <label>파일선택</label> */}
      </div>

      {isEditingNickName ? (
        <div className="flex">
          <Input
            variant="bordered"
            type="text"
            value={newNickName}
            autoFocus
            label="닉네임"
            placeholder="변경할 닉네임을 입력해주세요"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewNickName(e.target.value)
            }
          />
          <button onClick={() => setIsEditingNickName(false)}>취소</button>
          <button onClick={onClickDone}>완료</button>
        </div>
      ) : (
        <div className="flex">
          <p>여행한탕</p>
          <PiPencilSimpleLineBold size={25} onClick={nickNameOnClickHandler} />
        </div>
      )}
      <p>asd123@gmail.com</p>
    </div>
  );
};

export default Profile;
