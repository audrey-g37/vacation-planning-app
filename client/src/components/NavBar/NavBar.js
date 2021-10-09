import React from "react";
// import { Route, Link, useRouteMatch } from 'react-router-dom';
import "./NavBar.css";
import { Navbar, Container, Nav } from "react-bootstrap";


const NavBar = () => {

//  const [formState, setFormState] = useState({ username: '', password: '' });


//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setFormState({
//       ...formState,
//       [name]: value,
//     });
//   };

// const routeMatch = useRouteMatch(["/dashboard", "/", "/viewtrips", "/view-tasks", "/view-budget", "/view-trip/:id"])
// const currentTab = routeMatch?.path
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className="justify-content-center">
          <Navbar.Brand>GRIP</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="">View Trips</Nav.Link>
            <Nav.Link href="">View Budget</Nav.Link>
            <Nav.Link href="">View Tasks</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
