// import React, { useState } from "react";
// import {
//   Table,
//   Button,
//   Pagination,
//   OverlayTrigger,
//   Tooltip,
//   Card,
//   Form,
// } from "react-bootstrap";

// function TaskDetails({ setActiveKey }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const tasksPerPage = 6;
//   const [selectedTasks, setSelectedTasks] = useState([]);

 
//   const tasks = [
//     {
//       id: "001",
//       name: "UI Design",
//       assignedTo: "Kamal Perera",
//       assignedBy: "Saman Silva",
//       priority: "High",
//       estimatedTime: "4h",
//       deadline: "2024/10/15",
//       description:
//         "Design user interface for the main application page using Figma and Adobe tools.",
//     },
//     {
//       id: "002",
//       name: "API Development",
//       assignedTo: "Nimal Fernando",
//       assignedBy: "Sunil Jayasinghe",
//       priority: "Medium",
//       estimatedTime: "6h",
//       deadline: "2024/10/20",
//       description:
//         "Develop and integrate APIs for frontend communication and data flow.",
//     },
//     {
//       id: "003",
//       name: "Database Setup",
//       assignedTo: "Sunil Silva",
//       assignedBy: "Kasun Fernando",
//       priority: "Low",
//       estimatedTime: "2h",
//       deadline: "2024/10/18",
//       description:
//         "Set up MySQL database schema and initial configurations for data storage.",
//     },
//     {
//       id: "004",
//       name: "Frontend Development",
//       assignedTo: "Saman Weerasinghe",
//       assignedBy: "Chathura Jayawardena",
//       priority: "High",
//       estimatedTime: "8h",
//       deadline: "2024/10/25",
//       description:
//         "Implement responsive UI components and integrate with backend APIs.",
//     },
//     {
//       id: "005",
//       name: "Deployment",
//       assignedTo: "Chathura Jayawardena",
//       assignedBy: "Dinesh Wijesinghe",
//       priority: "Medium",
//       estimatedTime: "3h",
//       deadline: "2024/10/30",
//       description:
//         "Deploy the final version of the application to production servers.",
//     },
//     {
//       id: "006",
//       name: "Bug Fixing",
//       assignedTo: "Dinesh Wijesinghe",
//       assignedBy: "Kasun Fernando",
//       priority: "High",
//       estimatedTime: "5h",
//       deadline: "2024/10/12",
//       description:
//         "Identify and fix critical bugs reported during the testing phase.",
//     },
//     {
//       id: "007",
//       name: "UI Testing",
//       assignedTo: "Kamal Perera",
//       assignedBy: "Saman Silva",
//       priority: "Medium",
//       estimatedTime: "4h",
//       deadline: "2024/10/15",
//       description:
//         "Test user interface components for responsiveness and cross-browser compatibility.",
//     },
//     {
//       id: "008",
//       name: "Backend Integration",
//       assignedTo: "Nimal Fernando",
//       assignedBy: "Sunil Jayasinghe",
//       priority: "High",
//       estimatedTime: "6h",
//       deadline: "2024/10/20",
//       description:
//         "Integrate backend services and APIs with the frontend components.",
//     },
//     {
//       id: "009",
//       name: "Data Migration",
//       assignedTo: "Sunil Silva",
//       assignedBy: "Kasun Fernando",
//       priority: "Low",
//       estimatedTime: "2h",
//       deadline: "2024/10/18",
//       description:
//         "Migrate data from the legacy system to the new database structure.",
//     },
//     {
//       id: "010",
//       name: "Feature Testing",
//       assignedTo: "Saman Weerasinghe",
//       assignedBy: "Chathura Jayawardena",
//       priority: "High",
//       estimatedTime: "8h",
//       deadline: "2024/10/25",
//       description:
//         "Test new features implemented in the latest sprint for functionality.",
//     },
//     {
//       id: "011",
//       name: "Server Setup",
//       assignedTo: "Chathura Jayawardena",
//       assignedBy: "Dinesh Wijesinghe",
//       priority: "Medium",
//       estimatedTime: "3h",
//       deadline: "2024/10/30",
//       description:
//         "Set up production server with appropriate security configurations.",
//     },
//     {
//       id: "012",
//       name: "Performance Optimization",
//       assignedTo: "Dinesh Wijesinghe",
//       assignedBy: "Kasun Fernando",
//       priority: "High",
//       estimatedTime: "5h",
//       deadline: "2024/10/12",
//       description:
//         "Optimize application performance to handle high traffic loads.",
//     },
//   ];


//   const indexOfLastTask = currentPage * tasksPerPage;
//   const indexOfFirstTask = indexOfLastTask - tasksPerPage;
//   const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

