import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router";
import { QUERY_TASK } from "../../utils/queries";
import { UPDATE_TASK } from "../../utils/mutations";
import { Container, Card, Row, Button, Form } from "react-bootstrap";
import AuthService from "../../utils/auth";
import moment from "moment";

const EditTask = () => {
  const taskIdVar = useParams();
  const taskIdToUse = taskIdVar.id;
  console.log(taskIdToUse);

  const TripIdToUse = AuthService.getTripId;

  const { loading, data } = useQuery(QUERY_TASK, {
      variables: {taskId: taskIdToUse}
  });

  const taskData = data?.task || [];
//   console.log(taskData);
  const dateToChange = taskData.dueDate;

  const [updateTask] = useMutation(UPDATE_TASK);

const [title, setTitle] = useState(taskData.title);
  const [details, setDetails] = useState(taskData.details);
  const [dueDate, setDueDate] = useState((moment(dateToChange, "MMM, Do, YYYY").format("yyyy-MM-dd")));
  const [assignee, setAssignee] = useState(taskData.assignee);
  const [status, setStatus] = useState(taskData.status);

  const handleInputChange = (event) => {
    event.preventDefault();
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
      setStatus(value);
    }

    console.log({title, details, dueDate, status, assignee})
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    updateTask({
      variables: {
        tripId: TripIdToUse,
        taskId: taskData._id,
        title: title,
        details: details,
        dueDate: dueDate,
        status: status,
        assignee: assignee
      },
    }).then((data) => {
      console.log(data);
      setTitle("");
      setDetails("");
      setDueDate("");
      setAssignee("");
      window.location.reload();
    });
  };

  return (
    <Container className="add-task" fluid="md">
        <Row>
            <Card className = "text-center">
            <Card.Header>{taskData.title}</Card.Header>
            <Card.Body>
                <Card.Title>Status: {
                  taskData.status===true? "Completed" : "Incomplete"
                }</Card.Title>
                <Card.Text>
                    <li>Should be completed by: {taskData.dueDate}</li>
                    <li>Assigned To: {taskData.assignee}</li>
                    {taskData.details? (<li>Details: {taskData.details}</li>
                    ) :("")
                     }
                    
                </Card.Text>
            </Card.Body>
            </Card>
        </Row>
    <Row>
      <Form>
        <h2>Edit Task Below</h2>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            placeholder={taskData.title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="status"
              label="Check to mark this task is complete!"
            ></Form.Check>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            placeholder = {taskData.dueDate}
            value={dueDate}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Assignee</Form.Label>
          <Form.Control
            type="text"
            name="assignee"
            placeholder = {taskData.assignee}
            value={assignee}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Details</Form.Label>
          <Form.Control
            type="text"
            name="details"
            placeholder = {taskData.details}
            value={details}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button
          className="add-trip-button"
          variant="dark"
          onClick={handleFormSubmit}
        >
          Save Edits
        </Button>
      </Form>
    </Row>
  </Container>
  );
};

export default EditTask;
