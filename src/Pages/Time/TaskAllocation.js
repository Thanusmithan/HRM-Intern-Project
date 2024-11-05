// // import React, { useState } from "react";
// // import {
// //   Table,
// //   Button,
// //   Card,
// //   Form,
// //   Row,
// //   Col,
// //   Modal,
// //   Breadcrumb,
// // } from "react-bootstrap";
// // import { Link } from "react-router-dom";

// // const Taskallocation = () => {
// //   const [showForm, setShowForm] = useState(false);
// //   const [tasks, setTasks] = useState([
// //     {
// //       id: "001",
// //       name: "UI Design",
// //       assignedTo: "Jeremy Neigh",
// //       assignedBy: "Saman Silva",
// //       priority: "High",
// //       estimatedTime: "4h",
// //       deadline: "2024-10-15",
// //       description:
// //         "Design user interface for the main application page using Figma and Adobe tools.",
// //     },
// //     {
// //       id: "002",
// //       name: "API test",
// //       assignedTo: "Emily Johnson",
// //       assignedBy: "Sunil Jayasinghe",
// //       priority: "Medium",
// //       estimatedTime: "6h",
// //       deadline: "2024-10-20",
// //       description:
// //         "Develop and integrate APIs for frontend communication and data flow.",
// //     },
// //     {
// //       id: "003",
// //       name: "Database Setup",
// //       assignedTo: "Mark Smith",
// //       assignedBy: "Sunil Jayasinghe",
// //       priority: "Low",
// //       estimatedTime: "6h",
// //       deadline: "2024-10-25",
// //       description: "Develop and integrate.",
// //     },
// //   ]);

// //   const [formValues, setFormValues] = useState({
// //     taskName: "",
// //     assignedTo: "",
// //     assignedBy: "",
// //     priority: "",
// //     estimatedTime: "",
// //     deadline: "",
// //     description: "",
// //   });

// //   const [editTaskId, setEditTaskId] = useState(null);
// //   const [showDeleteModal, setShowDeleteModal] = useState(false);
// //   const [taskToDelete, setTaskToDelete] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState(""); // For search functionality

