import React, { useEffect, useState } from 'react'
import './ApplicationForm.css'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

function ApplicationForm() {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if(!cookies.get('username')){
            navigate('/')
        }
        
        else if(!cookies.get('password')){
            navigate('/')
        }

        else{
            axios
                .post('http://localhost:8080/admin/login', { username: cookies.get('username'), password: cookies.get('password')})
                .then(res => {
                        if(res.data == 'Valid') console.log('Valid')
                        else navigate('/')
                    })
                .catch(err => console.log(err))
        }
    })
    const [ data, setData ] = useState(location.state)
    console.log(data)
    useEffect(() => {
        setData(location.state)
    }, [location.state])
  return (
    <>
        <Container fluid>
            <Row>
                <Col sm='12' className='dashboard-header'>
                    <div className='dashboard-top'>
                        <a><i class="fa-solid fa-pen-to-square"></i></a>
                        <h6>Application From</h6>
                    </div>

                    <div className='dashboard-bottom'>
                        <p>Powered By: Gen Next Information Technology </p>

                        <p>Email to: <a href='mailto:developer@gnextit.com'>developer@gnextit.com</a> / <a href='mailto:info@gnextit.com'>info@gnextit.com</a> / <a href='mailto:conplaint@gnextit.com'>conplaint@gnextit.com</a></p>

                        <p>Talk to: 8017010592 / 9734103591</p>
                    </div>
                </Col>
            </Row>
        </Container>

        <Container fluid>
            <Row>
                <Col sm='6'>
                    <div className='application-form-box'>
                        <h5>Student Details</h5>

                        <div className='details-list'>
                            <p><b>Student's Name: </b>{data.name}</p>
                            <p><b>Father's Name: </b>{data.father_name}</p>
                            <p><b>Mother's Name: </b>{data.mother_name}</p>
                            <p><b>12th Roll No: </b>{data.hs_roll_no}</p>
                            <p><b>Date of Birth: </b>{data.dob}</p>
                            <p><b>Gender: </b>{data.gender}</p>
                            <p><b>Category: </b>{data.category}</p>
                            <p><b>Email: </b>{data.email}</p>
                            <p><b>Mobile: </b>{data.mobile}</p>
                            <p><b>Student Address: </b>{data.street_name}, {data.street_name_2},{data.city}, {data.state}, {data.country}</p>
                            <p><b>Username: </b></p>
                        </div>
                    </div>
                </Col>

                <Col sm='6'>
                    <div className='application-form-box'>
                        <h5>Academic Details</h5>

                        <div className='details-list'>
                            <p><b>Registration No: </b>{data.registration_no}</p>
                            <p><b>Session: </b></p>
                            <p><b>Course: </b>{data.course}</p>
                            <p><b>Year: </b>{data.year}</p>
                            <p><b>Department: </b></p>
                            <p><b>Department Roll: </b></p>
                            <p><b>Honours Subject: </b></p>
                            <p><b>Subsidiary 1: </b></p>
                            <p><b>Subsidiary 2: </b></p>
                            <p><b>Composition: </b></p>
                            <p><b>Password: </b></p>
                        </div>
                    </div>
                </Col>

                <Col sm='6'>
                    <div className='application-form-box'>
                        <h5>Uploaded Documents</h5>

                        <div className='details-list'>
                            <p><b> </b></p>
                        </div>
                    </div>
                </Col>

                <Col sm='6'>
                    <div className='application-form-box'>
                        <h5>Payments Details</h5>

                        <div className='details-list'>
                            <p><b>Transaction Id: </b>{data.transaction_id}</p>
                            <p><b>Transaction Amount: </b>{data.amount}</p>
                            <p><b>Transaction Date: </b>{data.date}</p>
                            <p><b>Payment Status: </b>{data.admission_status}</p>
                            <p><b>Payment Through: </b></p>
                            <p><b>Gateway Transaction Id: </b></p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default ApplicationForm
