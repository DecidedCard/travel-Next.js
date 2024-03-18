import mainImage from "../assets/mainimage.jpg";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Image,
  User,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

const Home: React.FC = () => {
  return (
    <div>
      <img src={mainImage} alt="Main" className="w-full h-[396px] block" />
      <div className="mt-10 flex">
        <Button color="primary" className="ml-5 mr-5">
          최신 순
        </Button>
        <Button color="default">댓글 순</Button>
      </div>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-5">
        <Card className="py-4">
          <CardBody className="overflow-visible py-2">
            <Image
              isZoomed
              alt="Card background"
              className="object-cover rounded-xl"
              src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
              width={270}
            />
          </CardBody>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <User
              name="Jane Doe"
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              }}
            />
            <h1 className="uppercase font-bold mt-3">아마도 여행 날짜</h1>
            <p className="text-default-500 mt-3">아마도 게시글 내용</p>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Home;