// //   const filteredTasks = tasks.filter((task) =>
// //     task.name.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   const toggleForm = () => {
// //     setShowForm((prev) => !prev);
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormValues((prevValues) => ({
// //       ...prevValues,
// //       [name]: value,
// //     }));
// //   };

// //   const handleSubmit = (event) => {
// //     event.preventDefault();

// //     const newTask = {
// //       id: editTaskId ? editTaskId : `00${tasks.length + 1}`,
// //       name: formValues.taskName,
// //       assignedTo: formValues.assignedTo,
// //       assignedBy: formValues.assignedBy,
// //       priority: formValues.priority,
// //       estimatedTime: formValues.estimatedTime,
// //       deadline: formValues.deadline,
// //       description: formValues.description,
// //     };

// //     if (editTaskId !== null) {
// //       setTasks((prevTasks) =>
// //         prevTasks.map((task) =>
// //           task.id === editTaskId ? { ...newTask, id: editTaskId } : task
// //         )
// //       );
// //     } else {
// //       setTasks((prevTasks) => [...prevTasks, newTask]);
// //     }

// //     // Clear form data
// //     setFormValues({
// //       taskName: "",
// //       assignedTo: "",
// //       assignedBy: "",
// //       priority: "",
// //       estimatedTime: "",
// //       deadline: "",
// //       description: "",
// //     });
// //     setEditTaskId(null);
// //     setShowForm(false);
// //   };

// //   const handleEdit = (task) => {
// //     setFormValues({
// //       taskName: task.name,
// //       assignedTo: task.assignedTo,
// //       assignedBy: task.assignedBy,
// //       priority: task.priority,
// //       estimatedTime: task.estimatedTime,
// //       deadline: task.deadline,
// //       description: task.description,
// //     });
// //     setEditTaskId(task.id);
// //     setShowForm(true);
// //   };

// //   const handleDelete = () => {
// //     setTasks((prevTasks) =>
// //       prevTasks.filter((task) => task.id !== taskToDelete)
// //     );
// //     setShowDeleteModal(false);
// //   };

// //   const confirmDelete = (taskId) => {
// //     setTaskToDelete(taskId);
// //     setShowDeleteModal(true);
// //   };

// //   const handleCancel = () => {
// //     setFormValues({
// //       taskName: "",
// //       assignedTo: "",
// //       assignedBy: "",
// //       priority: "",
// //       estimatedTime: "",
// //       deadline: "",
// //       description: "",
// //     });
// //     setEditTaskId(null);
// //     setShowForm(false);
// //   };

// //   const truncateDescription = (description) => {
// //     const words = description.split(" ");
// //     if (words.length > 2) {
// //       return `${words[0]} ${words[1]}...`;
// //     }
// //     return description;
// //   };

// //   return (
// //     <div>
// //       <div className="d-flex justify-content-between align-items-center ">

// //           <Breadcrumb className="mr-4 d-flex align-items-center">

// //             {/* set vertical alignment */}
// //             <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
// //               HRM
// //             </Breadcrumb.Item>
// //             <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/task" }}>
// //               Time Management
// //             </Breadcrumb.Item>
// //             <Breadcrumb.Item active className="fs-5">

// //               Task Allocation
// //             </Breadcrumb.Item>
// //           </Breadcrumb>

// //         <div>
// //           <Form.Control
// //             type="text"
// //             placeholder="Search by Task Name"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="mr-2"
// //             style={{ width: "400px" }}
// //           />
// //         </div>
// //       </div>

// //       <Card className="p-4 mt-2">
// //         {showForm && (
// //           <>
// //             <h5 className="text-center mb-4 text-decoration-underline">
// //               {editTaskId ? "Edit Task" : "Create new Task"}
// //             </h5>
// //             <Form onSubmit={handleSubmit} className="mb-4">
// //               <Row>
// //                 <Col md={6}>
// //                   <Form.Group controlId="taskName" className="mb-3">
// //                     <Form.Label>Task Name</Form.Label>
// //                     <Form.Control
// //                       type="text"
// //                       name="taskName"
// //                       value={formValues.taskName}
// //                       onChange={handleInputChange}
// //                       required
// //                     />
// //                   </Form.Group>
// //                 </Col>
// //                 <Col md={6}>
// //                   <Form.Group controlId="assignedTo" className="mb-3">
// //                     <Form.Label>Assigned To</Form.Label>
// //                     <Form.Control
// //                       type="text"
// //                       name="assignedTo"
// //                       value={formValues.assignedTo}
// //                       onChange={handleInputChange}
// //                       required
// //                     />
// //                   </Form.Group>
// //                 </Col>
// //               </Row>
// //               <Row>
// //                 <Col md={6}>
// //                   <Form.Group controlId="assignedBy" className="mb-3">
// //                     <Form.Label>Assigned By</Form.Label>
// //                     <Form.Control
// //                       type="text"
// //                       name="assignedBy"
// //                       value={formValues.assignedBy}
// //                       onChange={handleInputChange}
// //                       required
// //                     />
// //                   </Form.Group>
// //                 </Col>
// //                 <Col md={6}>
// //                   <Form.Group controlId="priority" className="mb-3">
// //                     <Form.Label>Priority</Form.Label>
// //                     <Form.Control
// //                       as="select"
// //                       name="priority"
// //                       value={formValues.priority}
// //                       onChange={handleInputChange}
// //                       required
// //                     >
// //                       <option value="">Select...</option>
// //                       <option value="High">High</option>
// //                       <option value="Medium">Medium</option>
// //                       <option value="Low">Low</option>
// //                     </Form.Control>
// //                   </Form.Group>
// //                 </Col>
// //               </Row>
// //               <Row>
// //                 <Col md={6}>
// //                   <Form.Group controlId="estimatedTime" className="mb-3">
// //                     <Form.Label>Estimated Time</Form.Label>
// //                     <Form.Control
// //                       type="text"
// //                       name="estimatedTime"
// //                       value={formValues.estimatedTime}
// //                       onChange={handleInputChange}
// //                       required
// //                     />
// //                   </Form.Group>
// //                 </Col>
// //                 <Col md={6}>
// //                   <Form.Group controlId="deadline" className="mb-3">
// //                     <Form.Label>Deadline</Form.Label>
// //                     <Form.Control
// //                       type="date"
// //                       name="deadline"
// //                       value={formValues.deadline}
// //                       onChange={handleInputChange}
// //                       required
// //                     />
// //                   </Form.Group>
// //                 </Col>
// //               </Row>
// //               <Form.Group controlId="description" className="mb-3">
// //                 <Form.Label>Description</Form.Label>
// //                 <Form.Control
// //                   as="textarea"
// //                   rows={2}
// //                   name="description"
// //                   value={formValues.description}
// //                   onChange={handleInputChange}
// //                   required
// //                 />
// //               </Form.Group>
// //               <div className="d-flex justify-content-center mt-3">
// //                 <Button type="submit" variant="success" className="mr-2">
// //                   {editTaskId ? "Update Task" : "Create Task"}
// //                 </Button>
// //                 <Button variant="secondary" onClick={handleCancel}>
// //                   Cancel
// //                 </Button>
// //               </div>
// //             </Form>
// //           </>
// //         )}
// //         <div className="d-flex align-items-center justify-between mb-2">
// //           <h5  className="text-blue-800">All Tasks</h5>
// //           <Button variant="primary" onClick={toggleForm}>
// //             Add Task
// //           </Button>
// //         </div>
// //         <Table striped bordered hover className="">
// //           <thead>
// //             <tr>
// //               <th>ID</th>
// //               <th>Task Name</th>
// //               <th>Assigned To</th>
// //               <th>Priority</th>
// //               <th>Estimated Time</th>
// //               <th>Deadline</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredTasks.map((task) => (
// //               <tr key={task.id}>
// //                 <td>{task.id}</td>
// //                 <td>{truncateDescription(task.name)}</td>
// //                 <td>{task.assignedTo}</td>
// //                 <td>{task.priority}</td>
// //                 <td>{task.estimatedTime}</td>
// //                 <td>{task.deadline}</td>
// //                 <td>
// //                   <Button
// //                     variant="warning"
// //                     size="sm"
// //                     className="mr-2"
// //                     onClick={() => handleEdit(task)}
// //                   >
// //                     Edit
// //                   </Button>
// //                   <Button
// //                     variant="danger"
// //                     size="sm"
// //                     onClick={() => confirmDelete(task.id)}
// //                   >
// //                     Delete
// //                   </Button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </Table>
// //       </Card>

// //       {/* delete confirmation modal */}
// //       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Delete Task</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
// //             Cancel
// //           </Button>
// //           <Button variant="danger" onClick={handleDelete}>
// //             Delete
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default Taskallocation;

// //******************************************************************************************************************************** */
// import React, { useState } from "react";
// import {
//   Card,
//   Table,
//   Button,
//   Modal,
//   Form,
//   Row,
//   Col,
//   OverlayTrigger,
//   Tooltip,
//   Breadcrumb,
// } from "react-bootstrap";
// import { Link } from "react-router-dom";

// const TaskAllocation = () => {
//   const [tasks, setTasks] = useState([
//     {
//       id: 1,
//       type: "Individual",
//       name: "Complete Report",
//       department: "Finance",
//       assignedTo: "EMP001",
//       assignedBy: "John Doe",
//       priority: "High",
//       estimatedTime: "2h",
//       deadline: "2024-11-10",
//       description: "Complete the quarterly report analysis.",
//     },
//     {
//       id: 2,
//       type: "Group",
//       name: "Project Kickoff",
//       department: "HR",
//       assignedTo: "EMP002, EMP003",
//       assignedBy: "Jane Smith",
//       priority: "Medium",
//       estimatedTime: "4h",
//       deadline: "2024-11-15",
//       description: "Kickoff meeting for the new project.",
//     },
//     {
//       id: 3,
//       type: "Individual",
//       name: "Prepare Presentation",
//       department: "Engineering",
//       assignedTo: "EMP004",
//       assignedBy: "Mark Johnson",
//       priority: "Low",
//       estimatedTime: "3h",
//       deadline: "2024-11-20",
//       description: "Prepare the final presentation for the client.",
//     },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [newTask, setNewTask] = useState({});
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [taskToDelete, setTaskToDelete] = useState(null);
//   const [departments] = useState(["Finance", "HR", "Engineering", "IT"]);
//   const [employees] = useState({
//     Finance: ["EMP001", "EMP005"],
//     HR: ["EMP002", "EMP006", "EMP007"],
//     Engineering: ["EMP003", "EMP004", "EMP008"],
//     IT: ["EMP009", "EMP010"],
//   });

//   const toggleForm = () => setShowForm(!showForm);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
//   };

//   const handleAddTask = (e) => {
//     e.preventDefault();
//     const task = { ...newTask, id: newTask.id || tasks.length + 1 };
//     setTasks((prevTasks) =>
//       newTask.id
//         ? prevTasks.map((t) => (t.id === newTask.id ? task : t))
//         : [...prevTasks, task]
//     );
//     setNewTask({});
//     setShowForm(false);
//   };

//   const handleEdit = (task) => {
//     setNewTask(task);
//     setShowForm(true);
//   };

//   const confirmDelete = (id) => {
//     setTaskToDelete(id);
//     setShowDeleteModal(true);
//   };

//   const handleDelete = () => {
//     setTasks(tasks.filter((task) => task.id !== taskToDelete));
//     setShowDeleteModal(false);
//     setTaskToDelete(null);
//   };

//   const truncateDescription = (description) => {
//     const words = description.split(" ");
//     return words.length > 2 ? `${words[0]} ${words[1]}` : description;
//   };

//   const filteredTasks = tasks.filter((task) =>
//     task.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-2 ">
//         <Breadcrumb className="mr-4 d-flex align-items-center">
//           <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
//             HRM
//           </Breadcrumb.Item>
//           <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/task" }}>
//             Time Management
//           </Breadcrumb.Item>
//           <Breadcrumb.Item active className="fs-5">
//             Task Allocation{" "}
//           </Breadcrumb.Item>{" "}
//         </Breadcrumb>
//         <div>
//           <Form.Control
//             type="text"
//             placeholder="Search by Task Name"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="mr-2"
//             style={{ width: "400px" }}
//           />
//         </div>
//       </div>

//       <Card className="p-4">
//         {showForm && (
//           <Form onSubmit={handleAddTask} className=" mb-4">
//             <h3 className="d-flex justify-center mb-3 text-blue-800 bg-slate-400 p-3 rounded-md">Add new task</h3>
//             <Row className="mb-4">
//               <Col md={6} >
//                 <Form.Group controlId="taskType" >

//                   <Form.Label  >Task Type</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="type"
//                     value={newTask.type || ""}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="">Select Task Type</option>
//                     <option value="Individual">Individual</option>
//                     <option value="Group">Group</option>
//                   </Form.Control>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="taskName"  >
//                   <Form.Label>Task Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="name"
//                     value={newTask.name || ""}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row >

//             <Row className="mb-4">
//               <Col md={6}>
//                 <Form.Group controlId="department">
//                   <Form.Label>Department</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="department"
//                     value={newTask.department || ""}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="">Select Department</option>
//                     {departments.map((dept) => (
//                       <option key={dept} value={dept}>
//                         {dept}
//                       </option>
//                     ))}
//                   </Form.Control>
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="assignedTo">
//                   <Form.Label>Employee ID</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="assignedTo"
//                     value={newTask.assignedTo || ""}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="">Select Employee ID</option>
//                     {newTask.department &&
//                       employees[newTask.department].map((id) => (
//                         <option key={id} value={id}>
//                           {id}
//                         </option>
//                       ))}
//                   </Form.Control>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mb-4">
//               <Col md={6}>
//                 <Form.Group controlId="assignedBy">
//                   <Form.Label>Assigned By</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="assignedBy"
//                     value={newTask.assignedBy || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="priority">
//                   <Form.Label>Priority</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="priority"
//                     value={newTask.priority || ""}
//                     onChange={handleInputChange}
//                   >
//                     <option value="">Select Priority</option>
//                     <option value="High">High</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Low">Low</option>
//                   </Form.Control>
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mb-4">
//               <Col md={6}>
//                 <Form.Group controlId="estimatedTime">
//                   <Form.Label>Estimated Time</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="estimatedTime"
//                     value={newTask.estimatedTime || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={6}>
//                 <Form.Group controlId="deadline">
//                   <Form.Label>Deadline</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="deadline"
//                     value={newTask.deadline || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row >

//             <Form.Group controlId="description">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 name="description"
//                 rows={3}
//                 value={newTask.description || ""}
//                 onChange={handleInputChange}
//               />
//             </Form.Group>

//             <div className="d-flex justify-center gap-4 mt-4">
//               <Button variant="primary" type="submit">
//                 {newTask.id ? "Update Task" : "Add Task"}
//               </Button>
//               <Button
//                 variant="danger"
//                 onClick={() => {
//                   setShowForm(!showForm);
//                 }}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </Form>
//         )}
//         <div className="d-flex justify-content-between align-items-center">
//           <h5 className="text-blue-800">All Tasks</h5>

//           <div className="d-flex justify-content-end">
//             <Button
//               onClick={toggleForm}
//               className="mt-2 {showForm ? 'hidden' : ''}"
//             >
//               {showForm ? "" : "Add New Task"}
//             </Button>
//           </div>
//         </div>

//         <Table striped bordered hover className="mt-6">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Task Name</th>

//               <th>Assigned To</th>

//               <th>Priority</th>
//               <th>Estimated Time</th>
//               <th>Deadline</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTasks.map((task) => (
//               <tr key={task.id}>
//                 <td>{task.id}</td>
//                 <td>{task.name}</td>

//                 <td>{task.assignedTo}</td>

//                 <td>{task.priority}</td>
//                 <td>{task.estimatedTime}</td>
//                 <td>{task.deadline}</td>
//                 <td>{truncateDescription(task.description)}...</td>
//                 <td>
//                   <OverlayTrigger
//                     placement="top"
//                     overlay={<Tooltip>Edit Task</Tooltip>}
//                   >
//                     <Button
//                       variant="success"
//                       onClick={() => handleEdit(task)}
//                       className="me-2"
//                     >
//                       Edit
//                     </Button>
//                   </OverlayTrigger>
//                   <OverlayTrigger
//                     placement="top"
//                     overlay={<Tooltip>Delete Task</Tooltip>}
//                   >
//                     <Button
//                       variant="danger"
//                       onClick={() => confirmDelete(task.id)}
//                     >
//                       Delete
//                     </Button>
//                   </OverlayTrigger>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Card>

//       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Deletion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleDelete}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default TaskAllocation;

import React, { useState } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Breadcrumb,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const TaskAllocation = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      type: "Individual",
      name: "Complete Report",
      department: "Finance",
      assignedTo: "EMP001",
      assignedBy: "John Doe",
      priority: "High",
      estimatedTime: "2h",
      deadline: "2024-11-10",
      description: "Complete the quarterly report analysis.",
    },
    {
      id: 2,
      type: "Group",
      name: "Project Kickoff",
      department: "HR",
      assignedTo: "EMP002, EMP003",
      assignedBy: "Jane Smith",
      priority: "Medium",
      estimatedTime: "4h",
      deadline: "2024-11-15",
      description: "Kickoff meeting for the new project.",
    },
    {
      id: 3,
      type: "Individual",
      name: "Prepare Presentation",
      department: "Engineering",
      assignedTo: "EMP004",
      assignedBy: "Mark Johnson",
      priority: "Low",
      estimatedTime: "3h",
      deadline: "2024-11-20",
      description: "Prepare the final presentation for the client.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [departments] = useState(["Finance", "HR", "Engineering", "IT"]);
  const [employees] = useState({
    Finance: ["EMP001", "EMP005"],
    HR: ["EMP002", "EMP006", "EMP007"],
    Engineering: ["EMP003", "EMP004", "EMP008"],
    IT: ["EMP009", "EMP010"],
  });

  const toggleForm = () => setShowForm(!showForm);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    const task = { ...newTask, id: newTask.id || tasks.length + 1 };
    setTasks((prevTasks) =>
      newTask.id
        ? prevTasks.map((t) => (t.id === newTask.id ? task : t))
        : [...prevTasks, task]
    );
    setNewTask({});
    setShowForm(false);
  };

  const handleEdit = (task) => {
    setNewTask(task);
    setShowForm(true);
  };

  const confirmDelete = (id) => {
    setTaskToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    setTasks(tasks.filter((task) => task.id !== taskToDelete));
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 2 ? `${words[0]} ${words[1]}` : description;
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <Breadcrumb className="mr-4 d-flex align-items-center">
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

      <Card className="p-4">
        {showForm && (
          <Form onSubmit={handleAddTask} className="mb-4">
            <h3 className="d-flex justify-center mb-4 text-blue-800 bg-slate-400 p-3 rounded-md">
              Allocate task
            </h3>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="taskType">
                  <Form.Label>Task Type</Form.Label>
                  <Form.Control
                    as="select"
                    name="type"
                    value={newTask.type || ""}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Task Type</option>
                    <option value="Individual">Individual</option>
                    <option value="Group">Group</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="taskName">
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newTask.name || ""}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="department">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    as="select"
                    name="department"
                    value={newTask.department || ""}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="assignedTo">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control
                    as="select"
                    name="assignedTo"
                    value={newTask.assignedTo || ""}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Employee ID</option>
                    {newTask.department &&
                      employees[newTask.department].map((id) => (
                        <option key={id} value={id}>
                          {id}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="assignedBy">
                  <Form.Label>Assigned By</Form.Label>
                  <Form.Control
                    type="text"
                    name="assignedBy"
                    value={newTask.assignedBy || "Devid crim"}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="priority">
                  <Form.Label>Priority</Form.Label>
                  <Form.Control
                    as="select"
                    name="priority"
                    value={newTask.priority || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="estimatedTime">
                  <Form.Label>Estimated Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="estimatedTime"
                    value={newTask.estimatedTime || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="deadline">
                  <Form.Label>Deadline</Form.Label>
                  <Form.Control
                    type="date"
                    name="deadline"
                    value={newTask.deadline || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={newTask.description || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <div className="d-flex justify-center gap-4 mt-4">
              <Button variant="primary" type="submit">
                {newTask.id ? "Update Task" : "Add Task"}
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setShowForm(!showForm);
                }}
              >
                Close
              </Button>
            </div>
          </Form>
        )}

        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="text-blue-800">All Tasks</h5>
          <div>
            <Button onClick={toggleForm} className="{showForm ? 'hidden' : ''}">
              {showForm ? "" : "Add New Task"}
            </Button>
          </div>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Task Name</th>
              <th>Assigned To</th>
              <th>Priority</th>
              <th>Estimated Time</th>
              <th>Deadline</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task, index) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.assignedTo}</td>
                <td>{task.priority}</td>
                <td>{task.estimatedTime}</td>
                <td>{task.deadline}</td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{task.description}</Tooltip>}
                  >
                    <span>{truncateDescription(task.description)}...</span>
                  </OverlayTrigger>
                </td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleEdit(task)}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="warning"
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

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
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

export default TaskAllocation;
