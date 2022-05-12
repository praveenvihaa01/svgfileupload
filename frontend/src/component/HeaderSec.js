import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components'
import { MdDownload, MdShare } from 'react-icons/md';
import { saveAs } from 'file-saver'
import '../index.css'
import AdComponent from '../AdComponent';

const HeaderSec = ({ searchData, baseUrl, loadSearchPage, searchValue }) => {

    const [imageData, setImageData] = useState([])
    const [page, setPage] = useState(1)
    const [pageData] = useState(10)

    useEffect(() => {

        if (window.screen.width < 576) {
            document.getElementById("leftSide").style.display = 'none';
            document.getElementById("rightSide").style.display = 'none';
        } else {
            document.getElementById("leftSide").style.display = 'block';
            document.getElementById("rightSide").style.display = 'block';
        }
        showImageData(page)
    }, [])

    const showImageData = (total) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "page": total,
            "pageData": pageData
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "imageShow", requestOptions)
            .then(response => response.json())
            .then(result => {
                setImageData(result);
            })
            .catch(error => console.log('error', error));

    }


    const downloadImage = (image_url, imageSave) => {
        const imageSaveNew = imageSave.slice(13)
        saveAs(image_url, imageSaveNew)
    }

    const share = async (imageUrl) => {

        try {
            await navigator.share({
                title: 'Share',
                text: 'Share Svg Image',
                url: 'http://localhost:3000/images/' + imageUrl
            })
        } catch (err) {
            console.log(err);
        }
    }

    const loadPage = (e) => {
        const total = page + 1;
        setPage(total)
        showImageData(total)
    }

    return (
        <>
            <Header>
                <StyledLeftDiv style={{ display: 'block' }} id='leftSide'>
                    <AdComponent slot="9753906753" timeout={1000} />
                </StyledLeftDiv>

                <Container >
                    <Row md={4} lg={5} sm={3} xs={2} style={{ rowGap: '2rem' }}>
                        {
                            searchValue ?
                                searchData.length > 0 ?
                                    searchData.map((val, index) => {
                                        return (
                                            <Col key={index}>
                                                <Card className='card_v'>
                                                    <div className='card_overlay'></div>
                                                    <Card.Img className='imgRes' src={'./images/' + val.imageName} alt={val.imageName.slice(13).split('.').slice(0, -1).join('.')} title={val.imageName.slice(13).split('.').slice(0, -1).join('.')} />
                                                    <div className='card_icon'>
                                                        <MdDownload className='download_icon' onClick={() => downloadImage('./images/' + val.imageName, val.imageName)} />
                                                        <MdShare className='share_icon' onClick={() => share(val.imageName)} />
                                                        {/* <MdShare className='share_icon' onClick={() => copyToClipboard(val.path)} /> */}
                                                    </div>
                                                </Card>
                                            </Col>
                                        )
                                    })
                                    :
                                    <div style={{ display: 'flex', justifyContent: 'center', width:'100%' }}>
                                        <div>
                                            <h6>No Data Available</h6>
                                        </div>
                                    </div>
                                :
                                imageData.map((val, index) => {
                                    return (
                                        <Col key={index}>
                                            <Card className='card_v'>
                                                <div className='card_overlay'></div>
                                                <Card.Img className='imgRes' src={'./images/' + val.imageName} alt={val.imageName.slice(13).split('.').slice(0, -1).join('.')} title={val.imageName.slice(13).split('.').slice(0, -1).join('.')} />
                                                <div className='card_icon'>
                                                    <MdDownload className='download_icon' onClick={() => downloadImage('./images/' + val.imageName, val.imageName)} />
                                                    <MdShare className='share_icon' onClick={() => share(val.imageName)} />
                                                    {/* <MdShare className='share_icon' onClick={() => copyToClipboard(val.path)} /> */}
                                                </div>
                                            </Card>
                                        </Col>
                                    )
                                })
                        }

                    </Row>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }} >
                        <div style={{ textAlign: 'center' }}>
                            <Button onClick={(e) => searchData.length > 0 ? loadSearchPage(e) : loadPage(e)}>Load More</Button>
                        </div>
                    </div>
                </Container>

                <StyledRightDiv style={{ display: 'block' }} id='rightSide'>
                    <AdComponent slot="9753906753" timeout={1000} />
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
