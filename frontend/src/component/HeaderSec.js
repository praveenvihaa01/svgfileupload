import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components'
import { MdDownload, MdShare } from 'react-icons/md';
// import img from '../../public/images/'
import { saveAs } from 'file-saver'
import '../index.css'
import AdComponent from '../AdComponent';

const HeaderSec = ({ searchData, baseUrl }) => {

    const [imageData, setImageData] = useState([])

    useEffect(() => {

        if (window.screen.width < 576) {
            document.getElementById("leftSide").style.display = 'none';
            document.getElementById("rightSide").style.display = 'none';
        } else {
            document.getElementById("leftSide").style.display = 'block';
            document.getElementById("rightSide").style.display = 'block';
        }


        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch(baseUrl+"imageShow", requestOptions)
            .then(response => response.json())
            .then(result => {
                setImageData(result);
                console.log(result);
            })
            .catch(error => console.log('error', error));
    }, [baseUrl])

    const shareData = {
        title: 'Share',
        text: 'Share Svg Image',
        url: 'http://localhost:3000/'
    }

    const downloadImage = (image_url, imageSave) => {
        saveAs(image_url, imageSave) // Put your image url here.
    }

    const share = async () => {
        try {
            await navigator.share(shareData)
            // resultPara.textContent = 'MDN shared successfully'
        } catch (err) {
            console.log(err);
        }
    }

    const filterImage = imageData.filter(val => {
        if (searchData === "") {
            return val
        } else if (val.imageName.toLowerCase().includes(searchData.toLocaleLowerCase())) {
            return val
        }
        return false
        
    })

    return (
        <>
            <Header>
            {/* <AdComponent/> */}
                <StyledLeftDiv style={{ display: 'block' }} id='leftSide'>
                    <AdComponent/>
                </StyledLeftDiv>

                <Container >
                    <Row md={4} lg={5} sm={3} xs={2} style={{ rowGap: '2rem' }}>
                        {
                            filterImage.map((val, index) => {
                            return (
                                <Col key={index}>
                                    <Card className='card_v'>
                                        <div className='card_overlay'></div>
                                        <Card.Img className='imgRes' src={'./images/' + val.imageName} />
                                        <div className='card_icon'>
                                            <MdDownload className='download_icon' onClick={() => downloadImage('./images/' + val.imageName, val.imageName)} />
                                            <MdShare className='share_icon' onClick={() => share()} />
                                        </div>
                                    </Card>
                                </Col>
                            )
                        })
                        }
                    </Row>
                </Container>

                <StyledRightDiv style={{ display: 'block' }} id='rightSide'>

                </StyledRightDiv>
            </Header>


        </>
    )
}

export default HeaderSec
const Header = styled.div`
    margin-top:3rem;
    display:flex;
  
`

const StyledLeftDiv = styled.div`
    width: 16vw;
    background: #d7d7d7;
    height:50vh;
    text-align: center;

    @media (max-width: 483px) {
        width: 55vw;
      }

`
const StyledRightDiv = styled.div`
    width: 16vw;
    background: #d7d7d7;
    height:50vh;
    text-align: center;
    margin-left: auto;
    margin-right: 0;

    @media (max-width: 483px) {
        width: 55vw;
      }

    `
