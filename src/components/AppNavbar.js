import axios from 'axios';
import React from 'react';
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";

const AppNavbar = ({ isAuthenticated, updateAuthenticatedState }) => {

    let history = useHistory();
    const logout = async () => {
        await axios.get(`/users/logout`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        updateAuthenticatedState(false);
        history.push("/admin/signin");
    }

    return (
        <Navbar bg="light" expand="lg">
            <div className="container">
                <Navbar.Brand as={NavLink} to="/">Job Board</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        {!isAuthenticated && <Nav.Link as={NavLink} to="/admin/signin">Admin</Nav.Link>}
                        {isAuthenticated && <Nav.Link as={NavLink} to="/admin/applicants">Applicants</Nav.Link>}
                        {isAuthenticated && <Nav.Link as={Button} className="btn-light" onClick={() => {
                            logout();
                        }}>Log out</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

export default AppNavbar;