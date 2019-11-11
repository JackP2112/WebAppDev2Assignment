import React from 'react';
import { Fade, ButtonGroup, Dropdown, Button, ToggleButton, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.css';
import ExportMenu from '../exportMenu/';

const Toolbar = (props) => (

    <Navbar bg="dark" variant="dark" className='mb-2'>
      <Link to='/' as={Navbar.Brand} className='navbar-brand'>🗏 MediaManager</Link>
        <Nav>
          <Link to='add-item' id='add-item-link' className='nav-link' >New Item</Link>
          <Dropdown title='Export' as={NavDropdown}>
            <Dropdown.Menu as={ExportMenu} />
          </Dropdown>
          <ButtonGroup toggle className='ml-3'>
            <ToggleButton type='checkbox' variant='outline-dark' className='nav-link' checked={props.isSelecting} onChange={props.toggleSelecting}>Select Items</ToggleButton>
          </ButtonGroup>
          <Fade in={props.isSelecting}>
            <ButtonGroup>
              <Button variant='outline-dark' className='nav-link'>Edit</Button>
              <Button variant='outline-dark' className='nav-link' onClick={props.deleteItem}>Delete</Button>
            </ButtonGroup>
          </Fade>
        </Nav>
    </Navbar>
);

export default Toolbar;
