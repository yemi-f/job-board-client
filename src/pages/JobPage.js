import React, { useEffect, useState } from 'react';
import { Container, Button } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const JobPage = () => {
    let location = useLocation();
    let history = useHistory();

    const [job, setJob] = useState([]);


    useEffect(() => {
        let jobId;
        jobId = location.state.job._id;

        // const getJobIdFromUrl = () => {
        //     const temp = location.pathname.split("/");
        //     return temp[1].split("-")[0]
        // }

        if (location.state.job.location) {
            setJob(location.state.job);
            // console.log(1)
            return;
        }

        const getData = async () => {
            try {
                const res = await axios.get(`/jobs/${jobId}`);
                setJob(res.data);
                // console.log(2)
                console.log(res.data);
            } catch (error) {
                console.log(error)
            }
        }

        getData();
    }, [location.state.job._id, location.pathname, location.state.job])

    const handleButtonClick = () => {
        const to = {
            pathname: `/${job._id}-${job.title}/apply`,
            state: { job: job }
        }

        history.push(to);
    }

    return (
        <Container>
            <div className="my-4">
                <h3 style={{ textTransform: "capitalize" }}>{job.title}</h3>
                <p className="text-muted">
                    <span><FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 4 }} />{job.location}</span>
                    <span><FontAwesomeIcon icon={faBuilding} style={{ marginLeft: 16, marginRight: 4 }} />{job.employeeType}</span>
                    <span><FontAwesomeIcon icon={faProjectDiagram} style={{ marginLeft: 16, marginRight: 4 }} />{job.department}</span>
                </p>
            </div>
            <div className="my-4">
                <h5>About the role</h5>
                <p>{job.aboutThisRole}</p>
            </div>
            <div className="my-4">
                <h5>What you'll do</h5>
                <ParagraphToList arr={job.responsibilities} />
            </div>
            <div className="my-4">
                <h5>What you'll bring</h5>
                <ParagraphToList arr={job.requirements} />
            </div>
            <Button block variant="info" className="my-4" onClick={() => handleButtonClick()}>Apply to position</Button>
        </Container>
    )
}

const ParagraphToList = ({ arr = [] }) => {
    return (
        <ul>
            {arr.map((responsibility, index) => {
                return (
                    <li key={index}>
                        {responsibility}
                    </li>
                )
            })}
        </ul>
    )
}

export default JobPage;