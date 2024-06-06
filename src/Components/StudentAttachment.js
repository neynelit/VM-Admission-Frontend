import React, { useEffect, useState } from 'react'
import './StudentAttachment.css'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'

function StudentAttachment() {
    const navigate = useNavigate()
    const location = useLocation()

    const [ data, setData ] = useState(location.state)

    useEffect(() => {
        if(location.state == null) navigate('/login')
        else{
            setData(location.state)
        }
    }, [])

    const [ photos, setPhotos ] = useState({
        registration_no: data.registration_no
    })
    console.log(photos)

    const [ required, setRequired ] = useState(true)
    console.log(required)
    
    useEffect(() => {
        if(data !== '' || data != [] || data !== null  || data !== undefined){
            if(data.photo == '' || data.photo == []  || data.photo == null || data.photo == undefined || data.signature == '' || data.signature == [] || data.signature == null || data.signature == undefined) setRequired(true)

            else setRequired(false)
        }
        else setRequired(true)
    }, [data, data.photo, data.signature])

    const [ photo, setPhoto ] = useState('../demo-student.jpg')
    const [ signature, setSignature ] = useState('../signature.png')

    useEffect(() => {
        if(data !== '' || data != [] || data !== null  || data !== undefined){
            if(data.photo == '' || data.photo == []  || data.photo == null || data.photo == undefined || data.signature == '' || data.signature == [] || data.signature == null || data.signature == undefined){
                setPhoto('../demo-student.jpg')
                setSignature('../signature.png')
            }

            else{
                setPhoto(`${process.env.REACT_APP_BACKEND_URL}/images/${data.photo}`)
                setSignature(`${process.env.REACT_APP_BACKEND_URL}/images/${data.signature}`)
            }
        }
        else{
            setPhoto('../demo-student.jpg')
            setSignature('../signature.png')
        }
    }, [data, data.photo, data.signature])
    
    const updatePhoto = e => {
        setPhotos({
            ...photos,
            [e.target.name]: e.target.files[0]
        })
    }

    const photoButton = () => {
        if(required == true) return (
            <React.Fragment>
                <Col sm='12'>
                    <div className='buttons'>
                        <button className='btn btn-primary' onClick={e => {e.preventDefault(); uploadPhotos()}}>Upload Photos</button>
                    </div>
                </Col>
            </React.Fragment>
        )
    }

    const uploadPhotos = () => {
        if(required){
            if(photos == [] || photos == null || photos == undefined || photos == '') alert('Please select photos')
        
            else{
                if(photos.photo == [] || photos.photo == null || photos.photo == undefined || photos.photo == '' || photos.signature == [] || photos.signature == null || photos.signature == undefined || photos.signature == '') alert('Please select photos')
                    
                else{
                    axios
                        .post(`${process.env.REACT_APP_BACKEND_URL}/upload`, photos, { headers: {'Content-Type': 'multipart/form-data', } })
                        .then(res => {
                            axios
                                .patch(`${process.env.REACT_APP_BACKEND_URL}/update-student/${data._id}`, res.data)
                                .then(res => {
                                    axios
                                    .post(`${process.env.REACT_APP_BACKEND_URL}/check-student`, { name: data.name, mobile: data.mobile})
                                    .then(res => {alert('Files uploaded'); navigate(`/student-details-review/${data.registration_no}`, { state: data }) })
                                    .catch(err => console.log(err))
                                })
                                .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))
                }
            }
        }

        else navigate(`/student-details-review/${data.registration_no}`, { state: data })
    }

    const photoInput = () => {
        if(required == true) return (
            <React.Fragment>
                <Col sm='6' className='form-group-4'>
                    <label for="photo">Photo <a className='required'>*</a></label>

                    <input type='file' className='form-control my-3 input-image' autoFocus name='photo' placeholder='Enter Your Passport Size Photo' accept='.png, .jpg, .jpeg'  required={required} onChange={updatePhoto} />
                    <i class="fa-solid fa-image errspan"></i>
                </Col>
                
                <Col sm='6' className='form-group-4'>
                    <label for='signature'>Signature <a className='required'>*</a></label>

                    <input type='file' className='form-control my-3 input-image' autoFocus name='signature' placeholder='Enter Your Signature' accept='.png, .jpg, .jpeg'  required={required} onChange={updatePhoto} />
                    <i class="fa-solid fa-image errspan"></i>
                </Col>
            </React.Fragment>
        )
    }

    const photoLabel = () => {
        if(required == false) return <h6>Photo</h6>
    }

    const signatureLabel = () => {
        if(required == false) return <h6>Signature</h6>
    }

    const buttonText = () => {
        if(required) return 'Upload Photos'
        else return 'Submit Application'
    }
  return (
    <Container fluid>
        <Row className='justify-content-center'>
            <Col sm='12' className='intake-head'>
                <div className='intake-head-div'>
                    <h6>Student Attachments</h6>
                </div>
            </Col>
        </Row>

        <Row>
            <Col sm='12' className='details-edit'>
                <form onSubmit={e => { e.preventDefault(); uploadPhotos() }}>
                    <Row className='details-edit-student'>
                        <Col sm='12' className='students-edit-header'>
                            <h6>Attachments</h6>
                        </Col>

                        {photoInput()}

                        <Col sm='6' className='form-group-4 form-group-img'>
                            {photoLabel()}
                            
                            <img src={photo} alt='Photo' />
                        </Col>
                        
                        <Col sm='6' className='form-group-4 form-group-img form-group-img-2'>
                            {signatureLabel()}
                            {/* `${process.env.REACT_APP_BACKEND_URL}/images/signature.png` */}
                            <img src={signature} alt='Signature' />
                        </Col>
                    </Row>
                    
                    <Row className='justify-content-center'>
                        <Col sm='6'>
                            <div className='buttons'>
                                <button className='btn btn-primary'>{buttonText()}</button>
                            </div>
                        </Col>
                    </Row>
                </form>
            </Col>
        </Row>
    </Container>
  )
}

export default StudentAttachment
