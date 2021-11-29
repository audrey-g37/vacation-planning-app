import React from "react";
import { Link } from "react-router-dom";
import "./ViewTask.css";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_TRIP, QUERY_TASKS, QUERY_TASK } from "../../utils/queries";
import { Table, Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { REMOVE_TASK, ADD_TASK, UPDATE_TASK } from "../../utils/mutations";
import { useParams } from "react-router-dom";
import AddTask from "./AddTask";
import Auth from "../../utils/auth";

const ViewTask = () => {
  const tripId = Auth.getTripId();
  const userId = Auth.getUserId();
  const { data: data1 } = useQuery(QUERY_TRIP, {
    variables: { tripId: tripId, userId: userId },
  });
  const tripData = data1?.trip || [];
  // console.log(tripData);

  const { loading, data } = useQuery(QUERY_TASKS, {variables: {tripId: tripId }});
  const allTasks = data?.tasks || [];
  // console.log(allTasks);

  const [removeTask, { error }] = useMutation(REMOVE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);

  const viewEditTask = (event) => {
    event.preventDefault();
    const {value} = event.target;

    window.location.replace(`/${tripId}/view-tasks/${value}`)

  }

  const deleteTask = (event) => {
    event.preventDefault();
    const {value} = event.target;
    // console.log(value);
    // console.log(TripIdToUse);
     removeTask({
      variables: {
        tripId: tripId,
        taskId: value
      }
    }).then((data) => {
      window.location.reload()
    })
  }

  return (
    <main className="task">
      <Link to={`/view-trip/${tripId}`}>
        <Button id="back-to-trip-details" >
          Back to Trip Details
        </Button>
      </Link>
      <h2 className="all-tasks-title">Tasks: {tripData.title}</h2>
      <div className="task-tables">
      <div className="current-tasks">
      <Table className="all-tasks-table" >
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Assignee</th>
            <th>Details</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allTasks.length > 0 ? (
            allTasks.map((task) => (
              <tr>
                <td>{task.title}</td>
                <td>{task.dueDate}</td>
                <td>{
                  task.status===true? "Completed" : "Incomplete"
                }</td>
                <td>{task.assignee}</td>
                <td>{task.details}</td>
                <td className="task-mutations">
                {" "}
                  <button
                    className="task-btn btn btn-sm btn-warning ml-auto" value={task._id} onClick={viewEditTask}>
                    Edit
                  </button>
                  {" "}
                  <button
                    className="task-btn btn btn-sm btn-danger ml-auto"
                    value={task._id}
                    onClick={deleteTask}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </Table>
      </div>
      <AddTask />
      </div>
    </main>
  );
};

export default ViewTask;
