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
} from "@nextui-org/react";
import Image from "next/image";
import { usePosts } from "@/hook/usePostData";

const Home = () => {
  const { data: posts, isLoading, isError } = usePosts();

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
        <Button color="primary" className="ml-5 mr-2">
          최신 순
        </Button>
        <Button color="default">댓글 순</Button>
      </div>
      <ScrollShadow className="w-[full] h-[400px] mt-3">
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-5">
      {posts && posts.map((post) => (
            <Card key={post.id} className="py-4">
              <CardBody className="overflow-visible py-2">
              <h1 className="text-lg font-bold mb-2">🛫&nbsp;&nbsp;여행 기간</h1>
               <p className="mb-2">{post.travelDate}</p>
               <div className="relative">
                  <NextUiImg
                    isZoomed
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"  
                    width={380}
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
                <h1 className="uppercase font-bold mt-3">{post.title}</h1>
                <p className="text-default-500 mt-3">{post.content}</p>
              </CardHeader>
            </Card>
          ))}      
        </div>
      </ScrollShadow>
    </div>
  );
};

export default Home;
