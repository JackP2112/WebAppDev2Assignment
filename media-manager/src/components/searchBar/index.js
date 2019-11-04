import React, { Component } from 'react';
import { Form, Row, Col, } from 'react-bootstrap';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: '',
      mediaType: 'all',
      mediaStatus: 'in progress'
    }
  }

  handleTextChange = event => {
    this.setState({
      text: event.target.value
    })
  }

  handleTypeChange = event => {
    this.setState({
      mediaType: event.target.value
    })
  }

  handleStatusChange = event => {
    this.setState({
      mediaStatus: event.target.value
    })
  }

  render() {
    return (
      <Col xs={2} className='vh-100 border pt-3'>
        <Form.Control type='text' placeholder='Search...' className='mb-4' onChange={this.handleTextChange}/>

        <Form.Group as={Row}>
          <Form.Label column sm={3}>Type</Form.Label>
          <Col sm={9}>
            <Form.Control as='select' value={this.state.mediaType} onChange={this.handleTypeChange}>
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
              <Form.Check type='radio' label='Queued' value='queued' checked={this.state.mediaStatus === 'queued'} onChange={this.handleStatusChange}/>
              <Form.Check type='radio' label='In Progress' value='in progress' checked={this.state.mediaStatus === 'in progress'} onChange={this.handleStatusChange}/>
              <Form.Check type='radio' label='Completed' value='completed' checked={this.state.mediaStatus === 'completed'} onChange={this.handleStatusChange}/>
            </Col>
          </Form.Group>
        </fieldset>
      </Col>
    );
  }
}

export default SearchBar;
