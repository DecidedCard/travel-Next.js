import { useState } from 'react';
import { usePosts } from './usePostData';

export const usePostSort = () => {
  const [sortOrder, setSortOrder] = useState('latest');
  const { data: posts, isLoading, isError } = usePosts();

  // 최신순 정렬 함수
  const sortByLatest = () => {
    setSortOrder('latest');
  };

  // 오래된 순 정렬 함수
  const sortByOldest = () => {
    setSortOrder('oldest');
  };
  
  const getSortedPosts = () => {
    if (posts && posts.length > 0) {
      if (sortOrder === 'latest') {
        // 최신순 정렬
        return posts.sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
      } else {
        // 오래된 순 정렬
        return posts.sort((a, b) => new Date(a.postDate).getTime() - new Date(b.postDate).getTime());
      }
    }
    return []; // 유효한 posts가 없는 경우 빈 배열 반환
  };

  return { sortOrder, sortByLatest, sortByOldest, getSortedPosts };
};

