import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import popcornLogo from "../assets/popcorn.png";

function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <img
            src={popcornLogo}
            alt="Popcorn Vault Logo"
            width="32"
            height="32"
            className="me-2"
          />
          Popcorn Vault
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Movies</Nav.Link>
            <Nav.Link as={NavLink} to="/watchlist">Watchlist</Nav.Link>
            <Nav.Link as={NavLink} to="/watched">Watched</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
