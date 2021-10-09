import React from "react";
import { useParams, Redirect} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import "./Dashboard.css";
import {Row, Col, Container, Table} from 'react-bootstrap'
import { QUERY_TRIP } from "../../utils/queries";
import Auth from '../utils/auth';

const Dashboard = () => {

const { userId } = useParams();

const {loading, data} = useQuery(
  userId? QUERY_TRIP







return(
  <>
 <Table responsive>
  <thead>
    <tr>
      <th>#</th>
      {Array.from({ length: 5 }).map((_, index) => (
        <th key={index}>{{QUERY_TRIP}}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      {Array.from({ length:5 }).map((_, index) => (
        <td key={index}>{{QUERY_TRIP}} {index}</td>
      ))}
    </tr>
  </tbody>
</Table>
</>
)
};

export default Dashboard;
