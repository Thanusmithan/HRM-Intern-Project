// import React from "react";
// import { Table, Button, Pagination, Card } from "react-bootstrap";

// const TaskReport = () => {
//   const tasks = [
//     {
//       id: "001",
//       name: "UI Design",
//       submittedBy: "Kamal Perera",
//       estimatedTime: "4h",
//       spentTime: "3h 50m",
//       difference: "10m",
//       efficiency: "Enough",
//     },
//     {
//       id: "002",
//       name: "API Development",
//       submittedBy: "Nimal Fernando",
//       estimatedTime: "6h",
//       spentTime: "6h 35m",
//       difference: "-35m",
//       efficiency: "less",
//     },
//     {
//       id: "003",
//       name: "Database Setup",
//       submittedBy: "Sunil Silva",
//       estimatedTime: "2h",
//       spentTime: "1h 15m",
//       difference: "+45m",
//       efficiency: "High",
//     },
//     {
//       id: "004",
//       name: "Frontend Development",
//       submittedBy: "Saman Weerasinghe",
//       estimatedTime: "8h",
//       spentTime: "8h 20m",
//       difference: "-20m",
//       efficiency: "Enough",
//     },
//     {
//       id: "005",
//       name: "Deployment",
//       submittedBy: "Chathura Jayawardena",
//       estimatedTime: "3h",
//       spentTime: "3h 30m",
//       difference: "-30m",
//       efficiency: "less",
//     },
//   ];

//   const handleDownload = () => {
//     alert("Download button clicked");
//   };

//   return (
//     <div>
//       <h4>Manage Efficiency</h4>
//       <Card className="p-4 mt-4">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h5>Completed Tasks</h5>
//         </div>

//         <Table bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Task ID</th>
//               <th>Task Name</th>
//               <th>Submitted By</th>
//               <th>Estimated Time</th>
//               <th>Spent Time</th>
//               <th>Difference</th>
//               <th>Efficiency</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((task) => (
//               <tr key={task.id}>
//                 <td>{task.id}</td>
//                 <td>{task.name}</td>
//                 <td>{task.submittedBy}</td>
//                 <td>{task.estimatedTime}</td>
//                 <td>{task.spentTime}</td>
//                 <td>{task.difference}</td>
//                 <td>{task.efficiency}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>

//         <div className="d-flex justify-content-between align-items-center mt-3">
//           <Pagination>
//             <Pagination.Prev />
//             <Pagination.Item>{1}</Pagination.Item>
//             <Pagination.Item>{2}</Pagination.Item>
//             <Pagination.Item>{3}</Pagination.Item>
//             <Pagination.Next />
//           </Pagination>

//           <Button variant="primary" onClick={handleDownload}>
//             Download Report
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default TaskReport;

//-----------------------------------------Base code-----------------------------------------
import React, { useState } from "react";
import { Table, Button, Card, Form, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

const TaskReport = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const tasks = [
    {
      id: "001",
      name: "UI Design",
      submittedBy: "Jeremy Neigh",
      estimatedTime: "4h",
      spentTime: "3h 50m",
      difference: "10m",
      efficiency: "Enough",
    },
  
  ];

  // Filter task using search 
  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // This function converts table data to CSV and initiates download
  const handleDownload = () => {
    const csvRows = [];

    // Add table headers
    const headers = ["Task ID", "Task Name", "Submitted By", "Estimated Time", "Spent Time", "Difference", "Efficiency"];
    csvRows.push(headers.join(","));

    // Adding table rows
    filteredTasks.forEach((task) => {
      const row = [task.id, task.name, task.submittedBy, task.estimatedTime, task.spentTime, task.difference, task.efficiency];
      csvRows.push(row.join(","));
    });

    // Convert rows to CSV format
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });

    // Create download link
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "task_report.csv"; // file name to download

    // occur download
    link.click();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center ">
       
       <Breadcrumb className="mr-4 d-flex align-items-center">
      
       
         <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
           HRM
         </Breadcrumb.Item>
         <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/task" }}>
           Time Management
         </Breadcrumb.Item>
         <Breadcrumb.Item active className="fs-5">
    
           Task Report
         </Breadcrumb.Item>
       </Breadcrumb>
        <Form.Control
          type="text"
          placeholder="Search by Task Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '400px', marginLeft: '20px' }} // Adjust styling for the search bar
        />
      </div>
      <Card className="p-4 mt-2">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5  className="text-blue-800">Completed Tasks</h5>
        </div>

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Name</th>
              <th>Submitted By</th>
              <th>Estimated Time</th>
              <th>Spent Time</th>
              <th>Difference</th>
              <th>Efficiency</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.submittedBy}</td>
                <td>{task.estimatedTime}</td>
                <td>{task.spentTime}</td>
                <td>{task.difference}</td>
                <td>{task.efficiency}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="d-flex justify-content-end align-items-center mt-3">
          <Button variant="primary" onClick={handleDownload}>
            Download Report
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TaskReport;
