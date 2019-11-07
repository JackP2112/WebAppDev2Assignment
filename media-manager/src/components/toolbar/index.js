import React, { Component } from 'react';
import { Fade, Container, ButtonToolbar, ButtonGroup, DropdownButton, Dropdown, Button, ToggleButton, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './style.css';
import ExportMenu from '../exportMenu/';

class Toolbar extends Component {

  constructor(props){
    super(props);

    this.state = {
      selectItems: false
    }

    this.handleSelectItem = this.handleSelectItem.bind(this);
  }

  handleSelectItem = event => {
    this.setState({
      selectItems: !(this.state.selectItems)
    });
  }

  render(){
    return(
      <Navbar bg="dark" variant="dark" className='mb-2'>
        <Navbar.Brand>🗏 MediaManager</Navbar.Brand>
          <Nav>
            <Button variant='link' className='nav-link'>New Item</Button>
            <Dropdown title='Export' as={NavDropdown}>
              <Dropdown.Menu as={ExportMenu} />
            </Dropdown>
            <ButtonGroup toggle className='ml-3'>
              <ToggleButton type='checkbox' variant='outline-dark' className='nav-link' checked={this.state.selectItems} onChange={this.handleSelectItem}>Select Items</ToggleButton>
            </ButtonGroup>
            <Fade in={this.state.selectItems}>
              <ButtonGroup>
                <Button variant='outline-dark' className='nav-link'>Edit</Button>
                <Button variant='outline-dark' className='nav-link'>Delete</Button>
              </ButtonGroup>
            </Fade>
          </Nav>
      </Navbar>
    );
  }
}

export default Toolbar;
