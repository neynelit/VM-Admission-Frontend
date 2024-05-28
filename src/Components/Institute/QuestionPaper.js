import React, { useEffect, useState } from 'react'
import './QuestionPaper.css'
import { Col, Container, Row } from 'react-bootstrap'
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';
import axios from 'axios';

const cookies = new Cookies()

function QuestionPaper() {
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

    const [ questions, setQuestions ] = useState([])
    const [ questions2, setQuestions2 ] = useState(questions)
    console.log(questions2)
    
    const [ entriesNum, setEntriesNum ] = useState(10)

    const [ pageCount, setPageCount ] = useState(1)

    const [ maxAmount, setMaxAmount ] = useState(entriesNum)
    const [ minAmount, setMinAmount ] = useState(0)

    const [ page, setPage ] = useState(0)

    useEffect(() => {
        setMaxAmount((page+1)*entriesNum)
        setMinAmount(0 + entriesNum*(page))

        if(Math.ceil(questions2.length/entriesNum) !== 0) setPageCount(Math.ceil(questions2.length/entriesNum))
        else if(Math.ceil(questions2.length/entriesNum) == 0) setPageCount(1)
    })

    const entryMaxLength = () => {
        if(maxAmount <= questions2.length) return `${maxAmount}`
        else return `${questions2.length}`
    }

    const [ searchItem, setSearchItem ] = useState('')
    console.log(searchItem);

    useEffect(() => {
        if(searchItem == '') setQuestions2(questions)
        if(searchItem !== '') setQuestions2([])
    })
    

  return (
    <Container fluid>
        <Row>
            <Col sm='12' className='dashboard-header'>
                <div className='dashboard-top'>
                    <a><i class="fa-solid fa-circle-question"></i></a>
                    <h6>Question Paper</h6>
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
                                <th scope='col'>Title</th>
                                <th scope='col'>Course</th>
                                <th scope='col'>Session</th>
                                <th scope='col'>Semester</th>
                                <th scope='col'>File</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                questions2 && questions2.map((item, index) => {
                                    if(index>=minAmount && index<maxAmount){
                                        return(
                                            <tr key={index}>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>Action</td>
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
                        <p>Showing {minAmount+1} to {entryMaxLength()} of {questions2.length} items</p>
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

export default QuestionPaper