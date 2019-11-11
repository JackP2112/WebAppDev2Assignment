import React from 'react';
import MediaItem from '../mediaItem/';
import { Container, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const MainView = props => {

  const history = useHistory();
  const toggleSelect = (id, event) => {
    if(props.isSelecting){
      props.updateSelected(id);
    }
    else{
      console.log(history);
      history.push('/item/'+id);
    }
  }

  let mediaItems = props.items.map(m => {
    const id = (m.title.replace(/[^\w^\d]/g,'-')+'-'+m.type+'-'+m.releaseDate).toLowerCase();
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
