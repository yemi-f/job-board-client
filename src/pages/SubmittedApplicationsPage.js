import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useHistory, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie'


const SubmittedApplicationsPage = () => {
    const [applicants, setApplicants] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get(`/applicants`, {
                    headers: { "Authorization": Cookies.get("token") }
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
    }, [])


    return (
        <Container>
            {isError && !isLoading &&
                <UnauthorizedMessage />
            }
            {!isError && !isLoading && <Table>
                <TableHeader />
                <TableBody applicants={applicants} />
            </Table>}
        </Container>
    )
}

export const UnauthorizedMessage = () => {
    let history = useHistory();
    let location = useLocation()

    const handleClick = () => {
        history.push({ pathname: `/admin/signin`, state: { from: location.pathname } });
    }

    return (
        <div className="text-center">
            <h2 className="my-3">You are not authorized to access this web page</h2>
            <Button variant="info" size="lg" onClick={() => handleClick()}>Sign in</Button>
        </div>
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
            pathname: `/job/${job._id}-${job.title}`,
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