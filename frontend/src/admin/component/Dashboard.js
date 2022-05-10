import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Card, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components'
import {useNavigate } from 'react-router-dom'

const Dashboard = ({baseUrl}) => {
    
    const navigation = useNavigate()
    const [imageData, setImageData] = useState([])

    useEffect(() => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch(baseUrl+"imageShow", requestOptions)
            .then(response => response.json())
            .then(result => {
                setImageData(result);
            })
            .catch(error => console.log('error', error));
    }, [baseUrl])

    const showPages  = (val) => {
        if(val === 'svg'){
            navigation('/admin-dashboard/svgslist')
        } else if(val === 'contributed'){
            // navigation('/admin-dashboard/contributedSvgslist')
            navigation('/admin-dashboard/svgslist')
        }
    }


    return (
        <>
            <NavBar />
            <StyledContainer >
                <StyledRow md={2} lg={2} sm={1}>
                    <Col >
                        <StyledCard onClick={()=>showPages('svg')}>
                            <Card.Body>
                                <h3>Total number of svg </h3>
                                <h6 style={{textAlign:'center', fontSize:'4rem'}}>{imageData.length}</h6>
                            </Card.Body>
                        </StyledCard>
                    </Col>
                    <Col>
                        <StyledCard onClick={()=>showPages('contributed')}>
                            <Card.Body>
                                <h3>Contributed Svgs</h3>
                                <h6 style={{textAlign:'center', fontSize:'4rem'}}>{imageData.length}</h6>
                            </Card.Body>
                        </StyledCard>
                    </Col>
                </StyledRow>
            </StyledContainer>
        </>
    )
}

export default Dashboard

const StyledContainer = styled(Container)`
    display:flex;
    justify-content:center;
    margin-top: 3rem;
    magin:0
  
`

const StyledRow = styled(Row)`
    row-gap: 2rem;
  
`
const StyledCard = styled(Card)`
    width: 18rem;
    height: 10rem;
    box-shadow: 0px 0px 2px 1px #888888;  
    cursor:pointer;
`