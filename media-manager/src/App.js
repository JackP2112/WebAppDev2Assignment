import React, { Component } from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import Toolbar from './components/toolbar/';
import SearchBar from './components/searchBar/';
import MainView from './components/mainView/';
import './App.scss';
import localCache from "./localCache";
import request from "superagent";

class App extends Component {

  state = {
    selectedItems: [],
    searchText: '',
    mediaType: 'all',
    mediaStatus: 'in progress'
  };

  componentDidMount() {
    console.log("componentDidMount of App");
    request.get("http://localhost:3001/media").end((error, res) => {
      if (res) {
        let media = JSON.parse(res.text);
        localCache.populate(media);
        this.setState({});
      } else {
        console.log(error);
      }
    });
  }

  statusMap(statusName) { //map status name to database status value
    switch (statusName){
      case 'queued':
        return -1;
      case 'in progress':
        return 0;
      case 'completed':
        return 1;
    }
  }

  updateFilter(event) {
    this.setState({
        [event.target.name]: event.target.value.toLowerCase()
      });
  }

  getItems = () => {
    let titleMatch = new RegExp('\\b'+this.state.searchText); //match only from start of words
    return localCache.getAll()
      .filter(
        item => (
          (item.title.toLowerCase().search(titleMatch) !== -1) &&
          (this.state.mediaType === 'all' || this.state.mediaType === item.type) &&
          (this.statusMap(this.state.mediaStatus) === item.itemStatus)
        )
      )
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
      <Container fluid>
        <Toolbar />
        <Row>
          <SearchBar text={this.state.searchText} mediaType={this.state.mediaType} mediaStatus={this.state.mediaStatus} handleChange={this.updateFilter.bind(this)}/>
          <Col>
            <MainView items={this.getItems()} updateSelected={this.updateSelected.bind(this)} isSelected={(id) => this.state.selectedItems.includes(id)}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
