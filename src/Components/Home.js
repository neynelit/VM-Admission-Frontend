import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './Home.css'
import { useNavigate } from 'react-router'
import axios from 'axios'

function Home() {
  const navigate = useNavigate()

  const [ openClose, setOpenClose ] = useState([])
  //console.log(openClose)
  
  useEffect(() => {
    axios
      .get('http://localhost:8080/openclose')
      .then(res => setOpenClose((res.data)))
      .catch(err => console.log(err))
  }, [1000])

  const monthList = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return (
    <Container fluid>
      <Row>
        <Col className='announce'>
          <div className='announce-bar'>
            <h5>Announcements</h5>
            <i class="fa-solid fa-bullhorn"></i>
          </div>
          <marquee>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</marquee>
        </Col>
      </Row>

      <Container fluid className='container-main'>
        <Row className='text-center'>
          <Col sm='9'>
            <Row className='justify-content-center'>
              <Col sm='12' className='equal-height-column admission-box-column'>
                <Row className='admission-box' onClick={() => navigate('/login')}>
                  <i class="fa-solid fa-graduation-cap"></i>
                  <h6>Online Admission 2024 For UG</h6>
                  {/* <p><a>Online Admission 2023-27 for UG-2nd Semester</a></p> */}
                </Row>

                <Row className='admission-box-content justify-content-center'>
                  <h6>Admission Schedule For Under Graduate</h6>

                  <div className='table-responsive'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'>Title</th>
                          <th scope='col'>Date/ Timelines</th>
                        </tr>
                      </thead>

                      <tbody>
                        {
                          openClose && openClose.map((item, index) => {
                            if(item.status == true){
                              return(
                                <tr key={index}>
                                  <td>{item.semester}</td>
                                  <td>{new Date(item.date).getDate()} {monthList[new Date(item.date).getMonth()]}, {new Date(item.date).getFullYear()}</td>
                                </tr>
                              )
                            }
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </Row>
              </Col>
              
              {/* <Col sm='6' className='equal-height-column admission-box-column'>
                <Row className='admission-box' onClick={() => navigate('/login')}>
                  <i class="fa-solid fa-graduation-cap"></i>
                  <h6>Online Admission 2024 For Inter-</h6>
                  <p><a>Oops! Admission Closed.</a></p>
                </Row>

                <Row className='admission-box-content justify-content-center'>
                  <h6>Admission Schedule For </h6>

                  <div className='table-responsive'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'>Sr No</th>
                          <th scope='col'>Title</th>
                          <th scope='col'>Date/ Timelines</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <th scope='row'>1</th>
                          <td>Hesham Reza</td>
                          <td>03-05-2024</td>
                        </tr>
                        
                        <tr>
                          <th scope='row'>1</th>
                          <td>Hesham Reza</td>
                          <td>03-05-2024</td>
                        </tr>
                        
                        <tr>
                          <th scope='row'>1</th>
                          <td>Hesham Reza</td>
                          <td>03-05-2024</td>
                        </tr>
                        
                        <tr>
                          <th scope='row'>1</th>
                          <td>Hesham Reza</td>
                          <td>03-05-2024</td>
                        </tr>
                        
                        <tr>
                          <th scope='row'>1</th>
                          <td>Hesham Reza</td>
                          <td>03-05-2024</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Row>
              </Col> */}
            </Row>
          </Col>
          
          <Col sm='3'>
            <div className='notice-box'>
              <h6>Notice</h6>
              
              <div className='notice-points'>
                <div className='notices'>
                  <i class="fa-solid fa-angles-right"></i>
                  <p>Result Sheet of UG Semester-III (Hons. & General) Examination 2023</p>
                </div>
                
                <div className='notices'>
                  <i class="fa-solid fa-angles-right"></i>
                  <p>Result Sheet of UG Semester-III (Hons. & General) Examination 2023</p>
                </div>
                
                <div className='notices'>
                  <i class="fa-solid fa-angles-right"></i>
                  <p>Result Sheet of UG Semester-III (Hons. & General) Examination 2023</p>
                </div>
                
                <div className='notices'>
                  <i class="fa-solid fa-angles-right"></i>
                  <p>Result Sheet of UG Semester-III (Hons. & General) Examination 2023</p>
                </div>
                
                <div className='notices'>
                  <i class="fa-solid fa-angles-right"></i>
                  <p>Result Sheet of UG Semester-III (Hons. & General) Examination 2023</p>
                </div>
                
                <div className='notices'>
                  <i class="fa-solid fa-angles-right"></i>
                  <p>Result Sheet of UG Semester-III (Hons. & General) Examination 2023</p>
                </div>
                
                <div className='notices'>
                  <i class="fa-solid fa-angles-right"></i>
                  <p>Result Sheet of UG Semester-III (Hons. & General) Examination 2023</p>
                </div>
                
                <div className='notices'>
                  <i class="fa-solid fa-angles-right"></i>
                  <p>Result Sheet of UG Semester-III (Hons. & General) Examination 2023</p>
                </div>
                
                <div className='notices'>
                  <i class="fa-solid fa-angles-right"></i>
                  <p>Result Sheet of UG Semester-III (Hons. & General) Examination 2023</p>
                </div>
                
                <div className='notices'>
                  <i class="fa-solid fa-angles-right"></i>
                  <p>Result Sheet of UG Semester-III (Hons. & General) Examination 2023</p>
                </div>
                
                <div className='notices'>
                  <i class="fa-solid fa-angles-right"></i>
                  <p>Result Sheet of UG Semester-III (Hons. & General) Examination 2023</p>
                </div>
                
                <div className='notices'>
                  <i class="fa-solid fa-angles-right"></i>
                  <p>Result Sheet of UG Semester-III (Hons. & General) Examination 2023</p>
                </div>
                
                <div className='notices'>
                  <i class="fa-solid fa-angles-right"></i>
                  <p>Result Sheet of UG Semester-III (Hons. & General) Examination 2023</p>
                </div>
                
                <div className='notices'>
                  <i class="fa-solid fa-angles-right"></i>
                  <p>Result Sheet of UG Semester-III (Hons. & General) Examination 2023</p>
                </div>
                
                <div className='notices'>
                  <i class="fa-solid fa-angles-right"></i>
                  <p>Result Sheet of UG Semester-III (Hons. & General) Examination 2023</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className='justify-content-center'>
          <Col sm='9'>
            <Row>
              <Col sm='12' className='admission-info equal-height-column'>
                <div className='admission-info-details'>
                  <h6>Admission Info</h6>

                  <ul>
                    <li><a>User Manual</a></li>
                    <li><a>Guidelines for Applicants</a></li>
                    <li><a>FAQ</a></li>
                    <li><a>Last Date Extended Notification</a></li>
                  </ul>
                </div>
              </Col>
              
              {/* <Col sm='6' className='admission-info equal-height-column'>
                <div className='admission-info-details'>
                  <h6>Admission Info</h6>

                  <ul>
                    <li><a>User Manual</a></li>
                    <li><a>Guidelines for Applicants</a></li>
                    <li><a>FAQ</a></li>
                    <li><a>Last Date Extended Notification</a></li>
                  </ul>
                </div>
              </Col> */}
            </Row>
          </Col>

          <Col sm='3'>
            <div className='notice-box instruction-box'>
              <h6>Instruction</h6>
              <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Nx4bvwU0DqE" title="How to Start Leetcode in 2024 (as a beginner)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Home