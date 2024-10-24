// import React, { useState } from 'react';
// import { Table, Button, Form, InputGroup, Pagination, Breadcrumb, Modal } from 'react-bootstrap';

// const Appointment = () => {
//     const [appointments, setAppointments] = useState([
//         {
//             profile: 'Thanusmithan',
//             id: 'A0B1C001',
//             status: 'Part-Time',
//             appointmentTime: '8h-17h',
//             appointmentDate: '2016-09-23',
//         },
//         // Other appointments...
//     ]);

//     const [modalData, setModalData] = useState({
//         profile: '',
//         id: '',
//         status: 'Full-Time',
//         appointmentTime: '',
//         appointmentDate: '',
//     });

//     const [isEditing, setIsEditing] = useState(false);
//     const [showModal, setShowModal] = useState(false);

//     const handleAdd = () => {
//         setModalData({
//             profile: '',
//             id: '', // Allow manual input of ID
//             status: 'Full-Time',
//             appointmentTime: '',
//             appointmentDate: '',
//         });
//         setIsEditing(false);
//         setShowModal(true);
//     };

//     const handleEdit = (appointment) => {
//         setModalData(appointment);
//         setIsEditing(true);
//         setShowModal(true);
//     };

//     const handleDelete = (appointmentId) => {
//         if (window.confirm('Are you sure you want to delete this appointment?')) {
//             setAppointments(appointments.filter((appt) => appt.id !== appointmentId));
//         }
//     };

//     const handleSave = () => {
//         if (!modalData.profile || !modalData.id || !modalData.appointmentTime || !modalData.appointmentDate) {
//             alert('All fields must be filled out');
//             return;
//         }

//         if (isEditing) {
//             setAppointments(
//                 appointments.map((appt) =>
//                     appt.id === modalData.id ? modalData : appt
//                 )
//             );
//         } else {
//             setAppointments([...appointments, modalData]);
//         }

