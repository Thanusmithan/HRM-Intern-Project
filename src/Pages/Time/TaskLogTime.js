// import React from 'react';
// import { Table, Button, Card } from 'react-bootstrap';

// const TaskLogTime = () => {
//   // mytsks sample data
//   const tasks = [
//     {
//       id: 1,
//       name: "UI Design",
//       priority: "High",
//       startTime: "09:00 AM",
//       endTime: "01:00 PM",
//       estimatedTime: "4h",
//       deadline: "2024/10/15",
//       status: "Completed",
//     },
//     {
//       id: 2,
//       name: "API Development",
//       priority: "Medium",
//       startTime: "10:00 AM",
//       endTime: "",
//       estimatedTime: "6h",
//       deadline: "2024/10/20",
//       status: "In Progress",
//     },
//     {
//       id: 3,
//       name: "Database Setup",
//       priority: "Low",
//       startTime: "",
//       endTime: "",
//       estimatedTime: "2h",
//       deadline: "2024/10/18",
//       status: "Pending",
//     },
//     {
//       id: 4,
//       name: "Frontend Development",
//       priority: "High",
//       startTime: "02:00 PM",
//       endTime: "",
//       estimatedTime: "8h",
//       deadline: "2024/10/25",
//       status: "In Progress",
//     },
//     {
//       id: 5,
//       name: "Deployment",
//       priority: "Medium",
//       startTime: "",
//       endTime: "",
//       estimatedTime: "3h",
//       deadline: "2024/10/30",
//       status: "Pending",
//     },
//   ];

//   // for handle actions based on status
//   const renderActionButton = (status) => {
//     switch (status) {
//       case "Completed":
//         return <Button variant="primary">View</Button>;
//       case "In Progress":
//         return <Button variant="success">End Task</Button>;
//       case "Pending":
//         return <Button variant="warning">Start Task</Button>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div>
//       <h4>Work on Tasks</h4>
//       <Card className="p-4 mt-4">
//         <h5>My Tasks</h5>
//         <Table bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Task Name</th>
//               <th>Priority</th>
//               <th>Start Time</th>
//               <th>End Time</th>
//               <th>Estimated Time</th>
//               <th>Deadline</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task) => (
//               <tr key={task.id}>
//                 <td>{task.name}</td>
//                 <td>{task.priority}</td>
//                 <td>{task.status === "Pending" ? "" : task.startTime}</td>
//                 <td>{task.status === "Completed" ? task.endTime : ""}</td>
//                 <td className='text-center'>{task.estimatedTime}</td>
//                 <td>{task.deadline}</td>
//                 <td>{task.status}</td>
//                 <td>{renderActionButton(task.status)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </Card>
//     </div>
//   );
// };

// export default TaskLogTime;


//-----------------------------------------------Base code--------------------------------
import React, { useState } from "react";
import { Table, Button, Card, Form ,Breadcrumb} from "react-bootstrap";
import { Link } from "react-router-dom";

// Function to get current time in h:m am/pm format
const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const TaskLogTime = () => {
  const initialTasks = [
    {
      id: 1,
      name: "UI Design",
      priority: "High",
      startTime: "09:00 AM",
      endTime: "01:00 PM",
      estimatedTime: "4h",
      deadline: "2024/10/15",
      status: "Completed",
    },
    {
      id: 2,
      name: "API Development",
      priority: "Medium",
      startTime: "10:00 AM",
      endTime: "",
      estimatedTime: "6h",
      deadline: "2024/10/20",
      status: "In Progress",
    },
    {
      id: 3,
      name: "Database Setup",
      priority: "Low",
      startTime: "",
      endTime: "",
      estimatedTime: "2h",
      deadline: "2024/10/18",
      status: "Pending",
    },
  ];

  // State for tasks and search term
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle starting the task
  const handleStartTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, startTime: getCurrentTime(), status: "In Progress" }
        : task
    );
    setTasks(updatedTasks);
  };

  // Function to handle ending the task
  const handleEndTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, endTime: getCurrentTime(), status: "Completed" }
        : task
    );
    setTasks(updatedTasks);
  };

  // Function to handle viewing completed task
  const handleViewTask = () => {
    alert("You have completed this task");
  };

  // Render action buttons based on task status in the table
  const renderActionButton = (task) => {
    switch (task.status) {
      case "Completed":
        return (
          <Button variant="primary" onClick={handleViewTask}>
            View
          </Button>
        );
      case "In Progress":
        return (
          <Button variant="success" onClick={() => handleEndTask(task.id)}>
            End Task
          </Button>
        );
      case "Pending":
        return (
          <Button variant="warning" onClick={() => handleStartTask(task.id)}>
            Start Task
          </Button>
        );
      default:
        return null;
    }
  };

  // Filter tasks based on the search term
  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
     <div className="d-flex justify-content-between align-items-center ">
       
       <Breadcrumb className="mr-4 d-flex align-items-center">
      
         {/* vertical alignment */}
         <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
           HRM
         </Breadcrumb.Item>
         <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/task" }}>
           Time Management
         </Breadcrumb.Item>
         <Breadcrumb.Item active className="fs-5">
    
       
           Log Time
         </Breadcrumb.Item>
       </Breadcrumb>
        <Form.Control
          type="text"
          placeholder="Search by Task Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '400px', marginLeft: '20px' }} // Adjust styling for the search bar
        />
      </div>

      <Card className="p-4 mt-2">
        <h5  className="text-blue-800">My Tasks</h5>

        <Table bordered hover responsive className="mt-2">
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Priority</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Estimated Time</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.priority}</td>
                <td>{task.startTime || ""}</td>
                <td>{task.endTime || ""}</td>
                <td className="text-center">{task.estimatedTime}</td>
                <td>{task.deadline}</td>
                <td>{task.status}</td>
                <td>{renderActionButton(task)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default TaskLogTime;
