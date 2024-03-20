export type Post = {
  id?: string;
  title: string;
  content: string;
  postDate?: Date;
  travelDate: string;
  travelPlace: string;
  userId: string;
  userName: string;
  userProfile: string;
  postMainContent: string;
  postBasicImage: string;
};

export type PostBasicImageStore = {
  postBasicImage: string;
  setPostBasicImage: (arg: string) => void;
};
