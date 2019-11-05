import React, { Component } from 'react';
import { Dropdown, Form, FormControl, Row, Col, Container, Button, Collapse } from 'react-bootstrap';

class ExportMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      exportRange: 'Entire list',
      exportDest: 'Clipboard',
      exportFormat: 'json'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div style={this.props.style} className={this.props.className}>
        <Container>
          <Form onSubmit={this.handleSubmit}>

            <Form.Group as={Row}>
              <Form.Label column sm={3}>Export</Form.Label>
              <Col sm={9}>
                <Form.Control as='select' name='exportRange' onChange={this.handleChange}>
                  <option>Entire List</option>
                  <option>Selected Only</option>
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm={3}>To</Form.Label>
              <Col sm={9}>
                <Form.Control as='select' name='exportDest' className='mb-2' onChange={this.handleChange}>
                  <option>Clipboard</option>
                  <option>File</option>
                </Form.Control>
                <Collapse in={this.state.exportDest === 'File'}>
                  <div>
                    <Form.Control type='text' placeholder='Path...' size='sm'/>
                  </div>
                </Collapse>
              </Col>
            </Form.Group>

            <fieldset>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={3}>As</Form.Label>
                <Col sm={9}>
                  <Form.Check id='formatRadio1' type="radio" label="JSON" name='exportFormat' value='json'
                   checked={this.state.exportFormat === 'json'} onChange={this.handleChange}/>
                  <Form.Check id='formatRadio2' type="radio" label="Titles Only" name='exportFormat' value='titles'
                   checked={this.state.exportFormat === 'titles'} onChange={this.handleChange}/>
                </Col>
              </Form.Group>
            </fieldset>

            <Form.Group as={Row}>
              <Col sm={{ span: 9, offset: 3 }}>
                <Button type="submit">Export</Button>
              </Col>
            </Form.Group>

          </Form>
        </Container>
      </div>
    );
  }
}

export default ExportMenu;
