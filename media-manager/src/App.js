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
    selectedItems: []
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

  updateSelected (id) {
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
          <SearchBar />
          <Col>
            <MainView items={localCache.getAll()} updateSelected={this.updateSelected.bind(this)} isSelected={(id) => this.state.selectedItems.includes(id)}/>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
