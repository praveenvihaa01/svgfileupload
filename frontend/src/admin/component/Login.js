import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import styled from 'styled-components'
import {useNavigate } from 'react-router-dom'

const Login = () => {

    const navigation = useNavigate()
    const [adminEmail, setAdminEmail] = useState('')
    const [adminPassword, setAdminPassword] = useState('')

    const adminLogin = (e) => {
        e.preventDefault()

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            adminEmail,
            adminPassword
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:3001/admin/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                if(result.mess === 'Successfully') {
                    alert('Successfully Login')
                    localStorage.setItem('token', Date.now())
                    navigation('/admin-dashboard')
                } else {
                    alert('Wrong Id ')
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
                                    <Form.Control type="email" placeholder="Enter email" name='email' onChange={(e) => setAdminEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name='password' onChange={(e) => setAdminPassword(e.target.value)} />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={(e) => adminLogin(e)}>
                                    Submit
                                </Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </StyledDiv>
        </>
    )
}

export default Login

const StyledDiv = styled.div`
    display: flex;
    justify-content:center;
    margin-top: 10rem;

`