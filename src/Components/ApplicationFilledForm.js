import React, { useRef, useState } from 'react'
import './ApplicationFilledForm.css'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router'
import generatePDF from 'react-to-pdf'

function ApplicationFilledForm() {
    const location = useLocation()
    const navigate = useNavigate()
    const targetRef = useRef()
    const params = useParams()

    const [ data, setData ] = useState(location.state)
    console.log(data)

    const admissionStatus = (status) => {
        if(status == true) return 'SUCCESS'
        else if(status == false) return 'FAILED'
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    var date = new Date(data.transDate)
    console.log(`${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`);
  return (
    <>
        <Container fluid id='application-form' ref={targetRef}>
            <Container>
                <Row>
                    <Col sm='12' className='application-head'>
                        <h5>VARDHAMAN MAHAVIR COLLEGE, PAWAPURI</h5>
                        <div className='application-head-div'>
                            <a>At: Pawapuri, Dist: Nalanda, Bihar, Pin: 803115</a>
                        </div>
                        <div className='application-head-div'>
                            <a><b>Phone No:</b> 9431060497</a>
                            <a><b>Email:</b> vmcollege@gmail.com</a>
                        </div>
                    </Col>

                    <Col sm='12' className='application-box-head'>
                        <h6>Application Form For Admission</h6>
                    </Col>

                    <Col sm='12' className='application-box'>
                        <Row className='application-box-row'>
                            <Col sm='12' className='application-box-row-head'>
                                <h6>Student Profile</h6>
                            </Col>

                            <Col sm='6' className='application-box-details'>
                                <div className='application-box-details-text'>
                                    <p><b>Applicant Name: </b></p>
                                    <p>{data.name}</p>
                                </div>

                                <div className='application-box-details-text'>
                                    <p><b>12th Roll No: </b></p>
                                    <p>{data.hs_roll_no}</p>
                                </div>

                                <div className='application-box-details-text'>
                                    <p><b>Course Applied: </b></p>
                                    <p>B.A. {data.course} - {data.year}</p>
                                </div>

                                <div className='application-box-details-text'>
                                    <p><b>Honours Subject: </b></p>
                                    <p>{data.course}</p>
                                </div>

                                <div className='application-box-details-text'>
                                    <p><b>Category: </b></p>
                                    <p>{data.category}</p>
                                </div>

                                <div className='application-box-details-text'>
                                    <p><b>Gender: </b></p>
                                    <p>{data.gender}</p>
                                </div>

                                <div className='application-box-details-text'>
                                    <p><b>Date of Birth: </b></p>
                                    <p>{data.dob}</p>
                                </div>

                                <div className='application-box-details-text'>
                                    <p><b>Roll Number: </b></p>
                                    <p>{data.roll}</p>
                                </div>

                                <div className='application-box-details-text'>
                                    <p><b>Name of Mother: </b></p>
                                    <p>{data.mother_name}</p>
                                </div>

                                <div className='application-box-details-text'>
                                    <p><b>Name of Father: </b></p>
                                    <p>{data.father_name}</p>
                                </div>

                                <div className='application-box-details-text'>
                                    <p><b>Registration No: </b></p>
                                    <p>{data.registration_no}</p>
                                </div>

                                <div className='application-box-details-text'>
                                    <p><b>Address: </b></p>
                                    <p>{data.street_name}, {data.street_name_2}, {data.city}, {data.state}, {data.country}</p>
                                </div>

                                <div className='application-box-details-text'>
                                    <p><b>Mobile: </b></p>
                                    <p>{data.mobile}</p>
                                </div>

                                <div className='application-box-details-text'>
                                    <p><b>Email: </b></p>
                                    <p>{data.email}</p>
                                </div>
                            </Col>

                            <Col sm='6' className='application-box-img'>
                                <img src='../demo-student.jpg' alt='Student Image' />
                            </Col>
                        </Row>
                    </Col>

                    <Col sm='12' className='application-box'>
                        <Row className='application-box-row'>
                            <Col sm='12' className='application-box-row-head'>
                                <h6>Honours And Subjects</h6>
                            </Col>

                            <Col sm='6' className='application-box-details'>
                                <div className='application-box-details-text'>
                                    <p><b>Honours Subject: </b></p>
                                    <p>{data.course}</p>
                                </div>

                                <div className='application-box-details-text'>
                                    <p><b>Compulsory: </b></p>
                                    <p></p>
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col sm='12' className='application-box'>
                        <Row className='application-box-row'>
                            <Col sm='12' className='application-box-row-head'>
                                <h6>Fee And Form Submit</h6>
                            </Col>

                            <Col sm='6' className='application-box-details'>
                                <div className='application-box-details-text'>
                                    <p><b>Fee Paid: </b></p>
                                    <p>{admissionStatus(data.admission_status)}</p>
                                </div>
                                
                                <div className='application-box-details-text'>
                                    <p><b>Fee Amount: </b></p>
                                    <p>{data.amount}</p>
                                </div>
                                
                                <div className='application-box-details-text'>
                                    <p><b>Payment Id: </b></p>
                                    <p>{data.transaction_id}</p>
                                </div>
                                
                                <div className='application-box-details-text'>
                                    <p><b>Paid on Date: </b></p>
                                    <p>{days[date.getDay()]},  {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</p>
                                </div>
                                
                                <div className='application-box-details-text'>
                                    <p><b>Payment Through: </b></p>
                                    <p>{data.paymentMode}</p>
                                </div>
                                
                                <div className='application-box-details-text'>
                                    <p><b>Submitted On: </b></p>
                                    <p>{days[date.getDay()]},  {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</p>
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col sm='12'>
                        <h6>AFFIDAVIT/ UNDERTAKING</h6>

                        <p>I have entered and verified information in the form to be best of my knowledge and belief. I shall abide by all terms, conditions and rules of the institution. I shall produce all original and photocopies of documents in college office for verification. If I fail to ensure any of the above, my admission will get automatically cancelled.</p>
                    </Col>
                </Row>
            </Container>
        </Container>

        <Container className='receipt-container-2' style={{marginBottom: '50px'}}>
            <Row className='receipt-container-2-row'>
                <Col sm='12' className='receipt-container-2-col'>
                    <a onClick={() => generatePDF(targetRef, {filename: `${params.registration_no}-admission-slip.pdf`})}>Download</a>
                    <a onClick={() => window.location.href='/'}>Close <i class="fa-solid fa-xmark"></i></a>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default ApplicationFilledForm
