import React from 'react'
import { Offcanvas, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SideBar = ({ handleClose, show }) => {

    const Navigate = useNavigate();

    const navigate = (val) => {

        if(val === 'svg'){
            Navigate('/admin-dashboard/svgslist')
        } else if(val === 'contributed') {
            Navigate('/admin-dashboard/contributedSvgslist')
        }
    }
    return (
        <>
            <Offcanvas show={show} onHide={handleClose} style={{ width: '265px' }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Dashboard</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant="flush">
                    <ListGroup.Item style={{cursor:'pointer',textDecoration: 'none'}} onClick={()=>navigate('svg')}>Svg list</ListGroup.Item>
                        <ListGroup.Item style={{cursor:'pointer'}} onClick={()=>navigate('contributed')}>Contributed Svgs List</ListGroup.Item>
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default SideBar