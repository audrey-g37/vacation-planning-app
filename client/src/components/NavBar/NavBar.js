import React from "react";
// import { Route, Link, useRouteMatch } from 'react-router-dom';
import "./NavBar.css";
// import { Tab, Tabs,  } from "@mui/material"
// import { useRouteMatch } from "react-router";

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
<h1>This is the NavBar</h1>
  {/* <Tabs centered>
  <Tab value="/dashboard" label="Dashboard" to="/dashboard" />
  <Tab value="/" label="Logout" to="/" />
  <Tab value="/viewtrips" label="View Trips" to="/viewtrips"/>
  <Tab value="/view-tasks" label="View-Tasks" to="/view-tasks" />
  <Tab value="/view-budget" label="View Budget" to="/view-budget" />
  <Tab value="/view-trip/:id" label="View Trip" to="/view-trip/"/> */}
{/* </Tabs> */}
</>
  )
};

export default NavBar;
