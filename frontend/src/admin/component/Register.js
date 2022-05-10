import React, { useEffect, useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const RegisterAd = () => {

    const navigate = useNavigate()
    const [roles, setRoles] = useState([])
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        isActive: '',
        isDelete: '',
        createdBy: ''
    })
    console.log(userData.createdBy);
    useEffect(() => {
        getRole()
    }, [])

    const getRole = () => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:3001/showRole", requestOptions)
            .then(response => response.json())
            .then(result => {
                setRoles(result)
            })
            .catch(error => console.log('error', error));
    }

    const handlShow = (e) => {
        const { name, value } = e.target

        setUserData({ ...userData, [name]: value })
    }

    const validate = () => {

        const { createdBy, email, password } = userData


        if (/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]{2,}$/.test(email) && email.includes('.')) {
            if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)) {
                if (createdBy) {
                    return true
                } else {
                    toast('🦄 Invalid State ', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return false;
                }
            } else {
                toast('🦄   Invalid Password', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return false;
            }
        } else {
            toast('🦄 Invalid Email ', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return false;
        }
    }

    const routesPage = () => {
        navigate('/admin-login')
    }

    const registerUser = (e) => {
        e.preventDefault()
        const { email, password, isActive, isDelete, createdBy } = userData

        if (validate()) {

            roles.forEach((el) => {
                if (createdBy === el.rolename) {
                    var myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify({
                        "email": email,
                        "password": password,
                        "isActive": isActive,
                        "isDelete": isDelete,
                        "createdBy": el.rolename,
                        "createdDate": new Date(),
                        "upDatedBy": "",
                        "updatedDate": "",
                        "roleId": el.roleId
                    });

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch("http://127.0.0.1:3001/signUp", requestOptions)
                        .then(response => response.json())
                        .then(result => {
                            if (result.mess === 'Successfully') {
                                toast('🦄 Successfully ', {
                                    position: "top-right",
                                    autoClose: 1000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                                setUserData({
                                    email: '',
                                    password: '',
                                    isActive: '',
                                    isDelete: '',
                                    createdBy: ''
                                })
                                setTimeout(routesPage, 1500)
                            } else if(result.mess === 'Already Use Email'){
                                toast.error('🦄 Already Use Email ', {
                                    position: "top-right",
                                    autoClose: 1000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            }
                        })
                        .catch(error => console.log('error', error));
                }
            })
        }

    }

    return (
        <>
            <StyledDiv>
                <Card style={{ width: '28rem' }}>
                    <Card.Body>
                        <Card.Title>Register Admin</Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name='email' value={userData.email} onChange={handlShow} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name='password' value={userData.password} onChange={handlShow} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGridState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Select defaultValue="Choose..." name='createdBy' value={userData.createdBy} onChange={handlShow}>
                                    <option>Open this select menu</option>
                                        {
                                            roles.map((val, index) => (
                                                val.rolename !== 'user' ? <option style={{ color: 'black' }}> {val.rolename} </option>
                                                    : <p> Not </p>
                                            )
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={(e) => registerUser(e)} >
                                    Register
                                </Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </StyledDiv>
            <ToastContainer />
        </>
    )
}

export default RegisterAd

const StyledDiv = styled.div`
    display: flex;
    justify-content:center;
    margin-top: 10rem;

`