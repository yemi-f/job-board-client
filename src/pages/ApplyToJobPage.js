import React, { useState } from 'react';
import { Container, Form, Col, Button, Spinner } from 'react-bootstrap';
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const ApplyToJobPage = () => {
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    const updateShowSuccessMsg = () => {
        setShowSuccessMsg(true);
    }

    return (
        <Container>
            <SuccessMessage showSuccessMsg={showSuccessMsg} />
            <ApplyToJobForm showSuccessMsg={showSuccessMsg} updateShowSuccessMsg={updateShowSuccessMsg} />
        </Container>
    )
}

const ApplyToJobForm = ({ showSuccessMsg, updateShowSuccessMsg }) => {
    let location = useLocation();
    const job = location.state.job;

    const { value: firstName, bind: bindFirstName, reset: resetFirstName } = useInput("");
    const { value: lastName, bind: bindLastName, reset: resetLastName } = useInput("");
    const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
    const [file, setFile] = useState(null);
    const [fileInputKey, setFileInputKey] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleFileUploadChange = (e) => {
        setFile(e.target.files[0]);
    }

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result)
            };
            reader.onerror = function (error) {
                reject(error)
                // console.log('Error: ', error);
            };
        })
    }

    const resetFile = () => {
        setFileInputKey(Date.now());
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setUploading(true);

        console.log(`${firstName} ${lastName} ${email}`);
        console.log(file);

        getBase64(file)
            .then(
                (response) => {
                    // console.log(response);

                    axios
                        .post(`/applicants`, {
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            resume: { base64Str: response.split(",")[1], fileName: file.name },
                            job: { title: job.title, id: job._id }
                        })
                        .then(res => {
                            console.log(res);
                            setUploading(false);
                        })
                        .catch(e => console.log(e))

                }
            )
            .catch(
                (error) => {
                    console.log(error);
                }
            )

        resetFirstName();
        resetLastName();
        resetEmail();
        resetFile();
        updateShowSuccessMsg();
    }

    return (

        <>
            {!showSuccessMsg && <Form onSubmit={handleSubmit} >
                <h3>{job.title}</h3>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirstName" xs={12} sm={6}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" required {...bindFirstName} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName" xs={12} sm={6}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" required {...bindLastName} />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email address" required {...bindEmail} />
                </Form.Group>

                <Form.Group controlId="formGridResume">
                    <Form.File type="file" label="Resume" accept="application/pdf" key={fileInputKey} onChange={(e) => handleFileUploadChange(e)} />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={false}>
                    Submit
                </Button> {uploading && <Spinner />}
            </Form>
            }
        </>
    )
}

const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        reset: () => setValue(""),
        bind: {
            value,
            onChange: event => {
                setValue(event.target.value);
            }
        }
    };
};

const SuccessMessage = ({ showSuccessMsg }) => {
    return (
        <>
            {showSuccessMsg &&
                <div className="text-center">
                    <FontAwesomeIcon icon={faCheckCircle} size="5x" color="#72C341" className="mt-4 mb-2" />
                    <div className="my-2" >
                        <h1>Thank You!</h1>
                        <h3 className="font-weight-light">Your application has been received.</h3>
                    </div>
                </div>
            }
        </>
    )
}

export default ApplyToJobPage;