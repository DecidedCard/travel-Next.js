"use client";

import mainImage from "../assets/mainimage.jpg";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Image as NextUiImg,
  User,
  CardFooter,
} from "@nextui-org/react";
import Image from "next/image";
import { usePostSort } from "@/hook/useSortPosts";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import { GrView } from "react-icons/gr";
import { FaRegCommentDots } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

const Home = () => {
  const {
    sortByLatest,
    sortByOldest,
    getSortedPosts,
    sortByCommentCount,
    sortByViewCount,
  } = usePostSort();
  const router = useRouter();
  const [searchKeyword, setsearchKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

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

  const handleSearchKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setsearchKeyword(e.currentTarget.value);
  };

  const handleFilterByDate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilterStartDate(startDate);
    setFilterEndDate(endDate);
  };

  const handleResetDates = () => {
    setStartDate("");
    setEndDate("");
    setFilterStartDate("");
    setFilterEndDate("");
  };

  const DatefilteredPosts = filteredPosts.filter(post => {
    const postDate = new Date(post.travelDate.split(" ~ ")[0]);
    const start = filterStartDate ? new Date(filterStartDate) : new Date("1970-01-01");
    const end = filterEndDate ? new Date(filterEndDate) : new Date("9999-12-31");
    return postDate >= start && postDate <= end;
  });

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
      <div className="mt-10 flex justify-between w-full">
        <div>
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
            color="danger"
            className="mr-2 font-semibold"
            onClick={sortByCommentCount}
          >
            댓글 순
          </Button>
          <Button
            color="success"
            className="font-semibold"
            onClick={sortByViewCount}
          >
            조회 순
          </Button>
        </div>
        <div>
        <form className="date-selector-form flex items-end justify-between mr-5" onSubmit={handleFilterByDate}>
          <button
            type="button"
            onClick={handleResetDates}
            className="px-2 py-1 mb-2 font-semibold mr-4"
            title="날짜 초기화"
          >
            <GrPowerReset size={20} />
          </button>
          <div className="flex flex-grow items-end">
            <div className="flex flex-col mr-4">
              <label className="mb-2 font-medium text-gray-700">여행 시작 날짜:</label>
              <input
                type="date"
                className="px-4 py-2 border border-blue-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col mr-4">
              <label className="mb-2 font-medium text-gray-700">여행 종료 날짜:</label>
              <input
                type="date"
                className="px-4 py-2 border border-blue-500 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              적용
            </button>
          </div>
        </form>
      </div>
      </div>
      <div className="gap-2 grid grid-cols-2 md:grid-cols-4 p-5">
        {DatefilteredPosts.map((post) => (
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
                    <p className="text-medium font-bold text-blue-600 flex">
                      <FaMapMarkerAlt className="mt-1" />
                      &nbsp;{post.travelPlace}
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
                <div className="flex">
                  <p className="flex">
                    <FaRegCommentDots />
                    &nbsp;{post.comment_count}
                  </p>
                  <p className="flex ml-2">
                    <GrView />
                    &nbsp;{post.view_count}
                  </p>
                </div>
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
    </div>
  );
};

export default Home;
