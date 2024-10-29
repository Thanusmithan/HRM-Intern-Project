import React from 'react';
import { Alert, Dropdown } from 'react-bootstrap';

const Pending = ({ applications, onStatusUpdate }) => {
    return (
        <>
            <Alert variant="info" className='text-center'>
                <Alert.Heading>Pending Leaves</Alert.Heading>
            </Alert>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications.map((app) => app.status === "Pending" && (
                                <tr key={app.id}>
                                    <td>{app.name}</td>
                                    <td>{app.department}</td>
                                    <td>{app.startDate}</td>
                                    <td>{app.endDate}</td>
                                    <td>{app.reason}</td>
                                    <td>{app.status}</td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">Take Action</Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => onStatusUpdate(app.id, 'Approved')}>Approve</Dropdown.Item>
                                                <Dropdown.Item onClick={() => onStatusUpdate(app.id, 'Rejected')}>Reject</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Pending;
