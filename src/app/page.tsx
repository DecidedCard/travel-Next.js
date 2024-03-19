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
} from "@nextui-org/react";
import Image from "next/image";
import { useUserInfo } from "@/hook/useUserInfo";

const Home = () => {
  const { data: userInfo, isLoading, error } = useUserInfo();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
      <ScrollShadow className="w-[full] h-[300px] mt-3">
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-5">
        <Card className="py-4">
          <CardBody className="overflow-visible py-2">
            <NextUiImg
              isZoomed
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
              width={270}
            />
          </CardBody>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <User
              name= "Jane"
              avatarProps={{
                src:"https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
            />
            <h1 className="uppercase font-bold mt-3">아마도 여행 날짜</h1>
            <p className="text-default-500 mt-3">아마도 게시글 내용</p>
          </CardHeader>
        </Card>
      </div>
      </ScrollShadow>
    </div>
  );
};

export default Home;
