import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'
import './StudentDetails.css'

function StudentDetails() {
    const navigate = useNavigate()
    const location = useLocation()

    const [ data, setData ] = useState([])
    console.log(data)

    useEffect(() => {
        if(location.state == null) navigate('/login')
        else setData(location.state)
    }, [])

    const handleSubmit = () => {
        if(data.admission_status == true) navigate(`/payment-slip/${data.registration_no}`)
        else if(data.admission_status == false) navigate('/student-details-edit', { state: data})
    }

    const admStatus = () => {
        if(data.admission_status == true) return 'ADMITTED'
        else if(data.admission_status == false) return 'PAYMENT DUE'
    }
    
  return (
    <Container fluid>
        <Row className='justify-content-center'>
            <Col sm='12' className='intake-head'>
                <div className='intake-head-div'>
                    <h6>Application Status</h6>
                </div>
            </Col>

            <Col sm='12' className='student-details-col'>
                <form className='student-details' onSubmit={e => {e.preventDefault(); handleSubmit()}}>
                    <div className='form-group'>
                        <label for='registration_no'>Registration Number</label>

                        <input type='text' className='form-control my-3 input-text' autoFocus required name='registration_no' placeholder='Enter Your Registration Number' value={data.registration_no} />
                        <i class="fa-solid fa-hashtag errspan"></i>
                    </div>
                    
                    <div className='form-group'>
                        <label for='name'>Name</label>

                        <input type='text' className='form-control my-3 input-text' autoFocus required name='name' placeholder='Enter Your Name' value={data.name} />
                        <i class="fa-solid fa-user errspan"></i>
                    </div>
                    
                    <div className='form-group'>
                        <label for='father_name'>Father's Name</label>

                        <input type='text' className='form-control my-3 input-text' autoFocus required name='father_name' placeholder={`Enter Your Father's Name`} value={data.father_name} />
                        <i class="fa-solid fa-user errspan"></i>
                    </div>
                    
                    <div className='form-group'>
                        <label for='course'>Program</label>

                        <input type='text' className='form-control my-3 input-text' autoFocus required name='course' placeholder='Enter Your Program Name' value={data.course} />
                        <i class="fa-solid fa-laptop errspan"></i>
                    </div>
                    
                    <div className='form-group'>
                        <label for='year'>Class Name</label>

                        <input type='text' className='form-control my-3 input-text' autoFocus required name='year' placeholder='Enter Your Class Name' value={data.year} />
                        <i class="fa-solid fa-users errspan"></i>
                    </div>
                    
                    <div className='form-group'>
                        <label for='admission_status'>Admission Status</label>

                        <input type='text' className='form-control my-3 input-text' autoFocus required name='admission_status' placeholder='Enter Your Class Name' value={admStatus()} />
                        <i class="fa-solid fa-users errspan"></i>
                    </div>
                    
                    <div className='buttons'>
                        <button className='btn btn-primary'>Proceed</button>
                    </div>
                </form>
            </Col>
        </Row>
    </Container>
  )
}

export default StudentDetails