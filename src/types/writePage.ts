export type post = {
  id?: string;
  content: string;
  postDate?: Date;
  travelDate: string;
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
