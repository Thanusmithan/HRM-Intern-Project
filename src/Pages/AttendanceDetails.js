// import React, { useState } from 'react'; 
// import { Card, Table, Button, Form, Pagination } from 'react-bootstrap';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// export const employeesAttendanceDetails = [
//     {
//       EmployeeNames: "Thanusmithan",
//       January: "160 hrs",
//       February	: "150 hrs",
//       March: "180 hrs",
//       April: "165 hrs",
//       May: "180 hrs",
//       June: "175 hrs",
//       July: "160 hrs",
//       August	: "155 hrs",
//       September: "170 hrs",
//       October: "160 hrs",
//       November: "150 hrs",
//       December: "165 hrs",
//     },
// {
//     EmployeeNames: "Chinthana",
//     January: "150 hrs",
//     February	: "155 hrs",
//     March: "160 hrs",
//     April: "170 hrs",
//     May: "175 hrs",
//     June: "180 hrs",
//     July: "150 hrs",
//     August	: "160 hrs",
//     September: "160 hrs",
//     October: "165 hrs",
//     November: "170 hrs",
//     December: "155 hrs",
// },
// {
//     EmployeeNames: "Pasindu",
//     January: "170 hrs",
//     February	: "160 hrs",
//     March: "165 hrs",
//     April: "180 hrs",
//     May: "175 hrs",
//     June: "170 hrs",
//     July: "160 hrs",
//     August	: "155 hrs",
//     September: "160 hrs",
//     October: "150 hrs",
//     November: "155 hrs",
//     December: "175 hrs",
// },
// {
//     EmployeeNames: "Kirishan",
//     January: "180 hrs",
//     February	: "165 hrs",
//     March: "170 hrs",
//     April: "160 hrs",
//     May: "175 hrs",
//     June: "180 hrs",
//     July: "160 hrs",
//     August	: "150 hrs",
//     September: "160 hrs",
//     October: "160 hrs",
//     November: "180 hrs",
//     December: "175 hrs",
// },
// {
//     EmployeeNames: "Thulakshan",
//     January: "160 hrs",
//     February	: "170 hrs",
//     March: "175 hrs",
//     April: "180 hrs",
//     May: "150 hrs",
//     June: "160 hrs",
//     July: "165 hrs",
//     August	: "170 hrs",
//     September: "175 hrs",
//     October: "160 hrs",
//     November: "170 hrs",
//     December: "150 hrs",
// },
//     // Add other employee data here...
//   ];


// const AttendanceDetails = () => {
//     const initialData = [
//         { profile: 'Thanusmithan', january: '160 hrs', february: '150 hrs', march: '170 hrs', april: '165 hrs', may: '180 hrs', june: '175 hrs', july: '160 hrs', august: '155 hrs', september: '170 hrs', october: '160 hrs', november: '150 hrs', december: '165 hrs' },
//         { profile: 'Chinthana', january: '150 hrs', february: '155 hrs', march: '160 hrs', april: '170 hrs', may: '175 hrs', june: '180 hrs', july: '160 hrs', august: '150 hrs', september: '160 hrs', october: '165 hrs', november: '170 hrs', december: '155 hrs' },
//         { profile: 'Pasindu', january: '170 hrs', february: '160 hrs', march: '165 hrs', april: '180 hrs', may: '175 hrs', june: '170 hrs', july: '160 hrs', august: '155 hrs', september: '160 hrs', october: '150 hrs', november: '155 hrs', december: '175 hrs' },
//         { profile: 'Kirishan', january: '180 hrs', february: '165 hrs', march: '170 hrs', april: '160 hrs', may: '175 hrs', june: '180 hrs', july: '165 hrs', august: '170 hrs', september: '155 hrs', october: '160 hrs', november: '180 hrs', december: '175 hrs' },
//         { profile: 'Thulakshan', january: '160 hrs', february: '170 hrs', march: '175 hrs', april: '180 hrs', may: '150 hrs', june: '160 hrs', july: '165 hrs', august: '170 hrs', september: '175 hrs', october: '160 hrs', november: '170 hrs', december: '150 hrs' },
//         { profile: 'Kumaran', january: '165 hrs', february: '180 hrs', march: '160 hrs', april: '155 hrs', may: '170 hrs', june: '175 hrs', july: '180 hrs', august: '160 hrs', september: '165 hrs', october: '170 hrs', november: '155 hrs', december: '160 hrs' }
//     ];

