import { useState } from 'react';

export const usePostSort = () => {
  const [sortOrder, setSortOrder] = useState('latest');

  // 최신순 정렬 함수
  const sortByLatest = () => {
    setSortOrder('latest');
  };

  // 오래된 순 정렬 함수
  const sortByOldest = () => {
    setSortOrder('oldest');
  };

  return { sortOrder, sortByLatest, sortByOldest };
};
