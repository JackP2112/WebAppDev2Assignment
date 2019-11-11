import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

const ViewItem = (props) => {

  let item = props.getItem(props.match.params.id);

  function printCreator(creator) {
    let [creatorTitle, creatorName] = ['','Unknown'];
    if(creator.length > 0){
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
    return creatorTitle+': '+creatorName;
  }

  return(
    <>
      {item && //if item is not undefined (before app is mounted)
        <Row>
          <Col sm={4}>
            <img src={item.image} alt='' className='image-fluid w-100'/>
          </Col>
          <Col>
            <h2>{item.title}</h2>
            <p className='text-muted'>{item.releaseDate}</p>
            {item.creators.map(creator => <p>{printCreator(creator)}</p>)}
            <h5>Genres:</h5>
            <p>{item.genres.map(genre => genre.slice(0,1).toUpperCase()+genre.slice(1)+', ')}</p>
            <h5>Comments:</h5>
            {item.comments.map(comment => <p>{comment}</p>)}
          </Col>
        </Row>
      }
    </>
  );
}

export default withRouter(ViewItem);
