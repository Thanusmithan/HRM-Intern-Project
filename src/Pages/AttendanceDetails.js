import React, { useState } from 'react';
import { Table, Card, Button, Form, Breadcrumb, Dropdown } from 'react-bootstrap';
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

    const getRandomHours = () => `${Math.floor(Math.random() * 100 + 150)} hrs`;

    const initialData = employees.map(employee => ({
        profile: employee.profile,
        id: employee.id, // Store the employee ID
        image: `https://i.pravatar.cc/150?img=${employee.id}`, // Use the same image logic
        january: getRandomHours(),
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
    const [selectedMonth, setSelectedMonth] = useState('All'); // State for selected month

    // Month mapping for filtering with capitalized labels
    const months = [
        { label: 'January', key: 'january' },
        { label: 'February', key: 'february' },
        { label: 'March', key: 'march' },
        { label: 'April', key: 'april' },
        { label: 'May', key: 'may' },
        { label: 'June', key: 'june' },
        { label: 'July', key: 'july' },
        { label: 'August', key: 'august' },
        { label: 'September', key: 'september' },
        { label: 'October', key: 'october' },
        { label: 'November', key: 'november' },
        { label: 'December', key: 'december' },
    ];

    // Filter data based on search term
    const filteredData = data.filter(item => {
        return item.profile.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const exportToCSV = () => {
        // Determine which data to export based on selected month
        const rows = selectedMonth === 'All'
            ? filteredData.map(item => [
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
            ])
            : filteredData.map(item => [
                item.profile,
                item.id,
                item[selectedMonth],
            ]);

        const header = selectedMonth === 'All'
            ? ['Employee Name', 'Employee ID', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            : ['Employee Name', 'Employee ID', selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)];

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
                        <Dropdown className="me-2">
                            <Dropdown.Toggle variant="secondary" id="dropdown-month" style={{ width: '150px' }}>
                                {selectedMonth === 'All' ? 'Select Month' : selectedMonth.charAt(0).toUpperCase() + selectedMonth.slice(1)}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setSelectedMonth('All')}>All</Dropdown.Item>
                                {months.map((month) => (
                                    <Dropdown.Item key={month.key} onClick={() => setSelectedMonth(month.key)}>
                                        {month.label}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
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

                <Card.Body>
                    <div id="attendance-table">
                        <Table striped bordered hover responsive style={{ fontSize: '0.9rem' }}>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>Employee</th>
                                    <th style={{ textAlign: 'center' }}>ID</th>
                                    {selectedMonth === 'All'
                                        ? months.map((month) => (
                                            <th key={month.key} style={{ textAlign: 'center' }}>{month.label}</th>
                                        ))
                                        : <th style={{ textAlign: 'center' }}>{months.find(m => m.key === selectedMonth)?.label}</th>
                                    }
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
                                        <td style={{ textAlign: 'center' }}>{row.id}</td>
                                        {selectedMonth === 'All'
                                            ? months.map((month) => (
                                                <td key={month.key} style={{ textAlign: 'center' }}>{row[month.key]}</td>
                                            ))
                                            : <td style={{ textAlign: 'center' }}>{row[selectedMonth]}</td>
                                        }
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
