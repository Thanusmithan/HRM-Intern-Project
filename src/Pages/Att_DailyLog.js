// import React, { useState } from 'react';
// import { Table, Card, Button, Dropdown, Pagination, Form, Modal, Alert, DropdownItem } from 'react-bootstrap';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css'; // Include DatePicker styles
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// const Att_DailyLog = () => {
//     const initialData = [
//         //Fake Entries for daily log
//         { id: 1, profile: 'Thanusmithan', punchIn: new Date('10/08/2024 08:00'), punchOut: new Date('10/08/2024 17:00'), department: 'Design', isApproved: false },
//         { id: 2, profile: 'Thulakshan', punchIn: new Date('10/08/2024 08:00'), punchOut: new Date('10/08/2024 17:00'), department: 'Product', isApproved: false },
//         { id: 3, profile: 'Kirishan', punchIn: new Date('10/08/2024 08:00'), punchOut: new Date('10/08/2024 17:00'), department: 'Marketing', isApproved: false },
//         { id: 4, profile: 'Pasindu', punchIn: new Date('10/08/2024 08:00'), punchOut: new Date('10/08/2024 17:00'), department: 'Support', isApproved: false },
//         { id: 5, profile: 'Chinthana', punchIn: new Date('10/08/2024 08:00'), punchOut: new Date('10/08/2024 17:00'), department: 'Operations', isApproved: false },
//         { id: 6, profile: 'Kumaran', punchIn: new Date('10/08/2024 08:00'), punchOut: new Date('10/08/2024 17:00'), department: 'HR', isApproved: false },
//     ];

//     const [data, setData] = useState(initialData);
//     const [editIndex, setEditIndex] = useState(null);
//     const [editedRow, setEditedRow] = useState({});
//     const [showModal, setShowModal] = useState(false);
//     const [newAttendance, setNewAttendance] = useState({ profile: '', punchIn: '', punchOut: '', department: '' });
//     const [searchTerm, setSearchTerm] = useState('');
//     const [showError, setShowError] = useState(false);
//     const [isExporting, setIsExporting] = useState(false);

//     const departmentOptions = ['Design', 'Product', 'Marketing', 'Support', 'Operations', 'HR'];

//     const handleEdit = (index) => {
//         setEditIndex(index);
//         setEditedRow(data[index]);
//     };

//     const handleApprove = (index) => {
//         const newData = [...data];
//         newData[index].isApproved = !newData[index].isApproved;
//         setData(newData);
//     };

//     const handleSave = () => {
//         const newData = [...data];
//         newData[editIndex] = { ...editedRow };
//         setData(newData);
//         setEditIndex(null);
//     };

//     const handleChange = (e) => {
//         setEditedRow({ ...editedRow, [e.target.name]: e.target.value });
//     };

//     const handleDateChange = (date, field) => {
//         setEditedRow({ ...editedRow, [field]: date });
//     };

//     const handleNewAttendanceChange = (e) => {
//         setNewAttendance({ ...newAttendance, [e.target.name]: e.target.value });
//     };

//     const handleAddAttendance = () => {
//         setShowModal(true);
//     };

//     const handleSaveNewAttendance = () => {
//         if (!newAttendance.profile || !newAttendance.punchIn || !newAttendance.punchOut || !newAttendance.department) {
//             setShowError(true);
//             return;
//         }

//         const newData = [
//             ...data,
//             { id: data.length + 1, ...newAttendance, isApproved: false },
//         ];
//         setData(newData);
//         setNewAttendance({ profile: '', punchIn: '', punchOut: '', department: '' });
//         setShowModal(false);
//         setShowError(false);
//     };

//     const handleDelete = (index) => {
//         const newData = data.filter((_, i) => i !== index);
//         setData(newData);
//     };

//     const filteredData = data.filter((row) =>
//         row.profile.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handleExport = () => {
//         setIsExporting(true);
//         const input = document.getElementById('table-to-pdf'); // Element containing the table

//         html2canvas(input)
//             .then((canvas) => {
//                 const imgData = canvas.toDataURL('image/png');
//                 const pdf = new jsPDF();
//                 const imgWidth = 190; // Image width
//                 const imgHeight = (canvas.height * imgWidth) / canvas.width;
//                 const pageHeight = pdf.internal.pageSize.height;
//                 let position = 30; // Leave space for title

//                 // Add title to the PDF
//                 pdf.setFontSize(16);
//                 pdf.text("Daily Log", 10, 10); // Title at the top
//                 pdf.setFontSize(8);
//                 pdf.text("Date: " + new Date().toLocaleString(), 10, 20); // Current date below title

