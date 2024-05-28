import React, { useEffect, useState } from 'react'
import './EditFees.css'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { Col, Container, Row } from 'react-bootstrap'

const cookies = new Cookies()

function EditFees() {
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
    
        if(location.state == null || location.state == [] || location.state == undefined) navigate('/')
    })
  
    const [ data, setData ] = useState(location.state || [])
    const [ data2, setData2 ] = useState([])
    console.log(data2);

    const updateData = e => {
        setData2({
            ...data2,
            [e.target.name]: e.target.value
        })
    }

    const admissionStatus = (status) => {
        if(status == true) return 'Open'
        else if(status == false) return 'Close'
    }

    const updateFeesDetails = (id) => {
        axios
            .patch(`http://localhost:8080/update-subject/${id}`, data2)
            .then(res => console.log('Done'))
            .catch(err => console.log(err))
    }
  return (
    <>
        <Container fluid>
            <Row>
                <Col sm='12' className='dashboard-header'>
                    <div className='dashboard-top'>
                        <a><i class="fa-solid fa-pen-to-square"></i></a>
                        <h6>Edit Fees Details</h6>
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
            <Row className='justify-content-center'>
                <Col sm='12' className='login-form-6-col'>
                    <form className='login-form-6'>
                        <div className='form-group'>
                            <select class="form-select input-select input-select-6" aria-label=".form-select-lg example" autoFocus required name='courseType' onChange={updateData} >
                                <option selected hidden defaultValue={data.courseType || ''}>{data.courseType || 'Select Your Gender'}</option>
                                <option value='Graduation'>Graduation</option>
                                <option value='Post Graduation'>Post Graduation</option>
                                <option value='Examination'>Examination</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <input type='text' className='form-control my-3 input-text-6' autoFocus name='subject' placeholder='Course Name' defaultValue={data.subject} onChange={updateData} />
                            <i class="fa-solid fa-building-columns errspan"></i>
                        </div>

                        <div className='form-group'>
                            <select class="form-select input-select input-select-6" aria-label=".form-select-lg example" autoFocus required name='semester' onChange={updateData} >
                                <option selected hidden defaultValue={data.semester || ''}>{data.semester || 'Select Course Semester'}</option>
                                <option value='1st Semester'>1st Semester</option>
                                <option value='2nd Semester'>2nd Semester</option>
                                <option value='3rd Semester'>3rd Semester</option>
                                <option value='4th Semester'>4th Semester</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <input type='number' className='form-control my-3 input-text-6' autoFocus name='capacity' placeholder='Course Capacity' defaultValue={data.capacity} onChange={updateData} />
                            <i class="fa-solid fa-warehouse errspan"></i>
                        </div>

                        <div className='form-group'>
                            <input type='number' className='form-control my-3 input-text-6' autoFocus name='amount' placeholder='Course Amount' defaultValue={data.amount} onChange={updateData} />
                            <i class="fa-solid fa-indian-rupee-sign errspan"></i>
                        </div>

                        <div className='form-group'>
                            <select class="form-select input-select input-select-6" aria-label=".form-select-lg example" autoFocus required name='admission_status' onChange={updateData} >
                                <option selected hidden defaultValue={data.admission_status || ''}>{admissionStatus(data.admission_status) || 'Select Admission Status'}</option>
                                <option value='true'>Open</option>
                                <option value='false'>Close</option>
                            </select>
                        </div>

                        <div className='button-6'>
                            <button className='btn btn-primary' onClick={e => {e.preventDefault(); updateFeesDetails(data._id); navigate('/institute/fees-management');}}>Update</button>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default EditFees
