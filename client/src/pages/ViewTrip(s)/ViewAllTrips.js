import React from "react";
import "./ViewAllTrips.css";

import { useQuery } from '@apollo/client';
import { QUERY_TRIPS } from '../../utils/queries';


const ViewAllTrips = () => {
const {loading, data} = useQuery(QUERY_TRIPS);
const trips = data?.trips || [];

console.log (trips);


  return (
  <>
  <h1>This is the view ALL trips page</h1>
    </>)
};

export default ViewAllTrips;
