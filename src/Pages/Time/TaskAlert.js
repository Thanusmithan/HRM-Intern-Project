// import React from "react";

// function TaskAlert() {
//   return <div>TaskAlert</div>;
// }

// export default TaskAlert;

//-------------------------------------Base code----------------------------------------------
import React, { useState } from "react";
import { Card, Table, Form, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
const TaskAlert = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const alerts = [
    {
      id: "A001",
      message: "Task UI Design is overdue.",
      submittedBy: "Kamal Perera",
      date: "2024-10-20",
    },
    {
      id: "A002",
      message: "Task Backend API needs review.",
      submittedBy: "Nimal Kumar",
      date: "2024-10-21",
    },
  ];

  // Filter alerts using serch
  const filteredAlerts = alerts.filter((alert) =>
    alert.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{}}>
      <div className="d-flex justify-content-between align-items-center ">
        <Breadcrumb className="mr-4 d-flex align-items-center">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
            HRM
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/task" }}>
            Time Management
          </Breadcrumb.Item>
          <Breadcrumb.Item active className="fs-5">
            Task Alerts
          </Breadcrumb.Item>
        </Breadcrumb>{" "}
        <Form.Control
          type="text"
          placeholder="Search Alerts"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "400px" }} // Adjust styling for the search bar
        />
      </div>

      <Card className="p-4 mt-2">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-blue-800">Alerts</h5>
        </div>

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Alert ID</th>
              <th>Message</th>
              <th>Submitted By</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlerts.map((alert) => (
              <tr key={alert.id}>
                <td>{alert.id}</td>
                <td style={{ color: "#e03149" }}>{alert.message}</td>
                <td>{alert.submittedBy}</td>
                <td>{alert.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default TaskAlert;