//         setShowModal(false);
//         setModalData({
//             profile: '',
//             id: '',
//             status: 'Full-Time',
//             appointmentTime: '',
//             appointmentDate: '',
//         });
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setModalData({
//             ...modalData,
//             [name]: value,
//         });
//     };

//     const getStatusVariant = (status) => {
//         switch (status) {
//             case 'Full-Time':
//                 return 'warning';
//             case 'Part-Time':
//                 return 'success';
//             case 'Seasonal':
//                 return 'secondary';
//             case 'On-contract':
//                 return 'primary';
//             default:
//                 return 'light';
//         }
//     };

//     return (
//         <div className="appointment-page">
//             <Breadcrumb>
//                 <Breadcrumb.Item href="#">Employee</Breadcrumb.Item>
//                 <Breadcrumb.Item active>Appointment</Breadcrumb.Item>
//             </Breadcrumb>
//             <h1 className="mb-4">Appointment</h1>
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 {/* <InputGroup className="search-bar w-50">
//                     <Form.Control type="text" placeholder="Search" />
//                 </InputGroup> */}
//                 <div className="d-flex">
//                     <Button variant="primary" className="me-2" onClick={handleAdd}>
//                         + Add Appointment
//                     </Button>
//                     {/* <Button variant="outline-primary">Invite</Button> */}
//                 </div>
//             </div>
//             <Table striped bordered hover responsive className="align-middle">
//                 <thead>
//                     <tr>
//                         <th>Profile</th>
//                         <th>ID</th>
//                         <th>Status</th>
//                         <th>Appointment Time</th>
//                         <th>Appointment Date</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {appointments.map((appointment) => (
//                         <tr key={appointment.id}>
//                             <td className="d-flex align-items-center">
//                                 <img
//                                     src={`https://i.pravatar.cc/150?img=${appointment.id}`}
//                                     alt={appointment.profile}
//                                     className="rounded-circle me-2"
//                                     width="40"
//                                     height="40"
//                                 />{" "}
//                                 <span>{appointment.profile}</span>
//                             </td>
//                             <td>{appointment.id}</td>
//                             <td>
//                                 <Button
//                                     variant={getStatusVariant(appointment.status)}
//                                     size="sm"
//                                     className="px-3"
//                                 >
//                                     {appointment.status}
//                                 </Button>
//                             </td>
//                             <td>{appointment.appointmentTime}</td>
//                             <td>{appointment.appointmentDate}</td>
//                             <td>
//                                 <Button
//                                     variant="outline-secondary"
//                                     size="sm"
//                                     className="me-2"
//                                     onClick={() => handleEdit(appointment)}
//                                 >
//                                     Edit
//                                 </Button>
//                                 <Button
//                                     variant="outline-danger"
//                                     size="sm"
//                                     onClick={() => handleDelete(appointment.id)}
//                                 >
//                                     Delete
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//             <Modal show={showModal} onHide={() => setShowModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>{isEditing ? 'Edit Appointment' : 'Add Appointment'}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group controlId="formProfile">
//                             <Form.Label>Profile</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="profile"
//                                 value={modalData.profile}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formId">
//                             <Form.Label>ID</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="id"
//                                 value={modalData.id}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formStatus">
//                             <Form.Label>Status</Form.Label>
//                             <Form.Control
//                                 as="select"
//                                 name="status"
//                                 value={modalData.status}
//                                 onChange={handleChange}
//                             >
//                                 <option>Full-Time</option>
//                                 <option>Part-Time</option>
//                                 <option>Seasonal</option>
//                                 <option>On-contract</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group controlId="formAppointmentTime">
//                             <Form.Label>Appointment Time</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="appointmentTime"
//                                 value={modalData.appointmentTime}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                         <Form.Group controlId="formAppointmentDate">
//                             <Form.Label>Appointment Date</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 name="appointmentDate"
//                                 value={modalData.appointmentDate}
//                                 onChange={handleChange}
//                             />
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModal(false)}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={handleSave}>
//                         Save Changes
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default Appointment;

//-------------------------------------updated----------------------------------------------------

import React, { useState } from 'react';
import { Table, Button, Form, Modal, Card, Dropdown, Breadcrumb } from 'react-bootstrap';
import { useEmployeeDetails } from "../Componets/Employee";
import '../App.css';


import { Link } from 'react-router-dom';

const Appointment = () => {
    const { employees } = useEmployeeDetails(); // Get employees data from the hook

    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // State to track the search term

    const [modalData, setModalData] = useState({
        profile: '',
        id: '',
        status: 'Full-Time',
        appointmentTime: '',
        appointmentDate: '',
        department: '',
        role: '',
        joiningDate: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleAdd = () => {
        setModalData({
            profile: '',
            id: '',
            status: 'Full-Time',
            appointmentTime: '',
            appointmentDate: '',
            department: '',
            role: '',
            joiningDate: '',
        });
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEdit = (appointment) => {
        setModalData(appointment);
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = (appointmentId) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            setAppointments(appointments.filter((appt) => appt.id !== appointmentId));
        }
    };

    const handleSave = () => {
        // Validate all fields
        if (!modalData.profile || !modalData.id || !modalData.appointmentTime || !modalData.appointmentDate || !modalData.department || !modalData.role || !modalData.joiningDate) {
            alert('All fields must be filled out');
            return;
        }

        if (isEditing) {
            setAppointments(
                appointments.map((appt) =>
                    appt.id === modalData.id ? modalData : appt
                )
            );
        } else {
            // Create new appointment using existing employee ID
            setAppointments([...appointments, { ...modalData }]); // No need to generate a new ID
        }

        setShowModal(false);
        setModalData({
            profile: '',
            id: '',
            status: 'Full-Time',
            appointmentTime: '',
            appointmentDate: '',
            department: '',
            role: '',
            joiningDate: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModalData({
            ...modalData,
            [name]: value,
        });

        // Check if profile is being changed
        if (name === 'profile') {
            const selectedEmployee = employees.find(emp => emp.profile === value);
            if (selectedEmployee) {
                setModalData((prevData) => ({
                    ...prevData,
                    id: selectedEmployee.id, // Use the employee's ID
                    status: selectedEmployee.status,
                    appointmentTime: selectedEmployee.shift || '',
                    department: selectedEmployee.department || '',
                    role: selectedEmployee.role || '',
                    joiningDate: selectedEmployee.joiningDate || ''
                }));
            } else {
                setModalData((prevData) => ({
                    ...prevData,
                    id: '',
                    status: 'Full-Time',
                    appointmentTime: '',
                    department: '',
                    role: '',
                    joiningDate: ''
                }));
            }
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 'Full-Time':
                return 'warning';
            case 'Part-Time':
                return 'success';
            case 'Seasonal':
                return 'secondary';
            case 'On-contract':
                return 'primary';
            default:
                return 'light';
        }
    };

    // Function to handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Function to export table data to CSV
    const handleExport = () => {
        const filteredAppointments = appointments.map(({ id, profile, status, appointmentTime, department, role, joiningDate, appointmentDate }) => ({
            id,
            profile,
            status,
            appointmentTime,
            department,
            role,
            joiningDate,
            appointmentDate,
        }));

        const csvContent = [
            ['ID', 'Employee Name', 'Status', 'Shift', 'Department', 'Role', 'Joining Date', 'Appointment Date'],
            ...filteredAppointments.map(appt => [
                appt.id,
                appt.profile,
                appt.status,
                appt.appointmentTime,
                appt.department,
                appt.role,
                appt.joiningDate,
                appt.appointmentDate,
            ])
        ]
            .map(e => e.join(","))
            .join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "appointments.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <Breadcrumb className="ms-3">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/hrm" }}>HRM</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "#" }}>Employee</Breadcrumb.Item>
                <Breadcrumb.Item active>Appointment</Breadcrumb.Item>
            </Breadcrumb>
            <Card className="appointment-page no-border">
                <Card.Header className="d-flex justify-content-between align-items-center mx-3 mb-2">
                    <h5 className="mb-0">Appointment</h5>
                    <div className="d-flex align-items-center">
                        <Form className="d-flex" style={{ width: '400px' }}>
                            <Form.Control
                                type="search"
                                placeholder="Search by Employee Name"
                                className="me-2"
                                value={searchTerm}
                                onChange={handleSearchChange} // Handle search input change
                            />
                        </Form>
                        <Button variant="success" onClick={handleAdd} className="me-2 d-flex align-items-center">
                            <i className="bi bi-plus-circle me-1"></i>
                            Add
                        </Button>
                        <Button variant="outline-primary" onClick={handleExport} className="d-flex align-items-center">
                            <i className="bi bi-file-earmark-arrow-up me-1"></i>
                            Export
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
                                <th>Shift</th>
                                <th>Department</th>
                                <th>Role</th>
                                <th>Joining Date</th>
                                <th>Appointment Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments
                                .filter(appointment => appointment.profile.toLowerCase().includes(searchTerm.toLowerCase())) // Filter based on search term
                                .map((appointment) => (
                                    <tr key={appointment.id}>
                                        <td className="d-flex align-items-center">
                                            <img
                                                src={`https://i.pravatar.cc/150?img=${appointment.id.slice(-1)}`} // Use a slice to generate an image index based on ID
                                                alt={appointment.profile}
                                                className="rounded-circle me-2"
                                                width="40"
                                                height="40"
                                            />
                                            <span>{appointment.profile}</span>
                                        </td>
                                        <td>{appointment.id}</td>
                                        <td>
                                            <Button
                                                variant={getStatusVariant(appointment.status)}
                                                size="sm"
                                                className="px-3"
                                            >
                                                {appointment.status}
                                            </Button>
                                        </td>
                                        <td>{appointment.appointmentTime}</td>
                                        <td>{appointment.department}</td>
                                        <td>{appointment.role}</td>
                                        <td>{appointment.joiningDate}</td>
                                        <td>{appointment.appointmentDate}</td>
                                        <td>
                                            <Dropdown drop="start" className="">
                                                <Dropdown.Toggle variant="secondary" id={`dropdown-basic-${appointment.id}`}>
                                                    <i className="bi bi-three-dots-vertical"></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleEdit(appointment)}>
                                                        <i className="bi bi-pencil-fill me-2"></i>
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleDelete(appointment.id)} className="text-danger">
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
                            <Modal.Title>{isEditing ? 'Edit Appointment' : 'Add Appointment'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formProfile">
                                    <Form.Label>Employee Name:</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="profile"
                                        value={modalData.profile}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Employee</option>
                                        {employees.map((employee) => (
                                            <option key={employee.id} value={employee.profile}>
                                                {employee.profile}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formId">
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="id"
                                        value={modalData.id}
                                        readOnly // Make ID read-only since it auto-populates
                                    />
                                </Form.Group>
                                <Form.Group controlId="formStatus">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="status"
                                        value={modalData.status}
                                        onChange={handleChange}
                                    >
                                        <option>Full-Time</option>
                                        <option>Part-Time</option>
                                        <option>Seasonal</option>
                                        <option>On-contract</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formAppointmentTime">
                                    <Form.Label>Shift</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="appointmentTime"
                                        value={modalData.appointmentTime}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDepartment">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="department"
                                        value={modalData.department}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formRole">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="role"
                                        value={modalData.role}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formJoiningDate">
                                    <Form.Label>Joining Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="joiningDate"
                                        value={modalData.joiningDate}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formAppointmentDate">
                                    <Form.Label>Appointment Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="appointmentDate"
                                        value={modalData.appointmentDate}
                                        onChange={handleChange}
                                    />
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

            export default Appointment;
