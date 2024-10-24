// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   Button,
//   Form,
//   InputGroup,
//   Breadcrumb,
//   Modal,
// } from "react-bootstrap";

// export const employeesData = [
//   {
//     profile: "Jeremy Neigh",
//     id: "A0B1C001",
//     status: "Part-Time",
//     department: "Support",
//     shift: "8h-17h",
//     joiningDate: "9/23/16",
//     role: "Tax Officer",
//   },
//   {
//     profile: "Emily Johnson",
//     id: "A0B1C002",
//     status: "Full-Time",
//     department: "Finance",
//     shift: "9h-18h",
//     joiningDate: "1/15/18",
//     role: "Accountant",
//   },
//   {
//     profile: "Mark Smith",
//     id: "A0B1C003",
//     status: "Full-Time",
//     department: "IT",
//     shift: "10h-19h",
//     joiningDate: "5/20/19",
//     role: "Software Engineer",
//   },
//   {
//     profile: "Sophia Williams",
//     id: "A0B1C004",
//     status: "Part-Time",
//     department: "Human Resources",
//     shift: "9h-13h",
//     joiningDate: "3/12/20",
//     role: "HR Manager",
//   },
//   {
//     profile: "Liam Brown",
//     id: "A0B1C005",
//     status: "Seasonal",
//     department: "Marketing",
//     shift: "10h-19h",
//     joiningDate: "5/21/21",
//     role: "Marketing Specialist",
//   },
//   {
//     profile: "Olivia Garcia",
//     id: "A0B1C006",
//     status: "Full-Time",
//     department: "Sales",
//     shift: "8h-17h",
//     joiningDate: "7/18/22",
//     role: "Sales Executive",
//   },
//   {
//     profile: "Noah Martinez",
//     id: "A0B1C007",
//     status: "Part-Time",
//     department: "Operations",
//     shift: "6h-15h",
//     joiningDate: "9/10/21",
//     role: "Operations Coordinator",
//   },
//   // Add other employee data here...
// ];

// const AllEmployees = () => {
//   const [employees, setEmployees] = useState([
//     {
//       profile: "Jeremy Neigh",
//       id: "A0B1C001",
//       status: "Part-Time",
//       department: "Support",
//       shift: "8h-17h",
//       joiningDate: "9/23/16",
//       role: "Tax Officer",
//     },
//     {
//       profile: "Emily Johnson",
//       id: "A0B1C002",
//       status: "Full-Time",
//       department: "Finance",
//       shift: "9h-18h",
//       joiningDate: "1/15/18",
//       role: "Accountant",
//     },
//     {
//       profile: "Mark Smith",
//       id: "A0B1C003",
//       status: "On-contract",
//       department: "IT",
//       shift: "8h-17h",
//       joiningDate: "11/29/20",
//       role: "Software Developer",
//     },
//     {
//       profile: "Sophia Williams",
//       id: "A0B1C004",
//       status: "Full-Time",
//       department: "HR",
//       shift: "8h-17h",
//       joiningDate: "3/12/19",
//       role: "HR Manager",
//     },
//     {
//       profile: "Liam Brown",
//       id: "A0B1C005",
//       status: "Seasonal",
//       department: "Marketing",
//       shift: "10h-19h",
//       joiningDate: "5/21/21",
//       role: "Marketing Specialist",
//     },
//     {
//       profile: "Olivia Garcia",
//       id: "A0B1C006",
//       status: "Full-Time",
//       department: "Sales",
//       shift: "8h-17h",
//       joiningDate: "7/18/22",
//       role: "Sales Executive",
//     },
//     {
//       profile: "Noah Martinez",
//       id: "A0B1C007",
//       status: "Part-Time",
//       department: "Operations",
//       shift: "6h-15h",
//       joiningDate: "9/10/21",
//       role: "Operations Coordinator",
//     },
//   ]);


//   const [showModal, setShowModal] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editEmployee, setEditEmployee] = useState(null);
//   const [newEmployee, setNewEmployee] = useState({
//     profile: "",
//     id: "",
//     status: "",
//     department: "",
//     shift: "",
//     joiningDate: "",
//     role: "",
//   });

//   const handleEdit = (employee) => {
//     setEditEmployee(employee);
//     setIsEditing(true);
//     setShowModal(true);
//   };

//   const handleAdd = () => {
//     setNewEmployee({
//       profile: "",
//       id: "", // Manual ID input
//       status: "Full-Time",
//       department: "",
//       shift: "",
//       joiningDate: "",
//       role: "",
//     });
//     setIsEditing(false);
//     setShowModal(true);
//   };

//   const handleDelete = (employeeId) => {
//     if (window.confirm("Are you sure you want to delete this employee?")) {
//       setEmployees(employees.filter((emp) => emp.id !== employeeId));
//     }
//   };