//     const [data, setData] = useState(initialData);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(5); // Number of records to show per page

//     // Filter data based on search term
//     const filteredData = data.filter(item =>
//         item.profile.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Calculate total pages
//     const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//     // Get current items to display
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//     const exportToPDF = () => {
//         const input = document.getElementById('attendance-table'); // Get the table element
//         html2canvas(input).then((canvas) => {
//             const imgData = canvas.toDataURL('image/png');
//             const pdf = new jsPDF('p', 'mm', 'a4');
//             const imgWidth = 190; // Adjust image width for A4 page size
//             const pageHeight = pdf.internal.pageSize.height;
//             const imgHeight = (canvas.height * imgWidth) / canvas.width;
//             let heightLeft = imgHeight;

//             let position = 40; // Leave space for title and date

//             // Add title and export date
//             pdf.setFontSize(18);
//             pdf.text("Attendance Details", 14, 20); // Title
//             pdf.setFontSize(8);
//             pdf.text(`Exported on: ${new Date().toLocaleString()}`, 14, 30); // Export date below the title

//             // Add the table image to the PDF
//             pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
//             heightLeft -= pageHeight;

//             // Handle multi-page content if the table image exceeds one page
//             while (heightLeft > 0) {
//                 pdf.addPage();
//                 position = heightLeft - imgHeight;
//                 pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
//                 heightLeft -= pageHeight;
//             }

//             // Add page numbers to each page
//             const totalPages = pdf.internal.getNumberOfPages();
//             for (let i = 1; i <= totalPages; i++) {
//                 pdf.setPage(i);
//                 pdf.setFontSize(10);
//                 pdf.text(`Page ${i} of ${totalPages}`, 14, pageHeight - 10); // Page number at the bottom
//             }

//             // Save the generated PDF file
//             pdf.save("attendance-details.pdf");
//         });
//     };


//     return (
//         <Card className='no-border'>
//             <Card.Header className="d-flex justify-content-between align-items-center mx-3">
//                 <h5>Attendance Details</h5>
//                 <div className="d-flex align-items-center"> {/* Added flex for alignment */}
//                     <Form className="d-flex me-2" style={{ width: '400px' }}>
//                         <Form.Control
//                             type="search"
//                             placeholder="Search"
//                             className="me-2"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)} // Update search term
//                         />
//                     </Form>
//                     <Button variant="outline-primary" onClick={exportToPDF}>
//                         <i className="bi bi-file-earmark-arrow-up"></i> Export
//                     </Button>
//                 </div>
//             </Card.Header>

