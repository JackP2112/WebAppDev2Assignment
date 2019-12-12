import React, { Component } from 'react';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as api from './api';
const ObjectID = require('mongodb').ObjectID;

class AddItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mediaType: 'movie',
      title: '',
      date: '',
      creators: [],
      genres: [],
      coverSrcFormat: 'url',
      coverSrc: '',
      mediaStatus: 'queued',
      comments: [],

      //adding creator variables
      addingRole: true,
      currentRole: '',
      currentNames: [],

      //choosing cover variables
      filename: '...'
    };

    this.handleAddRole = this.handleAddRole.bind(this);
    this.handleAddName = this.handleAddName.bind(this);
    this.handleAddGenre = this.handleAddGenre.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAddRole = event => {
    if (event.keyCode === 13 && event.target.value.length !== 0){ //if enter pressed
      this.setState({
        currentRole: event.target.value,
        addingRole: false
      });
    }
    else if(event.keyCode === 8 && event.target.value.length === 0){ //backspace on empty field
      const currentCreators = this.state.creators.pop();
      this.setState({
        addingRole: false,
        currentRole: currentCreators[0],
        currentNames: currentCreators.slice(1)
      });
    }
  }

  handleAddName = event => {
    if (event.keyCode === 13){ //if enter pressed
      const name = event.target.value;
      if (name.length === 0){ //empty name
        let currentNames = this.state.currentNames;
        if (currentNames.length > 0){
          this.state.creators.push([this.state.currentRole, ...this.state.currentNames]);
          this.setState({
            addingRole: true,
            currentRole: '',
            currentNames: []
          });
        }
      }
      else {
        this.state.currentNames.push(name); //add name to list
        this.setState({});
        event.target.value = '';
      }
    }
    else if(event.keyCode === 8 && event.target.value.length === 0){ //backspace on empty field
      if(this.state.currentNames.length > 0){ //more names to delete
        event.target.value = this.state.currentNames.pop();
        this.setState({});
      }
      else { //no more names
        this.setState({
          addingRole: true
        });
      }
    }
  }

  handleAddGenre = event => {
    if (event.keyCode === 13){ //if enter key pressed
      const genre = event.target.value.toLowerCase();
      if (!(genre.length === 0 || this.state.genres.includes(genre))){
        this.state.genres.push(genre);
        this.setState({});
      }
      event.target.value = '';
    }
    else if(event.keyCode === 8 && event.target.value.length === 0 && this.state.genres.length > 0){ //backspace on empty field
      event.target.value = this.state.genres.pop();
      this.setState({});
    }
  }

