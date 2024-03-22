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

  // 댓글 순 정렬 함수
  const sortByCommentCount = async () => {
    setSortOrder('commentCount');
  };

  // 조회 순 정렬 함수
  const sortByViewCount = () => {
    setSortOrder('viewCount');
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
        case 'viewCount':
            // 조회수가 많은 순 정렬
            return posts.sort((a, b) => b.view_count - a.view_count);
          default:
            return posts;
      }
    }
    return [];
  };

  return { sortOrder, sortByLatest, sortByOldest, sortByCommentCount, getSortedPosts };
};

