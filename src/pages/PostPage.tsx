import PostForm from '../components/PostForm/PostForm';
import PostContent from '../components/PostContent/PostContent';
import React, { useState } from 'react';
import { PlacesInfo } from '../interfaces/index';

type PlacesState = PlacesInfo[] | [];

const PostPage: React.FC = () => {
  const [items, setItems] = useState<PlacesState>([]);

  const handleItemSubmit = (formData: PlacesInfo | null) => {
    if (formData !== null) {
      setItems((prevState) => [...(prevState || []), formData]);
    }
  };

  return (
    <>
      <PostForm onSubmit={handleItemSubmit} />
      <PostContent items={items} />
    </>
  );
};

export default PostPage;
