import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function NavBar() {
    return (
        <Navbar bg="success" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/homepage">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/homepage">Home</Nav.Link>
                    <Nav.Link href="/list-reports">List Reports</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        
    );
}

export default NavBar;
