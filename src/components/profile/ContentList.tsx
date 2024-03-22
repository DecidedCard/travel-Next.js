import { Post } from "@/types/writePage";
import { supabase } from "@/util/supabase";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image as NextUiImg,
  User as NextUser,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CommentList from "../detailComponents/CommentList";

const ContentList = () => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  // const [activeTab, setActiveTab] = useState("등록한 게시글");

  const fetchUserPosts = async (): Promise<Post[]> => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      throw new Error("유저 정보를 불러올 수 없습니다");
    }
    const userInfo = JSON.parse(storedUser);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("userId", userInfo.id);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userPosts = await fetchUserPosts();
        setUserPosts(userPosts);
      } catch (error) {
        console.error("사용자 게시물을 불러오는 중 오류 발생:", error);
      }
    };

    fetchPosts();
  }, []);
  const router = useRouter();
  const handleCardClick = (id: any) => router.push(`/detail/${id}`);

  // 탭
  const handleTabChange = () => {};

  return (
    <div className="ml-7">
      <section className="p-4">
        <div className="flex w-full flex-col">
          <Tabs
            aria-label="Options"
            color="primary"
            variant="bordered"
            size="lg"
          >
            <Tab key="내가 등록한 게시글" title="내가 등록한 게시글"></Tab>
            <Tab key="내가 등록한 댓글" title="내가 등록한 댓글"></Tab>
          </Tabs>
        </div>
      </section>

      {userPosts.length === 0 ? (
        <p className="text-center text-gray-500 mt-8 m-[20px]">
          등록된 게시글이 없습니다.
        </p>
      ) : (
        <ul>
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-5">
            {userPosts.map((post) => (
              <Card key={post.id} className="py-4">
                <CardBody className="overflow-visible py-2">
                  <h1 className="text-lg font-bold mb-2">
                    🛫&nbsp;&nbsp;여행 기간
                  </h1>
                  <p className="mb-2 font-semibold text-blue-500">{post.travelDate}</p>
                  <div className="relative">
                    <NextUiImg
                      isZoomed
                      alt="Card background"
                      className="object-cover rounded-xl h-80"
                      src={
                        post.postBasicImage
                          ? post.postBasicImage
                          : "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                      }
                      width={460}
                    />
                    <div className="absolute top-2 left-0 z-10">
                      <CardFooter className="bg-white/80 border-1 overflow-hidden py-1 before:rounded-xl rounded-large shadow-small ml-1">
                        <p className="text-medium font-bold text-blue-600">
                        📍&nbsp;{post.travelPlace}
                        </p>
                      </CardFooter>
                    </div>
                  </div>
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <NextUser
                    name={post.userName}
                    avatarProps={{
                      src: post.userProfile,
                    }}
                  />
                  <h1 className="uppercase font-bold mt-3">{post.title}</h1>
                  <p className="text-default-500 mt-3">{post.content}</p>
                  <Button
                    className="mt-2 ml-auto font-semibold"
                    color="primary"
                    variant="ghost"
                    onClick={() => handleCardClick(post.id)}
                  >
                    자세히 보기
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        </ul>
      )}
      {/* <CommentList /> */}
    </div>
  );
};
export default ContentList;
