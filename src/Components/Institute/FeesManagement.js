import React, { useEffect, useState } from 'react'
import './FeesManagement.css'
import { Col, Container, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';
import Popup from 'reactjs-popup';

const cookies = new Cookies()

function FeesManagement() {
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
    })

    const username = cookies.get('username')
    const password = cookies.get('password')

    const [ permit, setPermit ] = useState(false)

    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/admin/search`, { username: username })
            .then(res => setPermit(res.data.access))
            .catch(err => console.log(err))
    }, [])

    const [ subjects, setSubjects ] = useState([])
    const [ subjects2, setSubjects2 ] = useState(subjects)
    console.log(subjects2);

    const [ openclose, setOpenclose ] = useState([])
    console.log(openclose);
    
    const [ entriesNum, setEntriesNum ] = useState(10)

    const [ pageCount, setPageCount ] = useState(1)

    const entriesNumCount = () => {
        if(entriesNum <= subjects2.length) return entriesNum
        else return subjects2.length
    }

    const [ maxAmount, setMaxAmount ] = useState(entriesNum)
    const [ minAmount, setMinAmount ] = useState(0)

    const [ page, setPage ] = useState(0)

    useEffect(() => {
        setMaxAmount((page+1)*entriesNum)
        setMinAmount(0 + entriesNum*(page))

        if(Math.ceil(subjects2.length/entriesNum) !== 0) setPageCount(Math.ceil(subjects2.length/entriesNum))
        else if(Math.ceil(subjects2.length/entriesNum) == 0) setPageCount(1)

        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/subjects`)
            .then(res => setSubjects(res.data))
            .catch(err => console.log(err))

        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/openclose`)
            .then(res => setOpenclose(res.data))
            .catch(err => console.log(err))
    })

    const entryMaxLength = () => {
        if(maxAmount <= subjects2.length) return `${maxAmount}`
        else return `${subjects2.length}`
    }

    const [ matches6, setMatches6 ] = useState(window.matchMedia('(max-width: 425px)').matches)

    const popupStyle6 = () => {
        if(matches6 == true) return {'width': '100%'}
        else if(matches6 == false) return {'width': '500px'}
    }

    useEffect(() => {
        window
            .matchMedia('(max-width: 425px)')
            .addEventListener('change', e => setMatches6( e.matches ))
    })

    const [ searchItem, setSearchItem ] = useState('')
    console.log(searchItem);

    useEffect(() => {
        if(searchItem == '') setSubjects2(subjects)
        if(searchItem !== '') setSubjects2([])
    })

    const [ flip, setFlip ] = useState('')

    const deleteSubject = (id) => {
        axios
            .delete(`${process.env.REACT_APP_BACKEND_URL}/delete-subject/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
  return (
    <Container fluid>
        <Row>
            <Col sm='12' className='dashboard-header'>
                <div className='dashboard-top'>
                    <a><i class="fa-solid fa-money-bill-wave"></i></a>
                    <h6>Fees Management</h6>
                </div>

                <div className='dashboard-bottom'>
                    <p>Powered By: Gen Next Information Technology </p>

                    <p>Email to: <a href='mailto:developer@gnextit.com'>developer@gnextit.com</a> / <a href='mailto:info@gnextit.com'>info@gnextit.com</a> / <a href='mailto:conplaint@gnextit.com'>conplaint@gnextit.com</a></p>

                    <p>Talk to: 8017010592 / 9734103591</p>
                </div>
            </Col>

            <Col sm='12' className='add-payment'>
                <div className='buttoned'>
                    {/* <Popup trigger={<button><i class="fa-solid fa-plus"></i> Add Student</button>} modal nested contentStyle={popupStyle4()}>
                        {
                            close => (
                                <Container className='add-popup'>
                                    <Row>
                                        <Col sm='12' className='d-flex justify-content-end'>
                                            <button className='close-btn' onClick={() => close()}><i class="fa-solid fa-xmark"></i></button>
                                        </Col>

                                        <Col sm='12' className='add-data-from'>
                                            <h4>Add Student</h4>

                                            <form>
                                                <div className='form-group-6'>
                                                    <input type='text' className='form-control my-3 form-group-6-input' autoFocus required name='name' placeholder={`Student's Full Name`} onChange={updateNewStudentData} />
                                                    <i class="fa-solid fa-user icon-align"></i>
                                                </div>

                                                
                                                <div className='form-group-6'>
                                                    <input type='text' className='form-control my-3 form-group-6-input' autoFocus required name='registration_no' placeholder={`Student's Registration Number`} onChange={updateNewStudentData} />
                                                    <i class="fa-solid fa-hashtag icon-align"></i>
                                                </div>

                                                
                                                <div className='form-group-6'>
                                                    <input type='text' className='form-control my-3 form-group-6-input' autoFocus required name='father_name' placeholder={`Student's Father's Name`} onChange={updateNewStudentData} />
                                                    <i class="fa-solid fa-user icon-align"></i>
                                                </div>
                                                
                                                <div className='form-group-6'>
                                                    <input type='number' className='form-control my-3 form-group-6-input' autoFocus required name='mobile' placeholder={`Mobile No`} onChange={updateNewStudentData} />
                                                    <i class="fa-solid fa-envelope icon-align"></i>
                                                </div>
                                                
                                                <div className='form-group-6'>
                                                    <input type='email' className='form-control my-3 form-group-6-input' autoFocus required name='email' placeholder={`Email Id`} onChange={updateNewStudentData} />
                                                    <i class="fa-solid fa-phone icon-align"></i>
                                                </div>
                                                
                                                <div className='form-group-6 form-group-6-options'>
                                                    <select class="form-select form-group-6-select" aria-label=".form-select-lg example" autoFocus name='session' onChange={updateNewStudentData} >
                                                        <option selected hidden value='2024-2028'>Select Student's Session</option>
                                                        <option value='2024-2028'>2024-2028</option>
                                                    </select>
                                                </div>
                                                
                                                <div className='form-group-6 form-group-6-options'>
                                                    <select class="form-select form-group-6-select" aria-label=".form-select-lg example" autoFocus name='course' onChange={updateNewStudentData} >
                                                        <option selected hidden value=''>Select Student's Course</option>
                                                        {
                                                            subjects2 && subjects2.map((item, index) => {
                                                                return(
                                                                    <option value={item.subject}>{item.subject}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                
                                                <div className='form-group-6 form-group-6-options'>
                                                    <select class="form-select form-group-6-select" aria-label=".form-select-lg example" autoFocus name='year' onChange={updateNewStudentData} >
                                                        <option selected hidden value='2024-2028'>Select Student's Year/Semester</option>
                                                        <option value='1st Semester'>1st Semester</option>
                                                        <option value='2nd Semester'>2nd Semester</option>
                                                        <option value='3rd Semester'>3rd Semester</option>
                                                        <option value='4th Semester'>4th Semester</option>
                                                    </select>
                                                </div>

                                                <div className='form-group-6 form-group-6-options'>
                                                    <select class="form-select form-group-6-select" aria-label=".form-select-lg example" autoFocus name='gender' onChange={updateNewStudentData} >
                                                        <option selected hidden value='2024-2028'>Select Student's Gender</option>
                                                        <option value='Male'>Male</option>
                                                        <option value='Female'>Female</option>
                                                        <option value='Others'>Others</option>
                                                    </select>
                                                </div>

                                                <div className='form-group-6 form-group-6-options'>
                                                    <select class="form-select form-group-6-select" aria-label=".form-select-lg example" autoFocus name='category' onChange={updateNewStudentData} >
                                                        <option selected hidden value='2024-2028'>Select Student's Category</option>
                                                        <option value='General'>General</option>
                                                        <option value='OBC-A'>OBC-A</option>
                                                        <option value='OBC-B'>OBC-B</option>
                                                        <option value='SC'>SC</option>
                                                        <option value='ST'>ST</option>
                                                    </select>
                                                </div>
                                                
                                                <div className='form-group-6'>
                                                    <input type='number' className='form-control my-3 form-group-6-input' autoFocus required name='amount' placeholder={`Student's Fees Amount`} onChange={updateNewStudentData} />
                                                    <i class="fa-solid fa-indian-rupee-sign icon-align"></i>
                                                </div>

                                                <div className='buttoned-2'>
                                                    <button className='btn' onClick={e => {
                                                        e.preventDefault()
                                                        axios
                                                            .post(`${process.env.REACT_APP_BACKEND_URL}/add-student`, newStudent)
                                                            .then(() => {
                                                                alert('Student Added')
                                                                close()
                                                            })
                                                            .catch(err => {
                                                                alert('Student Not Added')
                                                                close()
                                                            })
                                                    }}>Add</button>
                                                    <button className='btn' onClick={e => {e.preventDefault();close();}}>Exit</button>
                                                </div>
                                            </form>
                                        </Col>
                                    </Row>
                                </Container>
                            )
                        }
                    </Popup> */}
                    {/* <button><i class="fa-regular fa-pen-to-square"></i> Update payment</button> */}
                </div>
            </Col>

            <Col sm='12' className='dashboard-select-entry'>
                <div className='selector'>
                    <div className='entries-box'>
                        <p>Show</p>
                        <select id='entries' name='entries' onChange={(e) => {setEntriesNum(e.target.value); setPage(0)}}>
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                        </select>
                        <p>entries</p>
                    </div>

                    <div className='searching'>
                        <input type='text' placeholder='Search...' onChange={e => setSearchItem(e.target.value)} />
                        <button>Search</button>
                    </div>
                </div>
            </Col>

            <Col sm='12' className='student-table'>
                <div className='table-responsive-xl'>
                    <table className='table student-table-table'>
                        <thead>
                            <tr>
                                <th scope='col'>Course Name</th>
                                <th scope='col'>Gender</th>
                                <th scope='col'>Category</th>
                                <th scope='col'>Hons Subject</th>
                                <th scope='col'>Course Fees</th>
                                <th scope='col'>Fees For</th>
                                <th scope='col'>Year/Semester</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                subjects2 && subjects2.map((item, index) => {
                                    if(index>=minAmount && index<maxAmount){
                                        return(
                                            <tr key={index}>
                                                <td>{item.courseType}</td>
                                                <td></td>
                                                <td></td>
                                                <td>{item.subject}</td>
                                                <td>{item.amount}</td>
                                                <td>Admission</td>
                                                <td>{item.semester}</td>
                                                <td className='btn-act-parent'>
                                                    <button className='btn-act' onClick={e => {e.preventDefault(); navigate(`/institute/edit-fees/${item._id}`, {state: item })}} disabled={!permit}><i class="fa-solid fa-pen-to-square"></i></button>
                                                    <Popup trigger={<button className='btn-act' disabled={!permit}><i class="fa-solid fa-trash"></i></button>} modal nested contentStyle={popupStyle6()}>
                                                        {
                                                            close => (
                                                                <>
                                                                    <Container className='delete-popup-container'>
                                                                        <Row className='justify-content-center delete-popup-row'>
                                                                            <Col sm='12' className='delete-popup-col delete-popup-col-1'>
                                                                                <a onClick={e => {e.preventDefault(); close()}} onMouseOver={() => setFlip('fa-flip')} onMouseLeave={() => setFlip('')}><i class={`fa-solid fa-circle-xmark ${flip}`}></i></a>
                                                                            </Col>

                                                                            <Col sm='12' className='delete-popup-col delete-popup-col-2'>
                                                                                <h5>WARNING!</h5>
                                                                                <p>If you proceed, this student data will be deleted!</p>
                                                                                <button onClick={(e) => {e.preventDefault(); deleteSubject(item._id); close();}}>DELETE</button>
                                                                            </Col>
                                                                        </Row>
                                                                    </Container>
                                                                </>
                                                            )
                                                        }
                                                    </Popup>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </Col>

            <Col sm='12' className='student-table'>
                <Row style={{margin: 0}} className='paginator-row'>
                    <Col sm='6' className='item-count'>
                        <p>Showing {minAmount+1} to {entryMaxLength()} of {subjects2.length} items</p>
                    </Col>

                    <Col sm='6' className='paginator'>
                        <ReactPaginate activeClassName={'item active '} breakClassName={'item break-me '} breakLabel={'...'} containerClassName={'pagination'} disabledClassName={'disabled-page'} marginPagesDisplayed={2} nextClassName={'item next '} nextLabel={<i class="fa-solid fa-forward-step" style={{fontSize: '24px'}}></i>} onPageChange={e => setPage(e.selected)} pageCount={pageCount} pageClassName={'item pagination-page '} pageRangeDisplayed={2} previousClassName={'item previous'} previousLabel={<i class="fa-solid fa-backward-step" style={{fontSize: '24px'}}></i>} />

                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
  )
}

export default FeesManagement