//                 // Add the table image to the PDF
//                 pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
//                 position += imgHeight + 10; // Update position after the image

//                 // Add footer text
//                 const currentDate = new Date().toLocaleString();
//                 pdf.setFontSize(8);
//                 pdf.text(`Generated on: ${currentDate}`, 10, position);

//                 // Add page numbers to each page
//                 const totalPages = pdf.internal.getNumberOfPages();
//                 for (let i = 1; i <= totalPages; i++) {
//                     pdf.setPage(i);
//                     pdf.setFontSize(10);
//                     pdf.text(`Page ${i} of ${totalPages}`, 14, pageHeight - 10); // Page number at the bottom
//                 }

//                 // Save the PDF
//                 pdf.save('attendance_report.pdf');

//                 setIsExporting(false);
//             });
//     };



//     return (
//         <Card className="no-border">
//             <Card.Header className="d-flex justify-content-between align-items-center mx-3 mb-2">
//                 <h5 className="mb-0">Daily Log</h5> {/* Add mb-0 to remove unnecessary margin */}

//                 <div className="d-flex align-items-center"> {/* Flex container for search and buttons */}
//                     <Form className="d-flex me-2" style={{ width: '400px' }}> {/* Adjusted width to 250px for better fit */}
//                         <Form.Control
//                             type="search"
//                             placeholder="Search"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="me-2" // Add space between search bar and buttons
//                         />
//                     </Form>

//                     <Button variant="success" onClick={handleAddAttendance} className="me-2 d-flex align-items-center">
//                         <i className="bi bi-plus-circle me-1"></i> {/* Add some margin between icon and text */}
//                         Add
//                     </Button>

//                     <Button variant="outline-primary" onClick={handleExport} className="d-flex align-items-center">
//                         <i className="bi bi-file-earmark-arrow-up me-1"></i> {/* Add margin between icon and text */}
//                         Export
//                     </Button>
//                 </div>
//             </Card.Header>


//             <Card.Body id="table-to-pdf">
//                 <Table striped bordered hover>
//                     <thead>
//                         <tr>
//                             <th style={{ width: '30%' }}>Employee Name</th>
//                             <th style={{ width: '20%' }}>Punch In</th>
//                             <th style={{ width: '20%' }}>Punch Out</th>
//                             <th style={{ width: '20%' }}>Department</th>
//                             {!isExporting && <th style={{ width: '10%' }}>Action</th>}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredData.map((row, index) => (
//                             <tr key={row.id} style={{ backgroundColor: row.isApproved ? 'lightgreen' : 'transparent' }}>
//                                 <td>
//                                     {editIndex === index ? (
//                                         <Form.Control
//                                             type="text"
//                                             name="profile"
//                                             value={editedRow.profile}
//                                             onChange={handleChange}
//                                         />
//                                     ) : (
//                                         <>
//                                             {row.profile} {row.isApproved && <span style={{ color: 'green', marginLeft: '5px' }}>&#10003;</span>}
//                                         </>
//                                     )}
//                                 </td>
//                                 <td>
//                                     {editIndex === index ? (
//                                         // <DatePicker
//                                         //     selected={editedRow.punchIn}
//                                         //     onChange={(date) => handleDateChange(date, 'punchIn')}
//                                         //     dateFormat="dd/MM/yyyy"
//                                         // />
//                                         <DatePicker
//                                             selected={editedRow.punchIn}
//                                             onChange={(date) => handleDateChange(date, 'punchIn')}
//                                             showTimeSelect
//                                             showTimeSelectOnly
//                                             timeIntervals={30}
//                                             timeCaption="Time"
//                                             dateFormat="h:mm aa" // This formats the time to 12-hour format with AM/PM
//                                             className="form-control mb-3" // Add Bootstrap form-control and margin-bottom
//                                         />
//                                     ) : (
//                                         // row.punchIn.toLocaleDateString()
//                                         row.punchIn.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true })
//                                     )}
//                                 </td>
//                                 <td>
//                                     {editIndex === index ? (
//                                         <DatePicker
//                                             selected={editedRow.punchOut}
//                                             onChange={(date) => handleDateChange(date, 'punchOut')}
//                                             showTimeSelect
//                                             showTimeSelectOnly
//                                             timeIntervals={30}
//                                             timeCaption="Time"
//                                             dateFormat="h:mm aa" // This formats the time to 12-hour format with AM/PM
//                                             className="form-control mb-3" // Add Bootstrap form-control and margin-bottom
//                                         />
//                                     ) : (
//                                         // Format the punchOut time in 12-hour format with AM/PM when not in edit mode
//                                         row.punchOut.toLocaleString([], { hour: '2-digit', minute: '2-digit', hour12: true })
//                                     )}