//             <Card.Body>
//                 {/* Table */}
//                 <div id="attendance-table">
//                     <Table striped bordered hover responsive>
//                         <thead>
//                             <tr>
//                                 <th style={{ textAlign: 'center' }}>Employee Names</th>
//                                 <th style={{ textAlign: 'center' }}>January</th>
//                                 <th style={{ textAlign: 'center' }}>February</th>
//                                 <th style={{ textAlign: 'center' }}>March</th>
//                                 <th style={{ textAlign: 'center' }}>April</th>
//                                 <th style={{ textAlign: 'center' }}>May</th>
//                                 <th style={{ textAlign: 'center' }}>June</th>
//                                 <th style={{ textAlign: 'center' }}>July</th>
//                                 <th style={{ textAlign: 'center' }}>August</th>
//                                 <th style={{ textAlign: 'center' }}>September</th>
//                                 <th style={{ textAlign: 'center' }}>October</th>
//                                 <th style={{ textAlign: 'center' }}>November</th>
//                                 <th style={{ textAlign: 'center' }}>December</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentItems.map((row, index) => (
//                                 <tr key={index}>
//                                     <td>{row.profile}</td>
//                                     <td>{row.january}</td>
//                                     <td>{row.february}</td>
//                                     <td>{row.march}</td>
//                                     <td>{row.april}</td>
//                                     <td>{row.may}</td>
//                                     <td>{row.june}</td>
//                                     <td>{row.july}</td>
//                                     <td>{row.august}</td>
//                                     <td>{row.september}</td>
//                                     <td>{row.october}</td>
//                                     <td>{row.november}</td>
//                                     <td>{row.december}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 </div>

//                 {/* Pagination */}
//                 <div className="d-flex justify-content-between align-items-center">
//                     <Pagination>
//                         <Pagination.Prev
//                             onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}
//                         />
//                         {Array.from({ length: totalPages }, (_, i) => (
//                             <Pagination.Item
//                                 key={i}
//                                 active={i + 1 === currentPage}
//                                 onClick={() => setCurrentPage(i + 1)}
//                             >
//                                 {i + 1}
//                             </Pagination.Item>
//                         ))}
//                         <Pagination.Next
//                             onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage)}
//                         />
//                     </Pagination>
//                     <Form.Group controlId="formPageSize" className="d-flex align-items-center">
//                         <Form.Label className="me-2 mb-0">Page:</Form.Label>
//                         <Form.Control as="select" defaultValue="5" style={{ width: 'auto' }}>
//                             <option>5</option>
//                             <option>10</option>
//                             <option>15</option>
//                         </Form.Control>
//                     </Form.Group>
//                 </div>
//             </Card.Body>
//         </Card>
//     );
// };

// export default AttendanceDetails;

// //--------------------------------------------------------------------------------------------------------------------------------

// import React, { useState } from 'react';
// import { Card, Table, Button, Form, Pagination } from 'react-bootstrap';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// export const employeesAttendanceDetails = [
//     {
//         EmployeeNames: "Jeremy Neigh",
//         January: "154 hrs",
//         February: "199 hrs",
//         March: "155 hrs",
//         April: "242 hrs",
//         May: "190 hrs",
//         June: "235 hrs",
//         July: "206 hrs",
//         August: "244 hrs",
//         September: "246 hrs",
//         October: "216 hrs",
//         November: "196 hrs",
//         December: "222 hrs",
//     },
//     {
//         EmployeeNames: "Emily Johnson",
//         January: "165 hrs",
//         February	: "175 hrs",
//         March: "221 hrs",
//         April: "202 hrs",
//         May: "246 hrs",
//         June: "226 hrs",
//         July: "208 hrs",
//         August	: "210 hrs",
//         September: "222 hrs",
//         October: "244 hrs",
//         November: "176 hrs",
//         December: "242 hrs",
//     },
//     {
//         EmployeeNames: "Mark Smith",
//         January: "173 hrs",
//         February	: "154 hrs",
//         March: "152 hrs",
//         April: "234 hrs",
//         May: "214 hrs",
//         June: "229 hrs",
//         July: "180 hrs",
//         August	: "174 hrs",
//         September: "202 hrs",
//         October: "167 hrs",
//         November: "202 hrs",
//         December: "217 hrs",
//     },
//     {
//         EmployeeNames: "Sophia Williams",
//         January: "216 hrs",
//         February	: "166 hrs",
//         March: "238 hrs",
//         April: "175 hrs",
//         May: "155 hrs",
//         June: "162 hrs",
//         July: "212 hrs",
//         August	: "159 hrs",
//         September: "185 hrs",
//         October: "185 hrs",
//         November: "164 hrs",
//         December: "155 hrs",
//     },
//     {
//         EmployeeNames: "Liam Brown",
//         January: "210 hrs",
//         February	: "235 hrs",
//         March: "202 hrs",
//         April: "180 hrs",
//         May: "219 hrs",
//         June: "248 hrs",
//         July: "152 hrs",
//         August	: "211 hrs",
//         September: "153 hrs",
//         October: "183 hrs",
//         November: "239 hrs",
//         December: "157 hrs",
//     },
//     {
//         EmployeeNames: "Olivia Garcia",
//         January: "171 hrs",
//         February	: "237 hrs",
//         March: "207 hrs",
//         April: "171 hrs",
//         May: "230 hrs",
//         June: "181 hrs",
//         July: "186 hrs",
//         August	: "176 hrs",
//         September: "175 hrs",
//         October: "234 hrs",
//         November: "211 hrs",
//         December: "187 hrs",
//     },
//     {
//         EmployeeNames: "Noah Martinez",
//         January: "177 hrs",
//         February	: "221 hrs",
//         March: "167 hrs",
//         April: "172 hrs",
//         May: "173 hrs",
//         June: "242 hrs",
//         July: "190 hrs",
//         August	: "242 hrs",
//         September: "183 hrs",
//         October: "206 hrs",
//         November: "161 hrs",
//         December: "246 hrs",
//     },
//     // Add other employees here...
// ];

