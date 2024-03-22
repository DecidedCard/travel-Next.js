import { CommentListProps, PostComment } from "@/types/writePage";
import { supabase } from "@/util/supabase";
import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";

const CommentList = ({ commentsData }: CommentListProps) => {
  const [userComments, setUserComments] = useState<PostComment[]>([]);

  const fetchUserComments = async (): Promise<PostComment[]> => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      throw new Error("유저 정보를 불러올 수 없습니다");
    }
    const userInfo = JSON.parse(storedUser);
    const { data, error } = await supabase
      .from("postComment")
      .select("*")
      .eq("userId", userInfo.id);
    console.log(userInfo);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const userComment = await fetchUserComments();
        setUserComments(userComment);
        // console.log(userComment);
      } catch (error) {
        console.error("등록한 댓글 불러오는 중 오류 발생:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div>
      {userComments.map((item) => (
        <Card className="m-4" key={item.id}>
          <CardHeader className="justify-between">
            <div className="flex gap-5">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={item.userProfile}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {item.userName}
                </h4>
              </div>
            </div>
          </CardHeader>
          <CardBody className="p-5 text-small text-default-400">
            <p>{item.comment}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default CommentList;
