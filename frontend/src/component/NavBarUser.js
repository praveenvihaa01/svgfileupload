import React, { useState } from 'react'
import logo from '../logo/logo-web.png'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Button, Form, Navbar, Container, Nav, FormControl } from 'react-bootstrap';

const NavBarUser = ({ searchImageData, baseUrl }) => {

    const [show, setShow] = useState(false);
    // const [imageData, setImageData] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [searchImageValue, setSearchImageValue] = useState('')

    // const [validateFileName, setValidateFileName] = useState(false)

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const checkFileName = (e) => {

        e.preventDefault();

        // if (validateFileName) {
        //     // alert(validateFileName);
        //     const nums = new Date().getTime()
        //     const newName = nums + '-' + fileName
        //     uploadFiles(newName)
        // } else {
        //     uploadFiles(fileName)

        // }
        uploadFiles()
    }
    const uploadFiles = () => {

        var formdata = new FormData();
        formdata.append("image", file);
        formdata.append("createdDate", new Date());
        formdata.append("imageName", fileName);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(baseUrl + "upload", requestOptions)
            .then(res => res.json())
            .then(result => {
                if (result.mess === "file uploaded") {
                    handleClose()

                    toast.success('🦄 file uploaded', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    //   setTimeout(()=>{
                    //       window.location.reload()
                    //   }, 1000)
                }
            })
            .catch(error => {
                toast.error('🦄 Only Svg file upload', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.log('error', error)
            });
    }

    const searchValue = (e) => {
        e.preventDefault();

        // setSearchData(searchImageValue)
        searchImageData(searchImageValue)
        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({
        //     "searchData": searchImageValue
        // });

        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };

        // fetch("http://127.0.0.1:3001/imageSearchImage", requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
    }



    return (
        <>

            <Navbar bg="light" expand="lg" style={{ backgroundImage: 'linear-gradient(to right, #92b316,#275b8b,#794ab2)', position: 'relative', color: 'black' }}>
                <Container fluid>
                    <NavbarBrand onClick={handleShow} style={{ color: 'white' }}>Upload Svgs</NavbarBrand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            {/* <Nav.Link href="#action1">Home</Nav.Link> */}
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => setSearchImageValue(e.target.value)}
                            />
                            <Button variant="warning" onClick={(e) => searchValue(e)}>Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <StyledParentDiv>

                {/* <div style={{ width: '100%', backgroundImage: 'linear-gradient(to right, #92b316,#275b8b,#794ab2)', position: 'relative', height: '10vh', color: 'white', textAlign: 'end' }}>
          <h6 style={{ marginRight: '2rem', marginTop: '1rem', cursor: 'pointer' }} onClick={handleShow}>Contributed Svgs</h6>
        </div> */}
                <StyledLogoDiv>
                    <StyledLogoImg src={logo} alt='logo' />
                </StyledLogoDiv>

            </StyledParentDiv>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload File</Modal.Title>
                </Modal.Header>
                <Form style={{ padding: '2rem' }}>
                    <Form.Group className="mb-3">
                        <Form.Control type="file" onChange={saveFile} name='image' />
                    </Form.Group>
                    <Button variant="primary" type='submit' onClick={(e) => checkFileName(e)}>
                        Upload
                    </Button>
                </Form>
            </Modal>
            <ToastContainer />
        </>
    )
}

export default NavBarUser

const StyledParentDiv = styled.div`
    display:flex;
    justify-content:center;

  //   @media (max-width: 500px) {
  //     justify-content:start;
  // }

    `
const StyledLogoDiv = styled.div`
width:10rem;
height: 15vh;
top:0;
position:absolute;
background: white;
box-shadow: 0px 0px 5px #888888;
text-align: center;
border-bottom-right-radius: 25px;
border-bottom-left-radius: 25px;


@media (max-width: 500px) {
  width:6rem;
height: 10vh;
}

`

const StyledLogoImg = styled.img`

height: 4rem;

@media (max-width: 500px) {
    height: 3rem;
}

`

const NavbarBrand = styled(Navbar.Brand)`
  cursor: pointer;
  @media (max-width: 450px) {
   font-size:0.8rem;
}
`



    // var requestOptions = {
    //   method: 'POST',
    //   body: formdata,
    //   redirect: 'follow'
    // };

    // fetch(baseUrl + "upload", requestOptions)

