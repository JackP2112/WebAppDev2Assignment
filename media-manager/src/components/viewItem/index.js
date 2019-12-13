import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import * as api from './api';

const ViewItem = (props) => {

  const item = props.getItem(props.match.params.id);

  function printCreator(creator){
    return creator.role[0].toUpperCase()+creator.role.slice(1).toLowerCase()+': '+creator.name;
  }

  function printCreators(){
    if (item.creators.length > 0){
      let creators = item.creators;
      let role = '';
      let creatorLines = []; //line to print for each role
      for (let i=0;i<creators.length;i++){ //for every creator
        if (creators[i].role !== role){ //if role not same as previous
          role = creators[i].role;
          creatorLines.push(role[0].toUpperCase()+role.slice(1).toLowerCase()+': ');
        }
        creatorLines[creatorLines.length-1] += creators[i].name+', ';
      }
      return creatorLines;
    }
  }

  function printGenres(){
    if (item.genres.length > 0){
      let genres = item.genres.map(genre => genre[0].toUpperCase()+genre.slice(1)+', ');
      genres[genres.length-1] = genres[genres.length-1].slice(0,-2); //trim trailing comma on last item
      return genres;
    }
  }

  function deleteItem(){
    api.deleteItem(item);
  }

  let imageString = '';
  if(item){
    imageString = props.getImage(item._id);
  }

  return(
    <>
      {item && //if item is not undefined (before app is mounted)
        <Row>
          <Col sm={4}>
            <img src={imageString} alt='' className='image-fluid w-100'/>
          </Col>
          <Col>
            <h2>{item.title}</h2>
            {item.releaseDate && <p className='text-muted'>{item.releaseDate}</p>}
            {item.creators.length > 0 && printCreators().map(line => <p>{line}</p>)}
            <h5>Genres:</h5>
            <p>{printGenres()}</p>
            <h5>Comments:</h5>
            {item.comments.map(comment => <p key={comment}>{comment}</p>)}
            <Link to='/' className='btn btn-outline-danger' onClick={deleteItem}>Delete</Link>
          </Col>
        </Row>
      }
    </>
  );
}

export default withRouter(ViewItem);
