import React, { useState } from 'react';
import { Table, Card, Button, Dropdown, Form, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEmployeeDetails } from "../Componets/Employee";

// Function to generate a random time after 3:30 PM
const getRandomPunchOutTime = () => {
    const punchOutTime = new Date();
    punchOutTime.setHours(15, 30, 0, 0); // Set to 3:30 PM
    const randomMinutes = Math.floor(Math.random() * 180); // Add up to 3 hours (180 minutes)
    punchOutTime.setMinutes(punchOutTime.getMinutes() + randomMinutes);
    return punchOutTime;
};

const Att_DailyLog = () => {
    const { employees } = useEmployeeDetails(); // Access employee data

    // Initialize state with default punchIn and random punchOut times
    const [data, setData] = useState(
        employees.map((employee) => ({
            id: employee.id,
            profile: employee.profile,
            punchDate: new Date(), // Default to today's date
            punchIn: new Date(new Date().setHours(8, 30)), // Default to 8:30 AM
            punchOut: getRandomPunchOutTime(), // Random punch-out time after 3:30 PM
            department: employee.department,
            isApproved: false,
        }))
    );

    const [editIndex, setEditIndex] = useState(null);
    const [editedRow, setEditedRow] = useState({});
    const [searchTerm, setSearchTerm] = useState('');

    // Helper function to calculate working hours
    const calculateWorkingHours = (punchIn, punchOut) => {
        if (punchIn && punchOut) {
            const diffInMs = Math.abs(punchOut - punchIn);
            const hours = Math.floor(diffInMs / (1000 * 60 * 60));
            const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
            return { hours, minutes };
        }
        return { hours: 0, minutes: 0 }; // If times are not available
    };

    // Function to calculate the worked status based on hours worked
    const getWorkedStatus = (hours) => {
        if (hours > 8) return `Over Time (${hours - 8}h)`;
        if (hours === 8) return 'Completed Work';
        return 'Half Day';
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedRow(data[index]); // Set the current row to be edited
    };

    const handleSave = () => {
        const newData = [...data];
        newData[editIndex] = { ...editedRow };
        setData(newData);
        setEditIndex(null); // Reset edit index after saving
    };

    const handleDateChange = (date, field) => {
        setEditedRow({ ...editedRow, [field]: date });
    };

    // New handleDelete function to remove a row from the state
    const handleDelete = (id) => {
        const newData = data.filter(row => row.id !== id);
        setData(newData);
    };

    const filteredData = data.filter((row) =>
        row.profile.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to export data to CSV format
    const exportToCSV = () => {
        const csvRows = [];
        // Get the headers
        const headers = ['Employee Name', 'ID', 'Punch Date', 'Punch In', 'Punch Out', 'Department', 'Status', 'Working Hours', 'Worked Status'];
        csvRows.push(headers.join(','));

        // Get the rows
        filteredData.forEach((row) => {
            const { hours, minutes } = calculateWorkingHours(row.punchIn, row.punchOut);
            const workedStatus = getWorkedStatus(hours);
            const rowData = [
                row.profile,
                row.id,
                row.punchDate.toLocaleDateString(),
                row.punchIn.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
                row.punchOut ? row.punchOut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : 'N/A',
                row.department,
                row.punchIn && !row.punchOut ? 'Working' : row.punchOut ? 'Finished' : 'Not Started',
                `${hours}h ${minutes}m`,
                workedStatus,
            ];
            csvRows.push(rowData.join(','));
        });

        // Create a Blob from the CSV data and generate a download link
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'daily_log.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <Breadcrumb className="ms-3">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/hrm" }}>HRM</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "#" }}>Attendance</Breadcrumb.Item>
                <Breadcrumb.Item active>Daily Log</Breadcrumb.Item>
            </Breadcrumb>
            <Card className="no-border">
                <Card.Header className="d-flex justify-content-between align-items-center mx-3 mb-2">
                    <h5 className="mb-0">Daily Log</h5>

                    <div className="d-flex align-items-center">
                        <Form className="d-flex me-2" style={{ width: '400px' }}>
                            <Form.Control
                                type="search"
                                placeholder="Search by Employee Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="me-2"
                            />
                        </Form>
                        <Button
                            variant="outline-primary"
                            className="d-flex align-items-center"
                            onClick={exportToCSV} // Call export function on click
                        >
                            <i className="bi bi-file-earmark-arrow-up me-1"></i>
                            Export
                        </Button>
                    </div>
                </Card.Header>

                <Card.Body id="table-to-pdf">
                    <Table striped bordered hover size="sm" className="text-center">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>ID</th>
                                <th>Punch Date</th>
                                <th>Punch In</th>
                                <th>Punch Out</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Working Hours</th>
                                <th>Worked Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, index) => {
                                const { hours, minutes } = calculateWorkingHours(row.punchIn, row.punchOut);
                                const workedStatus = getWorkedStatus(hours);

                                return (
                                    <tr key={row.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={`https://i.pravatar.cc/150?img=${index + 1}`}
                                                    alt={row.profile}
                                                    style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                                                />
                                                {editIndex === index ? (
                                                    <Form.Control
                                                        type="text"
                                                        name="profile"
                                                        value={editedRow.profile}
                                                        onChange={(e) => setEditedRow({ ...editedRow, profile: e.target.value })}
                                                        className="form-control"
                                                    />
                                                ) : (
                                                    row.profile
                                                )}
                                            </div>
                                        </td>
                                        <td>{row.id}</td>
                                        <td>
                                            {editIndex === index ? (
                                                <DatePicker
                                                    selected={editedRow.punchDate}
                                                    onChange={(date) => handleDateChange(date, 'punchDate')}
                                                    dateFormat="MM/dd/yyyy"
                                                    className="form-control mb-3"
                                                />
                                            ) : (
                                                row.punchDate.toLocaleDateString()
                                            )}
                                        </td>
                                        <td>
                                            {editIndex === index ? (
                                                <DatePicker
                                                    selected={editedRow.punchIn}
                                                    onChange={(date) => handleDateChange(date, 'punchIn')}
                                                    showTimeSelect
                                                    timeIntervals={30}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                    className="form-control mb-3"
                                                />
                                            ) : (
                                                row.punchIn.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                                            )}
                                        </td>
                                        <td>
                                            {editIndex === index ? (
                                                <DatePicker
                                                    selected={editedRow.punchOut}
                                                    onChange={(date) => handleDateChange(date, 'punchOut')}
                                                    showTimeSelect
                                                    timeIntervals={30}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                    className="form-control mb-3"
                                                />
                                            ) : (
                                                row.punchOut
                                                    ? row.punchOut.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                                                    : 'N/A'
                                            )}
                                        </td>
                                        <td>{row.department}</td>
                                        <td>{row.punchIn && !row.punchOut ? 'Working' : row.punchOut ? 'Finished' : 'Not Started'}</td>
                                        <td>{`${hours}h ${minutes}m`}</td>
                                        <td>{workedStatus}</td>
                                        <td>
                                            <Dropdown drop="start">
                                                <Dropdown.Toggle variant="secondary" id={`dropdown-basic-${row.id}`}>
                                                    <i className="bi bi-three-dots-vertical"></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {editIndex === index ? (
                                                        <Dropdown.Item onClick={handleSave}>
                                                            Save
                                                        </Dropdown.Item>
                                                    ) : (
                                                        <Dropdown.Item onClick={() => handleEdit(index)}>
                                                            Edit
                                                        </Dropdown.Item>
                                                    )}
                                                    <Dropdown.Item onClick={() => handleDelete(row.id)}>
                                                        Delete
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    );
};

export default Att_DailyLog;
