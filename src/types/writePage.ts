export type post = {
  id: string;
  content: string;
  postDate: Date;
  travelDate: string;
  userId: string;
  userName: string;
  userProfile: string;
  postMainContent: string;
};

export type writePostStore = {
  writePost: post | null;
  setWritePost: (arg: post) => void;
};
