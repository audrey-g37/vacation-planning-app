import React, { lazy, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Row, Form, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { REMOVE_TASK, ADD_TASK } from "../../utils/mutations";
import Auth from "../../utils/auth"


const AddTask = () => {
  const tripId = Auth.getTripId();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState(false);
  const checkboxEl = document.getElementById("assign-checkbox");

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "details") {
      setDetails(value);
    } else if (name === "dueDate") {
      setDueDate(value);
    } else if (name === "assignee") {
      setAssignee(value);
    } else {
      setStatus(checkboxEl.checked)
    }
  };

  const [addTask, { error }] = useMutation(ADD_TASK);
  // if (loading) return "Submitting...";
  // if (error) return `Submission error! ${error.message}`;

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addTask({
      variables: {
        tripId: tripId,
        title: title,
        details: details,
        dueDate: dueDate,
        status: status,
        assignee: assignee,
      },
    }).then((data) => {
      // console.log(data);
      setTitle("");
      setDetails("");
      setDueDate("");
      setAssignee("");
    });
    window.location.reload()
  };

  return (
      <div className="add-task">
        <Form>
          <h3>Add A New Task</h3>
          <Form.Group className="mb-3">
            <Form.Label>Title*</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Due Date*</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={dueDate}
              onChange={handleInputChange}
            />
            <Form.Group id="checkbox"className="mb-3">
              <Form.Check
              id="assign-checkbox"
                type="checkbox"
                name="status"
                label="Check if already completed!"
                onChange={handleInputChange}
              ></Form.Check>
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Assignee*</Form.Label>
            <Form.Control
              type="text"
              name="assignee"
              value={assignee}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Details</Form.Label>
            <Form.Control
              type="text"
              name="details"
              value={details}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button
            className="add-trip-button"
            variant="dark"
            onClick={handleFormSubmit}
          >
            Add Task
          </Button>
        </Form>
      </div>
  );
};

export default AddTask;
