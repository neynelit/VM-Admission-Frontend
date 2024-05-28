import React, { useEffect, useState } from 'react'
import './EditManager.css'
import { useLocation, useNavigate } from 'react-router'
import { Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

function EditManager() {
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

    const accessCard = (access) => {
        if(access == true) return 'Permitted'
        else if(access == false) return 'Not Permitted'
    }
    
    const [ check, setCheck ] = useState(false)
    console.log(check);

    useEffect(() => {
        if(data2.username != ''){
            axios
                .post('http://localhost:8080/admin/search-by', { 'field': 'username', 'value': data2.username })
                .then(res => {
                    if(res == [] || res == null || res == undefined){
                        setCheck(true)
                    }
                    else setCheck(false)
                })
        }
    }, [data2.username])

    useEffect(() => {
        if(data2.email != ''){
            axios
                .post('http://localhost:8080/admin/search-by', { 'field': 'email', 'value': data2.email })
                .then(res => {
                    if(res == [] || res == null || res == undefined){
                        setCheck(true)
                    }
                    else setCheck(false)
                })
        }
    }, [data2.email])

    useEffect(() => {
        if(data2.mobile != ''){
            axios
                .post('http://localhost:8080/admin/search-by', { 'field': 'mobile', 'value': data2.mobile })
                .then(res => {
                    if(res == [] || res == null || res == undefined){
                        setCheck(true)
                    }
                    else setCheck(false)
                })
        }
    }, [data2.mobile])

    const updateManager = () => {
        if(check == true){
            alert('Change Your Username, Email or Mobile!')
        }

        else if(check == false){
            axios
                .patch(`http://localhost:8080/admin/update/${data._id}`)
                .then(() => navigate('/institute/add-manager'))
                .catch(err => console.log(err))
        }
    }
  return (
    <>
        <Container fluid>
            <Row>
                <Col sm='12' className='dashboard-header'>
                    <div className='dashboard-top'>
                        <a><i class="fa-solid fa-pen-to-square"></i></a>
                        <h6>Edit Manager Details</h6>
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
                            <input type='text' className='form-control my-3 input-text-6' autoFocus name='name' placeholder='Manager Name' defaultValue={data.name} onChange={updateData} />
                            <i class="fa-solid fa-user errspan"></i>
                        </div>

                        <div className='form-group'>
                            <input type='text' className='form-control my-3 input-text-6' autoFocus name='username' placeholder='Manager Userame' defaultValue={data.username} onChange={updateData} />
                            <i class="fa-solid fa-user errspan"></i>
                        </div>

                        <div className='form-group'>
                            <input type='email' className='form-control my-3 input-text-6' autoFocus name='name' placeholder='Manager Email' defaultValue={data.email} onChange={updateData} />
                            <i class="fa-solid fa-user errspan"></i>
                        </div>

                        <div className='form-group'>
                            <input type='number' className='form-control my-3 input-text-6' autoFocus name='mobile' placeholder='Manager Mobile' defaultValue={data.mobile} onChange={updateData} />
                            <i class="fa-solid fa-user errspan"></i>
                        </div>

                        <div className='form-group'>
                            <select class="form-select input-select input-select-6" aria-label=".form-select-lg example" autoFocus required name='type' onChange={updateData} >
                                <option selected hidden defaultValue={data.type || ''}>{data.type || 'Select Manager Role'}</option>
                                <option value='Admin'>Admin</option>
                                <option value='Principal'>Principal</option>
                                <option value='Asst. Professor'>Asst. Professor</option>
                                <option value='Clerk'>Clerk</option>
                            </select>
                        </div>

                        <div className='form-group'>
                            <select class="form-select input-select input-select-6" aria-label=".form-select-lg example" autoFocus required name='access' style={{marginTop: '15px'}} onChange={updateData} >
                                <option selected hidden defaultValue={accessCard(data.access) || ''}>{accessCard(data.access) || 'Select Manager Access'}</option>
                                <option value='Permitted'>Permitted</option>
                                <option value='Not Permitted'>Not Permitted</option>
                            </select>
                        </div>

                        <div className='button-6'>
                            <button className='btn btn-primary' onClick={e => {e.preventDefault(); updateManager()}}>Update</button>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default EditManager
