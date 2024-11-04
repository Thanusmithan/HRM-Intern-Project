import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Table, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PayrollPage.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import the autotable plugin if you need to use tables in PDF
import html2canvas from 'html2canvas';
import { employeesData } from './AllEmployees';

function PayrollPage() {

    const handleNew = () => {
        // Refresh the whole page
        window.location.reload();
    };

    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [employeeDetails, setEmployeeDetails] = useState(null);

    const handleEmployeeSelect = (e) => {
        const selectedId = e.target.value;
        setSelectedEmployeeId(selectedId);
        setFormData({ ...formData, [e.target.name]: e.target.value });

        const selectedEmployee = employeesData.find(emp => emp.id === selectedId);
        if (selectedEmployee) {
            setEmployeeDetails(selectedEmployee);
            
        }
    };


    const currentYear = new Date().getFullYear();
    const yearOptions = [
        currentYear - 2,
        currentYear - 1,
        currentYear,
        currentYear + 1,
        currentYear + 2
    ];

    const monthOptions = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const [formData, setFormData] = useState({
        staffId: '',
        firstName: '',
        otherNames: '',
        department: '',
        scale: '',
        month: '',
        year: '',
        bankName: '',
        accountNumber: '',
        accountName: '',
        phoneNumber: '',
        basicSalary: '',
        housingAllowance: '',
        transportAllowance: '',
        overtimeStipend: '',
        salaryAdvance: '',
        contributoryPension: '',
        tax: '',
        nationalHousingFund: '',
        totalDeductions: 0,
    });

    const [showPayslip, setShowPayslip] = useState(false);
    const [savedData, setSavedData] = useState([]);


    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        
        

      };

      const calculateMonthlyEarnings = () => {
        const { basicSalary, housingAllowance, transportAllowance, overtimeStipend } = formData;
        return (
          parseFloat(basicSalary || 0) +
          parseFloat(housingAllowance || 0) +
          parseFloat(transportAllowance || 0) +
          parseFloat(overtimeStipend || 0)
        );
      };
    
      const calculateTotalDeductions = () => {
        const { salaryAdvance, contributoryPension, tax, nationalHousingFund } = formData;
        return (
          parseFloat(salaryAdvance || 0) +
          parseFloat(contributoryPension || 0) +
          parseFloat(tax || 0) +
          parseFloat(nationalHousingFund || 0)
        );
      };
    
      const calculateNetSalary = () => {
        return calculateMonthlyEarnings() - calculateTotalDeductions();
      };
    
      const handleDownloadPDF = () => {
        const pdf = new jsPDF();
        pdf.setFontSize(18);
        pdf.text("PaySlip", 105, 10, null, null, 'center');

        pdf.setFontSize(12);
        
        // Left column: Personal Data and Bank Detail
        pdf.text("Personal Data", 15, 30);
        pdf.text(`Staff ID: ${formData.staffId}`, 15, 40);
        pdf.text(`Employee Name: ${employeeDetails.profile}`, 15, 50);
        pdf.text(`Status: ${employeeDetails.status}`, 15, 60);
        pdf.text(`Department: ${employeeDetails.department}`, 15, 70);
        pdf.text(`Joining Date: ${employeeDetails.joiningDate}`, 15, 80);
        pdf.text(`Role: ${employeeDetails.role}`, 15, 90);
        pdf.text(`Month: ${formData.month}`, 15, 100);
        pdf.text(`Year: ${formData.year}`, 15, 110);
        pdf.text(`Bank Name: ${formData.bankName}`, 15, 120);
        pdf.text(`Account Number: ${formData.accountNumber}`, 15, 130);
        pdf.text(`Account Name: ${formData.accountName}`, 15, 140);
        pdf.text(`Phone Number: ${formData.phoneNumber}`, 15, 150);

        // Right column: Monthly Entries and Deductions
        pdf.text("Monthly Entries", 110, 30);
        pdf.text(`Basic Salary: ${formData.basicSalary}`, 110, 40);
        pdf.text(`Housing Allowance: ${formData.housingAllowance}`, 110, 50);
        pdf.text(`Transport Allowance: ${formData.transportAllowance}`, 110, 60);
        pdf.text(`Overtime Stipend: ${formData.overtimeStipend}`, 110, 70);
        const monthlyEarnings = calculateMonthlyEarnings();
        pdf.text(`Total Monthly Earnings: ${monthlyEarnings}`, 110, 80);

        pdf.text("Deductions", 110, 100);
        pdf.text(`Salary Advance: ${formData.salaryAdvance}`, 110, 110);
        pdf.text(`Contributory Pension: ${formData.contributoryPension}`, 110, 120);
        pdf.text(`Tax: ${formData.tax}`, 110, 130);
        pdf.text(`National Housing Fund: ${formData.nationalHousingFund}`, 110, 140);

        const totalDeductions = calculateTotalDeductions();
        const netSalary = monthlyEarnings - totalDeductions;
        pdf.text(`Total Deductions: ${totalDeductions}`, 110, 150);
        pdf.text(`Net Salary: ${netSalary.toFixed(2)}`, 110, 160);

        pdf.save('Payslip.pdf');
    };

      const handleSubmit = (e) => {
        e.preventDefault();
        setShowPayslip(true);

        const monthlyEarnings = calculateMonthlyEarnings();
        const totalDeductions = calculateTotalDeductions();
        const netSalary = monthlyEarnings - totalDeductions;

        const payslip = {
            staffID: formData.firstName,
            employeeName: employeeDetails.profile,
            bankName: formData.bankName,
            accountNumber: formData.accountNumber,
            accountName: formData.accountName,
            monthlyEarnings,
            totalDeductions,
            netSalary,
          };

        setSavedData([...savedData, payslip]);

        
        






    };

   
    

    return (
        <Card className="all-employees-page no-border"> 
        <Container fluid className="payroll-page compact">
            <Card.Header className="d-flex justify-content-between  mx-3 mb-2 ">
            <h2 className="text-center">Payroll System</h2>
            </Card.Header>
            <br></br>

            <div className="withPayslip">
                <Row className="mb-3">
                    <Col md={3}>
                        <div className="border p-3 mb-3" >
                            <h6>Personal Data</h6>
                            <Form.Group className="d-flex align-items-center mb-0" controlId="employeeId">
                                <Form.Label className="mr-2">Staff ID:</Form.Label>
                                <Form.Control type="text"  name="staffId" as="select" value={selectedEmployeeId} onChange={handleEmployeeSelect} size="sm">
                                <option value="">Select Employee ID</option>
                                        {employeesData.map((employee) => (
                                            <option key={employee.id} value={employee.id}>{employee.id}</option>
                                        ))} 
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="employeeName" className="d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">Employee Name:</Form.Label>
                                <Form.Control type="text" name="firstName"  readOnly value={employeeDetails?.profile || ''} onChange={handleInputChange} size="sm">
                                </Form.Control>   
                            </Form.Group>

                            <Form.Group controlId="joiningDate" className="d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">Joining Date</Form.Label>
                                <Form.Control type="text" name="JoiningDate"  readOnly value={employeeDetails?.joiningDate || ''} onChange={handleInputChange} size="sm"/>
                            </Form.Group>

                            <Form.Group controlId="department" className="mt-2 d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">Department</Form.Label>
                                <Form.Control type="text"  readOnly value={employeeDetails?.department || ''} size="sm" />
                            </Form.Group>

                            <Form.Group controlId="role" className="mt-2 d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">Designation</Form.Label>
                                <Form.Control type="text"  readOnly value={employeeDetails?.role || ''} size="sm"/>
                            </Form.Group>

                            <Form.Group controlId="status" className="mt-2 d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">Status</Form.Label>
                                <Form.Control type="text"  readOnly value={employeeDetails?.status || ''} size="sm"/>
                            </Form.Group>

                            
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="border p-3 mb-3">
                            <h6>Bank Detail</h6>
                            <Form.Group className="d-flex align-items-center mb-2">
                                <Form.Label className="mr-2">Month:</Form.Label>
                                <Form.Control as="select" name="month" value={formData.month} onChange={handleInputChange} size="sm">
                                    <option value="">Select Month</option>
                                    {monthOptions.map((month, index) => (
                                        <option key={index} value={month}>{month}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="d-flex align-items-center mb-2">
                                <Form.Label className="mr-2">Year:</Form.Label>
                                <Form.Control as="select" name="year" value={formData.year} onChange={handleInputChange} size="sm">
                                    <option value="">Select Year</option>
                                    {yearOptions.map((year, index) => (
                                        <option key={index} value={year}>{year}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">Bank Name:</Form.Label>
                                <Form.Control type="text" name="bankName" value={formData.bankName} onChange={handleInputChange} size="sm" />
                            </Form.Group>
                            <Form.Group className="d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">Account Number:</Form.Label>
                                <Form.Control type="text" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} size="sm" />
                            </Form.Group>
                            <Form.Group className="d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">Account Name:</Form.Label>
                                <Form.Control type="text" name="accountName" value={formData.accountName} onChange={handleInputChange} size="sm" />
                            </Form.Group>
                            <Form.Group className="d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">Phone Number:</Form.Label>
                                <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} size="sm" />
                            </Form.Group>
                        </div>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={3}>
                        <div className="border p-3 mb-3">
                            <h6>Monthly Entries</h6>
                            <Form.Group className="d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">Basic Salary:</Form.Label>
                                <Form.Control type="number" name="basicSalary" value={formData.basicSalary} onChange={handleInputChange} size="sm" />
                            </Form.Group>
                            <Form.Group className="d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">Housing Allowance:</Form.Label>
                                <Form.Control type="number" name="housingAllowance" value={formData.housingAllowance} onChange={handleInputChange} size="sm" />
                            </Form.Group>
                            <Form.Group className="d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">Transport Allowance:</Form.Label>
                                <Form.Control type="number" name="transportAllowance" value={formData.transportAllowance} onChange={handleInputChange} size="sm" />
                            </Form.Group>
                            <Form.Group className="d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">Overtime Stipend:</Form.Label>
                                <Form.Control type="number" name="overtimeStipend" value={formData.overtimeStipend} onChange={handleInputChange} size="sm" />
                            </Form.Group>
                        </div>
                        <br />

                        <div className="button-group mb-1">
                            <Button variant="primary" size="sm" onClick={handleSubmit}>Submit</Button>{' '}
                            <Button variant="success" size="sm" onClick={handleDownloadPDF}>Print</Button>
                            <Button variant="warning" size="sm" onClick={handleNew} >New</Button>
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="border p-3 mb-3">
                            <h6>Deductions</h6>
                            <Form.Group className="d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">Salary Advance:</Form.Label>
                                <Form.Control type="number" name="salaryAdvance" value={formData.salaryAdvance} onChange={handleInputChange} size="sm" />
                            </Form.Group>
                            <Form.Group className="d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">Contributory Pension:</Form.Label>
                                <Form.Control type="number" name="contributoryPension" value={formData.contributoryPension} onChange={handleInputChange} size="sm" />
                            </Form.Group>
                            <Form.Group className="d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">Tax:</Form.Label>
                                <Form.Control type="number" name="tax" value={formData.tax} onChange={handleInputChange} size="sm" />
                            </Form.Group>
                            <Form.Group className="d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">National Housing Fund:</Form.Label>
                                <Form.Control type="number" name="nationalHousingFund" value={formData.nationalHousingFund} onChange={handleInputChange} size="sm" />
                            </Form.Group>
                            <Form.Group className="d-flex align-items-center mb-0">
                                <Form.Label className="mr-2">Total Deductions:</Form.Label>
                                <Form.Control type="number" name="totalDeductions" value={calculateTotalDeductions()} readOnly size="sm" />
                            </Form.Group>
                        </div>
                    </Col>
                </Row>

                <Row>
                <Col md={12}>
                    

                    <Table striped bordered hover size="sm">
                    {savedData.length > 0 && (
                            <div className="table">
                            <h4>Saved Payslip Data</h4>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Staff ID</th>
                                    <th>Employee Name</th>
                                    <th>Bank Name</th>
                                    <th>Account Number</th>
                                    <th>Account Name</th>
                                    <th>Monthly Earnings</th>
                                    <th>Total Deductions</th>
                                    <th>Net Salary</th>
                                </tr>
                                </thead>
                                <tbody>
                                {savedData.map((data, index) => (
                                    <tr key={index}>
                                    <td>{employeeDetails.id}</td>
                                    <td>{data.employeeName}</td>
                                    <td>{data.bankName}</td>
                                    <td>{data.accountNumber}</td>
                                    <td>{data.accountName}</td>
                                    <td>{data.monthlyEarnings}</td>
                                    <td>{data.totalDeductions}</td>
                                    <td>{data.netSalary}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                        )}
                    </Table>
                </Col>
            </Row>

                {/* Render Payslip if showPayslip is true */}
                {showPayslip && (
                <Row className="payslip-section">
                <Col>
                <div className="payslip border p-4 mb-3 payslip-resize"> {/* Adjusted padding for height */}
                <h4 className="text-center payslip-title">Payslip</h4>
                        <br></br>
                        <Row>
                            {/* Left Side: Personal Data and Bank Detail */}
                            <Col md={6}>
                                
                                <p className="payslip-text">Staff ID: {employeeDetails.id}</p>
                                <p className="payslip-text">Employee Name: {employeeDetails.profile}</p>
                                <p className="payslip-text">Status: {employeeDetails.status}</p>
                                <p className="payslip-text">Department: {employeeDetails.department}</p>
                                <p className="payslip-text">Joining Date: {employeeDetails.joiningDate}</p>
                                <p className="payslip-text">Role: {employeeDetails.role}</p>
                                <p className="payslip-text">Month: {formData.month}</p>
                                <p className="payslip-text">Year: {formData.year}</p>
                                <p className="payslip-text">Bank Name: {formData.bankName}</p>
                                <p className="payslip-text">Account Number: {formData.accountNumber}</p>
                                <p className="payslip-text">Account Name:: {formData.accountName}</p>
                                <p className="payslip-text">Phone Number: {formData.phoneNumber}</p>
                            </Col>

                            {/* Right Side: Monthly Entries and Deductions */}
                            <Col md={6}>
                                
                            <p className="payslip-text">Basic Salary: {formData.basicSalary}</p>
                                <p className="payslip-text">Housing Allowance: {formData.housingAllowance}</p>
                                <p className="payslip-text">Transport Allowance: {formData.transportAllowance}</p>
                                <p className="payslip-text">Overtime Stipend: {formData.overtimeStipend}</p>
                                <p className="payslip-text">Salary Advance: {formData.salaryAdvance}</p>
                                <p className="payslip-text">Contributory Pension: {formData.contributoryPension}</p>
                                <p className="payslip-text">Tax: {formData.tax}</p>
                                <p className="payslip-text">National HousingFund: {formData.nationalHousingFund}</p>
                                <p className="payslip-text">Total Deductions: {calculateTotalDeductions()}</p>
                                <p className="payslip-text">
                                    Net Salary: {
                                        (parseFloat(formData.basicSalary) +
                                        parseFloat(formData.housingAllowance) +
                                        parseFloat(formData.transportAllowance) +
                                        parseFloat(formData.overtimeStipend) -
                                        parseFloat(formData.salaryAdvance) -
                                        parseFloat(formData.contributoryPension) -
                                        parseFloat(formData.tax) -
                                        parseFloat(formData.nationalHousingFund)).toFixed(2)
                                    }
                                </p>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
)}

            </div>
        </Container>
        </Card>
    );

    

}

export default PayrollPage; 


