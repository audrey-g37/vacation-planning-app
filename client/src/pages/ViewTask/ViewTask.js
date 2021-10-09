import React from "react";
import "./ViewTask.css";
import { useQuery } from "@apollo/client";
import { QUERY_TASKS } from "../../utils/queries";
// import DeleteIcon from "@mui/icons-material/Delete";
// import IconButton from "@mui/material/IconButton";
// import { DataGrid } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";


const ViewTask = () => {
  const { tripId } = useParams();
  const { loading, data } = useQuery(QUERY_TASKS);
  const tasks = data?.tasks || [];
  console.log(tasks);

  const columns = [
    { field: "title", headerName: "Title", width: 150 },
    { field: "details", headerName: "Details", width: 150 },
    { field: "dueDate", headerName: "Due Date", type: "Date", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "assignee", headerName: "Assignee", width: 150 },
  ];

  const rows = tasks.map((task) => ({
    title: task.title,
    details: task.details,
    dueDate: task.dueDate,
    status: task.status,
    assignee: task.assignee,
  }));



  console.log(rows);

  return (
    <main>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </main>
  );

};

export default ViewTask;
