import React from 'react';
import Description from '../../components/Description/Description';
import HomeContent from '../../components/HomeContent/HomeContent';
import { SearchProvider } from '../../providers/Search.provider';

const HomePage: React.FC = () => {
  return (
    <SearchProvider>
      <Description />
      <HomeContent />
    </SearchProvider>
  );
};

export default HomePage;
