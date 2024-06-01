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
            .post(`${process.env.REACT_APP_BACKEND_URL}/admin/login`, { username: cookies.get('username'), password: cookies.get('password')})
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
            .patch(`${process.env.REACT_APP_BACKEND_URL}/update-subject/${id}`, data2)
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
                <Col sm='12' className='login-form-6-col-2'>
                    <form className='login-form-6-2'>
                        <div className='form-group'>
                            <select class="form-select input-select input-select-6" aria-label=".form-select-lg example" autoFocus required name='courseType' >
                                <option selected hidden value={data.courseType || ''}>{data.courseType || 'Select Your Gender'}</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <input type='text' className='form-control my-3 input-text-6' autoFocus name='subject' placeholder='Course Name' value={data.subject} />
                            <i class="fa-solid fa-building-columns errspan"></i>
                        </div>

                        <div className='table-responsive-xl inner-table-2'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Semester</th>
                                        <th scope='col'>Capacity</th>
                                        <th scope='col'>All Student</th>
                                        <th scope='col'>General / BC-II</th>
                                        <th scope='col'>BC-I</th>
                                        <th scope='col'>SC</th>
                                        <th scope='col'>ST</th>
                                        <th scope='col'>Girls</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        data.amount?.map((item1, index1) => {
                                            return(
                                                <tr key={index1}>
                                                    <td>{item1.semester}</td>
                                                    <td>{item1.capacity}</td>
                                                    <td>{item1.all_student}</td>
                                                    <td>{item1.general}</td>
                                                    <td>{item1.bc_i}</td>
                                                    <td>{item1.sc}</td>
                                                    <td>{item1.st}</td>
                                                    <td>{item1.girl}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
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
