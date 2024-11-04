import React, { useState } from "react";
import { useEmployeeDetails } from "../Componets/Employee";
import { Table, Card, Button, Dropdown, Form, Modal, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

export const employeesData = [
  {
    profile: "Jeremy Neigh",
    id: "A0B1C001",
    status: "Part-Time",
    department: "Support",
    shift: "8h-17h",
    joiningDate: "9/23/16",
    role: "Tax Officer",
  },
  {
    profile: "Emily Johnson",
    id: "A0B1C002",
    status: "Full-Time",
    department: "Finance",
    shift: "9h-18h",
    joiningDate: "1/15/18",
    role: "Accountant",
  },
  {
    profile: "Mark Smith",
    id: "A0B1C003",
    status: "Full-Time",
    department: "IT",
    shift: "10h-19h",
    joiningDate: "5/20/19",
    role: "Software Engineer",
  },
  {
    profile: "Sophia Williams",
    id: "A0B1C004",
    status: "Part-Time",
    department: "Human Resources",
    shift: "9h-13h",
    joiningDate: "3/12/20",
    role: "HR Manager",
  },
  {
    profile: "Liam Brown",
    id: "A0B1C005",
    status: "Seasonal",
    department: "Marketing",
    shift: "10h-19h",
    joiningDate: "5/21/21",
    role: "Marketing Specialist",
  },
  {
    profile: "Olivia Garcia",
    id: "A0B1C006",
    status: "Full-Time",
    department: "Sales",
    shift: "8h-17h",
    joiningDate: "7/18/22",
    role: "Sales Executive",
  },
  {
    profile: "Noah Martinez",
    id: "A0B1C007",
    status: "Part-Time",
    department: "Operations",
    shift: "6h-15h",
    joiningDate: "9/10/21",
    role: "Operations Coordinator",
  },
  // Add other employee data here...
];

const AllEmployees = () => {
  const { employees, setEmployees } = useEmployeeDetails();

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    profile: "",
    id: "", // Initially empty; we'll set this when adding a new employee
    status: "Full-Time",
    department: "",
    shiftStart: "",
    shiftEnd: "",
    joiningDate: "",
    role: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const departments = ["HR", "Finance", "IT", "Support", "Sales", "Marketing"];
  const roles = ["Manager", "Senior Developer", "Junior Developer", "Intern", "Sales Executive"];

  // Function to generate a new employee ID starting from "007"
  const generateEmployeeId = () => {
    const existingIds = employees.map(emp => parseInt(emp.id.slice(-3))); // Extract the last 3 digits and convert to number
    const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0; // Find the maximum ID
    const newId = String(maxId + 1).padStart(3, '0'); // Increment and format to 3 digits
    return `A0B1C${newId}`; // Return the new ID in the format "A0B1C###"
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleAdd = () => {
    setNewEmployee({
      profile: "",
      id: generateEmployeeId(), // Generate ID here
      status: "Full-Time",
      department: "",
      shiftStart: "",
      shiftEnd: "",
      joiningDate: "",
      role: "",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleDelete = (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== employeeId));
    }
  };

  const handleSave = () => {
    if (isEditing && editEmployee) {
      const updatedEmployee = { ...editEmployee };
      setEmployees(employees.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
    } else {
      setEmployees([...employees, { ...newEmployee }]); // Add new employee
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditEmployee(null);
    setNewEmployee({
      profile: "",
      id: "", // Resetting to empty for new employee
      status: "Full-Time",
      department: "",
      shiftStart: "",
      shiftEnd: "",
      joiningDate: "",
      role: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditing && editEmployee) {
      setEditEmployee({ ...editEmployee, [name]: value });
    } else {
      setNewEmployee({ ...newEmployee, [name]: value });
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "Full-Time":
        return "warning";
      case "Part-Time":
        return "success";
      case "Seasonal":
        return "secondary";
      case "On-contract":
        return "primary";
      default:
        return "light";
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleExport = () => {
    const csvData = employees
      .map((emp) => `${emp.profile},${emp.id},${emp.status},${emp.department},${emp.shiftStart}-${emp.shiftEnd},${emp.joiningDate},${emp.role}`)
      .join("\n");

    const blob = new Blob([`Profile,ID,Status,Department,Shift,Joining Date,Role\n${csvData}`], {
      type: "text/csv",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "employees.csv";
    link.click();
  };

  return (
    <>
      <Breadcrumb className="ms-3">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/hrm" }}>HRM</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "#" }}>Employee</Breadcrumb.Item>
        <Breadcrumb.Item active>All Employees</Breadcrumb.Item>
      </Breadcrumb>
      <Card className="all-employees-page no-border">
        <Card.Header className="d-flex justify-content-between align-items-center mx-3 mb-2">
          <h5 className="mb-0">Employees</h5>
          <div className="d-flex align-items-center">
            <Form className="d-flex" style={{ width: "400px" }}>
              <Form.Control
                type="search"
                placeholder="Search by Employee Name"
                value={searchTerm}
                onChange={handleSearch}
                className="me-2"
              />
            </Form>
            <Button variant="success" onClick={handleAdd} className="me-2 d-flex align-items-center">
              <i className="bi bi-plus-circle me-1"></i> Add
            </Button>
            <Button variant="outline-primary" onClick={handleExport} className="d-flex align-items-center">
              <i className="bi bi-file-earmark-arrow-up me-1"></i> Export
            </Button>
          </div>
        </Card.Header>

        <Card.Body>
          <Table striped bordered hover responsive className="align-middle">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>ID</th>
                <th>Status</th>
                <th>Department</th>
                <th>Shift</th>
                <th>Joining Date</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees
                .filter((employee) => employee.profile.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((employee) => (
                  <tr key={employee.id}>
                    <td className="d-flex align-items-center">
                      <img
                        src={`https://i.pravatar.cc/150?img=${employee.id.slice(-3)}`} // Using part of the ID for uniqueness
                        alt={employee.profile}
                        className="rounded-circle me-2"
                        width="40"
                        height="40"
                      />
                      <span>{employee.profile}</span>
                    </td>
                    <td>{employee.id}</td>
                    <td>
                      <Button variant={getStatusVariant(employee.status)} size="sm" className="px-3">
                        {employee.status}
                      </Button>
                    </td>
                    <td>{employee.department}</td>
                    <td>{employee.shiftStart} - {employee.shiftEnd}</td>
                    <td>{employee.joiningDate}</td>
                    <td>{employee.role}</td>
                    <td>
                      <Dropdown className="d-flex justify-content-center" drop="start">
                        <Dropdown.Toggle variant="secondary" size="sm">
                        <i className="bi bi-three-dots-vertical"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleEdit(employee)}>Edit</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDelete(employee.id)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Employee" : "Add Employee"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                name="profile"
                value={isEditing ? editEmployee?.profile : newEmployee.profile}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Select
                name="department"
                value={isEditing ? editEmployee?.department : newEmployee.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={isEditing ? editEmployee?.status : newEmployee.status}
                onChange={handleChange}
                required
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Seasonal">Seasonal</option>
                <option value="On-contract">On-contract</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Shift Start</Form.Label>
              <Form.Control
                type="time"
                name="shiftStart"
                value={isEditing ? editEmployee?.shiftStart : newEmployee.shiftStart}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Shift End</Form.Label>
              <Form.Control
                type="time"
                name="shiftEnd"
                value={isEditing ? editEmployee?.shiftEnd : newEmployee.shiftEnd}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Joining Date</Form.Label>
              <Form.Control
                type="date"
                name="joiningDate"
                value={isEditing ? editEmployee?.joiningDate : newEmployee.joiningDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={isEditing ? editEmployee?.role : newEmployee.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {isEditing ? "Save Changes" : "Add Employee"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllEmployees;
