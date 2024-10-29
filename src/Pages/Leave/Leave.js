import React, { useState } from 'react';
import { Card, Nav, Tab } from 'react-bootstrap';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Apply from './Apply'
import Main from './Main'


const Leave = () => {

    const [path, setPath] = useState("Dashboard/Leave management/")
    
       const handle=(name)=>{
        setPath("Dashboard/Leave management/"+name)
    }   
        
   

    return (
        <div>
            {path}
            <Tab.Container defaultActiveKey="Main" >
                <Card>
                    <Card.Header>
                        <Nav variant="tabs" >
                            <Nav.Item onClick={()=>{handle("Main")}}>
                                <Nav.Link eventKey="Main">Main</Nav.Link>
                            </Nav.Item>               
                            
                                                    
                            {/* <Nav.Item onClick={()=>{handle("Apply for leaves")}}>
                                <Nav.Link eventKey="Apply">Apply for leave</Nav.Link>
                            </Nav.Item> */}
                        </Nav>
                    </Card.Header>

                    <Card.Body>
                        <Tab.Content>

                            <Tab.Pane eventKey="Main">
                                <Main />
                            </Tab.Pane>

                            {/* <Tab.Pane eventKey="Apply">
                                <Apply />
                            </Tab.Pane> */}

                            
                           

                        </Tab.Content>
                    </Card.Body>
                </Card>
            </Tab.Container>
        </div>
    );
};

export default Leave;
