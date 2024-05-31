import React, { useEffect, useState } from 'react'
import './AddManager.css'
import { Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import Popup from 'reactjs-popup'
import { useNavigate } from 'react-router'
import Cookies from 'universal-cookie'


const cookies = new Cookies()

function AddManager() {
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

    const [ managers, setManagers ] = useState([])
    const [ managers2, setManagers2 ] = useState(managers)
    console.log(managers2)
    
    const [ entriesNum, setEntriesNum ] = useState(10)

    const [ pageCount, setPageCount ] = useState(1)

    const entriesNumCount = () => {
        if(entriesNum <= managers2.length) return entriesNum
        else return managers2.length
    }

    const [ maxAmount, setMaxAmount ] = useState(entriesNum)
    const [ minAmount, setMinAmount ] = useState(0)

    const [ page, setPage ] = useState(0)

    useEffect(() => {
        setMaxAmount((page+1)*entriesNum)
        setMinAmount(0 + entriesNum*(page))

        if(Math.ceil(managers2.length/entriesNum) !== 0) setPageCount(Math.ceil(managers2.length/entriesNum))
        else if(Math.ceil(managers2.length/entriesNum) == 0) setPageCount(1)

        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/admin/all`)
            .then(res => setManagers(res.data))
            .catch(err => console.log(err))
    }, [page, entriesNum, managers, managers2])

    const [ searchItem, setSearchItem ] = useState('')
    console.log(searchItem);

    useEffect(() => {
        if(searchItem == '') setManagers2(managers)
        if(searchItem !== '') setManagers2([])
    }, [searchItem, managers])

    const entryMaxLength = () => {
        if(maxAmount <= managers2.length) return `${maxAmount}`
        else return `${managers2.length}`
    }

    const managerAccess = (status) => {
        if(status == false) return 'Not Permitted'
        else return 'Permitted'
    }

    const [ matches5, setMatches5 ] = useState(window.matchMedia('(max-width: 425px)').matches)

    const popupStyle5 = () => {
        if(matches5 == true) return {'width': '100%'}
        else if(matches5 == false) return {'width': '500px'}
    }

    useEffect(() => {
        window
            .matchMedia('(max-width: 425px)')
            .addEventListener('change', e => setMatches5( e.matches ))
    })

    const [ flip, setFlip ] = useState('')

    const deleteManager = (id) => {
        axios
            .delete(`${process.env.REACT_APP_BACKEND_URL}/admin/delete/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
  return (
    <Container fluid>
        <Row>
            <Col sm='12' className='dashboard-header'>
                <div className='dashboard-top'>
                    <a><i class="fa-solid fa-user"></i></a>
                    <h6>Add Manager</h6>
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
                                <th scope='col'>Manager Name</th>
                                <th scope='col'>Manager Type</th>
                                <th scope='col'>Manager Access</th>
                                <th scope='col'>Manager Email</th>
                                <th scope='col'>Manager Mobile</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                managers2 && managers2.map((item, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.type}</td>
                                            <td>{managerAccess(item.access)}</td>
                                            <td>{item.email}</td>
                                            <td>{item.mobile}</td>
                                            <td className='btn-act-parent'>
                                                <button className='btn-act' onClick={e => {e.preventDefault(); navigate(`/institute/edit-manager/${item._id}`, {state: item })}} disabled={!permit}><i class="fa-solid fa-pen-to-square"></i></button>
                                                <Popup trigger={<button className='btn-act' disabled={!permit}><i class="fa-solid fa-trash"></i></button>} modal nested contentStyle={popupStyle5()}>
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
                                                                            <button onClick={(e) => {e.preventDefault(); deleteManager(item._id); close();}}>DELETE</button>
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
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </Col>

            <Col sm='12' className='student-table'>
                <Row style={{margin: 0}} className='paginator-row'>
                    <Col sm='6' className='item-count'>
                        <p>Showing {minAmount+1} to {entryMaxLength()} of {managers2.length} items</p>
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

export default AddManager