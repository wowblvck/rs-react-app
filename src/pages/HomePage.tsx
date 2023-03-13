import React from 'react';
import Description from '../components/Description/Description';
import HomeContent from '../components/HomeContent/HomeContent';

class HomePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Description />
        <HomeContent />
      </React.Fragment>
    );
  }
}

export default HomePage;
