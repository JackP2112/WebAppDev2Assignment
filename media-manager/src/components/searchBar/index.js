import React, { Component } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      mediaType: 'all',
      mediaStatus: 'in progress'
    }

    this.handleChange.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state);
  }

  render() {
    return (
      <Col xs={3} sm={4} md={3} lg={3} xl={2} className='vh-100 border pt-3 ml-3'>
        <Form.Control type='text' name='text' placeholder='Search...' className='mb-4' onChange={this.handleChange}/>
 
        <Form.Group as={Row}>
          <Form.Label column sm={3}>Type</Form.Label>
          <Col sm={9}>
            <Form.Control as='select' name='mediaType' value={this.state.mediaType} onChange={this.handleChange}>
              <option value='all'>All</option>
              <option value='movies'>Movies</option>
              <option value='series'>Series</option>
              <option value='books'>Books</option>
              <option value='music'>Music</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as='legend' column sm={3} className='pt-0'>Status</Form.Label>
            <Col sm={9}>
              <Form.Check id='statusRadio1' type='radio' name='mediaStatus' label='Queued' value='queued' checked={this.state.mediaStatus === 'queued'} onChange={this.handleChange}/>
              <Form.Check id='statusRadio2' type='radio' name='mediaStatus' label='In Progress' value='in progress' checked={this.state.mediaStatus === 'in progress'} onChange={this.handleChange}/>
              <Form.Check id='statusRadio3' type='radio' name='mediaStatus' label='Completed' value='completed' checked={this.state.mediaStatus === 'completed'} onChange={this.handleChange}/>
            </Col>
          </Form.Group>
        </fieldset>
      </Col>
    );
  }
}

export default SearchBar;