// const AttendanceDetails = () => {
//     const [data, setData] = useState(employeesAttendanceDetails);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(5);

//     // Filter data based on search term
//     const filteredData = data.filter(item =>
//         item.EmployeeNames.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     // Calculate total pages
//     const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//     // Get current items to display
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

//     // Function to get worked hours for selected employee and month
//     const getWorkedHours = (employeeName, month) => {
//         const employeeData = data.find(emp => emp.EmployeeNames === employeeName);
//         return employeeData ? employeeData[month] : 'N/A';
//     };

//     return (
//         <Card className='no-border'>
//             <Card.Header className="d-flex justify-content-between align-items-center mx-3">
//                 <h5>Attendance Details</h5>
//                 <Form className="d-flex me-2" style={{ width: '400px' }}>
//                     <Form.Control
//                         type="search"
//                         placeholder="Search"
//                         className="me-2"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </Form>
//             </Card.Header>

//             <Card.Body>
//                 <div id="attendance-table">
//                     <Table striped bordered hover responsive>
//                         <thead>
//                             <tr>
//                                 <th style={{ textAlign: 'center' }}>Employee Names</th>
//                                 <th style={{ textAlign: 'center' }}>January</th>
//                                 <th style={{ textAlign: 'center' }}>February</th>
//                                 <th style={{ textAlign: 'center' }}>March</th>
//                                 <th style={{ textAlign: 'center' }}>April</th>
//                                 <th style={{ textAlign: 'center' }}>May</th>
//                                 <th style={{ textAlign: 'center' }}>June</th>
//                                 <th style={{ textAlign: 'center' }}>July</th>
//                                 <th style={{ textAlign: 'center' }}>August</th>
//                                 <th style={{ textAlign: 'center' }}>September</th>
//                                 <th style={{ textAlign: 'center' }}>October</th>
//                                 <th style={{ textAlign: 'center' }}>November</th>
//                                 <th style={{ textAlign: 'center' }}>December</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {currentItems.map((row, index) => (
//                                 <tr key={index}>
//                                     <td>{row.EmployeeNames}</td>
//                                     <td>{row.January}</td>
//                                     <td>{row.February}</td>
//                                     <td>{row.March}</td>
//                                     <td>{row.April}</td>
//                                     <td>{row.May}</td>
//                                     <td>{row.June}</td>
//                                     <td>{row.July}</td>
//                                     <td>{row.August}</td>
//                                     <td>{row.September}</td>
//                                     <td>{row.October}</td>
//                                     <td>{row.November}</td>
//                                     <td>{row.December}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 </div>
//             </Card.Body>
//         </Card>
//     );
// };

