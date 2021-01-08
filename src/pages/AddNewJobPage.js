import React, { useState } from 'react';
import { Button, Container, Form, Col, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { useArrayInput, useTextInput } from "../util/CustomHooks";
import { Exclamation } from "../util/Icons";
import { SuccessMessage } from "../pages/ApplyToJobPage";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';
import { UnauthorizedMessage } from "./SubmittedApplicationsPage"

const AddNewJobPage = () => {
    let history = useHistory();
    const departments = ["Business", "Engineering", "Finance", "Human Resources", "Information Technology", "Marketing"];
    const locations = ["Toronto, ON", "Ottawa, ON", "Waterloo, ON", "Hamilton, ON", "Victoria, BC", "Vancouver, BC"];
    const employmentTypes = ["Full-Time", "Part-Time", "Contract"];

    const { value: responsibilities, handleChange: handleResponsibilitiesChange, reset: resetResponsibilities } = useArrayInput([]);
    const { value: requirements, handleChange: handleRequirementsChange, reset: resetRequirements } = useArrayInput([]);

    const { value: title, bind: bindTitle, reset: resetTitle } = useTextInput("");
    const { value: location, bind: bindLocation, reset: resetLocation } = useTextInput(locations[0]);
    const { value: department, bind: bindDepartment, reset: resetDepartment } = useTextInput(departments[0]);
    const { value: employmentType, bind: bindEmploymentType, reset: resetEmploymentType } = useTextInput(employmentTypes[0]);
    const { value: aboutThisRole, bind: bindAboutThisRole, reset: resetAboutThisRole } = useTextInput("");
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    const [showResMsg, setShowResMsg] = useState(false);
    const [showReqMsg, setShowReqMsg] = useState(false);
    const [isError, setIsError] = useState(false)
    const handleResToggle = () => {
        setShowResMsg(!showResMsg)
    }

    const handleReqToggle = () => {
        setShowReqMsg(!showReqMsg)
    }

    const clearForm = () => {
        resetTitle();
        resetLocation();
        resetDepartment();
        resetEmploymentType();
        resetAboutThisRole();
        resetResponsibilities();
        resetRequirements();
    }
    let finalRequirements, finalResponsibilities;

    const handleSubmit = (e) => {
        e.preventDefault();
        finalResponsibilities = (responsibilities || []).map(item => item.value);
        finalRequirements = (requirements || []).map(item => item.value);
        const job = {
            title: title,
            location: location,
            department: department,
            employmentType: employmentType,
            aboutThisRole: aboutThisRole,
            responsibilities: finalResponsibilities,
            requirements: finalRequirements
        }

        if (finalRequirements.length > 0 && finalRequirements.length > 0) {
            axios.post("/jobs", job, {
                headers: { "Authorization": Cookies.get("token") }
            })
                .then(res => {
                    setIsError(false);
                    setShowResMsg(false)
                    setShowReqMsg(false)
                    clearForm();
                    setShowSuccessMsg(true);
                    history.go(0)
                })
                .catch(err => {
                    console.log(err);
                    setIsError(true)
                });

        }
        if (finalResponsibilities.length <= 0) {
            setShowResMsg(true)
        } else if (finalRequirements.length <= 0) {
            setShowReqMsg(true)
        }
    }

    return (
        <Container className="mt-3">
            {!Cookies.get("token") && <UnauthorizedMessage />}
            {showSuccessMsg && !isError &&
                <SuccessMessage showSuccessMsg={showSuccessMsg} text={"This job has been added"} />
            }
            {!showSuccessMsg && Cookies.get("token") &&
                < Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formGridTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter job title" required {...bindTitle} />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridDepartment" xs={12} sm={4}>
                            <Form.Label>Department</Form.Label>
                            <Form.Control as="select" {...bindDepartment} required>
                                {departments.map((item, index) => {
                                    return <option key={index}>{item}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridLocation" xs={12} sm={4}>
                            <Form.Label>Location</Form.Label>
                            <Form.Control as="select"  {...bindLocation} required>
                                {locations.map((item, index) => {
                                    return <option key={index}>{item}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridJobType" xs={12} sm={4}>
                            <Form.Label>Employment Type</Form.Label>
                            <Form.Control as="select"  {...bindEmploymentType} required>
                                {employmentTypes.map((item, index) => {
                                    return <option key={index}>{item}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formGridAbout">
                        <Form.Label>About this role</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Describe this role" required {...bindAboutThisRole} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Responsibilities</Form.Label>
                        <RequiredFieldErrorMessage showMsg={showResMsg} handleToggle={handleResToggle} >
                            <CreatableSelect
                                isMulti
                                value={responsibilities}
                                onChange={(val) => handleResponsibilitiesChange(val)}
                            />
                        </RequiredFieldErrorMessage>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Requirements</Form.Label>
                        <RequiredFieldErrorMessage showMsg={(showReqMsg)} handleToggle={handleReqToggle} >
                            <CreatableSelect
                                isMulti
                                value={requirements}
                                onChange={(val) => handleRequirementsChange(val)}
                            />
                        </RequiredFieldErrorMessage>
                    </Form.Group>
                    <Button variant="info" type="submit" block>Add job</Button>
                </Form>
            }
        </Container>
    )
}

const RequiredFieldErrorMessage = ({ children, showMsg, handleToggle }) => {
    const hideOverlay = () => {
        setTimeout(() => handleToggle(), 2000)
    }

    return (
        <OverlayTrigger
            placement="bottom"
            show={showMsg}
            onEntered={() => hideOverlay()}
            delay={300}
            overlay={
                <Popover>
                    <Popover.Content>
                        <Row>
                            <Col xs={2}><Exclamation /></Col>
                            <Col xs={10} className="my-auto"><span>Please fill out this field.</span></Col>
                        </Row>
                    </Popover.Content>
                </Popover>
            }
        >
            {children}
        </OverlayTrigger>
    );
}


export default AddNewJobPage;