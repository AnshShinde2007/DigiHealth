import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import logo from "../assets/logo.png";

function AppNavbar() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" >
          <img src={logo} alt="DigiHealth" height="60" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left-side Nav Links */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>

            {!isAuthenticated ? (
              <Button
                variant="outline-primary"
                onClick={() => loginWithRedirect()}
              >
                Log In
              </Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/records">Patient Records</Nav.Link>
                <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Button
                  variant="outline-danger"
                  className="ms-2"
                  onClick={() =>
                    logout({ logoutParams: { returnTo: window.location.origin } })
                  }
                >
                  Log Out
                </Button>
              </>
            )}
          </Nav>

          {/* Profile Image (Right-aligned) */}
          {isAuthenticated && (
            <div className="d-flex align-items-center ms-auto">
              <img
                src={user.picture}
                alt="profile"
                className="rounded-circle"
                style={{ width: "40px", height: "40px" }}
              />
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
