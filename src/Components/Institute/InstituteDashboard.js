import React, { useEffect, useState } from 'react'
import './InstituteDashboard.css'
import { Col, Container, Row } from 'react-bootstrap'
import CanvasJSReact from '@canvasjs/react-charts'
import { useNavigate } from 'react-router'
import Cookies from 'universal-cookie'
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// import Chart from 'react-google-charts'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import axios from 'axios'


ChartJS.register(
  ArcElement, Tooltip, Legend
)

const cookies = new Cookies()

function InstituteDashboard() {
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
        .post(`${process.env.REACT_APP_BACKEND_URL}/admin/login`, { username: cookies.get('username'), password: cookies.get('password')})
        .then(res => {
          if(res.data == 'Valid') console.log('Valid')
          else navigate('/')
        })
        .catch(err => console.log(err))
    }
  })
  const studentsData = [
    { name: 'Admitted Students', students: 924},
    { name: 'Total Students', students: 1126}
  ]

  const newStudentsData = {
    labels: ['Admitted Student', 'Non-Admitted Student'],
    datasets: [
      {
        data: [studentsData[0].students, `${studentsData[1].students - studentsData[0].students}`],
        backgroundColor: ['#002F5D', '#F4C145']
      }
    ]
  }

  const options = {}

  return (
    <Container fluid className='main-dashboard-container'>
      <Row>
        <Col sm='12' className='dashboard-header'>
          <div className='dashboard-top'>
            <a><i class="fa-solid fa-gauge"></i></a>
            <h6>Dashboard</h6>
          </div>

          <div className='dashboard-bottom'>
            <p>Powered By: Gen Next Information Technology </p>

            <p>Email to: <a href='mailto:developer@gnextit.com'>developer@gnextit.com</a> / <a href='mailto:info@gnextit.com'>info@gnextit.com</a> / <a href='mailto:conplaint@gnextit.com'>conplaint@gnextit.com</a></p>

            <p>Talk to: 8017010592 / 9734103591</p>
          </div>
        </Col>

        <Col sm='12' className='student-number'>
          <Row>
            <Col sm='6' className='student-number-box'>
              <div className='student-number-box-inner'>
                <a><i class="fa-solid fa-user-check"></i></a>
                <div className='student-number-box-text'>
                  <h6>Admitted Student</h6>
                  <p>924</p>
                </div>
              </div>
            </Col>
            
            <Col sm='6' className='student-number-box'>
              <div className='student-number-box-inner'>
                <a><i class="fa-solid fa-circle-user"></i></a>
                <div className='student-number-box-text'>
                  <h6>Total Student</h6>
                  <p>1226</p>
                </div>
              </div>
            </Col>
          </Row>
        </Col>

        <Col sm='12' className='pieChart'>
          <Row className='justify-content-center'>
            <Col sm='6'>
                <div className='pie-container'>
                  <h4>Admission</h4>
                  <div style={{width: '100%'}} className='pie-chart'>
                    <Pie data={newStudentsData} options={options}></Pie>
                  </div>
                </div>
            </Col>
            
            <Col sm='6'>
                <div className='pie-container'>
                  <h4>Examination</h4>
                  <div style={{width: '100%'}} className='pie-chart'>
                    <Pie data={newStudentsData} options={options}></Pie>
                  </div>
                </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default InstituteDashboard