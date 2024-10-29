import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';


const Apply = ({onSubmit}) => {

    const [data, setData] = useState(
        { 
            name:'',
            department:'',
            startDate:'',
            endDate:'',
            reason:'',
         }
    ); 
    
    const handleClear = () => {
        setData({
            name: '',
            department: '',
            startDate: '',
            endDate: '',
            reason: ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();             
        onSubmit(data); // Send form data to App component
        setData({ name: '', department: '', startDate: '', endDate: '', reason: '' }); 
    }
  
    const handleInputChange = (e) => {
        const { name, value } = e.target;        
        setData({ ...data, [name]: value });
    };

    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg ">

                <div className="w-full p-3 bg-blue-500 rounded-t-lg">
                    <h2 className="text-3xl font-bold text-center text-white">Leave Application Form</h2>
                    <p className="text-center text-white ">Please fill in the details to apply for leave</p>
                </div>                

                <Form onSubmit={handleSubmit}>
                    
                    <Form.Group className="mb-3">
                        <Form.Label className="text-sm font-medium text-gray-900">Name</Form.Label>
                        <Form.Control
                            type="text"
                            name='name'
                            value={data.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name here"
                            required
                        />
                    </Form.Group>

                    
                    <Form.Group className="mb-3">
                        <Form.Label className="text-sm font-medium text-gray-900">Department</Form.Label>
                        <Form.Control as="select" name='department' value={data.department} onChange={handleInputChange} required>
                            <option value="" disabled selected>-- Please Select --</option>
                            <option value="Information Technology">Information Technology</option>
                            <option value="Human Resource">Human Resource</option>
                            <option value="Finance">Finance</option>
                            <option value="Operations">Operations</option>
                        </Form.Control>
                    </Form.Group>

                    
                    <Form.Group className="mb-3">
                        <Form.Label className="text-sm font-medium text-gray-900">Start Date</Form.Label>
                        <Form.Control type="date" name='startDate' value={data.startDate} onChange={handleInputChange} required />
                    </Form.Group>

                    
                    <Form.Group className="mb-3">
                        <Form.Label className="text-sm font-medium text-gray-900">End Date</Form.Label>
                        <Form.Control type="date" name='endDate' value={data.endDate} onChange={handleInputChange} required />
                    </Form.Group>

                    
                    <Form.Group className="mb-3">
                        <Form.Label className="text-sm font-medium text-gray-900">Reason for Leave</Form.Label>
                        <Form.Control as="textarea" name='reason' value={data.reason} onChange={handleInputChange} placeholder="State the reason for leave here.." />
                    </Form.Group>

                    
                    <Row className="justify-content-end">
                        <Col xs="auto">
                            <Button variant="danger" className="me-2" onClick={handleClear} >
                                Clear
                            </Button>
                            <Button type="submit" variant="success">
                                Apply Leave
                            </Button>
                        </Col>
                    </Row>
                </Form>



            </div>
        </div >




    )
}

export default Apply