//   const handleSave = () => {
//     if (isEditing && editEmployee) {
//       setEmployees(
//         employees.map((emp) => (emp.id === editEmployee.id ? editEmployee : emp))
//       );
//     } else {
//       setEmployees([...employees, newEmployee]);
//     }
//     setShowModal(false);
//     setEditEmployee(null);
//     setNewEmployee({
//       profile: "",
//       id: "",
//       status: "",
//       department: "",
//       shift: "",
//       joiningDate: "",
//       role: "",
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (isEditing && editEmployee) {
//       setEditEmployee({ ...editEmployee, [name]: value });
//     } else {
//       setNewEmployee({ ...newEmployee, [name]: value });
//     }
//   };

//   const getStatusVariant = (status) => {
//     switch (status) {
//       case "Full-Time":
//         return "warning";
//       case "Part-Time":
//         return "success";
//       case "Seasonal":
//         return "secondary";
//       case "On-contract":
//         return "primary";
//       default:
//         return "light";
//     }
//   };

//   return (
//     <div className="all-employees-page">
//       <Breadcrumb>
//         <Breadcrumb.Item href="#">Employee</Breadcrumb.Item>
//         <Breadcrumb.Item active>All Employee</Breadcrumb.Item>
//       </Breadcrumb>

//       <h1 className="mb-4">All Employee</h1>

//       <div className="mb-4 d-flex justify-content-between align-items-center">
//         {/* <InputGroup className="search-bar w-50">
//           <Form.Control type="text" placeholder="Search" />
//         </InputGroup> */}
//         <div className="d-flex">
//           <Button variant="primary" className="me-2" onClick={handleAdd}>
//             + Add Employee
//           </Button>
//           {/* <Button variant="outline-primary">Invite</Button> */}
//         </div>
//       </div>
//       <Table striped bordered hover responsive className="align-middle">
//         <thead>
//           <tr>
//             <th>Profile</th>
//             <th>ID</th>
//             <th>Status</th>
//             <th>Department</th>
//             <th>Shift</th>
//             <th>Joining Date</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((employee, index) => (
//             <tr key={index}>
//               <td className="d-flex align-items-center">
//                 <img
//                   src={`https://i.pravatar.cc/150?img=${index + 1}`}
//                   alt={employee.profile}
//                   className="rounded-circle me-2"
//                   width="40"
//                   height="40"
//                 />{" "}
//                 <span>{employee.profile}</span>
//               </td>
//               <td>{employee.id}</td>
//               <td>
//                 <Button
//                   variant={getStatusVariant(employee.status)}
//                   size="sm"
//                   className="px-3"
//                 >
//                   {employee.status}
//                 </Button>
//               </td>
//               <td>{employee.department}</td>
//               <td>{employee.shift}</td>
//               <td>{employee.joiningDate}</td>
//               <td>{employee.role}</td>
//               <td>
//                 <Button
//                   variant="outline-secondary"
//                   size="sm"
//                   className="me-2"
//                   onClick={() => handleEdit(employee)}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="outline-danger"
//                   size="sm"
//                   onClick={() => handleDelete(employee.id)}
//                 >
//                   Delete
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{isEditing ? "Edit Employee" : "Add Employee"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formProfile">
//               <Form.Label>Profile</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="profile"
//                 value={isEditing ? editEmployee?.profile || "" : newEmployee.profile}
//                 onChange={handleChange}
//                 placeholder="Enter employee name"
//               />
//             </Form.Group>
//             <Form.Group controlId="formId">
//               <Form.Label>ID</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="id"
//                 value={isEditing ? editEmployee?.id || "" : newEmployee.id}
//                 onChange={handleChange} // Editable ID
//                 placeholder="Enter employee ID"
//               />
//             </Form.Group>
//             <Form.Group controlId="formStatus">
//               <Form.Label>Status</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="status"
//                 value={isEditing ? editEmployee?.status || "" : newEmployee.status}
//                 onChange={handleChange}
//               >
//                 <option>Full-Time</option>
//                 <option>Part-Time</option>
//                 <option>Seasonal</option>
//                 <option>On-contract</option>
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="formDepartment">
//               <Form.Label>Department</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="department"
//                 value={isEditing ? editEmployee?.department || "" : newEmployee.department}
//                 onChange={handleChange}
//                 placeholder="Enter department"
//               />
//             </Form.Group>
//             <Form.Group controlId="formShift">
//               <Form.Label>Shift</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="shift"
//                 value={isEditing ? editEmployee?.shift || "" : newEmployee.shift}
//                 onChange={handleChange}
//                 placeholder="Enter shift"
//               />
//             </Form.Group>
//             <Form.Group controlId="formJoiningDate">
//               <Form.Label>Joining Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="joiningDate"
//                 value={isEditing ? editEmployee?.joiningDate || "" : newEmployee.joiningDate}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//             <Form.Group controlId="formRole">
//               <Form.Label>Role</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="role"
//                 value={isEditing ? editEmployee?.role || "" : newEmployee.role}
//                 onChange={handleChange}
//                 placeholder="Enter role"
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default AllEmployees;

// //-------------------------------------updated----------------------------------------------------



import React, { useState } from "react";
import { useEmployeeDetails } from "../Componets/Employee";
import { Table, Card, Button, Dropdown, Form, Modal, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
    id: "",
    status: "",
    department: "",
    shift: "",
    joiningDate: "",
    role: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const departments = ["HR", "Finance", "IT", "Support", "Sales", "Marketing"];
  const roles = ["Manager", "Senior Developer", "Junior Developer", "Intern", "Sales Executive"];

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleAdd = () => {
    setNewEmployee({
      profile: "",
      id: "",
      status: "Full-Time",
      department: "",
      shift: "",
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
      setEmployees(
        employees.map((emp) => (emp.id === editEmployee.id ? editEmployee : emp))
      );
    } else {
      setEmployees([...employees, newEmployee]);
    }
    setShowModal(false);
    setEditEmployee(null);
    setNewEmployee({
      profile: "",
      id: "",
      status: "",
      department: "",
      shift: "",
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
    // Convert employee data to CSV format
    const csvData = employees
      .map(emp => `${emp.profile},${emp.id},${emp.status},${emp.department},${emp.shift},${emp.joiningDate},${emp.role}`)
      .join('\n');

    const blob = new Blob([`Profile,ID,Status,Department,Shift,Joining Date,Role\n${csvData}`], {
      type: 'text/csv',
    });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'employees.csv';
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
            <Form className="d-flex" style={{ width: '400px' }}>
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
                .filter(employee => employee.profile.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((employee, index) => (
                  <tr key={index}>
                    <td className="d-flex align-items-center">
                      <img
                        src={`https://i.pravatar.cc/150?img=${index + 1}`}
                        alt={employee.profile}
                        className="rounded-circle me-2"
                        width="40"
                        height="40"
                      />
                      <span>{employee.profile}</span>
                    </td>
                    <td>{employee.id}</td>
                    <td>
                      <Button
                        variant={getStatusVariant(employee.status)}
                        size="sm"
                        className="px-3"
                      >
                        {employee.status}
                      </Button>
                    </td>
                    <td>{employee.department}</td>
                    <td>{employee.shift}</td>
                    <td>{employee.joiningDate}</td>
                    <td>{employee.role}</td>
                    <td>
                      <Dropdown drop="start">
                        <Dropdown.Toggle variant="secondary" id={`dropdown-basic-${employee.id}`}>
                          <i className="bi bi-three-dots-vertical"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleEdit(employee)}>
                            <i className="bi bi-pencil-fill me-2"></i>
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDelete(employee.id)} className="text-danger">
                            <i className="bi bi-trash-fill me-2"></i>
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{isEditing ? "Edit Employee" : "Add Employee"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formProfile">
                  <Form.Label>Profile</Form.Label>
                  <Form.Control
                    type="text"
                    name="profile"
                    value={isEditing ? editEmployee?.profile || "" : newEmployee.profile}
                    onChange={handleChange}
                    placeholder="Enter employee name"
                  />
                </Form.Group>
                <Form.Group controlId="formId">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="id"
                    value={isEditing ? editEmployee?.id || "" : newEmployee.id}
                    onChange={handleChange}
                    placeholder="Enter employee ID"
                  />
                </Form.Group>
                <Form.Group controlId="formStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    as="select"
                    name="status"
                    value={isEditing ? editEmployee?.status || "" : newEmployee.status}
                    onChange={handleChange}
                  >
                    <option>Full-Time</option>
                    <option>Part-Time</option>
                    <option>Seasonal</option>
                    <option>On-contract</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formDepartment">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    as="select"
                    name="department"
                    value={isEditing ? editEmployee?.department || "" : newEmployee.department}
                    onChange={handleChange}
                  >
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formShift">
                  <Form.Label>Shift</Form.Label>
                  <Form.Control
                    type="text"
                    name="shift"
                    value={isEditing ? editEmployee?.shift || "" : newEmployee.shift}
                    onChange={handleChange}
                    placeholder="Enter shift"
                  />
                </Form.Group>
                <Form.Group controlId="formJoiningDate">
                  <Form.Label>Joining Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="joiningDate"
                    value={isEditing ? editEmployee?.joiningDate || "" : newEmployee.joiningDate}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    value={isEditing ? editEmployee?.role || "" : newEmployee.role}
                    onChange={handleChange}
                  >
                    {roles.map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Card.Body>
      </Card>
    </>
  );
};

export default AllEmployees;
