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
  let [creatorTitle, creatorName] = ['','Unknown'];
  if(props.item.creators.length > 0){
    let creator = props.item.creators[0];
    creatorTitle = creator[0][0].toUpperCase() + creator[0].slice(1).toLowerCase();
    creatorName = '';
    if (typeof creator[1] === 'string'){ //one name
      creatorName = creator[1];
    }
    else { //multiple names
      for (let i=0;i<creator[1].length-1;i++){
        creatorName += creator[1][i]+', ';
      }
      creatorName += creator[1][creator[1].length-1];
    }
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
