import React, { useEffect } from 'react'
import './ExamNonpaid.css'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import Cookies from 'universal-cookie'
import axios from 'axios'

const cookies = new Cookies()

function ExamNonpaid() {
    
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

    
  return (
    <Container fluid>
        <Row>
            <Col sm='12' className='dashboard-header'>
                <div className='dashboard-top'>
                    <a><i class="fa-solid fa-user-xmark"></i></a>
                    <h6>Non-Paid Student</h6>
                </div>

                <div className='dashboard-bottom'>
                    <p>Powered By: Gen Next Information Technology </p>

                    <p>Email to: <a href='mailto:developer@gnextit.com'>developer@gnextit.com</a> / <a href='mailto:info@gnextit.com'>info@gnextit.com</a> / <a href='mailto:conplaint@gnextit.com'>conplaint@gnextit.com</a></p>

                    <p>Talk to: 8017010592 / 9734103591</p>
                </div>
            </Col>

            <Col sm='12' className='student-table'>
                <div className='table-responsive-xl'>
                    <table className='table student-table-table'>
                        <thead>
                            <tr>
                                <th scope='col'>Sr No</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Father Name</th>
                                <th scope='col'>Registration No</th>
                                <th scope='col'>Course</th>
                                <th scope='col'>Year/Semester</th>
                                <th scope='col'>Roll No</th>
                                <th scope='col'>Amount</th>
                                <th scope='col'>Mobile</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Col>
        </Row>
    </Container>
  )
}

export default ExamNonpaid