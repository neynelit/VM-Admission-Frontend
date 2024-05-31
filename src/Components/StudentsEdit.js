import React, { useEffect, useMemo, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'
import './StudentsEdit.css'
import countryList from 'react-select-country-list'
import axios from 'axios'

function StudentsEdit() {
    const navigate = useNavigate()
    const location = useLocation()

    const [ data, setData ] = useState([])
    console.log(data)
    // const [ dob, setDob ] = useState(new Date.now())
    // useEffect(() => {
    //     var y = dob.getFullYear()
    //     var m = dob.getMonth()
    //     var d = dob.getDate()
        
    //     setDob [y, m, d].join('-')
    // })
    // console.log(dob);

    useEffect(() => {
        if(location.state == null) navigate('/login')
        else{
            setData(location.state)
        }
    }, [])

    const options = useMemo(() => countryList().getData(), [])

    const updateNumber = e => {
        if(e.target.value.length > 10){
            e.target.value = e.target.value.slice(0, 10)
        }
    }

    const religionsList = [ 'Brahmoism', 'Buddhism', 'Christianity', 'Hinduism', 'Islam', 'Jainism', 'Sikhism', 'Zoroastrianism', 'Non Believer', 'Not to be Disclosed', 'Others']

    const boardsList = [
        'BOARD OF INTERMEDIATE EDUCATION (ANDHRA PRADESH)', 'BOARD OF SECONDARY EDUCATION (ANDHRA PRADESH)', 'A.P. OPEN SCHOOL SOCIETY Govt. of Andhra Pradesh', 'ASSAM HIGHER SECONDARY EDUCATION COUNCIL', 'BOARD OF SECONDARY EDUCATION, ASSAM', 'ASSAM SANSKRIT BOARD', 'STATE MADRASSA EDUCATION BOARD, ASSAM', 'ALIGARH MUSLIM UNIVERSITY BOARD OF SECONDARY & SR. SECONDARY EDUCATION', 'BIHAR SCHOOL EXAMINATION BOARD', 'BIHAR BOARD OF OPEN SCHOOLING & EXAMINATION', 'BIHAR STATE MADRASA EDUCATION BOARD', 'BIHAR SANSKRIT SHIKSHA BOARD', 'BANASTHALI VIDYAPITH', 'CENTRAL BOARD OF SECONDARY EDUCATION', 'CHHATISGARH BOARD OF SECONDARY EDUCATION', 'CHHATISGARH STATE OPEN SCHOOL', 'CHHATTISGARH SANSKRIT BOARD, RAIPUR', 'CHHATTISGARH MADRASA BOARD', 'COUNCIL FOR THE INDIAN SCHOOL CERTIFICATE EXAMINATIONS', 'DELHI BOARD OF SENIOR SECONDARY EDUCATION', 'DAYALBAGH EDUCATIONAL INSTITUTE', 'DELHI STATE OPEN SCHOOL', 'ICSE BOARD ( INDIAN COUNCIL OF SECONDARY EDUCATION / INDIAN SCHOOL CERTIFICATE EXAMINATION)', 'GOA BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION', 'GUJARAT SECONDARY AND HIGHER', 'BOARD OF SCHOOL EDUCATION HARYANA', 'Gurukula Kangri Vishwavidyalaya', 'H. P. BOARD OF SCHOOL EDUCATION', 'The J & K STATE BOARD OF SCHOOL EDUCATION', 'JAMMU AND KASHMIR STATE OPEN SCHOOL', 'JHARKHAND ACADEMIC COUNCIL,RANCHI', 'GOVT. OF KARNATAKA DEPT. OF PRE-UNIVERSITY EDUCATION', 'KARNATAKA SECONDARY EDUCATION, EXAMINATION BOARD', 'KERALA BOARD OF PUBLIC EXAMINATION , KERALA', 'KERALA BOARD OF HIGHER SECONDARY EDUCATION', 'BOARD OF VOCATIONAL HIGHER', 'MAHARASHTRA STATE BOARD OF SECONDARY AND HIGHER SECONDARY EDUCATION', 'BOARD OF SECONDARY EDUCATION, MADHYA PRADESH', 'M.P. STATE OPEN SCHOOL EDUCATION BOARD', 'MAHARISHI PATANJALI SANSKRIT SANSTHAN', 'BOARD OF SECONDARY EDUCATION, MANIPUR', 'COUNCIL OF HIGHER SECONDARY EDUCATION, MANIPUR', 'MEGHALAYA BOARD OF SCHOOL EDUCATION', 'MIZORAM BOARD OF SCHOOL EDUCATION', 'NAGALAND BOARD OF SCHOOL EDUCATION', 'NATIONAL INSTITUTE OF RURAL OPEN SCHOOLING', 'NATIONAL INSTITUTE OF OPEN SCHOOLING', 'NATIONAL INSTITUTE OF OPEN SCHOOLING', 'COUNCIL OF HIGHER SECONDARY EDUCATION, ODISHA', 'BOARD OF SECONDARY EDUCATION, ODISHA', 'PUNJAB SCHOOL EDUCATION BOARD', 'BOARD OF SECONDARY EDUCATION RAJASTHAN', 'RAJASTHAN STATE OPEN SCHOOL, JAIPUR', 'CENTRAL SANSKRIT UNIVERSITY', 'STATE BOARD OF SCHOOL EXAMINATIONS(SEC.) & BOARD OF HIGHER SECONDARY EXAMINATIONS, TAMIL NADU', 'TELANGANA STATE BOARD OF INTERMEDIATE EDUCATION', 'BOARD OF SECONDARY EDUCATION', 'TELANGANA OPEN SCHOOL SOCIETY Government of Telangana', 'RAJIV GANDHI UNIVERSITY OF KNOWLEDGE TECHNOLOGIES ( RGUKT)', 'TRIPURA BOARD OF SECONDARY EDUCATION', 'U.P. BOARD OF HIGH SCHOOL & INTERMEDIATE EDUCATION', 'U.P. Board of SEC. SANSKRIT EDUCATION', 'BOARD OF SCHOOL EDUCATION UTTARAKHAND', 'UTTRAKHAND SANSKRIT', 'UTTRAKHAND MADRASA EDUCATION BOARD', 'WEST BENGAL BOARD OF SECONDARY EDUCATION', 'WEST BENGAL COUNCIL OF HIGHER SECONDARY EDUCATION', 'WEST BENGAL BOARD OF MADRASAH EDUCATION', 'THE WEST BENGAL COUNCIL OF RABINDRA OPEN SCHOOLING', 'COUNCIL OF UNIVERSAL BUDDHIST UNIVERSITY, NAGPUR', 'ODISHA STATE BOARD OF MADRASA EDUCATION', 'WEST BENGAL STATE COUNCIL OF TECHNICAL & VOCATIONAL EDUCATION & SKILL DEVELOPMENT (WBSCT&VE&SD)', 'BOARD OF OPEN SCHOOLING & SKILL EDUCATION (BOSSE)', 'BHARTIYA SHIKSHA BOARD'
    ]

    const updateData = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const submitApplication = e => {
        e.preventDefault()
        axios
            .patch(`${process.env.REACT_APP_BACKEND_URL}/update-student/${data._id}`, data)
            .then(res => {
                navigate(`/student-details-review/${data.registration_no}`, { state: data })
            })
            .catch(err => console.log(err))
    }

    // useEffect(() => {
    //     submitApplication()
    // }, [])

  return (
    <Container fluid>
        <Row className='justify-content-center'>
            <Col sm='12' className='intake-head'>
                <div className='intake-head-div'>
                    <h6>Application Status</h6>
                </div>
            </Col>
        </Row>

        <Row>
            <Col sm='12' className='details-edit'>
                <form onSubmit={submitApplication}>
                    <Row className='details-edit-student'>
                        <Col sm='12' className='students-edit-header'>
                            <h6>Personal Details</h6>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='registration_no'>Registration Number</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus name='registration_no' placeholder='Enter Your Registration Number' value={data.registration_no || ''} />
                            <i class="fa-solid fa-hashtag errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='name'>Name</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus name='name' placeholder='Enter Your Name' value={data.name || ''} />
                            <i class="fa-solid fa-user errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='gender'>Gender <a className='required'>*</a></label>
                            
                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus required name='gender' onChange={updateData} >
                                <option selected hidden value={data.gender || ''}>{data.gender || 'Select Your Gender'}</option>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Others'>Others</option>
                            </select>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='dob'>DoB <a className='required'>*</a></label>

                            <input type='date' className='form-control my-3 input-text' autoFocus required name='dob' placeholder='Enter Your DoB' value={data.dob || ''} onChange={updateData} />
                            <i class="fa-solid fa-calendar errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='country'>Nationality <a className='required'>*</a></label>

                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus required name='country' onChange={updateData} >
                                <option selected hidden value={data.country || ''}>{data.country || 'Enter Your Nationality'}</option>
                                <option value={options[103].label}>{options[103].label}</option>
                                {options && options.map((item, index) => {
                                    if(item.label != 'India'){
                                        return(
                                            <option key={index} value={item.label}>{item.label}</option>
                                        )
                                    }
                                })}
                            </select>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='mobile'>Mobile Number</label>

                            <input type='number' className='form-control my-3 input-text' autoFocus name='mobile' placeholder='Enter Your Mobile Number' defaultValue={data.mobile || ''} />
                            <i class="fa-solid fa-phone errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='mobile_2'>Alternate Mobile Number <a className='required'>*</a></label>

                            <input type='number' className='form-control my-3 input-text' autoFocus required name='mobile_2' placeholder='Enter Your Alternate Mobile Number' defaultValue={data.mobile_2 || ''} onChange={updateData} />
                            <i class="fa-solid fa-phone errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='email'>Email <a className='required'>*</a></label>

                            <input type='email' className='form-control my-3 input-text' autoFocus required name='email' placeholder='Enter Your Email Id' value={data.email || ''} onChange={updateData} />
                            <i class="fa-solid fa-envelope errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='blood_group'>Blood Group</label>
                            
                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus name='blood_group' onChange={updateData} >
                                <option selected hidden value={data.blood_group || ''}>{data.blood_group || 'Select Your Blood Group'}</option>
                                <option value='A+'>A+</option>
                                <option value='A-'>A-</option>
                                <option value='B+'>B+</option>
                                <option value='B-'>B-</option>
                                <option value='AB+'>AB+</option>
                                <option value='AB-'>AB-</option>
                                <option value='O+'>O+</option>
                                <option value='O-'>O-</option>
                            </select>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='course'>Course</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus required name='course' placeholder='Enter Your Course Name' value={data.course || ''} />
                            <i class="fa-solid fa-laptop errspan"></i>
                        </Col>
                    </Row>

                    <Row className='details-edit-student'>
                        <Col sm='12' className='students-edit-header'>
                            <h6>Social Details</h6>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='aadhar'>Aadhar Number <a className='required'>*</a></label>

                            <input type='number' className='form-control my-3 input-text' autoFocus required name='aadhar' placeholder='Enter Your Aadhar Number' value={data.aadhar || ''} onChange={updateData} />
                            <i class="fa-solid fa-id-badge errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='category'>Category</label>
                            
                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus name='category' onChange={updateData} >
                                <option selected hidden value={data.category || ''}>{data.category || 'Select Your Category'}</option>
                                <option value='General'>General</option>
                                <option value='OBC-A'>OBC-A</option>
                                <option value='OBC-B'>OBC-B</option>
                                <option value='SC'>SC</option>
                                <option value='ST'>ST</option>
                            </select>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='martial_status'>Martial Status</label>
                            
                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus name='martial_status' onChange={updateData} >
                                <option selected hidden value={data.martial_status || ''}>{data.martial_status || 'Select Your Martial Status'}</option>
                                <option value='Single'>Single</option>
                                <option value='Married'>Married</option>
                                <option value='Divorced'>Divorced</option>
                                <option value='Others'>Others</option>
                            </select>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='religion'>Religion</label>
                            
                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus name='religion' onChange={updateData} >
                                <option selected hidden value={data.religion || ''}>{data.religion || 'Select Your Religion'}</option>
                                {religionsList && religionsList.map((item, index) => {
                                    return(
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='annual_income'>Annual Family Income <a className='required'>*</a></label>

                            <input type='number' className='form-control my-3 input-text' autoFocus required name='annual_income' placeholder='Enter Your Annual Family Income' defaultValue={data.annual_income || ''} onChange={updateData} />
                            <i class="fa-solid fa-indian-rupee-sign errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='disability'>Person with Disability <a className='required'>*</a></label>
                            
                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus required name='disability' onChange={updateData} >
                                <option selected hidden value={data.disability || ''}>{data.disability || 'Select Your Disability Status'}</option>
                                <option value='Yes'>Yes</option>
                                <option value='No'>No</option>
                            </select>
                        </Col>
                    </Row>

                    <Row className='details-edit-student'>
                        <Col sm='12' className='students-edit-header'>
                            <h6>Parents Details</h6>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='father_name'>Father's Name <a className='required'>*</a></label>

                            <input type='text' className='form-control my-3 input-text' autoFocus required name='father_name' placeholder={`Enter Your Father's Name`} value={data.father_name || ''} onChange={updateData} />
                            <i class="fa-solid fa-user errspan"></i>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='father_occupation'>Father's Occupation <a className='required'>*</a></label>

                            <input type='text' className='form-control my-3 input-text' autoFocus required name='father_occupation' placeholder={`Enter Your Father's Occupation`} value={data.father_occupation || ''} onChange={updateData} />
                            <i class="fa-solid fa-business-time errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='father_mobile'>Father's Mobile Number <a className='required'>*</a></label>

                            <input type='number' className='form-control my-3 input-text' autoFocus required name='father_mobile' placeholder={`Enter Your Father's Mobile Number`} defaultValue={data.father_mobile || ''} onChange={updateData} />
                            <i class="fa-solid fa-phone errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'></Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='mother_name'>Mother's Name <a className='required'>*</a></label>

                            <input type='text' className='form-control my-3 input-text' autoFocus required name='mother_name' placeholder={`Enter Your Mother's Name`} value={data.mother_name || ''} onChange={updateData} />
                            <i class="fa-solid fa-user errspan"></i>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='mother_occupation'>Mother's Occupation <a className='required'>*</a></label>

                            <input type='text' className='form-control my-3 input-text' autoFocus required name='mother_occupation' placeholder={`Enter Your Mother's Occupation`} value={data.mother_occupation || ''} onChange={updateData} />
                            <i class="fa-solid fa-business-time errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='mother_mobile'>Mother's Mobile Number <a className='required'>*</a></label>

                            <input type='number' className='form-control my-3 input-text' autoFocus required name='mother_mobile' placeholder={`Enter Your Mother's Mobile Number`} defaultValue={data.mother_mobile || ''} onChange={updateData} />
                            <i class="fa-solid fa-phone errspan"></i>
                        </Col>
                    </Row>

                    <Row className='details-edit-student'>
                        <Col sm='12' className='students-edit-header'>
                            <h6>Address</h6>
                        </Col>
                        
                        <Col sm='6' className='form-group-4'>
                            <label for='street_name'>Street Address <a className='required'>*</a></label>

                            <input type='text' className='form-control my-3 input-text' autoFocus required name='street_name' placeholder='Enter Your Street Address' value={data.street_name || ''} onChange={updateData} />
                            <i class="fa-solid fa-location-dot errspan"></i>
                        </Col>
                        
                        <Col sm='6' className='form-group-4'>
                            <label for='street_name_2'>Street Address Line 2 <a className='required'>*</a></label>

                            <input type='text' className='form-control my-3 input-text' autoFocus name='street_name_2' placeholder='Enter Your Street Address Line 2' value={data.street_name_2 || ''} onChange={updateData} />
                            <i class="fa-solid fa-location-dot errspan"></i>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='city'>City <a className='required'>*</a></label>

                            <input type='text' className='form-control my-3 input-text' autoFocus required name='city' placeholder='Enter Your City' value={data.city || ''} onChange={updateData} />
                            <i class="fa-solid fa-city errspan"></i>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='state'>State <a className='required'>*</a></label>

                            <input type='text' className='form-control my-3 input-text' autoFocus required name='state' placeholder='Enter Your State' value={data.state || ''} onChange={updateData} />
                            <i class="fa-solid fa-location-dot errspan"></i>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='pincode'>Pin Code <a className='required'>*</a></label>

                            <input type='text' className='form-control my-3 input-text' autoFocus required name='pincode' placeholder='Enter Your Pin Code' value={data.pincode || ''} onChange={updateData} />
                            <i class="fa-solid fa-address-card errspan"></i>
                        </Col>
                    </Row>

                    <Row className='details-edit-student'>
                        <Col sm='12' className='students-edit-header'>
                            <h6>Educational Details</h6>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='hs_board'>10+2 Board Name <a className='required'>*</a></label>

                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus required name='hs_board' onChange={updateData} >
                                <option selected hidden value={data.hs_board || ''}>{data.hs_board || 'Select Your 10+2 Board'}</option>
                                {boardsList && boardsList.map((item, index) => {
                                    return(
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='hs_stream'>10+2 Stream <a className='required'>*</a></label>
                            
                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus required name='hs_stream' onChange={updateData} >
                                <option selected hidden value={data.hs_stream || ''}>{data.hs_stream || 'Select Your 10+2 Stream'}</option>
                                <option value='Arts'>Arts</option>
                                <option value='Commerce'>Commerce</option>
                                <option value='Science'>Science</option>
                            </select>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='hs_year'>10+2 Pass Year <a className='required'>*</a></label>
                            
                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus required name='hs_year' onChange={updateData} >
                                <option selected hidden value={data.hs_year || ''}>{data.hs_year || 'Select Your 10+2 Pass Year'}</option>
                                <option value='2024'>2024</option>
                                <option value='2023'>2023</option>
                                <option value='2022'>2022</option>
                                <option value='2021'>2021</option>
                            </select>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='hs_reg_no'>10+2 Registration Number <a className='required'>*</a></label>

                            <input type='text' className='form-control my-3 input-text' autoFocus required name='hs_reg_no' placeholder='Enter Your 10+2 Registration Number' value={data.hs_reg_no || ''} onChange={updateData} />
                            <i class="fa-solid fa-hashtag errspan"></i>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='hs_roll_no'>10+2 Roll Number <a className='required'>*</a></label>

                            <input type='text' className='form-control my-3 input-text' autoFocus required name='hs_roll_no' placeholder='Enter Your 10+2 Roll Number' value={data.hs_roll_no || ''} onChange={updateData} />
                            <i class="fa-solid fa-hashtag errspan"></i>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='hs_marks'>10+2 Marks in Percentage(%) <a className='required'>*</a></label>

                            <input type='text' className='form-control my-3 input-text' autoFocus required name='hs_marks' placeholder='Enter Your 10+2 Marks in Percentage(%)' value={data.hs_marks || ''} onChange={updateData} />
                            <i class="fa-solid fa-marker errspan"></i>
                        </Col>
                    </Row>
                    
                    <Row className='justify-content-center'>
                        <Col sm='6'>
                            <div className='buttons'>
                                <button className='btn btn-primary'>Submit Application</button>
                            </div>
                        </Col>
                    </Row>
                </form>
            </Col>
        </Row>
    </Container>
  )
}

export default StudentsEdit