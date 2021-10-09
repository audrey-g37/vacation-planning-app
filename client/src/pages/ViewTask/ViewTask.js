import React from "react";
import "./ViewTask.css";
import { useQuery } from "@apollo/client";
import { QUERY_TASKS } from "../../utils/queries";
// import DeleteIcon from "@mui/icons-material/Delete";
// import IconButton from "@mui/material/IconButton";
// import { DataGrid } from "@mui/x-data-grid";

const ViewTasks = () => {
  const { loading, data } = useQuery(QUERY_TASKS);
  const tasks = data?.tasks || [];

  const columns = [
    { field: "title", headerName: "Title", width: 70 },
    { field: "details", headerName: "Details", width: 70 },
    { field: "dueDate", headerName: "Due Date", type: "Date", width: 70 },
    { field: "status", headerName: "Status", width: 70 },
    { field: "assignee", headerName: "Assignee", width: 70 },
  ];

  const rows = tasks.map((task) => ({
    title: task.title,
    details: task.details,
    dueDate: task.dueDate,
    status: task.status,
    assignee: task.assignee,
  }));

  // return (
  //   <main>
  //     <DataGrid
  //       rows={rows}
  //       columns={columns}
  //       pageSize={5}
  //       rowsPerPageOptions={[5]}
  //       checkboxSelection
  //     />
  //   </main>
  // );
};

export default ViewTasks;
