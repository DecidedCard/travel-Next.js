"use Client";
import { supabase } from "@/util/supabase";
import { Avatar, Button, CircularProgress, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { PiPencilSimpleLineBold } from "react-icons/pi";
import { TbCameraSearch } from "react-icons/tb";

const Profile = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>("");
  const [isEditingImageUrl, setIsEditingImageUrl] = useState(false);
  const [newNickName, setNewNickName] = useState("");
  const [isEditingNickName, setIsEditingNickName] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);
  const [uploading, setUploading] = useState(false);

  // async function getAllUsersMetadata() {
  //   try {
  //     const { data: allUsersMetadata, error } = await supabase
  //       .from("users")
  //       .select("*");

  //     if (error) {
  //       console.error("Error fetching users metadata:", error.message);
  //       return;
  //     }

  //     if (allUsersMetadata && allUsersMetadata.length > 0) {
  //       console.log("All Users Metadata:");
  //       allUsersMetadata.forEach((userMetadata) => {
  //         console.log("User ID:", userMetadata.id);
  //         console.log("Email:", userMetadata.email);
  //         console.log("Nickname:", userMetadata.nickname);
  //         console.log("avatar:", userMetadata.avatar);
  //         console.log("---------------------------");
  //       });
  //     } else {
  //       console.log("No user metadata found.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching users metadata:", error);
  //   }
  // }
  // getAllUsersMetadata();

  //유저 정보가져오기
  useEffect(() => {
    const Users = localStorage.getItem("user");
    if (Users) {
      setUserInfo(JSON.parse(Users));
    }
  }, []);

  // 저장
  useEffect(() => {
    const downloadImage = async (path: string) => {
      try {
        const { data, error } = await supabase.storage
          .from("userProfile/avatar")
          .download(path);
        if (error) {
          throw error;
        }
        const url = await URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    };
  }, [supabase]);

  // // 이미지 업로드
  // const uploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   try {
  //     setUploading(true);

  //     if (!e.target.files || e.target.files.length === 0) {
  //       throw new Error("업로드할 이미지를 선택하세요");
  //     }

  //     const file = e.target.files[0];
  //     const fileExt = file.name.split(".").pop();
  //     const filePath = `${userInfo.id}/${userInfo.id}.${fileExt}`;

  //     const { error: uploadError } = await supabase.storage
  //       .from("userProfile/avatar")
  //       .upload(filePath, file);

  //     if (uploadError) {
  //       throw uploadError;
  //     }
  //     if (file) {
  //       const imageUrl = await data(file);
  //       if (imageUrl) {
  //         setNewAvatar(imageUrl);
  //         // URL을 로컬 스토리지에 저장합니다.
  //         localStorage.setItem("profilePicUrl", imageUrl);
  //       }
  //     }
  //     setUserInfo(imageUrl);
  //     setUploading(false);
  //   } catch (error) {
  //     alert("Error uploading avatar");
  //   } finally {
  //   }
  // };

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
    if (newNickName !== userInfo.nickname) {
      try {
        const { data, error } = await supabase
          .from("users")
          .update({ nickname: newNickName })
          .eq("id", userInfo.id);
        if (error) {
          throw error;
        }
        setUserInfo((prev: any) => ({
          ...prev,
          nickname: newNickName,
        }));
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

  return (
    <div className="p-4 flex flex-col items-center border-r-4 border-gray-500">
      {userInfo ? (
        <p className="text-xl/6 font-bold mb-10">
          안녕하세요<br></br> {userInfo.nickname} 님 :D
        </p>
      ) : (
        <p className="text-xl/6 font-bold ">안녕하세요 유저님 :D</p>
      )}

      <div>
        {userInfo ? (
          <Avatar
            isBordered
            color="default"
            src={userInfo.avatar}
            alt="유저프로필"
            className="w-20 h-20 rounded-full"
          />
        ) : (
          <CircularProgress label="Loading..." />
        )}

        <input
          type="file"
          id="profileImg"
          style={{ display: "none" }}
          accept="image/jpg,image/png,image/jpeg"
          // onChange={uploadImg}
        />
        {isEditingImageUrl ? (
          <div className="flex flex-wrap gap-4 items-center">
            <Button
              color="danger"
              onClick={() => {
                setUploading(false);
              }}
            >
              취소
            </Button>
            <Button color="primary">완료</Button>
          </div>
        ) : (
          <label htmlFor="profileImg">
            <TbCameraSearch size={25} className="ml-70 cursor-pointer" />
          </label>
        )}
      </div>

      {isEditingNickName ? (
        <div className="flex">
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
        <div className="flex">
          {userInfo ? (
            <p className="font-bold text-lg">{userInfo.nickname} 님</p>
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
      {userInfo ? <p>{userInfo.email}</p> : <p>유저 정보를 찾는중...</p>}
    </div>
  );
};

export default Profile;
