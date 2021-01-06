import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';


const SubmittedApplicationsPage = ({ tok }) => {
    let history = useHistory();

    const [applicants, setApplicants] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get(`/applicants`, {
                    headers: { "Authorization": tok }
                });
                setApplicants(res.data.docs);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
                setIsLoading(false);
                setIsError(true);
            }
        }
        getData();
    }, [tok])

    const handleClick = () => {
        history.push(`/admin/signin`);
    }

    return (
        <Container>
            {isError && !isLoading &&
                <>
                    <h2>You are not authorized</h2>
                    <Button onClick={() => handleClick()}>Sign in</Button>
                </>
            }
            {!isError && !isLoading && <Table>
                <TableHeader />
                <TableBody applicants={applicants} />
            </Table>}
        </Container>
    )
}

const TableHeader = () => {
    return (
        <thead>
            <tr>
                {["First Name", "Last Name", "Email", "Job", "Resume"].map((item, index) => {
                    return <th key={index}>{item}</th>

                })}
            </tr>
        </thead>
    )
}

const TableBody = ({ applicants = [] }) => {
    return (
        <tbody>
            {applicants.map((applicant, index) => {
                return <TableRow key={index} applicant={applicant} />
            })}
        </tbody>
    )
}

const TableRow = ({ applicant }) => {
    let history = useHistory();

    const handleJobClick = () => {
        const job = {
            _id: applicant.job.id,
            title: applicant.job.title
        }
        const to = {
            pathname: `/${job._id}-${job.title}`,
            state: {
                job: job
            }
        }

        // console.log(to.pathname)

        history.push(to);
    }

    return (
        <tr>
            <td>{applicant.firstName}</td>
            <td>{applicant.lastName}</td>
            <td>{applicant.email}</td>
            <td onClick={() => handleJobClick()} style={{ cursor: "pointer" }}>{applicant.job.title}</td>
            <td>
                <Link to={{ pathname: applicant.resumeUrl }} target="_blank">
                    View resumé <FontAwesomeIcon className="ml-1" icon={faExternalLinkAlt} />
                </Link>
            </td>
        </tr>
    )
}

export default SubmittedApplicationsPage;