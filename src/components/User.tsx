import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { loanDataById } from '../services/AdminServices';
import { Modal, Row, Col, Button } from 'reactstrap';
import { ModalBody, ModalHeader } from 'react-bootstrap';



//User detail function
export const User = () => {

  const [loanValues, setLoanValues] = useState({
    loanid: "",
    fname: "",
    lname: "",
    email: "",
    gender: "",
    aadhar: "",
    pan: "",
    profession: "",
    income: "",
    loanamount: "",
    duration: "",
    address1: "",
    address2: "",
    pincode: "",
    place: "",
    country: "",
    mobile: "",
    status: "",
    remark: "",
    sno: "",
  })

  const [loanModel, setLoanModel] = useState(false);
  let session = localStorage.getItem("session") as string;
  let sno = JSON.parse(session).id;
  useEffect(() => {
    loanDataById(sno).then(res => setLoanValues(res.data)).catch(err => console.log(err));
  }, [sno])
  let isPresent = loanValues.loanid;

  const navigate = useNavigate();

  return (
    <>
      <div className='body'>
        <h1>User</h1>
        {
          (!isPresent) ?
            <button className='btn btn-info' onClick={() => { navigate('/apply') }}>Apply Loan</button>
            :
            <button className='btn btn-info' onClick={() => { setLoanModel(!loanModel) }}>Loan Details</button>
        }
      </div>

      {/* It will provide status of user to particular user who had already applied for the loan*/}
      <Modal isOpen={loanModel} size='md' toggle={() => setLoanModel(!loanModel)}>
        <ModalHeader >
          {loanValues.fname + " " + loanValues.lname}
        </ModalHeader>
        <ModalBody>
            <Row className='mt-2'>
              <Col>Loan Id :  {loanValues.loanid}</Col>
              <Col></Col>
            </Row>
            <Row className='mt-2'>
              <Col>First Name :  {loanValues.fname}</Col>
            
            </Row>
            <Row className='mt-2'>
              <Col>Last Name :  {loanValues.lname}</Col>
            </Row>
            <Row className='mt-2'>
              <Col>Email :  {loanValues.email}</Col>
              
            </Row>
            <Row className='mt-2'>
              <Col>Mobile :  {loanValues.mobile}</Col>
            </Row>
            <Row className='mt-2'>
              <Col>Gender :  {loanValues.gender}</Col>
           
            </Row>
            <Row className='mt-2'>
              <Col>PAN Number :  {loanValues.pan} </Col>
            </Row>
            <Row className='mt-2'>
              <Col>Aadhar Number :  {loanValues.aadhar}</Col>
            </Row>
            <Row className='mt-2'>
              <Col>Profession :  {loanValues.profession}</Col>
             
            </Row>
            <Row className='mt-2'>
              <Col>Annual Income :  {loanValues.income}</Col>
            </Row>
            <Row className='mt-2'>
              <Col>Loan Amount :  {loanValues.loanamount}</Col>
             
            </Row>
            <Row className='mt-2'>
              <Col>Duration(in months) :  {loanValues.duration}</Col>
            </Row>
            <Row className='mt-2'>
              <Col>Address :  {loanValues.address1 + ", " + loanValues.address2 + ", " + loanValues.place + ", " + loanValues.country}</Col>
            </Row>
            <Row className='mt-2'>
              <Col>Pincode :  {loanValues.pincode}</Col>
            </Row>
            <>
              {
                (loanValues.status === "1") &&
                <Row className='mt-2'>
                  <Col style={{color:"green"}}>Status :  Your Loan has approved</Col>
                </Row>
              }{
                (loanValues.status === "0") &&
                <Row className='mt-2'>
                  <Col style={{color:"red"}}>Status :  Your Loan has rejected</Col>
                </Row>
              }{(loanValues.status === null) &&
                <Row className='mt-2'>
                  <Col style={{color:"blue"}}>Status :  Pending</Col>
                </Row>
              }
            </>
            <Row className='mt-4'>
              <Col lg={12} className="row">
                <div className='d-flex justify-content-end'>
                  <Button onClick={() => setLoanModel(false)} className="col-md-3 ms-2 btn btn-danger"  >Close</Button>
                </div>
              </Col>
            </Row>

        </ModalBody>

      </Modal>
    </>
  )
}