import React, { useState } from 'react';
import { Table, Button, Form, Modal, Card, Dropdown, Breadcrumb } from 'react-bootstrap';
import { useEmployeeDetails } from "../Componets/Employee"; // Corrected the path to Components
import '../App.css';
import { Link } from 'react-router-dom';

const Appointment = () => {
    const { employees } = useEmployeeDetails(); // Fetch employees from the hook
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalData, setModalData] = useState({
        profile: '',
        id: '',
        status: 'Full-Time',
        shiftStart: '', // Added shiftStart
        shiftEnd: '', // Added shiftEnd
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
            shiftStart: '', // Added shiftStart
            shiftEnd: '', // Added shiftEnd
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
        if (!modalData.profile || !modalData.id || !modalData.shiftStart || !modalData.shiftEnd || !modalData.appointmentDate || !modalData.department || !modalData.role || !modalData.joiningDate) {
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
            setAppointments([...appointments, { ...modalData }]);
        }

        setShowModal(false);
        setModalData({
            profile: '',
            id: '',
            status: 'Full-Time',
            shiftStart: '', // Reset shiftStart
            shiftEnd: '', // Reset shiftEnd
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

        if (name === 'profile') {
            const selectedEmployee = employees.find(emp => emp.profile === value);
            if (selectedEmployee) {
                setModalData((prevData) => ({
                    ...prevData,
                    id: selectedEmployee.id,
                    status: selectedEmployee.status,
                    shiftStart: selectedEmployee.shiftStart || '', // Get shiftStart
                    shiftEnd: selectedEmployee.shiftEnd || '', // Get shiftEnd
                    department: selectedEmployee.department || '',
                    role: selectedEmployee.role || '',
                    joiningDate: selectedEmployee.joiningDate || ''
                }));
            } else {
                setModalData((prevData) => ({
                    ...prevData,
                    id: '',
                    status: 'Full-Time',
                    shiftStart: '', // Reset shiftStart
                    shiftEnd: '', // Reset shiftEnd
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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleExport = () => {
        const filteredAppointments = appointments.map(({ id, profile, status, shiftStart, shiftEnd, department, role, joiningDate, appointmentDate }) => ({
            id,
            profile,
            status,
            shiftStart, // Include shiftStart in export
            shiftEnd, // Include shiftEnd in export
            department,
            role,
            joiningDate,
            appointmentDate,
        }));

        const csvContent = [
            ['ID', 'Employee Name', 'Status', 'Shift Start', 'Shift End', 'Department', 'Role', 'Joining Date', 'Appointment Date'], // Updated here
            ...filteredAppointments.map(appt => [
                appt.id,
                appt.profile,
                appt.status,
                appt.shiftStart, // Updated here
                appt.shiftEnd, // Updated here
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
                                placeholder="Search by Employee Name, ID or Date"
                                className="me-2"
                                value={searchTerm}
                                onChange={handleSearchChange}
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
                                <th>Shift Start</th> {/* Updated here */}
                                <th>Shift End</th> {/* Updated here */}
                                <th>Department</th>
                                <th>Role</th>
                                <th>Joining Date</th>
                                <th>Appointment Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments
                                .filter(appointment => appointment.profile.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map((appointment) => (
                                    <tr key={appointment.id}>
                                        <td className="d-flex align-items-center">
                                            <img
                                                src={`https://i.pravatar.cc/150?img=${appointment.id.slice(-1)}`}
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
                                        <td>{appointment.shiftStart}</td> {/* Updated here */}
                                        <td>{appointment.shiftEnd}</td> {/* Updated here */}
                                        <td>{appointment.department}</td>
                                        <td>{appointment.role}</td>
                                        <td>{appointment.joiningDate}</td>
                                        <td>{appointment.appointmentDate}</td>
                                        <td>
                                            <Dropdown drop="start">
                                                <Dropdown.Toggle variant="secondary" id={`dropdown-basic-${appointment.id}`}>
                                                    <i className="bi bi-three-dots-vertical"></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleEdit(appointment)}>
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleDelete(appointment.id)}>
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
                                <Form.Group className="mb-3">
                                    <Form.Label>Employee Name</Form.Label>
                                    <Form.Select
                                        name="profile"
                                        value={modalData.profile}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Employee</option>
                                        {employees.map((employee) => (
                                            <option key={employee.id} value={employee.profile}>{employee.profile}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="id"
                                        value={modalData.id}
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="status"
                                        value={modalData.status}
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Shift Start</Form.Label> {/* Updated here */}
                                    <Form.Control
                                        type="time"
                                        name="shiftStart" // Updated here
                                        value={modalData.shiftStart}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Shift End</Form.Label> {/* Updated here */}
                                    <Form.Control
                                        type="time"
                                        name="shiftEnd" // Updated here
                                        value={modalData.shiftEnd}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Appointment Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="appointmentDate"
                                        value={modalData.appointmentDate}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="department"
                                        value={modalData.department}
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="role"
                                        value={modalData.role}
                                        readOnly
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Joining Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="joiningDate"
                                        value={modalData.joiningDate}
                                        readOnly
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSave}>
                                {isEditing ? 'Update' : 'Save'}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
        </>
    );
};

export default Appointment;
