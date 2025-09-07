import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Navbar, Nav, Button } from 'react-bootstrap';

function AppNavbar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">DigiHealth</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
          {isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/records">Patient Records</Nav.Link>
              <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            </>
          )}
        </Nav>
        {isAuthenticated ? (
          <Button variant="outline-primary" onClick={() => logout({ returnTo: window.location.origin })}>Log Out</Button>
        ) : (
          <Button variant="outline-primary" onClick={() => loginWithRedirect()}>Log In</Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;
