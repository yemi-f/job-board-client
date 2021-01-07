import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Button } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import Cookies from 'js-cookie'

const SignInPage = ({ login, updateTok }) => {

    return (
        <Container>
            <SignInForm login={login} updateTok={updateTok} />
        </Container>
    )
}

const SignInForm = ({ login, updateTok }) => {
    let history = useHistory();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: ""
    });

    const [inputType, setInputType] = useState("password");

    const emailOnChange = (e) => {
        setInputValue({
            email: e.target.value,
            password: inputValue.password
        })
    }

    const pwdOnChange = (e) => {
        setInputValue({
            email: inputValue.email,
            password: e.target.value
        })
    }

    const toggleShowPassword = () => {
        setInputType(inputType === "text" ? "password" : "text");
    }

    let location = useLocation()

    const onSubmit = (e) => {
        e.preventDefault();

        try {
            console.log(location.state.from)
        } catch (e) {
            console.log("default")
        }
        axios.post(`/users/login`, {
            email: inputValue.email,
            password: inputValue.password
        })
            .then(res => {
                updateTok(res.data);
                Cookies.set("token", res.data)
                login();
                history.push("/admin/applicants")
            })
            .catch(err => console.log(err));
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                    value={inputValue.email} required
                    onChange={emailOnChange} />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type={inputType} placeholder="Password"
                    required
                    value={inputValue.password}
                    onChange={pwdOnChange}
                />
            </Form.Group>
            <div className="form-group form-check" >
                <input type="checkbox" className="form-check-input" id="show-password" onClick={() => toggleShowPassword()} />
                <label className="form-check-label" htmlFor="show-password" >Show password</label>
            </div>
            <Button variant="info" type="submit">
                Sign in
            </Button>
        </Form>
    )
}

export default SignInPage;