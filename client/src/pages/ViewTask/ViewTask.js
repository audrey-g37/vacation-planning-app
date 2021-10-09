import React from "react";
import "./ViewTask.css";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_TASKS, QUERY_ME} from "../../utils/queries";
import { REMOVE_TASK } from "../../utils/mutations";

const ViewTask = () => {
  const [removeTask, { error }] = useMutation(REMOVE_TASK, {
    update(cache, { data: { removeTask } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeTask },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });
  const handleRemoveTask = async (task) => {
    try {
      const { data } = await REMOVE_TASK({
        variables: { task },
      });
    } catch (err) {
      console.error(err);
    }
  };
  
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
      <button
        className="btn btn-sm btn-danger ml-auto"
        onClick={() => handleRemoveSkill(skill)}
      >
        X
      </button>
    </main>
  );
};
export default ViewTask