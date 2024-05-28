import React, { useEffect, useState } from 'react'
import './OpenClose.css'
import { Col, Container, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Cookies from 'universal-cookie';

const cookies = new Cookies()

function OpenClose() {
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

    const [ openclose, setOpenclose ] = useState([])
    const [ openclose2, setOpenclose2 ] = useState(openclose)
    console.log(openclose2);
    
    const [ entriesNum, setEntriesNum ] = useState(10)

    const [ pageCount, setPageCount ] = useState(1)

    const entriesNumCount = () => {
        if(entriesNum <= openclose2.length) return entriesNum
        else return openclose2.length
    }

    const [ maxAmount, setMaxAmount ] = useState(entriesNum)
    const [ minAmount, setMinAmount ] = useState(0)

    const [ page, setPage ] = useState(0)

    useEffect(() => {
        setMaxAmount((page+1)*entriesNum)
        setMinAmount(0 + entriesNum*(page))

        if(Math.ceil(openclose2.length/entriesNum) !== 0) setPageCount(Math.ceil(openclose2.length/entriesNum))
        else if(Math.ceil(openclose2.length/entriesNum) == 0) setPageCount(1)

        axios
            .get(`http://localhost:8080/openclose`)
            .then(res => setOpenclose(res.data))
            .catch(err => console.log(err))
    })

    const entryMaxLength = () => {
        if(maxAmount <= openclose2.length) return `${maxAmount}`
        else return `${openclose2.length}`
    }

    const [ searchItem, setSearchItem ] = useState('')
    console.log(searchItem);

    useEffect(() => {
        if(searchItem == '') setOpenclose2(openclose)
        if(searchItem !== '') setOpenclose2([])
    })

    const ugpgType = (item) => {
        if(item == 'UG') return 'Graduation'
    }

    const programmeStatus = (status) => {
        if(status == false) return 'Unpublished'
        else if(status ==  true) return 'Published'
    }

    const statusColor = (status) => {
        if(status == false) return {color: 'rgb(220, 0, 0)'}
        else if(status == true) return {color: 'green'}
    }

    const statusActionColor = (status) => {
        if(status == false) return {color: 'green'}
        else if(status == true) return {color: 'rgb(220, 0, 0)'}
    }

    const openCloseAction = (status) => {
        if(status == false) return <i class="fa-solid fa-upload"></i>
        else if(status == true) return <i class="fa-solid fa-rotate-left"></i>
    }

    const openCloseActionName = (status) => {
        if(status == false) return 'Publish'
        else if(status ==  true) return 'Unpublish'
    }

    const updateAllSubject = (type, courseType, semester, status) => {
        axios
            .patch(`http://localhost:8080/update-all-subjects`, { type: type, courseType: courseType, semester: semester, status: !status })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const updateStatus = (item) => {
        if(item.status == false){
            axios
                .patch(`http://localhost:8080/update-openclose/${item._id}`, { status: 'true', date: Date.now})
                .then(() => updateAllSubject(item.type, item.programme, item.semester, item.status))
                .catch(err => console.log(err))
        }
        else if(item.status == true){
            axios
                .patch(`http://localhost:8080/update-openclose/${item._id}`, { status: 'false'})
                .then(() => updateAllSubject(item.type, item.programme, item.semester, item.status))
                .catch(err => console.log(err))
        }
    }
  return (
    <Container fluid>
        <Row>
            <Col sm='12' className='dashboard-header'>
                <div className='dashboard-top'>
                    <a><i class="fa-solid fa-xmark"></i></a>
                    <h6>Open & Close</h6>
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
                                <th scope='col'>Open Type</th>
                                <th scope='col'>Open Programme</th>
                                <th scope='col'>Open Course</th>
                                <th scope='col'>Status</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                openclose2 && openclose2.map((item, index) => {
                                    if(index>=minAmount && index<maxAmount){
                                        return(
                                            <tr key={index}>
                                                <td>{item.type}</td>
                                                <td>{item.programme}</td>
                                                <td>{item.semester}</td>
                                                <td style={statusColor(item.status)}>{programmeStatus(item.status)}</td>
                                                <td className='action-button-parent' style={statusActionColor(item.status)} onClick={() => updateStatus(item)}>
                                                    <a className='action-button'>{openCloseAction(item.status)}</a>
                                                    <a className='action-button-tooltip'>{openCloseActionName(item.status)}</a>
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
                        <p>Showing {minAmount+1} to {entryMaxLength()} of {openclose2.length} items</p>
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

export default OpenClose