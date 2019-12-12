import React from 'react';
import { Card, Col } from 'react-bootstrap';
import './style.css';

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
  //let [creatorRole, creatorName] = ['','Unknown'];
  //if(props.item.creators.length > 0){
  //  let creator = props.item.creators[0];
  //  creatorRole = creator.role.toUpperCase() + creator.role.slice(1).toLowerCase();
  //  creatorName = '';
  //  if (typeof creator.name === 'string'){ //one name
  //    creatorName = creator[1];
  //  }
  //  else { //multiple names
  //    for (let i=0;i<creator[1].length-1;i++){
  //      creatorName += creator[1][i]+', ';
  //    }
  //    creatorName += creator[1][creator[1].length-1];
  //  }
  //}

  console.log(props.item);
  let [creatorRole, creatorName] = ['','Unknown'];
  const creators = props.item.creators;
  if(creators.length > 0){
    //get first creator to appear
    let creator = creators[0];
    //get any others of same role
    let others = []
    for (let i=1; i<creators.length;i++){
      if (creators[i].role === creator.role){ //same role as first
        others.push(creators[i]); //add to others
      }
    }
    //format creator role for display
    creatorRole = creator.role[0].toUpperCase() + creator.role.slice(1).toLowerCase();
    creatorName = creator.name;
    if (others.length === 0){ //if other names to concat
      for (let i=0;i<others.length;i++){
        creatorName += ', '+others[i].name;
      }
    }
  }

  //get image base64
  let imageString = props.getImage(props.item._id);


  return (
    <Col xs={6} sm={6} md={4} lg={3} xl={2} className='mb-3'>
      <Card onClick={props.onClick}>
    {/*<Card.Img variant='top' src={'data:image/png;base64,'+props.item.image.data} />*/}
        <Card.Img variant='top' src={imageString} />
        <Card.Body className={`border-top ${props.selected && 'selected'}`}>
          <Card.Title>{props.item.title}</Card.Title>
          <Card.Subtitle className='text-muted'>{`${icon} ${creatorRole}: ${creatorName}`}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default MediaItem;
