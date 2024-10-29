import React from 'react';
import Badge from 'react-bootstrap/Badge';

function Table({ applications }) {
    return (
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
                    </tr>
                </thead>
                <tbody>
                    {
                        applications.map((app) => (
                            <tr key={app.id}>
                                <td>{app.name}</td>
                                <td>{app.department}</td>
                                <td>{app.startDate}</td>
                                <td>{app.endDate}</td>
                                <td>{app.reason}</td>
                                <td className="text-xl text-left">
                                    <Badge pill bg={app.status === "Approved" ? "success" : app.status === "Rejected" ? "danger" : "warning"} className="px-3 py-2 text-white">
                                        {app.status}
                                    </Badge>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;

