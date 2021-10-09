import React from "react";
import "./Footer.css";
import { Navbar, Container, Nav } from "react-bootstrap";

const Footer = () => {

  return (
    <>
    <Navbar bg="dark" variant="dark" fixed="bottom">
      <Container className="justify-content-center">
        <Navbar.Brand href="https://github.com/Korbin-Sargent/vacation-planning-app" target="_blank">
        <img
          alt="Github repo link"
          src="/images/github_logo.png"
          width="30" 
          height="30"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
    <Nav>
        <Nav.Link href="https://github.com/audrey-g37" target="_blank">Audrey Gillies</Nav.Link>
        <Nav.Link href="https://github.com/gim928" target="_blank">Gina Im</Nav.Link>
        <Nav.Link href="https://github.com/adrianauch" target="_blank">Adrian Auchterlonie</Nav.Link>
        <Nav.Link href="https://github.com/Ecalderon10" target="_blank">Edgar Calderon</Nav.Link>
        <Nav.Link href="https://github.com/Korbin-Sargent" target="_blank">Korbin Sargent</Nav.Link>
    </Nav>
    </Container>
    </Navbar>
    </>
  )
};

export default Footer;
