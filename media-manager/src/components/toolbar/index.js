import React from 'react';
import { Container, ButtonToolbar, ButtonGroup, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import ExportMenu from '../exportMenu/';

const Toolbar = () => (
  //<Container>
  //    <Button>+ New Item</Button>
      <Dropdown>
        <Dropdown.Toggle>Export</Dropdown.Toggle>
        <Dropdown.Menu as={ExportMenu} />
      </Dropdown>
  //</Container>
);

export default Toolbar;
