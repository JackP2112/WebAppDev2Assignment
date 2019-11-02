import React, { Component } from 'react';

const MediaItem = props => {

  //get media icon
  let icon = ''
  switch (props.item.type){
    case 'book':
      icon = '🕮';
      break;
    case 'movie':
      icon = '🎬';
      break;
    case 'series':
      icon = '📺';
      break;
    case 'music':
      icon = '🎝';
      break;
    default:
      icon = ' ';
  }
  
  //get creator info
  let creatorTitle = Object.getOwnPropertyNames(props.item.creators)[0];
  const creatorName = props.item.creators[creatorTitle];
  creatorTitle = creatorTitle[0].toUpperCase() + creatorTitle.slice(1).toLowerCase();

  return (
    <div className='col-sm-3'>
      <div className='card'>
        <img src={props.item.image} className='card-img-top' />
        <div className='card-body'>
          <h5 className='card-title'>{`Title: ${props.item.title}`}</h5>
          <h6 className='card-subtitle text-muted'>{`${icon} ${creatorTitle}: ${creatorName}`}</h6>
        </div>
      </div>
    </div>
  );
}

export default MediaItem;
