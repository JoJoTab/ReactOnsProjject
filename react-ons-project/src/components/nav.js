import {Nav, NavItem, Navbar, NavDropdown, Form, Button, FormControl} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Home from './home';
import Job from './job';


function Navigation(){
  const [activeKey, setActiveKey] = useState('home');

  function onSelect(key) {
    setActiveKey(key);
  }

  function renderContent() {
    switch (activeKey) {
      case 'home':
        return <Home />;
      case 'job':
        return <Job />;
      default:
        return null;
    }
  }

  return(
    <div className='Navigation'>
      <Nav fill variant="tabs" activeKey={activeKey} onSelect={onSelect}>
        <Nav.Item>
          <Nav.Link eventKey="home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="job">Job</Nav.Link>
        </Nav.Item>
      </Nav>
      {renderContent()}
    </div>
  );
}

export default Navigation;


// function Navigation(){
//   const [activeKey, setActiveKey] = useState('home');

//   function renderContent() {
//     switch (activeKey) {
//       case 'home':
//         return <Home />;
//       case 'job':
//         return <Job />;
//       default:
//         return null;
//     }
//   }

//   return(
//     <div className='Navigation'>
//       <Nav fill variant="tabs" defaultActiveKey={activeKey}>
//         <Nav.Item>
//           <Nav.Link eventKey="home" onClick={() => setActiveKey('home')}>Active</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link eventKey="job" onClick={() => setActiveKey('job')}>Job</Nav.Link>
//         </Nav.Item>
//       </Nav>
//       {renderContent()}
//     </div>
//   );
// }

// export default Navigation;