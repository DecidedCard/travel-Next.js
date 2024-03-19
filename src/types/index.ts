export type Store = {
  count: number;
  inc: () => void;
};

export type User = {
  id: string;
  email: string;
  avatar: string | null;
  nickname: string;
  password: string;
};


