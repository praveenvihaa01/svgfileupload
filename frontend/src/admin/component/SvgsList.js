import React, { useState, useEffect } from 'react'
import { Table, Form, Modal, Button } from 'react-bootstrap';
import { FcRemoveImage } from 'react-icons/fc';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';

const SvgsList = ({baseUrl}) => {

    const [imageData, setImageData] = useState([])
    const [imageName, setImageName] = useState('')
    const [newFileName, setNewFileName] = useState('')
    const [imageId, setImageId] = useState('')
    const [show, setShow] = useState(false);

    const [showPage] = useState(localStorage.getItem('token-Svg').slice(-1))

    const handleClose = () => setShow(false);
    const handleShow = (val, id) => {
        setShow(true);
        setImageName(val)
        setImageId(id)
    }

    useEffect(() => {
        showImage()
    },[])

    const showImage = () => {
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
    }

    const imageDelete = (val) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "file_src": val.imageName,
            "imageId": val.imageId
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"remove/image", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    alert('Delete image')
                    showImage()
                }
            })
            .catch(error => console.log('error', error));
    }

    const imageRename = (e) => {
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "fileName": imageName,
            "newFileName": newFileName + '.svg',
            "imageId": imageId,
            "updatedDate": new Date()
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"rename/imageFile", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    alert('Rename File Name')
                    showImage()
                    handleClose()
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            {
                showPage === '2' ?
                    <Table responsive="sm">
                        <thead>
                            <tr>
                                <th>Images </th>
                                <th>name</th>
                                <th>Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                imageData.map((val, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <img src={'../images/' + val.imageName} style={{ width: '3rem' }} alt={val.imageName} />
                                            </td>
                                            <td>{val.imageName}</td>
                                            <td >

                                                <MdOutlineDriveFileRenameOutline style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => { handleShow(val.path, val.imageId) }} />

                                                <FcRemoveImage style={{ fontSize: '2rem', marginLeft: '2rem', cursor: 'pointer' }} onClick={() => imageDelete(val)} />
                                                {/* <Form>
                                            <Form.Check
                                                custom
                                                type="switch"
                                                id="custom-switch"
                                            />
                                        </Form> */}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    :
                    showPage === '3' ?
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th>Images </th>
                                    <th>name</th>
                                    <th>Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    imageData.map((val, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <img src={'../images/' + val.imageName} style={{ width: '3rem' }} alt={val.imageName} />
                                                </td>
                                                <td>{val.imageName}</td>
                                                <td >

                                                    {/* <MdOutlineDriveFileRenameOutline style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={() => { handleShow(val.path, val.imageId) }} />

                                                    <FcRemoveImage style={{ fontSize: '2rem', marginLeft: '2rem', cursor: 'pointer' }} onClick={() => imageDelete(val)} /> */}
                                                    <Form>
                                                        <Form.Check
                                                            custom
                                                            type="switch"
                                                            id="custom-switch"
                                                        />
                                                    </Form>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        : <p>hh</p>
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change File Name</Modal.Title>
                </Modal.Header>
                <Form style={{ padding: '2rem' }}>
                    <Form.Label >File Name</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" onChange={(e) => setNewFileName(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={imageRename}>
                        Change
                    </Button>
                </Form>
            </Modal>
        </>
    )
}

export default SvgsList