//                                 </td>
//                                 <td>
//                                     {editIndex === index ? (
//                                         <Form.Select
//                                             name="department"
//                                             value={editedRow.department}
//                                             onChange={handleChange}
//                                         >
//                                             {departmentOptions.map((dept, i) => (
//                                                 <option key={i} value={dept}>{dept}</option>
//                                             ))}
//                                         </Form.Select>
//                                     ) : (
//                                         row.department
//                                     )}
//                                 </td>
//                                 {!isExporting && (
//                                     <td className='text-center'>
//                                         {/* <Dropdown>
//                                             <Dropdown.Toggle variant="secondary" id="dropdown-basic">

//                                             </Dropdown.Toggle>

//                                             <Dropdown.Menu>
//                                                 {editIndex === index ? (
//                                                     <>
//                                                         <Dropdown.Item onClick={handleSave} >Save</Dropdown.Item>
//                                                         <Dropdown.Item onClick={() => setEditIndex(null)}>Cancel</Dropdown.Item>
//                                                     </>
//                                                 ) : (
//                                                     <>
//                                                         <Dropdown.Item onClick={() => handleEdit(index)}>Edit</Dropdown.Item>
//                                                         <Dropdown.Item variant={row.isApproved ? "outline-success" : "outline-primary"} onClick={() => handleApprove(index)}>
//                                                             {row.isApproved ? "Unapprove" : "Approve"}
//                                                         </Dropdown.Item>
//                                                         <Dropdown.Item onClick={() => handleDelete(index)} className="text-danger">Delete</Dropdown.Item>
//                                                     </>
//                                                 )}

//                                             </Dropdown.Menu>
//                                         </Dropdown> */}

//                                         <Dropdown>
//                                             <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//                                                 <i className="bi bi-three-dots-vertical"></i> {/* Add three dots icon for dropdown */}
//                                             </Dropdown.Toggle>

//                                             <Dropdown.Menu>
//                                                 {editIndex === index ? (
//                                                     <>
//                                                         <Dropdown.Item onClick={handleSave}>
//                                                             <i className="bi bi-check-circle me-2"></i> {/* Save icon */}
//                                                             Save
//                                                         </Dropdown.Item>
//                                                         <Dropdown.Item onClick={() => setEditIndex(null)}>
//                                                             <i className="bi bi-x-circle me-2"></i> {/* Cancel icon */}
//                                                             Cancel
//                                                         </Dropdown.Item>
//                                                     </>
//                                                 ) : (
//                                                     <>
//                                                         <Dropdown.Item onClick={() => handleEdit(index)}>
//                                                             <i className="bi bi-pencil-fill me-2"></i> {/* Edit icon */}
//                                                             Edit
//                                                         </Dropdown.Item>
//                                                         <Dropdown.Item
//                                                             variant={row.isApproved ? "outline-success" : "outline-primary"}
//                                                             onClick={() => handleApprove(index)}
//                                                         >
//                                                             <i className={`bi ${row.isApproved ? 'bi-x-square me-2' : 'bi-check-square me-2'}`}></i> {/* Toggle between Unapprove/Approve icons */}
//                                                             {row.isApproved ? "Unapprove" : "Approve"}
//                                                         </Dropdown.Item>
//                                                         <Dropdown.Item onClick={() => handleDelete(index)} className="text-danger">
//                                                             <i className="bi bi-trash-fill me-2"></i> {/* Delete icon */}
//                                                             Delete
//                                                         </Dropdown.Item>
//                                                     </>
//                                                 )}
//                                             </Dropdown.Menu>
//                                         </Dropdown>


//                                     </td>
//                                 )}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </Card.Body>

