import axios from 'axios';
import React from 'react';
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import Cookies from 'js-cookie'

const AppNavbar = ({ updateAuthenticatedState }) => {

    let history = useHistory();
    const logout = async () => {
        await axios.get(`/users/logout`)
            .then(res => {
                Cookies.remove("token");
            })
            .catch(err => console.log(err));

        updateAuthenticatedState(false);
        history.push("/admin/signin");
        Cookies.remove("token");

    }

    return (
        <Navbar bg="light" expand="lg">
            <div className="container">
                <Navbar.Brand as={NavLink} to="/">Mango</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={NavLink} to="/jobs">Jobs</Nav.Link>
                        {!(Cookies.get("token")) && <Nav.Link as={NavLink} to="/admin/signin">Admin</Nav.Link>}
                        {(Cookies.get("token")) && <Nav.Link as={NavLink} to="/admin/applicants">Applicants</Nav.Link>}
                        {(Cookies.get("token")) && <Nav.Link as={NavLink} to="/admin/add-new-job">Add job</Nav.Link>}
                        {(Cookies.get("token")) && <Nav.Link className="btn-light rounded-lg"
                            onClick={() => { logout(); }}>
                            Log out
                        </Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

export default AppNavbar;