import PostForm from '../components/PostForm/PostForm';
import PostContent from '../components/PostContent/PostContent';
import React from 'react';
import { PlacesInfo } from '../interfaces/index';

type PostPageState = {
  items: PlacesInfo[] | null;
};

export default class PostPage extends React.Component<object, PostPageState> {
  state = {
    items: [],
  };
  getItem = (item: PlacesInfo | null) => {
    if (item !== null) {
      const newItems = [...this.state.items, item];
      this.setState({ items: newItems });
    }
  };

  render() {
    return (
      <React.Fragment>
        <PostForm onSubmit={this.getItem} />
        <PostContent items={this.state.items} />
      </React.Fragment>
    );
  }
}