//             <Modal show={showModal} onHide={() => setShowModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Add Attendance</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         {showError && <Alert variant="danger">Please fill all fields.</Alert>}
//                         <Form.Group className="mb-3">
//                             <Form.Label>Employee Name</Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 name="profile"
//                                 value={newAttendance.profile}
//                                 onChange={handleNewAttendanceChange}
//                                 placeholder="Enter employee name"
//                                 required // Ensure that this field is required
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Punch In</Form.Label><br />
//                             {/* <DatePicker
//                                 selected={newAttendance.punchIn}
//                                 onChange={(date) => setNewAttendance({ ...newAttendance, punchIn: date })}
//                                 dateFormat="MM/dd/yyyy"
//                                 className="form-control" // Added Bootstrap form-control class
//                             /> */}
//                             <DatePicker
//                                 selected={newAttendance.punchIn}
//                                 onChange={(date) => setNewAttendance({ ...newAttendance, punchIn: date })}
//                                 showTimeSelect
//                                 showTimeSelectOnly
//                                 timeIntervals={30}
//                                 timeCaption="Time"
//                                 dateFormat="h:mm aa" // Formats time to 12-hour with AM/PM
//                                 className="form-control" // Added Bootstrap form-control class
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Punch Out</Form.Label><br />
//                             <DatePicker
//                                 selected={newAttendance.punchOut}
//                                 onChange={(date) => setNewAttendance({ ...newAttendance, punchOut: date })}
//                                 showTimeSelect
//                                 showTimeSelectOnly
//                                 timeIntervals={30}
//                                 timeCaption="Time"
//                                 dateFormat="h:mm aa" // Formats time to 12-hour with AM/PM
//                                 className="form-control" // Added Bootstrap form-control class
//                             />
//                         </Form.Group>
//                         <Form.Group className="mb-3">
//                             <Form.Label>Department</Form.Label>
//                             <Form.Select
//                                 name="department"
//                                 value={newAttendance.department}
//                                 onChange={handleNewAttendanceChange}
//                                 required // Ensure that this field is required
//                             >
//                                 <option value="">Select a department</option> {/* Placeholder option */}
//                                 {departmentOptions.map((dept, i) => (
//                                     <option key={i} value={dept}>{dept}</option>
//                                 ))}
//                             </Form.Select>
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
//                     <Button variant="primary" onClick={handleSaveNewAttendance}>Save Attendance</Button>
//                 </Modal.Footer>
//             </Modal>

//         </Card>
//     );
// };

// export default Att_DailyLog;


//----------------------------------updated----------------------------------

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
        setEditedRow(data[index]);
    };

    const handleSave = () => {
        const newData = [...data];
        newData[editIndex] = { ...editedRow };
        setData(newData);
        setEditIndex(null);
    };

    const handleDateChange = (date, field) => {
        setEditedRow({ ...editedRow, [field]: date });
    };

    const filteredData = data.filter((row) =>
        row.profile.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to export data to CSV format
    const exportToCSV = () => {
        const csvRows = [];
        // Get the headers
        const headers = ['Employee Name', 'ID', 'Punch In', 'Punch Out', 'Department', 'Status', 'Working Hours', 'Worked Status'];
        csvRows.push(headers.join(','));

        // Get the rows
        filteredData.forEach((row) => {
            const { hours, minutes } = calculateWorkingHours(row.punchIn, row.punchOut);
            const workedStatus = getWorkedStatus(hours);
            const rowData = [
                row.profile,
                row.id,
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
                                const workedStatus = getWorkedStatus(hours); // Calculate worked status

                                return (
                                    <tr key={row.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                {/* Display employee image */}
                                                <img
                                                    src={`https://i.pravatar.cc/150?img=${index + 1}`} // Use the placeholder image generator
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
                                                    selected={editedRow.punchIn}
                                                    onChange={(date) => handleDateChange(date, 'punchIn')}
                                                    showTimeSelect
                                                    timeIntervals={30}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                    className="form-control mb-3"
                                                />
                                            ) : (
                                                row.punchIn
                                                    ? row.punchIn.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
                                                    : 'N/A'
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
                                        <td>
                                            {row.punchIn && !row.punchOut ? 'Working' : row.punchOut ? 'Finished' : 'Not Started'}
                                        </td>
                                        <td>{`${hours}h ${minutes}m`}</td>
                                        <td>{workedStatus}</td> {/* Display worked status */}
                                        <td>
                                            <Dropdown drop="start">
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                    <i className="bi bi-three-dots-vertical"></i>
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {editIndex === index ? (
                                                        <>
                                                            <Dropdown.Item onClick={handleSave}>
                                                                <i className="bi bi-check-circle me-2"></i>
                                                                Save
                                                            </Dropdown.Item>
                                                            <Dropdown.Item onClick={() => setEditIndex(null)}>
                                                                <i className="bi bi-x-circle me-2"></i>
                                                                Cancel
                                                            </Dropdown.Item>
                                                        </>
                                                    ) : (
                                                        <Dropdown.Item onClick={() => handleEdit(index)}>
                                                            <i className="bi bi-pencil-fill me-2"></i>
                                                            Edit
                                                        </Dropdown.Item>
                                                    )}
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