// export default AttendanceDetails;

//---------------------Important update---------------------------------------------------------------------------

import React, { useState } from 'react';
import { Table, Card, Button, Dropdown, Form, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEmployeeDetails } from '../Componets/Employee'; // Import your context

export const employeesAttendanceDetails = [
    {
        EmployeeNames: "Jeremy Neigh",
        January: "154 hrs",
        February: "229 hrs",
        March: "153 hrs",
        April: "178 hrs",
        May: "211 hrs",
        June: "177 hrs",
        July: "160 hrs",
        August: "196 hrs",
        September: "204 hrs",
        October: "162 hrs",
        November: "167 hrs",
        December: "224 hrs",
    },
    {
        EmployeeNames: "Emily Johnson",
        January: "165 hrs",
        February: "175 hrs",
        March: "221 hrs",
        April: "202 hrs",
        May: "246 hrs",
        June: "226 hrs",
        July: "208 hrs",
        August: "210 hrs",
        September: "222 hrs",
        October: "244 hrs",
        November: "176 hrs",
        December: "242 hrs",
    },
    {
        EmployeeNames: "Mark Smith",
        January: "173 hrs",
        February: "154 hrs",
        March: "152 hrs",
        April: "234 hrs",
        May: "214 hrs",
        June: "229 hrs",
        July: "180 hrs",
        August: "174 hrs",
        September: "202 hrs",
        October: "167 hrs",
        November: "202 hrs",
        December: "217 hrs",
    },
    {
        EmployeeNames: "Sophia Williams",
        January: "216 hrs",
        February: "166 hrs",
        March: "238 hrs",
        April: "175 hrs",
        May: "155 hrs",
        June: "162 hrs",
        July: "212 hrs",
        August: "159 hrs",
        September: "185 hrs",
        October: "185 hrs",
        November: "164 hrs",
        December: "155 hrs",
    },
    {
        EmployeeNames: "Liam Brown",
        January: "210 hrs",
        February: "235 hrs",
        March: "202 hrs",
        April: "180 hrs",
        May: "219 hrs",
        June: "248 hrs",
        July: "152 hrs",
        August: "211 hrs",
        September: "153 hrs",
        October: "183 hrs",
        November: "239 hrs",
        December: "157 hrs",
    },
    {
        EmployeeNames: "Olivia Garcia",
        January: "171 hrs",
        February: "237 hrs",
        March: "207 hrs",
        April: "171 hrs",
        May: "230 hrs",
        June: "181 hrs",
        July: "186 hrs",
        August: "176 hrs",
        September: "175 hrs",
        October: "234 hrs",
        November: "211 hrs",
        December: "187 hrs",
    },
    {
        EmployeeNames: "Noah Martinez",
        January: "177 hrs",
        February: "221 hrs",
        March: "167 hrs",
        April: "172 hrs",
        May: "173 hrs",
        June: "242 hrs",
        July: "190 hrs",
        August: "242 hrs",
        September: "183 hrs",
        October: "206 hrs",
        November: "161 hrs",
        December: "246 hrs",
    },
    // Add other employees here...
];

