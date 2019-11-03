import React, { Component } from 'react';
import MediaItem from '../mediaItem/'

class MainView extends Component {

  render(){
    const mediaItems = this.props.items.map(m => (
      <MediaItem item={m} />
    ));
    return (
      <div className='container-fluid'>
        <div className='row align-items-end'>{mediaItems}</div>
      </div>
    );
  }
}

export default MainView;
