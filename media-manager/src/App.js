import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Toolbar from './components/toolbar/';
import SearchBar from './components/searchBar/';
import MainView from './components/mainView/';
import AddItem from './components/addItem/';
import ViewItem from './components/viewItem/';

import * as api from './api';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isSelecting: false,
      selectedItems: [],
      searchText: '',
      mediaType: 'all',
      mediaStatus: 'in progress',
      media: [],
      images: []
    };

    this.updateFilter = this.updateFilter.bind(this);
    this.toggleSelecting = this.toggleSelecting.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    //this.deleteItem = this.deleteItem.bind(this);
    //this.addItem = this.addItem.bind(this);
  }

  componentDidMount(){
    api.getAll().then(resp => {
      this.setState({
        media: resp.media,
        images: resp.images
      });
    }).catch(console.error);
  };

  statusMap(statusName) { //map status name to database status value
    switch (statusName){
      case 'queued':
        return -1;
      case 'in progress':
        return 0;
      case 'completed':
        return 1;
      default:
        return -1;
    }
  }

  updateFilter(event) {
    this.setState({
        [event.target.name]: event.target.value.toLowerCase()
      });
  }

  getItems = () => {
    if (this.state.media && this.state.media.length > 0){
      let titleMatch = new RegExp('\\b'+this.state.searchText); //match only from start of words
      return this.state.media
        .filter(
          item => (
            (item.title.toLowerCase().search(titleMatch) !== -1) &&
            (this.state.mediaType === 'all' || this.state.mediaType === item.type) &&
            (this.statusMap(this.state.mediaStatus) === item.status)
          )
        )
    }
  }

  getItem = (id) => ( //get item by url id
    this.state.media
      .filter(item => item.title.toLowerCase().replace(/[^\w^\d]/g,'-')+'-'+item.type+'-'+item.releaseDate === id)[0]
  );

  //return image for media in base64
  getImage = (_id) => {
    const images = this.state.images;
    for (let i=0;i<images.length;i++){
      if (images[i].media === _id) return images[i].data;
    }
  };

  toggleSelecting(event) {
    if(this.state.isSelecting === true){
      this.setState({
        selectedItems: []
      });
    }
    this.setState({
      isSelecting: !(this.state.isSelecting)
    });
  }

  updateSelected(id) {
    let items = this.state.selectedItems;
    let index = items.indexOf(id);
    if (index >= 0){ //if already selected
      items.splice(index, 1); //remove
    }
    else {
      items.push(id); //add
    }
    this.setState({
      selectedItems: items
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Container fluid className='px-0'>
        <Toolbar isSelecting={this.state.isSelecting} toggleSelecting={this.toggleSelecting} deleteItem={this.deleteItem}/>
          <Row className='pl-4'>
            <SearchBar text={this.state.searchText} mediaType={this.state.mediaType} mediaStatus={this.state.mediaStatus} handleChange={this.updateFilter} id='search-bar'/>
            <Col>
              <Switch>
                <Route exact path='/add-item' render={(props) => <AddItem addItem={this.addItem} {...props} />} />
                <Route exact path='/item/:id' render={(props) => <ViewItem getItem={this.getItem} getImage={this.getImage} {...props} />} />
                <Route
                  exact path='/'
                  render={(props) => <MainView items={this.getItems()} isSelecting={this.state.isSelecting} updateSelected={this.updateSelected} isSelected={(id) => this.state.selectedItems.includes(id)} getImage={this.getImage} {...props}/> }
                />
                <Redirect from='*' to='/' />
              </Switch>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
