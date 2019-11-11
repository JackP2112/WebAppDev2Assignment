import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const SearchBar = (props) => (

  <Col xs={3} sm={4} md={3} lg={3} xl={2} className='vh-100 border pt-3'>
    <Form.Control type='text' name='searchText' placeholder='Search...' className='mb-4' onChange={props.handleChange}/>

    <Form.Group as={Row}>
      <Form.Label column sm={3}>Type</Form.Label>
      <Col sm={9}>
        <Form.Control as='select' name='mediaType' value={props.mediaType} onChange={props.handleChange}>
          <option value='all'>All</option>
          <option value='movie'>Movies</option>
          <option value='series'>Series</option>
          <option value='book'>Books</option>
          <option value='music'>Music</option>
        </Form.Control>
      </Col>
    </Form.Group>

    <fieldset>
      <Form.Group as={Row}>
        <Form.Label as='legend' column sm={3} className='pt-0'>Status</Form.Label>
        <Col sm={9}>
          <Form.Check id='statusRadio1' type='radio' name='mediaStatus' label='Queued' value='queued' checked={props.mediaStatus === 'queued'} onChange={props.handleChange}/>
          <Form.Check id='statusRadio2' type='radio' name='mediaStatus' label='In Progress' value='in progress' checked={props.mediaStatus === 'in progress'} onChange={props.handleChange}/>
          <Form.Check id='statusRadio3' type='radio' name='mediaStatus' label='Completed' value='completed' checked={props.mediaStatus === 'completed'} onChange={props.handleChange}/>
        </Col>
      </Form.Group>
    </fieldset>
  </Col>
);

export default SearchBar;
