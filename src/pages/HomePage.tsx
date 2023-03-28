import React from 'react';
import Description from '../components/Description/Description';
import HomeContent from '../components/HomeContent/HomeContent';

const HomePage: React.FC = () => {
  return (
    <React.Fragment>
      <Description />
      <HomeContent />
    </React.Fragment>
  );
};

export default HomePage;
