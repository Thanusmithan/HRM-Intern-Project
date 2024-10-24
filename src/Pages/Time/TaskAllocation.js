import React, { useState } from "react";
import {
  Table,
  Button,
  Card,
  Form,
  Row,
  Col,
  Modal,
  Breadcrumb,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Taskallocation = () => {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: "001",
      name: "UI Design",
      assignedTo: "Jeremy Neigh",
      assignedBy: "Saman Silva",
      priority: "High",
      estimatedTime: "4h",
      deadline: "2024-10-15",
      description:
        "Design user interface for the main application page using Figma and Adobe tools.",
    },
    {
      id: "002",
      name: "API test",
      assignedTo: "Emily Johnson",
      assignedBy: "Sunil Jayasinghe",
      priority: "Medium",
      estimatedTime: "6h",
      deadline: "2024-10-20",
      description:
        "Develop and integrate APIs for frontend communication and data flow.",
    },
    {
      id: "003",
      name: "Database Setup",
      assignedTo: "Mark Smith",
      assignedBy: "Sunil Jayasinghe",
      priority: "Low",
      estimatedTime: "6h",
      deadline: "2024-10-25",
      description: "Develop and integrate.",
    },
  ]);

  const [formValues, setFormValues] = useState({
    taskName: "",
    assignedTo: "",
    assignedBy: "",
    priority: "",
    estimatedTime: "",
    deadline: "",
    description: "",
  });

  const [editTaskId, setEditTaskId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTask = {
      id: editTaskId ? editTaskId : `00${tasks.length + 1}`,
      name: formValues.taskName,
      assignedTo: formValues.assignedTo,
      assignedBy: formValues.assignedBy,
      priority: formValues.priority,
      estimatedTime: formValues.estimatedTime,
      deadline: formValues.deadline,
      description: formValues.description,
    };

    if (editTaskId !== null) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTaskId ? { ...newTask, id: editTaskId } : task
        )
      );
    } else {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    // Clear form data
    setFormValues({
      taskName: "",
      assignedTo: "",
      assignedBy: "",
      priority: "",
      estimatedTime: "",
      deadline: "",
      description: "",
    });
    setEditTaskId(null);
    setShowForm(false);
  };

  const handleEdit = (task) => {
    setFormValues({
      taskName: task.name,
      assignedTo: task.assignedTo,
      assignedBy: task.assignedBy,
      priority: task.priority,
      estimatedTime: task.estimatedTime,
      deadline: task.deadline,
      description: task.description,
    });
    setEditTaskId(task.id);
    setShowForm(true);
  };

  const handleDelete = () => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskToDelete)
    );
    setShowDeleteModal(false);
  };

  const confirmDelete = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };

  const handleCancel = () => {
    setFormValues({
      taskName: "",
      assignedTo: "",
      assignedBy: "",
      priority: "",
      estimatedTime: "",
      deadline: "",
      description: "",
    });
    setEditTaskId(null);
    setShowForm(false);
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 2) {
      return `${words[0]} ${words[1]}...`;
    }
    return description;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center ">
       
          <Breadcrumb className="mr-4 d-flex align-items-center">
         
            {/* set vertical alignment */}
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
              HRM
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/task" }}>
              Time Management
            </Breadcrumb.Item>
            <Breadcrumb.Item active className="fs-5">
       
            
              Task Allocation
            </Breadcrumb.Item>
          </Breadcrumb>
       
        <div>
          <Form.Control
            type="text"
            placeholder="Search by Task Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mr-2"
            style={{ width: "400px" }}
          />
        </div>
      </div>

      <Card className="p-4 mt-2">
        {showForm && (
          <>
            <h5 className="text-center mb-4 text-decoration-underline">
              {editTaskId ? "Edit Task" : "Create new Task"}
            </h5>
            <Form onSubmit={handleSubmit} className="mb-4">
              <Row>
                <Col md={6}>
                  <Form.Group controlId="taskName" className="mb-3">
                    <Form.Label>Task Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="taskName"
                      value={formValues.taskName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="assignedTo" className="mb-3">
                    <Form.Label>Assigned To</Form.Label>
                    <Form.Control
                      type="text"
                      name="assignedTo"
                      value={formValues.assignedTo}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="assignedBy" className="mb-3">
                    <Form.Label>Assigned By</Form.Label>
                    <Form.Control
                      type="text"
                      name="assignedBy"
                      value={formValues.assignedBy}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="priority" className="mb-3">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control
                      as="select"
                      name="priority"
                      value={formValues.priority}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select...</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="estimatedTime" className="mb-3">
                    <Form.Label>Estimated Time</Form.Label>
                    <Form.Control
                      type="text"
                      name="estimatedTime"
                      value={formValues.estimatedTime}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="deadline" className="mb-3">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control
                      type="date"
                      name="deadline"
                      value={formValues.deadline}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="description" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <div className="d-flex justify-content-center mt-3">
                <Button type="submit" variant="success" className="mr-2">
                  {editTaskId ? "Update Task" : "Create Task"}
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </Form>
          </>
        )}
        <div className="d-flex align-items-center justify-between mb-2">
          <h5  className="text-blue-800">All Tasks</h5>
          <Button variant="primary" onClick={toggleForm}>
            Add Task
          </Button>
        </div>
        <Table striped bordered hover className="">
          <thead>
            <tr>
              <th>ID</th>
              <th>Task Name</th>
              <th>Assigned To</th>
              <th>Priority</th>
              <th>Estimated Time</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{truncateDescription(task.name)}</td>
                <td>{task.assignedTo}</td>
                <td>{task.priority}</td>
                <td>{task.estimatedTime}</td>
                <td>{task.deadline}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="mr-2"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => confirmDelete(task.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* delete confirmation modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Taskallocation;
