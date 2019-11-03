import React from 'react';

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
  //get first creator to appear in props
  let creatorTitle = Object.getOwnPropertyNames(props.item.creators)[0];
  let creatorName = props.item.creators[creatorTitle];
  creatorTitle = creatorTitle[0].toUpperCase() + creatorTitle.slice(1).toLowerCase();
  if (Array.isArray(creatorName)){ //if multiple creator names for same role
    let creators = creatorName;
    creatorName = '';
    for (let i=0;i<creators.length-1;i++){
      creatorName += creators[i]+', '
    }
    creatorName += creators.pop()
  }


  return (
    <div className='col-6 col-sm-4 col-md-3 col-lg-2 mb-3'>
      <div className='card'>
        <img src={props.item.image} className='card-img-top' />
        <div className='card-body border-top'>
          <h5 className='card-title'>{props.item.title}</h5>
          <h6 className='card-subtitle text-muted'>{`${icon} ${creatorTitle}: ${creatorName}`}</h6>
        </div>
      </div>
    </div>
  );
}

export default MediaItem;
