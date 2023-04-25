import React from 'react';
import PostForm from '@/components/PostForm/PostForm';
import PostContent from '@/components/PostContent/PostContent';

const PostPage: React.FC = () => {
  return (
    <>
      <PostForm />
      <PostContent />
    </>
  );
};

export default PostPage;
