import React, { useEffect, useState } from 'react'
import './Notice.css'
import { Col, Container, Row } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

function Notice() {
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
    })

    const [ notices, setNotices ] = useState([])
    const [ entriesNum, setEntriesNum ] = useState(10)

    const [ pageCount, setPageCount ] = useState(1)

    const [ maxAmount, setMaxAmount ] = useState(entriesNum)
    const [ minAmount, setMinAmount ] = useState(0)

    const [ page, setPage ] = useState(0)

    useEffect(() => {
        setMaxAmount((page+1)*entriesNum)
        setMinAmount(0 + entriesNum*(page))

        // if(Math.ceil(studentsList2.length/entriesNum) !== 0) setPageCount(Math.ceil(studentsList2.length/entriesNum))
        // else if(Math.ceil(studentsList2.length/entriesNum) == 0) setPageCount(1)
    })

    const entryMaxLength = () => {
        if(maxAmount <= notices.length) return `${maxAmount}`
        else return `${notices.length}`
    }
  return (
    <Container fluid>
        <Row>
            <Col sm='12' className='dashboard-header'>
                <div className='dashboard-top'>
                    <a><i class="fa-solid fa-file"></i></a>
                    <h6>Notice</h6>
                </div>

                <div className='dashboard-bottom'>
                    <p>Powered By: Gen Next Information Technology </p>

                    <p>Email to: <a href='mailto:developer@gnextit.com'>developer@gnextit.com</a> / <a href='mailto:info@gnextit.com'>info@gnextit.com</a> / <a href='mailto:conplaint@gnextit.com'>conplaint@gnextit.com</a></p>

                    <p>Talk to: 8017010592 / 9734103591</p>
                </div>
            </Col>

            <Col sm='12' className='dashboard-select-entry'>
                <div className='selector'>
                    <div className='entries-box'>
                        <p>Show</p>
                        <select id='entries' name='entries' onChange={(e) => setEntriesNum(e.target.value)}>
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                        </select>
                        <p>entries</p>
                    </div>

                    <div className='searching'>
                        <input type='text' placeholder='Search...' />
                        <button>Search</button>
                    </div>
                </div>
            </Col>

            <Col sm='12' className='student-table'>
                <div className='table-responsive-xl'>
                    <table className='table student-table-table'>
                        <thead>
                            <tr>
                                <th scope='col'>Title</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Attachment</th>
                                <th scope='col'>Date</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                notices && notices.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <th scope='row'>{index+1}</th>
                                            <td>{item.title}</td>
                                            <td>{item.status}</td>
                                            <td>Attachment</td>
                                            <td>{item.date}</td>
                                            <td>Action</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </Col>

            <Col sm='12' className='student-table'>
                <Row style={{margin: 0}} className='paginator-row'>
                    <Col sm='6' className='item-count'>
                        <p>Showing {minAmount+1} to {entryMaxLength()} of {notices.length} items</p>
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

export default Notice