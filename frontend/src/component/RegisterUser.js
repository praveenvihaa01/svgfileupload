import React, { useEffect, useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

const RegisterUser = ({baseUrl}) => {
    
    const navigate = useNavigate()
    const [roles, setRoles] = useState([])
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        isActive: '',
        isDelete: '',
    })

    useEffect(() => {
        if (localStorage.getItem('token-Svg')) {
            navigate('/admin-dashboard')
        } else {

            getRole()
        }
    })

    const getRole = () => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch(baseUrl+"showRole", requestOptions)
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

        const { email, password } = userData


        if (/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]{2,}$/.test(email) && email.includes('.')) {
            if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)) {
                return true
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

    const registerUser = (e) => {
        e.preventDefault()
        const { email, password, isActive, isDelete } = userData

        if (validate()) {

            roles.forEach((el) => {
                if ('user' === el.rolename) {
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
                                alert('Successfully')
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
                        <Card.Title>Register User</Card.Title>
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

export default RegisterUser

const StyledDiv = styled.div`
    display: flex;
    justify-content:center;
    margin-top: 10rem;

`