const AttendanceDetails = () => {
    const { employees } = useEmployeeDetails(); // Get employee data from context

    // Example attendance data - replace this with your actual data source if available
    const getRandomHours = () => `${Math.floor(Math.random() * 100 + 150)} hrs`;

    const initialData = employees.map(employee => ({
        profile: employee.profile,
        id: employee.id, // Store the employee ID
        image: `https://i.pravatar.cc/150?img=${employee.id}`, // Use the same image logic
        january: getRandomHours(), // Replace with real data as needed
        february: getRandomHours(),
        march: getRandomHours(),
        april: getRandomHours(),
        may: getRandomHours(),
        june: getRandomHours(),
        july: getRandomHours(),
        august: getRandomHours(),
        september: getRandomHours(),
        october: getRandomHours(),
        november: getRandomHours(),
        december: getRandomHours(),
    }));

    const [data, setData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter data based on search term
    const filteredData = data.filter(item =>
        item.profile.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const exportToCSV = () => {
        // Create CSV content
        const header = ['Employee Name', 'Employee ID', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const rows = filteredData.map(item => [
            item.profile,
            item.id,
            item.january,
            item.february,
            item.march,
            item.april,
            item.may,
            item.june,
            item.july,
            item.august,
            item.september,
            item.october,
            item.november,
            item.december
        ]);

        const csvContent = [
            header,
            ...rows
        ]
            .map(e => e.join(",")) // Join each row with a comma
            .join("\n"); // Join rows with a new line

        // Create a blob from the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'attendance-details.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <Breadcrumb className="ms-3">
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/hrm" }}>HRM</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "#" }}>Attendance</Breadcrumb.Item>
                <Breadcrumb.Item active>Monthly Log Details</Breadcrumb.Item>
            </Breadcrumb>
            <Card className='no-border'>
                <Card.Header className="d-flex justify-content-between align-items-center mx-3">
                    <h5>Monthly Log Details</h5>
                    <div className="d-flex align-items-center">
                        <Form className="d-flex me-2" style={{ width: '400px' }}>
                            <Form.Control
                                type="search"
                                placeholder="Search by Employee Name"
                                className="me-2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Form>
                        <Button variant="outline-primary" onClick={exportToCSV}>
                            <i className="bi bi-file-earmark-arrow-up"></i> Export
                        </Button>
                    </div>
                </Card.Header>

                <Card.Body>
                    <div id="attendance-table">
                        <Table striped bordered hover responsive style={{ fontSize: '0.9rem' }}> {/* Adjust font size here */}
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>Employee</th>
                                    <th style={{ textAlign: 'center' }}>ID</th>
                                    <th style={{ textAlign: 'center' }}>January</th>
                                    <th style={{ textAlign: 'center' }}>February</th>
                                    <th style={{ textAlign: 'center' }}>March</th>
                                    <th style={{ textAlign: 'center' }}>April</th>
                                    <th style={{ textAlign: 'center' }}>May</th>
                                    <th style={{ textAlign: 'center' }}>June</th>
                                    <th style={{ textAlign: 'center' }}>July</th>
                                    <th style={{ textAlign: 'center' }}>August</th>
                                    <th style={{ textAlign: 'center' }}>September</th>
                                    <th style={{ textAlign: 'center' }}>October</th>
                                    <th style={{ textAlign: 'center' }}>November</th>
                                    <th style={{ textAlign: 'center' }}>December</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((row, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <img
                                                    src={row.image}
                                                    alt={row.profile}
                                                    style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                                                />
                                                {row.profile}
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>{row.id}</td> {/* Display Employee ID */}
                                        <td style={{ textAlign: 'center' }}>{row.january}</td>
                                        <td style={{ textAlign: 'center' }}>{row.february}</td>
                                        <td style={{ textAlign: 'center' }}>{row.march}</td>
                                        <td style={{ textAlign: 'center' }}>{row.april}</td>
                                        <td style={{ textAlign: 'center' }}>{row.may}</td>
                                        <td style={{ textAlign: 'center' }}>{row.june}</td>
                                        <td style={{ textAlign: 'center' }}>{row.july}</td>
                                        <td style={{ textAlign: 'center' }}>{row.august}</td>
                                        <td style={{ textAlign: 'center' }}>{row.september}</td>
                                        <td style={{ textAlign: 'center' }}>{row.october}</td>
                                        <td style={{ textAlign: 'center' }}>{row.november}</td>
                                        <td style={{ textAlign: 'center' }}>{row.december}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

export default AttendanceDetails;
