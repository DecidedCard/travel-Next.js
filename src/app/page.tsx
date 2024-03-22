"use client";

import mainImage from "../assets/mainimage.jpg";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Image as NextUiImg,
  User,
  ScrollShadow,
  CardFooter,
} from "@nextui-org/react";
import Image from "next/image";
import { usePosts } from "@/hook/usePostData";
import { usePostSort } from "@/hook/useSortPosts";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Home = () => {
  const { data: posts, isLoading, isError } = usePosts();
  const { sortByLatest, sortByOldest, getSortedPosts, sortByCommentCount } =
    usePostSort();
  const router = useRouter();
  const [searchKeyword, setsearchKeyword] = useState("");

  const filteredPostsByKeyword = (keyword: string) => {
    return getSortedPosts().filter(
      (post) =>
        post.travelPlace.toLowerCase().includes(keyword.toLowerCase()) ||
        post.title.toLowerCase().includes(keyword.toLowerCase()) ||
        post.content.toLowerCase().includes(keyword.toLowerCase()) ||
        post.userName.toLowerCase().includes(keyword.toLowerCase()) ||
        post.postMainContent.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const filteredPosts = filteredPostsByKeyword(searchKeyword);

  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchKeyword(e.currentTarget.value);
  };

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>패칭 에러</div>;

  const handleCardClick = (id: string) => router.push(`/detail/${id}`);

  return (
    <div>
      <div className="relative w-full h-[396px]">
        <Image src={mainImage} alt="Main" layout="fill" objectFit="cover" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
          <input
            type="text"
            placeholder="어느 나라, 도시로 떠나시나요?"
            className="w-3/4 md:w-1/2 lg:w-1/3 h-10 px-4 py-2 bg-white bg-opacity-90 rounded-full shadow outline-none ring-2 ring-blue-500 focus:bg-opacity-100"
            value={searchKeyword}
            onChange={handleSearchKeyword}
          />
        </div>
      </div>
      <div className="mt-10 flex">
        <Button
          color="primary"
          className="ml-5 font-semibold mr-2"
          onClick={sortByLatest}
        >
          최신 순
        </Button>
        <Button
          color="warning"
          className="mr-2 font-semibold"
          onClick={sortByOldest}
        >
          오래된 순
        </Button>
        <Button
          color="default"
          className="font-semibold"
          onClick={sortByCommentCount}
        >
          댓글 순
        </Button>
      </div>
      <ScrollShadow className="w-[full] h-[400px] mt-3">
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-5">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="py-4">
              <CardBody className="overflow-visible py-2">
                <h1 className="text-lg font-bold mb-2">
                  🛫&nbsp;&nbsp;여행 기간
                </h1>
                <p className="mb-2 font-semibold text-blue-500">
                  {post.travelDate}
                </p>
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
                    <CardFooter className="bg-white/90 border-1 overflow-hidden py-1 before:rounded-xl rounded-large shadow-small ml-1">
                      <p className="text-medium font-bold text-blue-600">
                        📍&nbsp;{post.travelPlace}
                      </p>
                    </CardFooter>
                  </div>
                </div>
              </CardBody>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <div className="flex justify-between items-center w-full">
                  <User
                    name={post.userName}
                    avatarProps={{
                      src: post.userProfile,
                    }}
                    className="font-bold mb-2"
                  />
                  <p className="">💬&nbsp;&nbsp;{post.comment_count}</p>
                </div>
                <hr className="w-full border-2 border-gray-40 mb-1" />
                <h1 className="uppercase font-bold mt-3">
                  {post.title.length > 20
                    ? `${post.title.substring(0, 20)}...`
                    : post.title}
                </h1>
                <p className="text-default-500 mt-3">
                  {post.content.length > 50
                    ? `${post.content.substring(0, 50)}...`
                    : post.content}
                </p>
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
      </ScrollShadow>
    </div>
  );
};

export default Home;
