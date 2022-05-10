import React, { useState } from 'react'
import logo from '../logo/logo-web.png'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import { Modal, Button, Form, Navbar, Container, Nav, FormControl } from 'react-bootstrap';

const NvaBar = ({setSearchData,baseUrl}) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    e.preventDefault()

    var formdata = new FormData();
    formdata.append("image", file);
    formdata.append("createdDate", new Date());
    formdata.append("imageName", fileName);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(baseUrl+"upload", requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.mess === 'file uploaded'){
          handleClose()
          toast.success('🦄 File Uploaded', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setTimeout(()=>{
          window.location.reload();
        }, 1000);
          
        }
      })
      .catch(error => console.log('error', error));

  }



  return (
    <>

      <Navbar bg="light" expand="lg" style={{ backgroundImage: 'linear-gradient(to right, #92b316,#275b8b,#794ab2)', position: 'relative', color: 'black' }}>
        <Container fluid>
          <NavbarBrand onClick={handleShow}>Contributed Svgs</NavbarBrand>
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
                onChange={(e) => setSearchData(e.target.value)}
              />
              {/* <Button variant="outline-success">Search</Button> */}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <StyledParentDiv>

        {/* <div style={{ width: '100%', backgroundImage: 'linear-gradient(to right, #92b316,#275b8b,#794ab2)', position: 'relative', height: '10vh', color: 'white', textAlign: 'end' }}>
          <h6 style={{ marginRight: '2rem', marginTop: '1rem', cursor: 'pointer' }} onClick={handleShow}>Contributed Svgs</h6>
        </div> */}
        <StyledLogoDiv>
          <img src={logo} alt='logo' style={{ height: '4rem' }} />
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
          <Button variant="primary" type="submit" onClick={(e) => uploadFile(e)}>
            Upload
          </Button>
        </Form>
      </Modal>
      <ToastContainer/>
    </>
  )
}

export default NvaBar

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
height: 12vh;
}

`
const NavbarBrand = styled(Navbar.Brand)`
  cursor: pointer;
  @media (max-width: 450px) {
   font-size:0.8rem;
}
`
