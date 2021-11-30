import React from "react";
// import { Route, Link, useRouteMatch } from 'react-router-dom';
import "./NavBar.css";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Auth from "../../utils/auth";


const NavBar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

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
          <Navbar.Brand className = "app-title">GRIP</Navbar.Brand>
          <Nav className="me-auto">
            {Auth.loggedIn() ? (
              <>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/view-trips">View Trips</Nav.Link>
            </>) : (
            <>
          <Nav.Link href="/">Login</Nav.Link>
          <Nav.Link href="/signup">Sign Up</Nav.Link>
          </>
            )}
          </Nav>
          <Nav className="Justify-content-end">
            <Button variant="light" onClick={logout}>Logout</Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
