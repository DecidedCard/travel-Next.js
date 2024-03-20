"use client"

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
  Tab,
} from "@nextui-org/react";
import Image from "next/image";
import { usePosts } from "@/hook/usePostData";
import { usePostSort } from "@/hook/useSortPosts";

const Home = () => {
  const { data: posts, isLoading, isError } = usePosts();
  const { sortOrder, sortByLatest, sortByOldest } = usePostSort()

  const getSortedPosts = () => {
    if (posts && posts.length > 0) {
      if (sortOrder === 'latest') {
        // 최신순 정렬
        return posts.sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
      } else {
        // 오래된 순 정렬
        return posts.sort((a, b) => new Date(a.postDate).getTime() - new Date(b.postDate).getTime());
      }
    }
    return []; // 유효한 posts가 없는 경우 빈 배열 반환
  };
  
  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>패칭 에러</div>;

  return (
    <div>
      <div className="relative w-full h-[396px]">
        <Image src={mainImage} alt="Main" layout="fill" objectFit="cover" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
          <input
            type="text"
            placeholder="어느 나라, 도시로 떠나시나요?"
            className="w-3/4 md:w-1/2 lg:w-1/3 h-10 px-4 py-2 bg-white bg-opacity-90 rounded-full shadow outline-none ring-2 ring-blue-500 focus:bg-opacity-100"
          />
        </div>
      </div>
      <div className="mt-10 flex">
        <Button color="primary" className="ml-5 font-semibold mr-2" onClick={sortByLatest}>
        최신 순
        </Button>
        <Button color="warning" className="mr-2 font-semibold" onClick={sortByOldest}>
        오래된 순
        </Button>  
        <Button color="default" className="font-semibold">
        댓글 순
        </Button>
      </div>
      <ScrollShadow className="w-[full] h-[400px] mt-3">
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-5">
      {getSortedPosts().map((post) => (
            <Card key={post.id} className="py-4">
              <CardBody className="overflow-visible py-2">
              <h1 className="text-lg font-bold mb-2">🛫&nbsp;&nbsp;여행 기간</h1>
               <p className="mb-2">{post.travelDate}</p>
               <div className="relative">
                  <NextUiImg
                    isZoomed
                    alt="Card background"
                    className="object-cover rounded-xl h-80"
                    src={post.postBasicImage ? post.postBasicImage : "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"}
                    width={460}  
                  />
                  <div className="absolute top-2 left-0 z-10">
                  <CardFooter className="bg-white/80 border-1 overflow-hidden py-1 before:rounded-xl rounded-large shadow-small ml-1">
                    <p className="text-medium text-#5356FF font-bold">📍{post.travelPlace}</p>
                  </CardFooter>
                  </div>
                </div>
              </CardBody>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <User
                  name={post.userName} 
                  avatarProps={{
                    src: post.userProfile, 
                  }}
                />
                <h1 className="uppercase font-bold mt-3">{post.title.length > 20 ? `${post.title.substring(0, 20)}...` : post.title}</h1>
                <p className="text-default-500 mt-3">{post.content.length > 50 ? `${post.content.substring(0, 50)}...` : post.content}</p>
              </CardHeader>
            </Card>
          ))}      
        </div>
      </ScrollShadow>
    </div>
  );
};

export default Home;
