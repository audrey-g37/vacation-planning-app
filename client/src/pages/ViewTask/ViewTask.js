import React from "react";
import "./ViewTask.css";
import { useQuery } from "@apollo/client";
import { QUERY_TASKS, QUERY_TRIP } from "../../utils/queries";
import { Table, Form, Button } from "react-bootstrap";
import { REMOVE_TASK } from "../../utils/mutations";

const ViewTask = () => {
  // const [removeTask, { error }] = useMutation(REMOVE_TASK, {
  //   update(cache, { data: { removeTask } }) {
  //     try {
  //       cache.writeQuery({
  //         query: QUERY_ME,
  //         data: { me: removeTask },
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   },
  // });
  // const handleRemoveTask = async (task) => {
  //   try {
  //     const { data } = await REMOVE_TASK({
  //       variables: { task },
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
            <th>Status Date</th>
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
                    onClick={() => handleRemoveTask(task)}
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
    </main>
  );
};

export default ViewTask;
