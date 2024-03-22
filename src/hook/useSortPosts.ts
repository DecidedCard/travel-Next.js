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

  const sortByCommentCount = async () => {
    setSortOrder('commentCount');
  };
  
  const getSortedPosts = () => {
    if (posts && posts.length > 0) {
      switch (sortOrder) {
        case 'latest':
          // 최신순 정렬
          return posts.sort((a, b) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime());
        case 'oldest':
          // 오래된 순 정렬
          return posts.sort((a, b) => new Date(a.postDate).getTime() - new Date(b.postDate).getTime());
        case 'commentCount':
          // 댓글 수가 많은 순 정렬
          return posts.sort((a, b) => b.comment_count - a.comment_count);
        default:
          return posts; // 정렬 조건이 지정되지 않은 경우 원본 배열 반환
      }
    }
    return []; // 유효한 posts가 없는 경우 빈 배열 반환
  };

  return { sortOrder, sortByLatest, sortByOldest, sortByCommentCount, getSortedPosts };
};

