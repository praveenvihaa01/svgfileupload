import React, { useState } from 'react'
// import logo from '../../logo/logo-web.png'
import { Navbar, Container, NavDropdown } from 'react-bootstrap';
import { BsArrowRightSquareFill } from 'react-icons/bs';
import SideBar from './SideBar';
import {useNavigate } from 'react-router-dom'


const NvaBar = () => {

    const navigate = useNavigate()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logOutUser = () => {
        localStorage.removeItem('token-Svg')
        navigate('/user-login')
    }

    return (
        <>
            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', backgroundImage: 'linear-gradient(to right, #92b316,#275b8b,#794ab2)', position: 'absolute', height: '10vh', color: 'white' }}>
                    <Navbar expand="lg">
                        <Container>
                            <Navbar.Brand ><BsArrowRightSquareFill style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={handleShow} /></Navbar.Brand>
                            <NavDropdown title={<span style={{color:'white'}}>Profile</span>
                            } id="basic-nav-dropdown" >
                                <NavDropdown.Item href="#action/3.1">Change Password</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Container>
                    </Navbar>
                </div>
                <div style={{ width: '10rem', height: '15vh', position: 'relative', background: 'white', boxShadow: '0px 0px 5px #888888', textAlign: 'center', borderBottomRightRadius: '25px', borderBottomLeftRadius: '25px' }}>
                    <img src={logo} alt='logo' style={{ height: '-webkit-fill-available' }} />
                </div>
            </div> */}

            <Navbar style={{backgroundImage: 'linear-gradient(to right, #92b316,#275b8b,#794ab2)'}} expand="lg">
                <Container fluid>
                    <Navbar.Brand><BsArrowRightSquareFill style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={handleShow} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className='justify-content-end'>
                        <NavDropdown title="Profile" id="navbarScrollingDropdown" style={{marginRight:'5rem'}}>
                            <NavDropdown.Item href="#action3">Change Password</NavDropdown.Item>
                            <NavDropdown.Item onClick={(e) => logOutUser(e)}>LogOut</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <SideBar show={show} handleClose={handleClose} />
        </>
    )
}

export default NvaBar