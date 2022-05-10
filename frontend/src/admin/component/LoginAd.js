import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import styled from 'styled-components'
import {useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const LoginAd = () => {

    const navigation = useNavigate()
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')

    const routesPage = (roleId) => {
        if(roleId === 1){
            navigation('/')
        } else if(roleId === 2){
            navigation('/admin-dashboard')
        } else if(roleId === 3){
            navigation('/admin-dashboard')
        }
    }

    const userLogin = (e) => {
        e.preventDefault()

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            userEmail,
            userPassword
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/user/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    toast.success('🦄 Successfully Login', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    // localStorage.setItem('token-Svg', new Date().getTime())  
                    setTimeout(routesPage(result.data[0].roleId), 1500)
                } else {
                    alert('Wrong Id')
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <StyledDiv>
                <Card style={{ width: '28rem' }}>
                    <Card.Body>
                        <Card.Title>Login Admin</Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name='email' onChange={(e) => setUserEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name='password' onChange={(e) => setUserPassword(e.target.value)} />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={(e) => userLogin(e)}>
                                    Submit
                                </Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </StyledDiv>
            <ToastContainer/>
        </>
    )
}

export default LoginAd

const StyledDiv = styled.div`
    display: flex;
    justify-content:center;
    margin-top: 10rem;

`