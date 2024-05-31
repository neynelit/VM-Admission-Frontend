import React, { useEffect, useState } from 'react'
import './Navebar.css'
import { Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap'
import { Outlet, useNavigate } from 'react-router'
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBIcon,  MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBCollapse, MDBRipple, MDBBadge, MDBInput, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import Footer from './Footer';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Login from './Components/Login'
import SidebarMenu from 'react-bootstrap-sidebar-menu';
import axios from 'axios';
import Cookies from 'universal-cookie'


const cookies = new Cookies()

function Navebar() {
    const navigate = useNavigate()
    const pathname = window.location.href
    console.log('Created by Hesham Reza');

    const [ homeNav, setHomeNav ] = useState('nav-item-active')
    const [ capatcityNav, setCapacityNav ] = useState('')
    const [ meritNav, setMeritNav ] = useState('')
    const [ resultNav, setResultNav ] = useState('')
    const [ paymentNav, setPaymentNav ] = useState('') 

    useEffect(() => {
        if(pathname == `${process.env.REACT_APP_FRONTEND_URL}/`){
            setHomeNav('nav-item-active')
            setCapacityNav('')
            setMeritNav('')
            setResultNav('')
            setPaymentNav('')
        }
        else if(pathname == `${process.env.REACT_APP_FRONTEND_URL}/intake-capacity`){
            setHomeNav('')
            setCapacityNav('nav-item-active')
            setMeritNav('')
            setResultNav('')
            setPaymentNav('')
        }

        else if(pathname == `${process.env.REACT_APP_FRONTEND_URL}/merit-list`){
            setHomeNav('')
            setCapacityNav('')
            setCapacityNav('')
            setMeritNav('nav-item-active')
            setResultNav('')
            setPaymentNav('')
        }

        else if(pathname == `${process.env.REACT_APP_FRONTEND_URL}/know-your-result`){
            setHomeNav('')
            setCapacityNav('')
            setMeritNav('')
            setResultNav('nav-item-active')
            setPaymentNav('')
        }

        else if(pathname == `${process.env.REACT_APP_FRONTEND_URL}/view-payment-status`){
            setHomeNav('')
            setCapacityNav('')
            setMeritNav('')
            setResultNav('')
            setPaymentNav('nav-item-active')
        }
    }, [pathname])

    const [ including, setIncluding ] = useState(false)
    const [ including2, setIncluding2 ] = useState(false)

    useEffect(() => {
        if(pathname?.includes('/institute/')) setIncluding(true)
        //else if(pathname?.includes('/pay-receipt')) setIncluding(true)
        else setIncluding(false)
    }, [pathname])

    useEffect(() => {
        if(pathname?.includes('/pay-receipt') || pathname?.includes('/response') || pathname?.includes('/payment-slip/') || pathname?.includes('/application-filled-from/')) setIncluding2(true)
        else setIncluding2(false)
    }, [pathname])

    const [ showShow, setShowShow ] = useState(false)

    const toggleShow = () => setShowShow(!showShow)

    const [ topNav, setTopNav ] = useState('block')
    const [ botNav, setBotNav ] = useState('none')
    const [ footNav, setFootNav ] = useState('block')
    const [ receiptBox, setReceiptBox ] = useState('none')
    console.log(including2, footNav);
    // useEffect(() => {
    //     if(including){
    //         setTopNav('none')
    //         setBotNav('block')
    //     }
    //     else if(!including){
    //         setTopNav('block')
    //         setBotNav('none')
    //     }
    // }, [including])
    
    useEffect(() => {
        if(including2){
            setTopNav('none')
            setBotNav('none')
            setFootNav('none')
            setReceiptBox('block')
        }
        else if(!including2){
            if(including){
                setTopNav('none')
                setBotNav('block')
            }
            else if(!including){
                setTopNav('block')
                setBotNav('none')
            }
            
            setFootNav('block')
            setReceiptBox('none')
        }
    }, [including, including2])

    const [ passwordType, setPasswordType ] = useState('password')
    const [ eye, setEye ] = useState('fa-eye')
    
    const viewPassword = () => {
        if(eye == 'fa-eye'){
            setEye('fa-eye-slash');
            setPasswordType('text');
        }
        else if(eye == 'fa-eye-slash'){
            setEye('fa-eye');
            setPasswordType('password');
        }
    }

    const [ matches, setMatches ] = useState(window.matchMedia('(max-width: 425px)').matches)

    const popupStyle = () => {
        if(matches == true) return {'width': '100%'}
        else if(matches == false) return {'width': '500px'}
    }

    useEffect(() => {
        window
            .matchMedia('(max-width: 425px)')
            .addEventListener('change', e => setMatches( e.matches ))
    })

    const [ collapsing, setCollapsing ] = useState('block')
    const [ collapsing1, setCollapsing1 ] = useState('block')
    const [ collapsing2, setCollapsing2 ] = useState('none')
    const [ matches2, setMatches2 ] = useState(window.matchMedia('(max-width: 768px)').matches)
    const [ xsAmount1, setXsAmount1 ] = useState(3)
    const [ xsAmount2, setXsAmount2 ] = useState(9)

    const toggleCollapse = () => {
        if(collapsing == 'block'){
            setCollapsing('none')
            setXsAmount1(1)
            setXsAmount2(11)
        }
        else if(collapsing == 'none'){
            setCollapsing('block')
            setXsAmount1(2)
            setXsAmount2(10)
        }
    }

    useEffect(() => {
        window
            .matchMedia('(max-width: 768px)')
            .addEventListener('change', e => setMatches2( e.matches ))
    })

    useEffect(() => {
        if(matches2 == true && matches == false){
            setCollapsing('none')
            setXsAmount1(1)
            setXsAmount2(11)
            setCollapsing1('block')
            setCollapsing2('none')
        }
        else if(matches2 == false && matches == false){
            setCollapsing('block')
            setXsAmount1(2)
            setXsAmount2(10)
            setCollapsing1('block')
            setCollapsing2('none')
        }
        else if(matches == true && matches2 == true){
            setCollapsing1('none')
            setCollapsing2('block')
            setXsAmount1(12)
            setXsAmount2(12)
        }
        else if(matches == false && matches2 == true){
            setCollapsing1('block')
            setCollapsing2('none')
            setXsAmount1(1)
            setXsAmount2(11)
        }
    }, [matches, matches2])
    
    const [ show, setShow ] = useState(false)

    const [ loginData, setLoginData ] = useState({
        username: '',
        password: ''
    })

    console.log(loginData)

    const updateLoginData = e => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const [ valid, setValid ] = useState(false)
    console.log(valid);

    useEffect(() => {
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/admin/search`, { username: loginData.username })
            .then(({ data }) => {
                if(data == null || data == undefined || data == []){
                    setValid(false)
                }
                else{
                    axios
                        .post(`${process.env.REACT_APP_BACKEND_URL}/admin/login`, loginData)
                        .then(({ data }) => {
                            if(data == 'Invalid') setValid(false)
                            else if(data == 'Valid') setValid(true)
                        })
                }
            })
            .catch(err => console.log(err))
    }, [loginData])

  return (
    <> 
        <Container fluid style={{display: topNav}}>
            <Row>
                <Col className='p-0'>
                    <Navbar expand='lg' className='bg-body-tertiary top-navigasion'>
                        <Container fluid>
                            <Navbar.Toggle aria-controls='basic-navbar-nav' />

                            <Navbar.Collapse className=' justify-content-end'>
                                <Nav className='me-auto'>
                                    <Nav.Item className='high-nav-item'>
                                        <Nav.Link>Home</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className='high-nav-item'>
                                        <Nav.Link>Terms & Condition</Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item className='high-nav-item'>
                                        <Nav.Link>Privacy Policy</Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item className='high-nav-item'>
                                        <Nav.Link>Refund Policy</Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item className='high-nav-item'>
                                        <Nav.Link>About Us</Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item className='high-nav-item'>
                                        <Nav.Link>Contact Us</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                    <Navbar expand='lg' className='bg-body-tertiary mid-navigasion'>
                        <Container fluid className='container-brand'>
                            <Navbar.Brand>
                                <img src='../vm_logo.png' alt='VM College Logo' />
                                <div className='logo-nav'>
                                    <h4>VM College</h4>
                                    <p>Affiliated Unit of Patliputra University</p>
                                    <p>NAAC Accredited: Grade ‘B’ (1st Cycle)</p>
                                </div>
                            </Navbar.Brand>

                            <Navbar.Brand>
                                <div className='logo-nav'>
                                    <p><i class="fa-solid fa-location-dot"></i> 4G3Q+WPW, Pavapuri, Bihar 803115</p>
                                    <p><i class="fa-solid fa-phone"></i> +91-9631265702</p>
                                    <p><i class="fa-solid fa-envelope"></i> <a href="mailto:someone@example.com">complaint@vmcollege.in</a></p>
                                </div>
                            </Navbar.Brand>
                        </Container>
                    </Navbar>

                    <Navbar expand='lg' className='bg-body-tertiary navigasion'>
                        <Container>
                            
                            <Navbar.Toggle aria-controls='basic-navbar-nav' />

                            <Navbar.Collapse collapseOnSelect className='justify-content-between'>
                                <Nav className='me-auto'>
                                    <Nav.Item>
                                        <Nav.Link className={homeNav} onClick={() => navigate('/')}>Home</Nav.Link>
                                    </Nav.Item>
                                    
                                    <Nav.Item>
                                        <Nav.Link className={capatcityNav} onClick={() => navigate('/intake-capacity')}>Intake Capacity</Nav.Link>
                                    </Nav.Item>
                                    
                                    <Nav.Item>
                                        <Nav.Link className={meritNav} onClick={() => navigate('/merit-list')}>Merit List</Nav.Link>
                                    </Nav.Item>
                                    
                                    <Nav.Item>
                                        <Nav.Link className={resultNav} onClick={() => navigate('/know-your-result')}>Know Your Result</Nav.Link>
                                    </Nav.Item>
                                    
                                    <Nav.Item>
                                        <Nav.Link className={paymentNav} onClick={() => navigate('/view-payment-status')}>View Payment Status</Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <Nav className='me-auto justify-content-end'>
                                    <Nav.Item>
                                        {/* <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link> */}

                                        <Popup trigger={<button className='log-btn'>Institute Log In</button>} modal nested contentStyle={popupStyle()}>
                                            {
                                                close => (
                                                    <>
                                                        <Container className='log-container'>
                                                            <Row className='log-row'>
                                                                <Col sm='12' className='d-flex justify-content-end'>
                                                                    <button className='close-btn' onClick={() => close()}><i class="fa-solid fa-xmark"></i></button>
                                                                </Col>

                                                                <Col sm='12' className='login-box institute'>
                                                                    <h4>Institute Login</h4>

                                                                    <form>
                                                                        <div className='form-group'>
                                                                            <input type='text' className='form-control my-3 input-text' autoFocus required name='username' placeholder='Enter Your Username' onChange={updateLoginData} />
                                                                            <i class="fa-solid fa-user icon-align"></i>
                                                                        </div>
                                                                        
                                                                        <div className='form-group'>
                                                                            <input type={passwordType} className='form-control my-3 input-text' autoFocus required name='password' placeholder='Enter Your Password' onChange={updateLoginData} />
                                                                            <i class="fa-solid fa-key icon-align"></i>
                                                                            <i class={`fa-solid ${eye} view-pass`} onClick={() => viewPassword()}></i>
                                                                        </div>

                                                                        <div className='buttons-1'>
                                                                            <button className='btn btn-log' onClick={e => {
                                                                                e.preventDefault()
                                                                                if(valid == false) alert('Username Invalid!')
                                                                                else if(valid == true){
                                                                                    cookies.set('username', loginData.username, { path: '/', maxAge: 3600*24*2 })
                                                                                    cookies.set('password', loginData.password, { path: '/', maxAge: 3600*24*2 })
                                                                                    navigate('/institute/dashboard')
                                                                                    close()
                                                                                }
                                                                            }}>Log In</button>
                                                                        </div>
                                                                    </form>

                                                                    <a><p>Forgot Password?</p></a>
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </>
                                                )
                                            }
                                        </Popup>
                                    </Nav.Item>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                    {/* <Navbar expand='lg' className='bg-body-tertiary mid-navigasion' style={{display: botNav}}>
                        <Container fluid className='container-brand'>
                            <Navbar.Brand>
                                <img src='../vm_logo.png' alt='VM College Logo' />
                            </Navbar.Brand>
                        </Container>
                    </Navbar>

                    <Navbar expand='lg' className='bg-body-tertiary' style={{display: botNav}}></Navbar> */}
                </Col>
            </Row>

            <Outlet />
        </Container>

        <Container fluid style={{ display: footNav, padding: 0 }}>
            <Footer />
        </Container>

        <Container fluid style={{ display: receiptBox }}>
            <Outlet />
        </Container>

        <Container fluid style={{display: botNav}}>
            <Row>
                <Col sm='12' className='sidebarTopMenu'>
                    <Navbar expand='lg' className='bg-body-tertiary'>
                        <Container>
                            <Navbar.Brand onClick={() => navigate('/')}>
                                <h4>VM Admission</h4>
                            </Navbar.Brand>

                            <Nav className='me-auto instiNav' id='responsive-navbar-nav'>
                                <NavDropdown title={<a><i class="fa-solid fa-user"></i></a>} id='collapsible-nav-dropdown' className='instiNavDrop' onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} show={show} alignRight menuVariant="dark">
                                        <NavDropdown.Item className='dropdownAcc'>Settings</NavDropdown.Item>
                                        <NavDropdown.Item className='dropdownAcc' onClick={e => {e.preventDefault(); cookies.remove('username', { path: '/' }); cookies.remove('password', { path: '/' }); navigate('/')}}>Log Out</NavDropdown.Item>
                                    </NavDropdown>
                                {/* <Nav.Item>
                                    <a><i class="fa-solid fa-user"></i></a>
                                </Nav.Item> */}
                            </Nav>
                        </Container>
                    </Navbar>
                </Col>
                <Col xs={xsAmount1} style={{display: collapsing1}} onMouseOver={() => { setCollapsing('block'); setXsAmount1(2); setXsAmount2(10) }} onMouseLeave={() => { setCollapsing('none'); setXsAmount1(1); setXsAmount2(11) }} className='sidebarMenu'>
                    <SidebarMenu>
                        <SidebarMenu.Body>
                            <SidebarMenu.Nav>
                                <SidebarMenu.Nav.Link onClick={() => navigate('/institute/dashboard')}>
                                    <SidebarMenu.Nav.Icon>
                                        <a><i class="fa-solid fa-gauge"></i></a>
                                    </SidebarMenu.Nav.Icon>
                                    <SidebarMenu.Nav.Title className='collapsing-text-main' style={{display: collapsing}}> Dashboard </SidebarMenu.Nav.Title>
                                </SidebarMenu.Nav.Link>
                            </SidebarMenu.Nav>

                            <SidebarMenu.Sub>
                                <SidebarMenu.Sub.Toggle>
                                    <SidebarMenu.Nav.Title>
                                        <a><i class="fa-solid fa-building-columns"></i></a>
                                        <a className='main-menu' style={{display: collapsing}}>Admission</a>
                                    </SidebarMenu.Nav.Title>
                                </SidebarMenu.Sub.Toggle>

                                <SidebarMenu.Sub.Collapse>
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/admitted-student')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-user-check collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Admitted Student </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                        
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/non-admitted-student')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-user-xmark collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Non Admitted Student </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                </SidebarMenu.Sub.Collapse>
                            </SidebarMenu.Sub>

                            <SidebarMenu.Sub>
                                <SidebarMenu.Sub.Toggle>
                                    <SidebarMenu.Nav.Title>
                                        <a><i class="fa-solid fa-book"></i></a>
                                        <a className='main-menu' style={{display: collapsing}}>Examination</a>
                                    </SidebarMenu.Nav.Title>
                                </SidebarMenu.Sub.Toggle>

                                <SidebarMenu.Sub.Collapse>
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/paid-student')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-user-plus collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Paid Student </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                        
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/non-paid-student')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-user-minus collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Non Paid Student </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                </SidebarMenu.Sub.Collapse>
                            </SidebarMenu.Sub>

                            <SidebarMenu.Sub>
                                <SidebarMenu.Sub.Toggle>
                                    <SidebarMenu.Nav.Title>
                                        <a><i class="fa-solid fa-chart-simple"></i></a>
                                        <a className='main-menu' style={{display: collapsing}}>Report</a>
                                    </SidebarMenu.Nav.Title>
                                </SidebarMenu.Sub.Toggle>

                                <SidebarMenu.Sub.Collapse>
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/admission-fees')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-user-xmark collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Admission Fees </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                        
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/examination-fees')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-chart-pie collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Examination Fees </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                </SidebarMenu.Sub.Collapse>
                            </SidebarMenu.Sub>

                            <SidebarMenu.Sub>
                                <SidebarMenu.Sub.Toggle>
                                    <SidebarMenu.Nav.Title>
                                        <a><i class="fa-solid fa-user"></i></a>
                                        <a className='main-menu' style={{display: collapsing}}>Institution</a>
                                    </SidebarMenu.Nav.Title>
                                </SidebarMenu.Sub.Toggle>

                                <SidebarMenu.Sub.Collapse>
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/manage-student')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-graduation-cap collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Manage Student </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                    
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/add-manager')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-user collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Add Manager </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                    
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/notice')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-file collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Notice </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                    
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/fees-management')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-money-bill-wave collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Fees Management </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                    
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/open-and-close')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-xmark collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Open & Close </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                    
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/question-paper')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-circle-question collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Question Paper </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                    
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/schedule')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-clock collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Schedule </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                    
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/intake')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-person-through-window collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Intake </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                </SidebarMenu.Sub.Collapse>
                            </SidebarMenu.Sub>

                            <SidebarMenu.Sub>
                                <SidebarMenu.Sub.Toggle>
                                    <SidebarMenu.Nav.Title>
                                        <a><i class="fa-solid fa-comment-sms"></i></a>
                                        <a className='main-menu' style={{display: collapsing}}>Bulk SMS</a>
                                    </SidebarMenu.Nav.Title>
                                </SidebarMenu.Sub.Toggle>

                                <SidebarMenu.Sub.Collapse>
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/sms-dashboard')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-gauge"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Dashboard </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                    
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/sms-setting')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-gear collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Settings </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                    
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/sms')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-comment-sms collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> SMS </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                    
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/sms-report')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-chart-simple collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Report </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                </SidebarMenu.Sub.Collapse>
                            </SidebarMenu.Sub>

                            <SidebarMenu.Sub>
                                <SidebarMenu.Sub.Toggle>
                                    <SidebarMenu.Nav.Title>
                                        <a><i class="fa-solid fa-envelope"></i></a>
                                        <a className='main-menu' style={{display: collapsing}}>Email SMS</a>
                                    </SidebarMenu.Nav.Title>
                                </SidebarMenu.Sub.Toggle>

                                <SidebarMenu.Sub.Collapse>
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/email-sms-setting')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-gear collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Settings </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                    
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/email-sms')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-comment-sms collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> SMS </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                    
                                    <SidebarMenu.Nav>
                                        <SidebarMenu.Nav.Link onClick={() => navigate('/institute/email-sms-report')}>
                                            <SidebarMenu.Nav.Icon>
                                                <a><i class="fa-solid fa-chart-simple collapsing-text-icon"></i></a>
                                            </SidebarMenu.Nav.Icon>
                                            <SidebarMenu.Nav.Title className='collapsing-text' style={{display: collapsing}}> Report </SidebarMenu.Nav.Title>
                                        </SidebarMenu.Nav.Link>
                                    </SidebarMenu.Nav>
                                </SidebarMenu.Sub.Collapse>
                            </SidebarMenu.Sub>
                        </SidebarMenu.Body>
                    </SidebarMenu>
                </Col>

                <Col xs={xsAmount1} style={{display: collapsing2}}>
                    <Navbar expand='lg' className='bg-body-tertiary'>
                        <Container>
                            <Navbar.Toggle aria-controls='basic-navbar-nav' />

                            <Navbar.Collapse collapseOnSelect className='justify-content-between'>
                                <Nav className='me-auto lastNav'>
                                    <Nav.Item>
                                        <Nav.Link onClick={() => navigate('/institute/dashboard')}>
                                            <a>Dashboard</a>
                                        </Nav.Link>
                                    </Nav.Item>
                                    
                                    <NavDropdown title='Admission' id='collapsible-nav-dropdown' className='institute-dropdown'>
                                        <NavDropdown.Item onClick={() => navigate('/institute/admitted-student')}>Admitted Student</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate('/institute/non-admitted-student')}>Non Admitted Student</NavDropdown.Item>
                                    </NavDropdown>
                                    
                                    <NavDropdown title='Examination' id='collapsible-nav-dropdown' className='institute-dropdown'>
                                        <NavDropdown.Item onClick={() => navigate('/institute/paid-student')}>Paid Student</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate('/institute/non-paid-student')}>Non Paid Student</NavDropdown.Item>
                                    </NavDropdown>
                                    
                                    <NavDropdown title='Report' id='collapsible-nav-dropdown' className='institute-dropdown'>
                                        <NavDropdown.Item onClick={() => navigate('/institute/admission-fees')}>Admission Fees</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate('/institute/examination-fees')}>Examination Fees</NavDropdown.Item>
                                    </NavDropdown>
                                    
                                    <NavDropdown title='Institution' id='collapsible-nav-dropdown' className='institute-dropdown'>
                                        <NavDropdown.Item onClick={() => navigate('/institute/manage-student')}>Manage Student</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate('/institute/add-manager')}>Add Manager</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate('/institute/notice')}>Notice</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate('/institute/fees-management')}>Fees Management</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate('/institute/open-and-close')}>Open & Close</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate('/institute/question-paper')}>Question Paper</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate('/institute/schedule')}>Schedule</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate('/institute/intake')}>Intake</NavDropdown.Item>
                                    </NavDropdown>
                                    
                                    <NavDropdown title='Bulk SMS' id='collapsible-nav-dropdown' className='institute-dropdown'>
                                        <NavDropdown.Item onClick={() => navigate('/institute/sms-dashboard')}>Dashboard</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate('/institute/sms-setting')}>Settings</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate('/institute/sms')}>SMS</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate('/institute/sms-report')}>Report</NavDropdown.Item>
                                    </NavDropdown>
                                    
                                    <NavDropdown title='Email SMS' id='collapsible-nav-dropdown' className='institute-dropdown'>
                                        <NavDropdown.Item onClick={() => navigate('/institute/email-sms-setting')}>Settings</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate('/institute/email-sms')}>SMS</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate('/institute/email-sms-report')}>Report</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Col>

                <Col xs={xsAmount2} className='p-0'>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default Navebar