import PostForm from '../../components/PostForm/PostForm';
import PostContent from '../../components/PostContent/PostContent';
import React from 'react';

const PostPage: React.FC = () => {
  return (
    <>
      <PostForm />
      <PostContent />
    </>
  );
};

export default PostPage;
