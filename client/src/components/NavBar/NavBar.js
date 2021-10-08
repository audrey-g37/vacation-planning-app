import React from "react";
import "./NavBar.css";
import { Tab, Tabs } from "@mui/material"

const NavBar = () => {
  return (
<>
  <Tabs value={value} onChange={handleChange} centered>
  <Tab href="/dashboard" label="Dashboard" />
  <Tab href="/" label="Logout" />
  <Tab href="/viewtrips" label="View Trips" />
  <Tab href="/view-tasks" label="View-Tasks" />
  <Tab href="/view-budget" label="View Budget" />
  <Tab href="/view-trip" label="View Trip" />
</Tabs>
</>
  )
};

export default NavBar;
