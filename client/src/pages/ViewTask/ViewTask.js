import React from "react";
import "./ViewTask.css";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_TASKS, QUERY_TASK } from "../../utils/queries";
import { Table, Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { REMOVE_TASK, ADD_TASK } from "../../utils/mutations";
import { useParams } from "react-router-dom";
import AddTask from "./AddTask";

const ViewTask = () => {
  // const handleRemoveTask = (taskId) => {
  // }
  // const remove = () =>{
  //   if (deleting) return;
  //   deleteTodo({
  //     variables: {taskId: task._id}
  //   })
  // }
  // const [removeTask, { data, loading, error }] = useMutation(REMOVE_TASK, {
  //   variables: { _id: taskId },
  // });

  const { loading, data } = useQuery(QUERY_TASKS);
  const allTasks = data?.tasks || [];
  console.log(allTasks);

  return (
    <main>
      <Table className="Table" responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Details</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Assignee</th>
            <th>Delete Task</th>
          </tr>
        </thead>
        <tbody>
          {allTasks.length > 0 ? (
            allTasks.map((task) => (
              <tr>
                <td>{task.title}</td>
                <td>{task.details}</td>
                <td>{task.dueDate}</td>
                <td>{task.status}</td>
                <td>{task.assignee}</td>
                <td>
                  {" "}
                  <button
                    className="btn btn-sm btn-danger ml-auto"
                    value={task.taskId}
                    // onClick={(taskId) => removeTask(taskId)}
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
      <AddTask />
    </main>
  );
};

export default ViewTask;
