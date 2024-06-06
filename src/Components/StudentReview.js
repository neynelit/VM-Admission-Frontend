import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'
import SabpaisaPaymentGateway from './SabpaisaPaymentGateway'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

function StudentReview(props) {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if(window.location.href?.includes('clientCode')) navigate('/response', { state: { pathname: window.location.href}})
        // else if(location.state == null) navigate('/login')
        // else{
        //     setData2(location.state)
        // }
    })

    const [ data2, setData2 ] = useState(location.state)
    console.log(data2)
    
    // const [ dob, setDob ] = useState(new Date.now())
    // useEffect(() => {
    //     var y = dob.getFullYear()
    //     var m = dob.getMonth()
    //     var d = dob.getDate()
        
    //     setDob [y, m, d].join('-')
    // })
    // console.log(dob);

    const reEdit = e => {
        e.preventDefault()
        navigate('/student-edit', { state: data2 })
    }

    const semesterAmount = () => {
        data2.payment?.map((item, index) => {
            if(item.semester == data?.year){
                if(item.payment_status == false) return item.amount
                else return 0
            }
            else return 0
        })
    }

    // console.log(semesterAmount());
    
    const [isOpen, setIsOpen] = useState(false);

    // live keys

    const [clientCode, setClientCode] = useState(`VARDH`);
    const [transUserName, setTransUserName] = useState(`bhabesh.jha_4410`);
    const [transUserPassword, setTransUserPassword] = useState(`VARDH_SP4410`);
    const [authkey, setAuthkey] = useState(`NmWDlqhSSMc3Zfyg`);
    const [authiv, setAuthiv] = useState(`J8D1Yz6FyCpOOl78`);

    //test keys

    // const [clientCode, setClientCode] = useState(`TM001`);
    // const [transUserName, setTransUserName] = useState(`spuser_2013`);
    // const [transUserPassword, setTransUserPassword] = useState(`RIADA_SP336`);
    // const [authkey, setAuthkey] = useState(`kaY9AIhuJZNvKGp2`);
    // const [authiv, setAuthiv] = useState(`YN2v8qQcU3rGfA1y`);

    const [payerName, setPayerName] = useState(`${data2?.name}`);
    const [payerEmail, setPayerEmail] = useState(`${data2?.email}`);
    const [payerMobile, setPayerMobile] = useState(`${data2?.mobile}`);
    const [clientTxnId, setclientTxnId] = useState(uuidv4());
    const [amount, setAmount] = useState(`${data2?.amount}`);
    const [payerAddress, setPayerAddress] = useState(`${data2?.street_name}, ${data2?.street_name_2}, ${data2?.city}, ${data2?.state}, ${data2?.country}`);
    const [callbackUrl, setCallbackUrl] = useState(`${process.env.REACT_APP_FRONTEND_URL}/response`);
    const [data, setData] = useState(null)
    const [udf1, setudf1] = useState(null);
    const [udf2, setudf2] = useState(null);
    const [udf3, setudf3] = useState(null);
    const [udf4, setudf4] = useState(null);
    const [udf5, setudf5] = useState(null);
    const [udf6, setudf6] = useState(null);
    const [udf7, setudf7] = useState(null);
    const [udf8, setudf8] = useState(null);
    const [udf9, setudf9] = useState(null);
    const [udf10, setudf10] = useState(null);
    const [udf11, setudf11] = useState(null);
    const [udf12, setudf12] = useState(null); // client id
    const [udf13, setudf13] = useState(null); // plan id
    const [udf14, setudf14] = useState(null); // plan name
    const [udf15, setudf15] = useState(null); // application id (product id)
    const [udf16, setudf16] = useState(null); // client subscribe plan detail id(refer to DB)
    const [udf17, setudf17] = useState(null); // payment from the COB portal
    const [udf18, setudf18] = useState(null);
    const [udf19, setudf19] = useState(null);
    const [udf20, setudf20] = useState(null);
    const [channelId, setchannelId] = useState(null);
    const [programId, setprogramId] = useState(null);
    const [mcc, setmcc] = useState(null);
    const [amountType, setamountType] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');

    // console.log(payerName, payerEmail, payerMobile, payerAddress, clientTxnId);
    //console.log(clientCode, transUserName, transUserPassword, authkey, authiv);

    // useEffect(() => {
    //     setPayerName(`${data2?.name}`)
    //     setPayerEmail(`${data2?.email}`)
    //     setPayerMobile(`${data2?.mobile}`)
    //     setPayerAddress(`${data2?.street_name}, ${data2?.street_name_2}, ${data2?.city}, ${data2?.state}, ${data2?.country}`)
    // }, [data2.name, data2.email, data2.mobile, data2.street_name, data2.street_name_2, data2.city, data2.state, data2.country])


    const handleSubmit = (e) => {
        setIsOpen(true);
        e.preventDefault()
        const btn = document.getElementById('renderSabPaisa');
        btn.click(window.location.href='https://securepay.sabpaisa.in/SabPaisa/sabPaisaInit?v=1');
        //window.location.href='https://stage-securepay.sabpaisa.in/SabPaisa/sabPaisaInit?v=1'
    }

    const [ photo, setPhoto ] = useState('../demo-student.jpg')
    const [ signature, setSignature ] = useState('../signature.png')

    useEffect(() => {
        if(data2 !== '' || data2 != [] || data2 !== null  || data2 !== undefined){
            if(data2?.photo == '' || data2?.photo == []  || data2?.photo == null || data2?.photo == undefined || data2?.signature == '' || data2?.signature == [] || data2?.signature == null || data2?.signature == undefined){
                setPhoto('../demo-student.jpg')
                setSignature('../signature.png')
            }

            else{
                setPhoto(`${process.env.REACT_APP_BACKEND_URL}/images/${data2?.photo}`)
                setSignature(`${process.env.REACT_APP_BACKEND_URL}/images/${data2?.signature}`)
            }
        }
        else{
            setPhoto('../demo-student.jpg')
            setSignature('../signature.png')
        }
    }, [data2, data2?.photo, data2?.signature])

  return (
    <Container fluid>
        <Row className='justify-content-center'>
            <Col sm='12' className='intake-head'>
                <div className='intake-head-div'>
                    <h6>Review Application</h6>
                </div>
            </Col>
        </Row>

        <Row>
            <Col sm='12' className='details-edit'>
                <form>
                    <Row className='details-edit-student'>
                        <Col sm='12' className='students-edit-header'>
                            <h6>Personal Details</h6>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='registration_no'>Registration Number</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus name='registration_no' placeholder='Enter Your Registration Number' value={data2?.registration_no || ''} />
                            <i class="fa-solid fa-hashtag errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='name'>Name</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus name='name' placeholder='Enter Your Name' value={data2?.name || ''} />
                            <i class="fa-solid fa-user errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='gender'>Gender</label>
                            
                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus name='gender' >
                                <option selected hidden value={data2?.gender || ''}>{data2?.gender || 'Select Your Gender'}</option>
                            </select>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='dob'>DoB</label>

                            <input type='date' className='form-control my-3 input-text' autoFocus name='dob' placeholder='Enter Your DoB' value={data2?.dob || ''} />
                            <i class="fa-solid fa-calendar errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='country'>Nationality</label>

                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus name='country' >
                                <option selected hidden value={data2?.country || ''}>{data2?.country || 'Enter Your Nationality'}</option>
                            </select>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='mobile'>Mobile Number</label>

                            <input type='number' className='form-control my-3 input-text' autoFocus name='mobile' placeholder='Enter Your Mobile Number' value={data2?.mobile || ''} />
                            <i class="fa-solid fa-phone errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='mobile_2'>Alternate Mobile Number</label>

                            <input type='number' className='form-control my-3 input-text' autoFocus name='mobile_2' placeholder='Enter Your Alternate Mobile Number' value={data2?.mobile_2 || ''} />
                            <i class="fa-solid fa-phone errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='email'>Email</label>

                            <input type='email' className='form-control my-3 input-text' autoFocus name='email' placeholder='Enter Your Email Id' value={data2?.email || ''} />
                            <i class="fa-solid fa-envelope errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='blood_group'>Blood Group</label>
                            
                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus name='blood_group' >
                                <option selected hidden value={data2?.blood_group || ''}>{data2?.blood_group || 'Select Your Blood Group'}</option>
                            </select>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='course'>Course</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus required name='course' placeholder='Enter Your Course Name' value={data2?.course || ''} />
                            <i class="fa-solid fa-laptop errspan"></i>
                        </Col>
                    </Row>

                    <Row className='details-edit-student'>
                        <Col sm='12' className='students-edit-header'>
                            <h6>Social Details</h6>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='aadhar'>Aadhar Number</label>

                            <input type='number' className='form-control my-3 input-text' autoFocus name='aadhar' placeholder='Enter Your Aadhar Number' value={data2?.aadhar || ''} />
                            <i class="fa-solid fa-id-badge errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='category'>Category</label>
                            
                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus name='category' >
                                <option selected hidden value={data2?.category || ''}>{data2?.category || 'Select Your Category'}</option>
                            </select>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='martial_status'>Martial Status</label>
                            
                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus name='martial_status' >
                                <option selected hidden value={data2?.martial_status || ''}>{data2?.martial_status || 'Select Your Martial Status'}</option>
                            </select>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='religion'>Religion</label>
                            
                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus name='religion' >
                                <option selected hidden value={data2?.religion || ''}>{data2?.religion || 'Select Your Religion'}</option>
                            </select>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='annual_income'>Annual Family Income</label>

                            <input type='number' className='form-control my-3 input-text' autoFocus name='annual_income' placeholder='Enter Your Annual Family Income' value={data2?.annual_income || ''} />
                            <i class="fa-solid fa-indian-rupee-sign errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='disability'>Person with Disability</label>
                            
                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus name='disability' >
                                <option selected hidden value={data2?.disability || ''}>{data2?.disability || 'Select Your Disability Status'}</option>
                            </select>
                        </Col>
                    </Row>

                    <Row className='details-edit-student'>
                        <Col sm='12' className='students-edit-header'>
                            <h6>Parents Details</h6>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='father_name'>Father's Name</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus name='father_name' placeholder={`Enter Your Father's Name`} value={data2?.father_name || ''} />
                            <i class="fa-solid fa-user errspan"></i>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='father_occupation'>Father's Occupation</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus name='father_occupation' placeholder={`Enter Your Father's Occupation`} value={data2?.father_occupation || ''} />
                            <i class="fa-solid fa-business-time errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='father_mobile'>Father's Mobile Number</label>

                            <input type='number' className='form-control my-3 input-text' autoFocus name='father_mobile' placeholder={`Enter Your Father's Mobile Number`} value={data2?.father_mobile || ''} />
                            <i class="fa-solid fa-phone errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'></Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='mother_name'>Mother's Name</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus name='mother_name' placeholder={`Enter Your Mother's Name`} value={data2?.mother_name || ''} />
                            <i class="fa-solid fa-user errspan"></i>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='mother_occupation'>Mother's Occupation</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus name='mother_occupation' placeholder={`Enter Your Mother's Occupation`} value={data2?.mother_occupation || ''} />
                            <i class="fa-solid fa-business-time errspan"></i>
                        </Col>

                        <Col sm='3' className='form-group-4'>
                            <label for='mother_mobile'>Mother's Mobile Number</label>

                            <input type='number' className='form-control my-3 input-text' autoFocus name='mother_mobile' placeholder={`Enter Your Mother's Mobile Number`} value={data2?.mother_mobile || ''} />
                            <i class="fa-solid fa-phone errspan"></i>
                        </Col>
                    </Row>

                    <Row className='details-edit-student'>
                        <Col sm='12' className='students-edit-header'>
                            <h6>Address</h6>
                        </Col>
                        
                        <Col sm='6' className='form-group-4'>
                            <label for='street_name'>Street Address</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus name='street_name' placeholder='Enter Your Street Address' value={data2?.street_name || ''} />
                            <i class="fa-solid fa-location-dot errspan"></i>
                        </Col>
                        
                        <Col sm='6' className='form-group-4'>
                            <label for='street_name_2'>Street Address Line 2</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus name='street_name_2' placeholder='Enter Your Street Address Line 2' value={data2?.street_name_2 || ''} />
                            <i class="fa-solid fa-location-dot errspan"></i>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='city'>City</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus name='city' placeholder='Enter Your City' value={data2?.city || ''} />
                            <i class="fa-solid fa-city errspan"></i>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='state'>State</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus name='state' placeholder='Enter Your State' value={data2?.state || ''} />
                            <i class="fa-solid fa-location-dot errspan"></i>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='pincode'>Pin Code</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus name='pincode' placeholder='Enter Your Pin Code' value={data2?.pincode || ''} />
                            <i class="fa-solid fa-address-card errspan"></i>
                        </Col>
                    </Row>

                    <Row className='details-edit-student'>
                        <Col sm='12' className='students-edit-header'>
                            <h6>Educational Details</h6>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='hs_board'>10+2 Board Name</label>

                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus name='hs_board' >
                                <option selected hidden value={data2?.hs_board || ''}>{data2?.hs_board || 'Select Your 10+2 Board'}</option>
                            </select>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='hs_stream'>10+2 Stream</label>
                            
                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus name='hs_stream' >
                                <option selected hidden value={data2?.hs_stream || ''}>{data2?.hs_stream || 'Select Your 10+2 Stream'}</option>
                            </select>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='hs_year'>10+2 Pass Year</label>
                            
                            <select class="form-select input-select admission-select" aria-label=".form-select-lg example" autoFocus name='hs_year' >
                                <option selected hidden value={data2?.hs_year || ''}>{data2?.hs_year || 'Select Your 10+2 Pass Year'}</option>
                            </select>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='hs_reg_no'>10+2 Registration Number</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus name='hs_reg_no' placeholder='Enter Your 10+2 Registration Number' value={data2?.hs_reg_no || ''} />
                            <i class="fa-solid fa-hashtag errspan"></i>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='hs_roll_no'>10+2 Roll Number</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus name='hs_roll_no' placeholder='Enter Your 10+2 Roll Number' value={data2?.hs_roll_no || ''} />
                            <i class="fa-solid fa-hashtag errspan"></i>
                        </Col>
                        
                        <Col sm='3' className='form-group-4'>
                            <label for='hs_marks'>10+2 Marks in Percentage(%)</label>

                            <input type='text' className='form-control my-3 input-text' autoFocus name='hs_marks' placeholder='Enter Your 10+2 Marks in Percentage(%)' value={data2?.hs_marks || ''} />
                            <i class="fa-solid fa-marker errspan"></i>
                        </Col>
                    </Row>

                    <Row className='details-edit-student'>
                        <Col sm='12' className='students-edit-header'>
                            <h6>Attachments</h6>
                        </Col>

                        <Col sm='6' className='form-group-4 form-group-img'>
                            <h6>Photo</h6>
                            
                            <img src={photo} alt='Photo' />
                        </Col>
                        
                        <Col sm='6' className='form-group-4 form-group-img form-group-img-2'>
                            <h6>Signature</h6>
                            
                            <img src={signature} alt='Signature' />
                        </Col>
                    </Row>

                    <div id='renderSabPaisa'></div>
                    
                    <Row className='justify-content-center'>
                        <Col sm='3'>
                            <div className='buttons'>
                                <button className='btn btn-primary' onClick={reEdit}>Re-Edit Application</button>
                            </div>
                        </Col>
                        <Col sm='3'>
                            <div className='buttons'>
                                <button className='btn btn-primary' onClick={handleSubmit}>Continue For Payment</button>
                            </div>
                        </Col>
                    </Row>
                    
                    <SabpaisaPaymentGateway clientCode={clientCode} transUserName={transUserName} transUserPassword={transUserPassword} authkey={authkey} authiv={authiv} payerName={payerName} payerEmail={payerEmail} payerMobile={payerMobile} clientTxnId={clientTxnId} amount={amount} payerAddress={payerAddress} callbackUrl={callbackUrl} isOpen={isOpen} />
                </form>
            </Col>
        </Row>
    </Container>
  )
}

export default StudentReview