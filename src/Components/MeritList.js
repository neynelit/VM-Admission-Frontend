import React, { useEffect, useState } from 'react'
import './MeritList.css'
import { Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

function MeritList() {
  const [ meritEntriesNum, setMeritEntriesNum ] = useState(10)

  const [ meritData, setMeritData ] = useState([
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'},
    {application_no: 'APLCTN001', name: 'Hesham Reza', father_name: 'Humayun Reza', category: 'OBC A', gender: 'Male', course: 'Information Technology', year: '2022', status: 'Passed'}
  ])

  console.log(meritData)

  const meritEntriesNumCount = () => {
    if(meritEntriesNum <= meritData.length) return meritEntriesNum
    else return meritData.length
  }

  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ page, setPage ] = useState(0)

  const fetchData = () => {
    setIsLoading(true)
    setError(null)

    axios
      .get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?order_by=name&limit=100&offset=${page}`)
      .then(({ data }) => {
        setMeritData(prevItems => [ ...prevItems, ...data.results ])
        setPage(prevPage => prevPage+100)
      })
      .catch(err => setError(err))
      .finally(setIsLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleScroll = () => {
    if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading){
      return
    }
    fetchData()
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading])

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm='12' className='intake-head'>
            <div className='intake-head-div'>
              <h6>Merit List</h6>
            </div>
          </Col>

          <Col sm='12' className='merit-head'>
            <div className='select-list'>
              <label for='courses'>Select Courses</label>
              <select id='select' name='courses'>
                <option value='Please select course' disabled selected hidden>Please Select Course</option>
                <option value=''></option>
              </select>
            </div>
            
            <div className='select-list'>
              <label for='courses'>Select Year/Semester</label>
              <select id='select' name='year'>
                <option value='Please Select Year/Semester' disabled selected hidden>Please Select Year/Semester</option>
                <option value=''></option>
              </select>
            </div>
            
            <div className='select-list'>
              <label for='courses'>Select Gender</label>
              <select id='select' name='gender'>
                <option value='Please Select Gender' disabled selected hidden>Please Select Gender</option>
                <option value=''></option>
              </select>
            </div>
            
            <div className='select-list'>
              <label for='courses'>Select Category</label>
              <select id='select' name='category'>
                <option value='Please Select Category' disabled selected hidden>Please Select Category</option>
                <option value=''></option>
              </select>
            </div>

              <div className='searching'>
                <button>Search</button>
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
                      <th scope='col'>Father Name</th>
                      <th scope='col'>Category</th>
                      <th scope='col'>Gender</th>
                      <th scope='col'>Course</th>
                      <th scope='col'>Year</th>
                      <th scope='col'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meritData && meritData.map((item, index) => {
                      <tr key={index}>
                        <th scope='row'>{index}</th>
                        <td>{item.application_no}</td>
                        <td>{item.name}</td>
                        <td>{item.father_name}</td>
                        <td>{item.category}</td>
                        <td>{item.gender}</td>
                        <td>{item.course}</td>
                        <td>{item.year}</td>
                        <td>{item.status}</td>
                      </tr>
                    })}
                  </tbody>
                </table>
            </div>
          </Col>

          <Col sm='12'>
            <div className='entry-num'>
              <p>Showing {meritEntriesNumCount()} of {meritData.length} entries</p>
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

export default MeritList