//   // this for change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // for handle selecting tasks
//   const handleSelectTask = (taskId) => {
//     setSelectedTasks((prevSelected) =>
//       prevSelected.includes(taskId)
//         ? prevSelected.filter((id) => id !== taskId)
//         : [...prevSelected, taskId]
//     );
//   };

//   // thid for adding a new task
//   const handleAddNewTask = () => {
//     setActiveKey("Taskallocation"); // Suser redirect to Task Allocation tab
//   };

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center">
//         <h3>Manage Tasks</h3>
//         <Button variant="primary" onClick={handleAddNewTask}>
//           Add New Task
//         </Button>
//       </div>
//       <Card className="p-4 mt-4">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h5>All Tasks</h5>
//           {selectedTasks.length > 0 && (
//             <div>
//               <Button variant="outline-warning" className="me-2">
//                 Edit
//               </Button>
//               <Button variant="outline-danger">Delete</Button>
//             </div>
//           )}
//         </div>

//         <Table bordered hover responsive>
//           <thead>
//             <tr>
//               <th></th>
//               <th>ID</th>
//               <th>Task Name</th>
//               <th>Assigned To</th>
//               <th>Assigned By</th>
//               <th>Priority</th>
//               <th>Estimated</th>
//               <th>Deadline</th>
//               <th>Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentTasks.map((task) => (
//               <tr key={task.id}>
//                 <td>
//                   <Form.Check
//                     type="checkbox"
//                     checked={selectedTasks.includes(task.id)}
//                     onChange={() => handleSelectTask(task.id)}
//                   />
//                 </td>
//                 <td>{task.id}</td>
//                 <td>{task.name}</td>
//                 <td>{task.assignedTo}</td>
//                 <td>{task.assignedBy}</td>
//                 <td>{task.priority}</td>
//                 <td>{task.estimatedTime}</td>
//                 <td>{task.deadline}</td>
//                 <OverlayTrigger
//                   placement="top"
//                   overlay={
//                     <Tooltip>
//                       {task.description.split(" ").slice(0, 10).join(" ")}
//                     </Tooltip>
//                   }
//                 >
//                   <td>
//                     {task.description.split(" ").slice(0, 2).join(" ")}...
//                   </td>
//                 </OverlayTrigger>
//               </tr>
//             ))}
//           </tbody>
//         </Table>

//         {/* add Pagination */}
//         <Pagination>
//           <Pagination.Prev
//             onClick={() => paginate(currentPage - 1)}
//             disabled={currentPage === 1}
//           />
//           <Pagination.Item
//             onClick={() => paginate(1)}
//             active={currentPage === 1}
//           >
//             1
//           </Pagination.Item>
//           <Pagination.Item
//             onClick={() => paginate(2)}
//             active={currentPage === 2}
//           >
//             2
//           </Pagination.Item>
//           <Pagination.Next
//             onClick={() => paginate(currentPage + 1)}
//             disabled={currentPage === 2}
//           />
//         </Pagination>
//       </Card>
//     </div>
//   );
// }

// export default TaskDetails;


//-------------------------------------Based code----------------------------------------------------

import React, { useState } from "react";
import {
  Table,
  Button,
  Pagination,
  OverlayTrigger,
  Tooltip,
  Card,
  Form,
} from "react-bootstrap";

