import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import './SabpaisaStatus.css'
import queryString from 'query-string'
import { Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'

function SabpaisaStatus() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const url = location.state.pathname
  const params = new URL(url).searchParams

  const status = params.get('status')
  const payerName = params.get('payerName')
  const payerMobile = params.get('payerMobile')
  const transaction_id = params.get('clientTxnId')
  const paymentMode = params.get('paymentMode')
  const sabpaisaTxnId = params.get('sabpaisaTxnId')
  const bankTxnId = params.get('bankTxnId')

  

  const [ data, setData ] = useState([])
  console.log(data);

  const getStudentData = () => {
    axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/check-student`, { name: payerName, mobile: payerMobile })
    .then(res => setData(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getStudentData()
  })

  const [ statusMessage, setStatusMessage ] = useState('')
  const [ seconds, setSeconds ] = useState(10)
  const [ statusColor, setStatusColor ] = useState('')

  const updateAdmStatus = (id) => {
    axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/update-student/${id}`, { admission_status: 'true', transaction_id: transaction_id, paymentMode: paymentMode, sabpaisaTxnId: sabpaisaTxnId, bankTxnId: bankTxnId, transDate: Date.now() })
      .then(() => console.log('Status updated true'))
      .catch(err => console.log(err))
  }
  
  const updateAdmStatus2 = (id) => {
    axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/update-student/${id}`, { admission_status: 'false', date: Date.now()})
      .then(() => console.log('Status updated false'))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/check-student`, { name: payerName, mobile: payerMobile })
      .then(res => {
        if(status == 'SUCCESS'){
          setStatusMessage('successful')
          setStatusColor('green')
          updateAdmStatus(res.data._id)
        }
        else if(status == 'FAILED'){
          setStatusMessage('failed')
          setStatusColor('rgb(165, 0, 0)')
          updateAdmStatus2(res.data._id)
        }
      })
      .catch(err => console.log(err))
  }, [status])

  const nextPageLink = () => {
    if(status == 'SUCCESS') navigate(`/payment-slip/${data.registration_no}`)
    else if(status == 'FAILED') window.location.href=`${process.env.REACT_APP_FRONTEND_URL}/login`
  }

  useEffect(() => {
    setTimeout(() => {
      if(status == 'SUCCESS') navigate(`/payment-slip/${data.registration_no}`)
      else if(status == 'FAILED') window.location.href=`${process.env.REACT_APP_FRONTEND_URL}/login`
    }, 10000);
  })

  useEffect(() => {
    setTimeout(() => {
      if(seconds>0) setSeconds(seconds-1)
    }, 1000);
  }, [seconds])
  return (
    <Container className='response-container'>
      <Row className='response-row justify-content-center'>
        <Col sm='12' className='response-col'>
          <a>Payment <a style={{color: statusColor}}><b>{statusMessage}</b></a>! You will be redirected to next page in {seconds} seconds.</a>
          <a>Or you can click <a className='next-page-link' onClick={e => {e.preventDefault(); nextPageLink()}}>here</a>...!</a>
        </Col>
      </Row>
    </Container>
  )
}

export default SabpaisaStatus