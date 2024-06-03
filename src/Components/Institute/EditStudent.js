import React, { useEffect, useState } from 'react'
import './EditStudent.css'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

function EditStudent() {
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

  const [ subjects, setSubjects ] = useState([])
  const [ subjects2, setSubjects2 ] = useState(subjects)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/subjects`)
      .then(res => setSubjects(res.data))
      .catch(err => console.log(err))
    }, [])

    function getUniqueListBy(arr, key) {
      let newArr = []
      let uniqueObj = {}
      for(let i in arr){
        var sub = arr[i]['subject']
        uniqueObj[sub] = arr[i]
      }
      for(let i in uniqueObj) newArr.push(uniqueObj[i])
      
      setSubjects2(newArr)
    }

    useEffect(() => {
      if(subjects != [] || subjects !== undefined || subjects !== null){
        getUniqueListBy(subjects, 'subject')
      }
    }, [subjects])

    const updateStudent = () => {
      axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/update-student/${data._id}`, data2)
      .then(() => console.log('Done'))
      .catch(err => console.log(err))
    }
  
  return (
    <>
      <Container fluid>
        <Row>
          <Col sm='12' className='dashboard-header'>
            <div className='dashboard-top'>
              <a><i class="fa-solid fa-pen-to-square"></i></a>
              <h6>Edit Student Details</h6>
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
                <input type='text' className='form-control my-3 input-text-6' autoFocus name='name' placeholder='Student Name' defaultValue={data.name} onChange={updateData} />
                <i class="fa-solid fa-user errspan"></i>
              </div>
              
              <div className='form-group'>
                <input type='text' className='form-control my-3 input-text-6' autoFocus name='father_name' placeholder='Father`s Name' defaultValue={data.father_name} onChange={updateData} />
                <i class="fa-solid fa-user errspan"></i>
              </div>
              
              <div className='form-group'>
                <input type='text' className='form-control my-3 input-text-6' autoFocus name='mother_name' placeholder='Mother`s Name' defaultValue={data.mother_name} onChange={updateData} />
                <i class="fa-solid fa-user errspan"></i>
              </div>
              
              <div className='form-group'>
                <input type='text' className='form-control my-3 input-text-6' autoFocus name='registration_no' placeholder='Registration Number' value={data.registration_no} />
                <i class="fa-solid fa-hashtag errspan"></i>
              </div>
              
              <div className='form-group'>
                <input type='text' className='form-control my-3 input-text-6' autoFocus name='roll' placeholder='Roll Number' value={data.roll} />
                <i class="fa-solid fa-hashtag errspan"></i>
              </div>
              
              <div className='form-group'>
                <input type='number' className='form-control my-3 input-text-6' autoFocus name='mobile' placeholder='Student`s Mobile Number' defaultValue={data.mobile} onChange={updateData}/>
                <i class="fa-solid fa-phone errspan"></i>
              </div>
              
              <div className='form-group'>
                <input type='email' className='form-control my-3 input-text-6' autoFocus name='email' placeholder='Student`s Email Id' defaultValue={data.email} onChange={updateData} />
                <i class="fa-solid fa-envelope errspan"></i>
              </div>
              
              <div className='form-group'>
                <select class="form-select input-select input-select-6" aria-label=".form-select-lg example" autoFocus required name='course' onChange={updateData} >
                  <option selected hidden defaultValue={data.course || ''}>{data.course || 'Select Your Gender'}</option>
                  
                  {
                    subjects2 && subjects2.map((item, index) => {
                      return(
                        <option value={item.subject}>{item.subject}</option>
                      )
                    })
                  }
                </select>
              </div>
              
              <div className='form-group'>
                <select class="form-select input-select input-select-6" aria-label=".form-select-lg example" autoFocus required name='year' style={{marginTop: '15px'}} onChange={updateData} >
                  <option selected hidden defaultValue={data.year || ''}>{data.year || 'Select Your Gender'}</option>
                  <option value='1st Semester'>1st Semester</option>
                  <option value='2nd Semester'>2nd Semester</option>
                  <option value='3rd Semester'>3rd Semester</option>
                  <option value='4th Semester'>4th Semester</option>
                </select>
              </div>
              
              <div className='form-group'>
                <select class="form-select input-select input-select-6" aria-label=".form-select-lg example" autoFocus required name='gender' style={{marginTop: '15px'}} onChange={updateData} >
                  <option selected hidden defaultValue={data.gender || ''}>{data.gender || 'Select Your Gender'}</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Others'>Others</option>
                </select>
              </div>
              
              <div className='form-group'>
                <input type='date' className='form-control my-3 input-text-6' autoFocus name='dob' placeholder='Student`s Date of Birth' defaultValue={data.dob} onChange={updateData} />
                <i class="fa-solid fa-calendar errspan"></i>
              </div>
              
              <div className='form-group'>
                <select class="form-select input-select input-select-6" aria-label=".form-select-lg example" autoFocus required name='category' onChange={updateData} >
                  <option selected hidden defaultValue={data.category || ''}>{data.category || 'Select Your Gender'}</option>
                  <option value='General'>General</option>
                  <option value='BC-I'>BC-I</option>
                  <option value='BC-II'>BC-II</option>
                  <option value='SC'>SC</option>
                  <option value='ST'>ST</option>
                </select>
              </div>
              
              <div className='form-group'>
                <input type='number' className='form-control my-3 input-text-6' autoFocus name='amount' placeholder='Student`s Fees Amount' defaultValue={data.amount} onChange={updateData} />
                <i class="fa-solid fa-indian-rupee-sign errspan"></i>
              </div>

              <div className='button-6'>
                <button className='btn btn-primary' onClick={e => {e.preventDefault(); updateStudent(); navigate('/institute/manage-student');}}>Update</button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default EditStudent
