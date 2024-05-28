import React, { useState } from 'react'
import './KnowResult.css'
import { Col, Container, Row } from 'react-bootstrap'

function KnowResult() {
  const [ resultsNum, setResultsNum ] = useState(10)

  const [ resultsData, setResultsData ] = useState([])

  const resultsDataCount = () => {
    if(resultsNum <= resultsData.length) return resultsNum
    else return resultsData.length
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm='12' className='intake-head'>
            <div className='intake-head-div'>
              <h6>Result Status</h6>
            </div>
          </Col>

          <Col sm='12' className='merit-head'>
            <div className='select-list'>
              <label for='courses'>Application No</label>
              <input id='app_input' type='text' name='application_no' placeholder='Enter Your Application Number' required />
            </div>
            
            <div className='select-list'>
              <label for='courses'>Select Program</label>
              <select id='select' name='program'>
                <option value='Please Select Program' disabled selected hidden>Please Select Program</option>
                <option value=''></option>
              </select>
            </div>
            
            <div className='select-list'>
              <label for='courses'>Select Course</label>
              <select id='select' name='course'>
                <option value='Please Select Course' disabled selected hidden>Please Select Course</option>
                <option value=''></option>
              </select>
            </div>
            
            <div className='select-list'>
              <label for='courses'>Select Subject</label>
              <select id='select' name='subject'>
                <option value='Please Select Subject' disabled selected hidden>Please Select Subject</option>
                <option value=''></option>
              </select>
            </div>

              <div className='searching'>
                <button>Search</button>
              </div>
          </Col>

          <Col sm='12'>
            <div className='selector'>
              <div className='entries-box'>
                <p>Show</p>
                <select id='entries' name='entries' onChange={(e) => setResultsNum(e.target.value)}>
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
            <div className='table-content table-responsive-xl'>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>Sr No</th>
                    <th scope='col'>Application No</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Program</th>
                    <th scope='col'>Subject</th>
                    <th scope='col'>Terminal</th>
                    <th scope='col'>Marks</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th scope='row'></th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>

          <Col sm='12'>
            <div className='entry-num'>
              <p>Showing {resultsDataCount()} of {resultsData.length} entries</p>
              <div className='arrows'>
                <a>Previous</a>
                <a>Next</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default KnowResult