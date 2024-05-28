import React, { useEffect } from 'react'
import './AdmissionFees.css'
import { Col, Container, Row } from 'react-bootstrap'
import { Pie } from 'react-chartjs-2'
import { useNavigate } from 'react-router'
import Cookies from 'universal-cookie'
import axios from 'axios'

const cookies = new Cookies()

function AdmissionFees() {
    
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

    

    const semesterWiseData = {
        labels: [ '1st Semester', '2nd Semester', '3rd Semester', '4th Semester'],
        datasets: [
            {
                data: [ '1000', '2000', '1500', '1200'],
                backgroundColor: [ 'rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(153, 102, 255)']
            }
        ]
    }

    const options = {}
  return (
    <Container fluid>
        <Row>
            <Col sm='12' className='dashboard-header'>
                <div className='dashboard-top'>
                    <a><i class="fa-solid fa-user-xmark"></i></a>
                    <h6>Admission Fees</h6>
                </div>

                <div className='dashboard-bottom'>
                    <p>Powered By: Gen Next Information Technology </p>

                    <p>Email to: <a href='mailto:developer@gnextit.com'>developer@gnextit.com</a> / <a href='mailto:info@gnextit.com'>info@gnextit.com</a> / <a href='mailto:conplaint@gnextit.com'>conplaint@gnextit.com</a></p>

                    <p>Talk to: 8017010592 / 9734103591</p>
                </div>
            </Col>

            <Col sm='12' className='pieChart' style={{marginTop: '30px'}}>
                <Row className='justify-content-center'>
                    <Col sm='6'>
                        <div className='pie-container'>
                            <h4>Semester Wise</h4>

                            <div style={{width: '100%'}} className='pie-chart'>
                                <Pie data={semesterWiseData} options={options}></Pie>
                            </div>
                        </div>
                    </Col>
                    
                    <Col sm='6'>
                        <div className='pie-container'>
                            <h4>Semester Wise</h4>

                            <div style={{width: '100%'}} className='pie-chart'>
                                <Pie data={semesterWiseData} options={options}></Pie>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
  )
}

export default AdmissionFees