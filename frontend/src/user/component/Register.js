import React, { useEffect, useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [roles, setRoles] = useState([])
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        isActive: '',
        isDelete: '',
    })

    useEffect(() => {
        getRole()
    })

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

    const registerUser = (e) => {
        e.preventDefault()
        const {email, password, isActive, isDelete} = userData
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
                    "roleId":el.roleId
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
                        if(result.mess === 'Successfully'){
                            alert('Successfully')
                        }
                    })
                    .catch(error => console.log('error', error));
            }
        })

    }

    return (
        <>
            <StyledDiv>
                <Card style={{ width: '28rem' }}>
                    <Card.Body>
                        <Card.Title>User Register</Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" name='email' onChange={handlShow} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name='password' onChange={handlShow} />
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={(e) => registerUser(e)}>
                                    Register
                                </Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </StyledDiv>
        </>
    )
}

export default Register

const StyledDiv = styled.div`
    display: flex;
    justify-content:center;
    margin-top: 10rem;

`