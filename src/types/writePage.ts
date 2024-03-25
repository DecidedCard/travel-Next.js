import type { User } from ".";

export type Post = {
  id?: string;
  title: string;
  content: string;
  postDate?: Date;
  travelDate: string;
  travelPlace: string;
  userId?: string;
  userName?: string;
  userProfile?: string;
  postMainContent: string;
  postBasicImage: string;
  view_count?: number;
};

export type PostBasicImageStore = {
  postBasicImage: string;
  setPostBasicImage: (arg: string) => void;
};

export type PostComment = {
  id?: string;
  created_at?: string;
  postId: string;
  userId: string;
  userProfile: string;
  userName: string;
  comment: string;
};

export type UserInfo = {
  avatar: string;
  email: string;
  id: string;
  nickname: string;
  password?: string;
};

export type CommentInputFormProps = {
  user: User;
  comment: string;
  onChangeCommentHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitInsertHandler: (e: React.FormEvent<HTMLFormElement>) => void;
};

export type CommentListProps = {
  user: User;
  commentsData: PostComment[];
  isLoading: boolean;
  isError: boolean;
  editingId: string;
  onClickEditingIdSet: (id: string) => void;
  editComment: string;
  setEditComment: React.Dispatch<React.SetStateAction<string>>;
  onChangeEditCommentHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitUpdateHandler: (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => void;
  onClickDeleteHandler: (id: string) => void;
};
