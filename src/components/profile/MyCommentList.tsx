import { getAllPosts } from "@/hook/usePostData";
import useAuthStore from "@/store/authStore";
import { Post, PostComment } from "@/types/writePage";
import { supabase } from "@/util/supabase";
import { Avatar, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyCommentList = () => {
  const [userComments, setUserComments] = useState<PostComment[]>([]);
  const [postsTitle, setPostsTitle] = useState<Post[]>([]);
  const { user } = useAuthStore();

  // 댓글, post 데이터 가져오기
  useEffect(() => {
    const fetchUserComments = async (): Promise<PostComment[]> => {
      const { data, error } = await supabase
        .from("postComment")
        .select("*")
        .eq("userId", user!.id);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    };

    const fetchData = async () => {
      try {
        const [userPosts, userComments] = await Promise.all([
          getAllPosts(),
          fetchUserComments(),
        ]);
        setPostsTitle(userPosts);
        setUserComments(userComments);
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const router = useRouter();
  const handleCardClick = (id: any) => router.push(`/detail/${id}`);

  return (
    <div className="w-full lg:w-[700px]">
      {userComments.length === 0 ? (
        <div>
          <p>남긴 댓글이 존재하지 않습니다</p>
        </div>
      ) : (
        userComments.map((item) => (
          <Card
            className="m-4 pointer-events-auto"
            key={item.id}
            onClick={() => handleCardClick(item.postId)}
          >
            <CardHeader className="justify-between">
              {postsTitle.map((post) =>
                post.id === item.postId ? (
                  <div key={post.id}>
                    <h2 className="text-large font-bold">{post.title}</h2>
                    <p>{post.content}</p>
                  </div>
                ) : null
              )}
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
              <p>
                {item.created_at
                  ? new Date(item.created_at).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })
                  : null}
              </p>
              <Button
                className="mt-2 ml-auto font-semibold"
                color="primary"
                variant="ghost"
                onClick={() => handleCardClick(item.postId)}
              >
                게시글 보러가기
              </Button>
            </CardBody>
          </Card>
        ))
      )}
    </div>
  );
};

export default MyCommentList;
