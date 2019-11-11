import React from 'react';
import MediaItem from '../mediaItem/';
import { Container, Row, Button } from 'react-bootstrap';

const MainView = props => {

  const toggleSelect = (id, event) => {
    if(props.isSelecting){
      props.updateSelected(id);
    }
  }

  let mediaItems = props.items.map(m => {
    const id = m.title+m.type+m.releaseDate;
    let selected = false;
    if (props.isSelected(id)){
      selected=true;
    }
    return (<MediaItem key={id} item={m} selected={selected} onClick={(e) => toggleSelect(id, e)}/>);
  });

  return (
    <Container fluid>
      <Row className='align-items-end'>{mediaItems}</Row>
    </Container>
  );
}

export default MainView;