function TaskDetails({ setActiveKey }) {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;
  const [selectedTasks, setSelectedTasks] = useState([]);

 
  const tasks = [
    {
      id: "001",
      name: "UI Design",
      assignedTo: "Kamal Perera",
      assignedBy: "Saman Silva",
      priority: "High",
      estimatedTime: "4h",
      deadline: "2024/10/15",
      description:
        "Design user interface for the main application page using Figma and Adobe tools.",
    },
    {
      id: "002",
      name: "API Development",
      assignedTo: "Nimal Fernando",
      assignedBy: "Sunil Jayasinghe",
      priority: "Medium",
      estimatedTime: "6h",
      deadline: "2024/10/20",
      description:
        "Develop and integrate APIs for frontend communication and data flow.",
    },
    {
      id: "003",
      name: "Database Setup",
      assignedTo: "Sunil Silva",
      assignedBy: "Kasun Fernando",
      priority: "Low",
      estimatedTime: "2h",
      deadline: "2024/10/18",
      description:
        "Set up MySQL database schema and initial configurations for data storage.",
    },
    {
      id: "004",
      name: "Frontend Development",
      assignedTo: "Saman Weerasinghe",
      assignedBy: "Chathura Jayawardena",
      priority: "High",
      estimatedTime: "8h",
      deadline: "2024/10/25",
      description:
        "Implement responsive UI components and integrate with backend APIs.",
    },
    {
      id: "005",
      name: "Deployment",
      assignedTo: "Chathura Jayawardena",
      assignedBy: "Dinesh Wijesinghe",
      priority: "Medium",
      estimatedTime: "3h",
      deadline: "2024/10/30",
      description:
        "Deploy the final version of the application to production servers.",
    },
    {
      id: "006",
      name: "Bug Fixing",
      assignedTo: "Dinesh Wijesinghe",
      assignedBy: "Kasun Fernando",
      priority: "High",
      estimatedTime: "5h",
      deadline: "2024/10/12",
      description:
        "Identify and fix critical bugs reported during the testing phase.",
    },
    {
      id: "007",
      name: "UI Testing",
      assignedTo: "Kamal Perera",
      assignedBy: "Saman Silva",
      priority: "Medium",
      estimatedTime: "4h",
      deadline: "2024/10/15",
      description:
        "Test user interface components for responsiveness and cross-browser compatibility.",
    },
    {
      id: "008",
      name: "Backend Integration",
      assignedTo: "Nimal Fernando",
      assignedBy: "Sunil Jayasinghe",
      priority: "High",
      estimatedTime: "6h",
      deadline: "2024/10/20",
      description:
        "Integrate backend services and APIs with the frontend components.",
    },
    {
      id: "009",
      name: "Data Migration",
      assignedTo: "Sunil Silva",
      assignedBy: "Kasun Fernando",
      priority: "Low",
      estimatedTime: "2h",
      deadline: "2024/10/18",
      description:
        "Migrate data from the legacy system to the new database structure.",
    },
    {
      id: "010",
      name: "Feature Testing",
      assignedTo: "Saman Weerasinghe",
      assignedBy: "Chathura Jayawardena",
      priority: "High",
      estimatedTime: "8h",
      deadline: "2024/10/25",
      description:
        "Test new features implemented in the latest sprint for functionality.",
    },
    {
      id: "011",
      name: "Server Setup",
      assignedTo: "Chathura Jayawardena",
      assignedBy: "Dinesh Wijesinghe",
      priority: "Medium",
      estimatedTime: "3h",
      deadline: "2024/10/30",
      description:
        "Set up production server with appropriate security configurations.",
    },
    {
      id: "012",
      name: "Performance Optimization",
      assignedTo: "Dinesh Wijesinghe",
      assignedBy: "Kasun Fernando",
      priority: "High",
      estimatedTime: "5h",
      deadline: "2024/10/12",
      description:
        "Optimize application performance to handle high traffic loads.",
    },
  ];


  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // this for change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // for handle selecting tasks
  const handleSelectTask = (taskId) => {
    setSelectedTasks((prevSelected) =>
      prevSelected.includes(taskId)
        ? prevSelected.filter((id) => id !== taskId)
        : [...prevSelected, taskId]
    );
  };

  // thid for adding a new task
  const handleAddNewTask = () => {
    setActiveKey("Taskallocation"); // Suser redirect to Task Allocation tab
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3>Manage Tasks</h3>
        <Button variant="primary" onClick={handleAddNewTask}>
          Add New Task
        </Button>
      </div>
      <Card className="p-4 mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5>All Tasks</h5>
          {selectedTasks.length > 0 && (
            <div>
              <Button variant="outline-warning" className="me-2">
                Edit
              </Button>
              <Button variant="outline-danger">Delete</Button>
            </div>
          )}
        </div>

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Task Name</th>
              <th>Assigned To</th>
              <th>Assigned By</th>
              <th>Priority</th>
              <th>Estimated</th>
              <th>Deadline</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => handleSelectTask(task.id)}
                  />
                </td>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.assignedTo}</td>
                <td>{task.assignedBy}</td>
                <td>{task.priority}</td>
                <td>{task.estimatedTime}</td>
                <td>{task.deadline}</td>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      {task.description.split(" ").slice(0, 10).join(" ")}
                    </Tooltip>
                  }
                >
                  <td>
                    {task.description.split(" ").slice(0, 2).join(" ")}...
                  </td>
                </OverlayTrigger>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* add Pagination */}
        <Pagination>
          <Pagination.Prev
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          <Pagination.Item
            onClick={() => paginate(1)}
            active={currentPage === 1}
          >
            1
          </Pagination.Item>
          <Pagination.Item
            onClick={() => paginate(2)}
            active={currentPage === 2}
          >
            2
          </Pagination.Item>
          <Pagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === 2}
          />
        </Pagination>
      </Card>
    </div>
  );
}

export default TaskDetails;