//  handleFileInput = event => {
//    if (event.target.files && event.target.files[0]){
//      const reader = new FileReader();
//      reader.onload = e => {
//        this.setState({
//          coverSrc: e.target.result 
//        });
//      }
//      reader.readAsDataURL(event.target.files[0]);
//      this.setState({
//        filename: event.target.files[0].name
//      });
//    }
//  }

  handleFileInput = event => {
    if (event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = e => {
        this.setState({
          coverSrc: e.target.result
        });
      }
      this.setState({
        filename: event.target.files[0].name
      });
    }
  }

  handleStatus = event => {
    this.setState({
      mediaStatus: event.target.id
    });
  }

  handleAddComment = event => {
    if (event.keyCode === 13 && event.target.value.length > 0){ //if enter key pressed
      this.state.comments.push(event.target.value);
      this.setState({});
      event.target.value = '';
    }
    else if(event.keyCode === 8 && event.target.value.length === 0){ //backspace on empty field
      event.target.value = this.state.comments.pop();
      this.setState({});
    }
  }

  //handleAddItem() {
  //  if(this.state.title.length > 0){
  //    const { mediaType, title, date, creators, genres, 
  //      coverSrcFormat, coverSrc, comments, mediaStatus } = this.state;
  //    this.props.addItem([mediaType, title, date, creators,
  //      genres, coverSrcFormat, coverSrc, comments, mediaStatus]); 

  //    if(this.state.currentNames.length > 0){ //enter creator role if left unfinished
  //      this.state.creators.push([this.state.currentRole, ...this.state.currentNames]);
  //    }
  //  }
  //}

  mapStatus(statusString){
    switch(statusString){
      case 'queued':
        return -1;
      case 'in progress':
        return 0;
      case 'completed':
        return 1;
      default:
        return -1
    }
  }

  formatCreators(){
    let creators = this.state.creators.slice();
    this.state.creators = [];
    for(let r=0;r<creators.length;r++){ //for every role
      let role = creators[r][0];
      for(let n=1;n<creators[r].length;n++){ //for every name
        console.log(role+' '+creators[r][n])
        this.state.creators.push({role:role, name:creators[r][n]});
      }
    }
  }

  handleSubmit(){
    if(this.state.title.length > 0){
      if(this.state.currentNames.length > 0){ //enter creator role if left unfinished
        this.state.creators.push([this.state.currentRole, ...this.state.currentNames]);
      }
      this.formatCreators();
      console.log(this.state.creators);
      const item = {
        _id: new ObjectID(),
        title: this.state.title,
        type: this.state.type,
        releaseDate: this.state.date,
        creators: this.state.creators,
        genres: this.state.genres,
        comments: this.state.comments,
        status: this.mapStatus(this.state.mediaStatus)
      }
      api.addItem(item, this.state.coverSrc);
    }
  }

  render() {
    return (
    <Container className='mt-3'>
      <Form onSubmit={this.handleSubmit}>

        <Form.Group as={Row}>
          {/*media type selector*/}
          <Col sm={3}>
            <Form.Control as='select' name='mediaType' onChange={this.handleChange}>
              <option>Movie</option>
              <option>Series</option>
              <option>Book</option>
              <option>Music</option>
            </Form.Control>
          </Col>
          {/*title input*/}
          <Col sm={9}>
            <Form.Control type='text' placeholder='Title...' name='title' onChange={this.handleChange}/>
          </Col>
        </Form.Group>

        {/*date input*/}
        <Form.Group as={Row}>
          <Form.Label column sm={3}>Date:</Form.Label> 
          <Col sm={9}>
            <Form.Control type='date' name='date' onChange={this.handleChange}/>
          </Col>
        </Form.Group>

        {/*creators input*/}
        <Form.Group as={Row}>
          <Form.Label column sm={3}>Creators:</Form.Label>
          <Col sm={9}>

            {this.state.creators.map(creator => {
              let line=creator[0]+': '
              for (let i=1;i<creator.length-1;i++){
                line += creator[i]+', '
              }
              line += creator[creator.length-1]
              return <Row key={creator[0]} className='ml-1 mb-1'>{line}</Row>
            })}

            {(this.state.addingRole) ? 
            <Form.Row>
              <Col sm={3}>
                <Form.Control type='text' placeholder='Role' onKeyDown={this.handleAddRole} />
              </Col>
            </Form.Row>
            :
            <Form.Row>
              <Form.Label className='ml-2 mr-1'>{`${this.state.currentRole}:`}</Form.Label>
              <p className='form-label'>{(this.state.currentNames.length > 0) && this.state.currentNames.map(name => name+', ')}</p>
              <Col sm={3}>
                <Form.Control autoFocus type='text' placeholder='Name' onKeyDown={this.handleAddName} />
              </Col>
            </Form.Row>}
            
          </Col>
        </Form.Group>

        {/*genres input*/}
        <Form.Group as={Row}>
          <Form.Label column sm={3}>Genres:</Form.Label>
          <Col sm={9}>
            <Form.Row>
              <p className='form-label'>{(this.state.genres.length > 0) && this.state.genres.map(genre => genre.slice(0,1).toUpperCase()+genre.slice(1)+', ')}</p>
              <Col sm={3}>
                <Form.Control type='text' placeholder='...' onKeyDown={this.handleAddGenre} /> 
              </Col>
            </Form.Row>
          </Col>
        </Form.Group>

        {/*cover image input*/}
        <Form.Group as={Row}>
          <Form.Label column sm={3}>Cover:</Form.Label>
          <Col sm={9}>
            <Form.Row> 
              <Col sm={4} className='pl-0'>
                <Form.Control as='select' name='coverSrcFormat' onChange={this.handleChange}>
                  <option value='url'>URL</option>
                  <option value='file'>File</option>
                </Form.Control>
              </Col>
              <Col sm={8} className='pr-0'>
                {(this.state.coverSrcFormat === 'url') ?
                <Form.Control type='text' placeholder='...' name='coverSrc' onChange={this.handleChange}/>
                :
                <div className='custom-file'>
                  <input type='file' className='custom-file-input' id='chooseCover' accept='image/png, image/jpeg' onInput={this.handleFileInput}/>
                  <Form.Label className='custom-file-label' htmlFor='chooseCover'>{this.state.filename}</Form.Label>
                </div>
                }
              </Col>
            </Form.Row>
          </Col>
        </Form.Group>

        {/*status radios*/}
        <fieldset>
          <Form.Group as={Row} className='align-items-center'>
            <Form.Label as="legend" column sm={3}>Status:</Form.Label>
            <Col sm={9}>
              <Form.Check inline id='addStatusRadio1' type="radio" label="Queued" name='mediaStatus' value='queued'
               checked={this.state.mediaStatus === 'queued'} onChange={this.handleChange}/>
              <Form.Check inline id='addStatusRadio2' type="radio" label="In Progress" name='mediaStatus' value='in progress'
               checked={this.state.mediaStatus === 'in progress'} onChange={this.handleChange}/>
              <Form.Check inline id='addStatusRadio3' type="radio" label="Completed" name='mediaStatus' value='completed'
               checked={this.state.mediaStatus === 'completed'} onChange={this.handleChange}/>
            </Col>
          </Form.Group>
        </fieldset>

        {/*comments input*/}
        <Form.Group as={Row}>
          <Form.Label column sm={3}>Comments:</Form.Label> 
          <Col sm={9}>
            {(this.state.comments.length > 0) && this.state.comments.map(comment => <p className='form-label'>{comment}</p>)}
            <Form.Control type='text' placeholder='...' onKeyDown={this.handleAddComment} />
          </Col>
        </Form.Group>

        {/*submit button*/}
        <Form.Group as={Row}>
          <Col sm={{ span: 9, offset: 3 }}>
            <Link to='/' onClick={this.handleSubmit} className='btn btn-primary'>Add</Link>
          </Col>
        </Form.Group>

      </Form>
    </Container>
    );
  }
}

export default AddItem;
