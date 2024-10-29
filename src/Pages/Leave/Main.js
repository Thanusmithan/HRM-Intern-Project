import React, { useState } from 'react';
import Table from './Table';
import Apply from './Apply';
import Pending from './Pending';
import { Button, ButtonGroup } from 'react-bootstrap';

const Main = () => {
    const [visible, setVisible] = useState("table");
    const [activeButton, setActiveButton] = useState("table");
    const [applications, setApplications] = useState([]);

    const handleSubmit = (application) => {
        const newApplication = { ...application, id: Date.now(), status: "Pending" };
        setApplications([...applications, newApplication]);
        setVisible('table');
    };

    const handleStatusUpdate = (id, newStatus) => {
        setApplications(prevApplications =>
            prevApplications.map(app =>
                app.id === id ? { ...app, status: newStatus } : app
            )
        );
    };

    const handleButtonClick = (get) => {
        setVisible(get);
        setActiveButton(get);
    };

    return (
        <>
            <Button variant="primary" className="px-3 " onClick={() => setVisible('form')}>Apply for Leave</Button> <br/><br/>
            
            <div className="w-full">
                <ButtonGroup aria-label="Basic example" className="w-full">
                    <Button variant={activeButton === 'table' ? "primary" : "outline-primary"} className="w-full p-3" onClick={()=> handleButtonClick('table')}>Leave Requests</Button>
                    <Button variant={activeButton === 'pendings' ? "primary" : "outline-primary"} className="w-full p-3" onClick={()=> handleButtonClick('pendings')}>Pending Leaves</Button>
                    {/* <Button variant={activeButton === 'approved' ? "primary" : "outline-primary"} className="w-full p-3" onClick={()=> handleButtonClick('approved')}>Approved Leaves</Button>
                    <Button variant={activeButton === 'view' ? "primary" : "outline-primary"} className="w-full p-3" onClick={()=> handleButtonClick('view')}>View Employees</Button> */}
                </ButtonGroup>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {visible === 'pendings' && <Pending applications={applications} onStatusUpdate={handleStatusUpdate} />}
                    {visible === 'approved' && <Table applications={applications} />}
                    {visible === 'view' && <Table applications={applications} />}
                    {visible === 'table' && <Table applications={applications} />}
                    {visible === 'form' && <Apply onSubmit={handleSubmit} />}
                </div>
            </div>
        </>
    );
}

export default Main;



