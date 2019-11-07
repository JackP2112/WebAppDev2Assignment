import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';
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
  let creatorTitle = Object.getOwnPropertyNames(props.item.creators)[0];
  let creatorName = props.item.creators[creatorTitle];
  creatorTitle = creatorTitle[0].toUpperCase() + creatorTitle.slice(1).toLowerCase();
  if (Array.isArray(creatorName)){ //if multiple creator names for same role
    let creators = creatorName;
    creatorName = '';
    for (let i=0;i<creators.length-1;i++){
      creatorName += creators[i]+', ';
    }
    creatorName += creators[creators.length-1];
  }

  return (
    <Col xs={6} sm={6} md={4} lg={3} xl={2} className='mb-3'>
      <Card onClick={props.onClick}>
        <Card.Img variant='top' src={props.item.image} />
        <Card.Body className={`border-top ${props.selected && 'selected'}`}>
          <Card.Title>{props.item.title}</Card.Title>
          <Card.Subtitle className='text-muted'>{`${icon} ${creatorTitle}: ${creatorName}`}</Card.Subtitle>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default MediaItem;
