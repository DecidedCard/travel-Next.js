export type Store = {
  count: number;
  inc: () => void;
};

export type UserInfo = {
  id: string;
  nickname: string;
  avatar: string | null; 
}