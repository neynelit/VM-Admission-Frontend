import React, { useEffect, useRef, useState } from 'react'
import './PayReceipt.css'
import { useLocation, useNavigate } from 'react-router'
import { Col, Container, Row } from 'react-bootstrap'
import generatePDF, { Resolution, Margin, Options } from "react-to-pdf";

function PayReceipt() {
    const location = useLocation()
    const navigate = useNavigate()
    const targetRef = useRef()

    const [ data, setData ] = useState(location.state)

    useEffect(() => {
        setData(location.state)
    }, [location.state])

    console.log(data)

    const status = (status) => {
        if(status == true) return 'SUCCESS'
        else if(status == false) return 'FAILED'
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    var date = new Date(data.date)
    console.log(`${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`);
  return (
    <>
        <Container className='receipt-container'>
            <Row className='justify-content-center receipt-container-row' id='pdf-content' ref={targetRef}>
                <Col sm='12' className='receipt-container-col receipt-container-col-1'>
                    <img src='../vm_logo.png' alt='VM Admission Logo' />

                    <div className='receipt-student-details receipt-student-details-1'>
                        <h6>{data.name}</h6>
                        <p>{data.mobile}</p>
                        <p>{data.email}</p>
                        <p>{data.street_name}, {data.city}, {data.state}, {data.country}</p>
                    </div>
                </Col>

                <Col sm='12' className='receipt-container-col receipt-container-col-1'>
                    <div className='receipt-student-details receipt-student-details-2'>
                        <h6>{data.name}</h6>
                        <p><b>Registration No:</b> {data.registration_no}</p>
                        <p><b>Mobile:</b> {data.mobile}</p>
                        <p><b>Transaction Id:</b> {data.transaction_id}</p>
                        <p><b>Status:</b> {status(data.admission_status)}</p>
                    </div>

                    <div className='receipt-student-details receipt-student-details-3'>
                        <h6>RECEIPT</h6>
                    </div>
                </Col>

                <Col sm='12' className='receipt-container-col receipt-container-col-4 table-responsive'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>Description</th>
                                <th scope='col'>Amount</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Admission Fees for {data.course}-{data.year}</td>
                                <td><i class="fa-solid fa-indian-rupee-sign"></i> {data.amount}</td>
                            </tr>
                            
                            <tr>
                                <td>Total</td>
                                <td><i class="fa-solid fa-indian-rupee-sign"></i> {data.amount}</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>

                <Col sm='12' className='receipt-container-col receipt-container-col-5'>
                    <div className='receipt-student-details receipt-student-details-4'>
                        <p><b>Date:</b> {days[date.getDay()]},  {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</p>
                        <p>Thank you for your payment!</p>
                    </div>

                    <div className='receipt-student-details receipt-student-details-5'>
                        <h6>SIGNATURE</h6>
                    </div>
                </Col>
            </Row>
        </Container>

        <Container className='receipt-container-2'>
            <Row className='receipt-container-2-row'>
                <Col sm='12' className='receipt-container-2-col'>
                    <a onClick={() => generatePDF(targetRef, {filename: `${data.registration_no}-admission-slip.pdf`})}>Download</a>
                    <a onClick={e => {e.preventDefault(); navigate(-1)}}><i class="fa-solid fa-arrow-left"></i> Go Back</a>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default PayReceipt
