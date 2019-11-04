import React from 'react';
import MediaItem from '../mediaItem/';
import { Container, Row } from 'react-bootstrap';

const MainView = props => {

  const mediaItems = props.items.map(m => (
    <MediaItem item={m} />
  ));

  return (
    <Container fluid>
      <Row className='align-items-end'>{mediaItems}</Row>
    </Container>
  );
}

export default MainView;
