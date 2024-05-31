import React, { useEffect, useState } from 'react'
import './IntakeCapacity.css'
import { Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'

function IntakeCapacity() {
  const [ entriesNum, setEntriesNum ] = useState(10)

  const [ entryData, setEntryData ] = useState([])
  console.log(entryData)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/subjects`)
      .then((res) => setEntryData(res.data))
      .catch(err => console.log(err))
  })

  const entriesNumCount = () => {
    if(entriesNum <= entryData.length) return entriesNum
    else return entryData.length
  }

  return (
    <Container fluid>
        <Row>
          <Col sm='12' className='intake-head'>
            <div className='intake-head-div'>
              <h6>Intake Capacity</h6>
            </div>
          </Col>

          <Col sm='12'>
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

          <Col sm='12'>
            <div className='table-content table-responsive-sm'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Sr No</th>
                    <th scope='col'>Program Type</th>
                    <th scope='col'>Subject Name</th>
                    <th scope='col'>Intake Capacity</th>
                  </tr>
                </thead>

                <tbody>
                  {entryData && entryData.map((item, index) => {
                    if(index<entriesNum){
                      return(
                        <tr key={index}>
                          <th scope='col'>{index+1}</th>
                          <td>{item.type}</td>
                          <td>{item.subject}</td>
                          <td>{item.capacity}</td>
                        </tr>
                      )
                    }
                  })}
                  
                </tbody>
              </table>
            </div>
          </Col>

          <Col sm='12'>
            <div className='entry-num'>
              <p>Showing {entriesNumCount()} of {entryData.length} entries</p>
              <div className='arrows'>
                <a>Previous</a>
                <a>Next</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
  )
}

export default IntakeCapacity