"use Client";
import { UserInfo } from "@/types/writePage";
import { supabase } from "@/util/supabase";
import { Avatar, Button, CircularProgress, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { TbCameraSearch } from "react-icons/tb";

const Profile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [newNickName, setNewNickName] = useState("");
  const [isEditingNickName, setIsEditingNickName] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isEditingImageUrl, setIsEditingImageUrl] = useState(false);

  //유저 정보가져오기
  useEffect(() => {
    const User = localStorage.getItem("user");
    if (User) {
      setUserInfo(JSON.parse(User));
    }
  }, []);
  const path = crypto.randomUUID();
  // 이미지파일 spabase에업로드
  const uploadFile = async (file: File): Promise<any> => {
    try {
      const { data } = await supabase.storage
        .from("userProfile")
        .upload(`avatar/${userInfo?.id}/${path}.jpg`, file, {
          upsert: true,
        });
      return data;
    } catch (error) {
      console.error("Error 이미지 업로드 실패:", error);
      alert("Error 이미지 업로드 실패");
      return null;
    }
  };

  // 이미지 url 여기서부터 고치기 getPublicUrl < url을 만들어주는메서드임
  const getUrlImage = () => {
    const { data } = supabase.storage
      .from("userProfile")
      .getPublicUrl(`avatar/${userInfo?.id}/${path}.jpg`);
    return data?.publicUrl;
  };

  // 이미지 선택이벤트
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      setFile(file);
      setIsEditingImageUrl(true);

      // 이미지 파일을 읽어서 미리 보기
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 취소버튼
  const handleCancel = () => {
    setIsEditingImageUrl(false);
    setFile(null);
    setImageUrl("");
  };

  // 이미지 변경완료버튼
  const handleUploadDone = async () => {
    if (file) {
      try {
        const uploadFiles = await uploadFile(file);
        if (uploadFiles) {
          const newImageUrl = getUrlImage();
          // 여기에 문제가있는거같은데 방법을모르겠다...
          if (newImageUrl) {
            // localStorage.removeItem("avatar");
            localStorage.setItem("avatar", JSON.stringify(newImageUrl));
            console.log(newImageUrl);

            // Supabase 데이터베이스 업데이트
            const { data, error } = await supabase
              .from("users")
              .update({ avatar: newImageUrl })
              .eq("id", userInfo?.id);

            if (error) {
              console.error("Supabase에서 avatar 업데이트중 에러:", error);
              alert("이미지 파일 등록 실패");
              return;
            }
          }
        }
      } catch (error) {
        console.error("이미지 파일 등록 실패:", error);
        alert("이미지 파일 등록 실패");
        return;
      }
    }

    setIsEditingImageUrl(false);
  };

  // 닉네임
  const nickNameOnClickHandler = () => {
    if (!isEditingNickName) {
      setIsEditingNickName(true);
      return;
    }
    setIsEditingNickName(false);
  };

  // 닉네임 수정
  const onClickDone = async () => {
    if (!newNickName.trim()) {
      alert("변경할 닉네임을 입력하세요");
      return;
    }
    if (newNickName !== userInfo?.nickname) {
      try {
        const { data, error } = await supabase
          .from("users")
          .update({ nickname: newNickName })
          .eq("id", userInfo?.id);
        if (error) {
          throw error;
        }
        setUserInfo((prev: any) => ({
          ...prev,
          nickname: newNickName,
        }));
        localStorage.setItem("nickname", newNickName);
        setIsEditingNickName(false);
        alert("닉네임이 변경되었습니다.");
      } catch (error) {
        console.error("닉네임 업데이트 오류:", error);
        alert("닉네임 변경 중 오류가 발생했습니다.");
      }
    } else {
      alert("변경된 내용이 없습니다");
    }
  };

  useEffect(() => {
    const storedNickName = localStorage.getItem("nickname");
    if (storedNickName) {
      setUserInfo((prev: any) => ({
        ...prev,
        nickname: storedNickName,
      }));
    }
  }, []);

  return (
    <div className="w-[500px] p-6 flex flex-col items-center border-r border-solid border-gray-300">
      {userInfo ? (
        <p className="font-bold mb-20 text-[25px] leading-normal">
          안녕하세요<br></br> {userInfo.nickname} 님 :D
        </p>
      ) : (
        <p className="font-bold mb-20 text-[25px] leading-normal ">
          안녕하세요 유저님 :D
        </p>
      )}

      {userInfo ? (
        <Avatar
          isBordered
          color="default"
          src={userInfo.avatar}
          alt="유저프로필"
          id="profileImage"
          className="w-[200px] h-[200px] rounded-full "
        />
      ) : (
        <CircularProgress label="Loading..." />
      )}

      <input
        type="file"
        id="profileImg"
        style={{ display: "none" }}
        accept="image/jpg,image/png,image/jpeg"
        onChange={handleFileChange}
      />

      {isEditingImageUrl ? (
        <div className="flex flex-wrap gap-4 items-center mt-5">
          <Button color="danger" onClick={handleCancel}>
            취소
          </Button>
          <Button color="primary" onClick={handleUploadDone}>
            완료
          </Button>
        </div>
      ) : (
        <label htmlFor="profileImg">
          <TbCameraSearch
            size={25}
            className="cursor-pointer mt-[-10px] ml-[100px] order-1"
          />
        </label>
      )}

      {isEditingNickName ? (
        <div className="flex mt-[30px]">
          <Input
            size="sm"
            color="primary"
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
          <div className="flex gap-2 items-center">
            <Button
              size="sm"
              color="danger"
              onClick={() => setIsEditingNickName(false)}
            >
              취소
            </Button>
            <Button size="sm" color="primary" onClick={onClickDone}>
              완료
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex mt-[30px]">
          {userInfo ? (
            <p className="font-bold text-xl">{userInfo.nickname} 님</p>
          ) : (
            <p>유저 정보를 찾는중...</p>
          )}

          <PiPencilSimpleLineBold
            className="cursor-pointer"
            size={25}
            onClick={nickNameOnClickHandler}
          />
        </div>
      )}
      {userInfo ? (
        <p className="mt-[10px] text-gray-500">{userInfo.email}</p>
      ) : (
        <p>유저 정보를 찾는중...</p>
      )}
    </div>
  );
};

export default Profile;
