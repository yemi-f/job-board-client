import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Container, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt, faBuilding,
    faProjectDiagram, faAngleDoubleLeft, faAngleDoubleRight,
    faAngleLeft, faAngleRight
} from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";


const JobsTable2 = () => {
    let history = useHistory();
    const location = useLocation();

    const [pageNum, setPageNum] = useState(0);
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [filtering, setFiltering] = useState(false);

    const { value: jobLocation, update: updateLocation, reset: resetLocation } = useQueryInput("");
    const { value: department, update: updateDepartment, reset: resetDepartment } = useQueryInput("");
    const { value: jobType, update: updateJobType, reset: resetJobType } = useQueryInput("");

    useEffect(() => {
        setIsLoading(true);
        const getPageNumberFromUrl = () => {
            const temp = location.pathname.split("/");
            const page = parseInt(temp[temp.length - 1])
            if (page > 0) {
                return page
            }
            return 1;
        }

        const getData = async () => {
            try {
                const res = await axios
                    .get(`/jobs?limit=10&page=${getPageNumberFromUrl()}&location=${jobLocation}&type=${jobType}&department=${department}`);
                setData(res.data.docs);
                setPageNum(getPageNumberFromUrl());
                setTotalCount(res.data.count);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        }

        getData();

    }, [location.pathname, jobLocation, jobType, department])

    const handlePageNumClick = (num) => {
        const to = {
            pathname: `/jobs/page/${num}`,
        }
        history.push(to)
    }

    const clearFilters = () => {
        updateFiltering(false);
        resetDepartment();
        resetJobType();
        resetLocation();
    }

    const updateFiltering = (bool) => {
        setFiltering(bool);
    }

    return (
        <Container>
            <DropdownButtonsBar updateLocation={updateLocation} updateDepartment={updateDepartment} updateJobType={updateJobType}
                clearFilters={clearFilters} updateFiltering={updateFiltering} filtering={filtering} />
            <TableBody jobs={data} pageNum={pageNum} isLoading={isLoading} />
            <PaginationBar pageNum={pageNum} handlePageNumClick={handlePageNumClick}
                perPage={10} totalCount={totalCount} isLoading={isLoading} />
        </Container>
    )
}

const PaginationBar = ({ pageNum, handlePageNumClick, totalCount, perPage, isLoading }) => {
    return (
        <Row className="my-2">
            <Col xs={3} className="d-none d-sm-block">
                {!isLoading &&
                    <ul className="pagination">
                        <li className="page-item">
                            <span className="page-link text-dark border-white px-0 mx-0">
                                {totalCount > 0 ? <>Page {pageNum} of {Math.ceil(totalCount / 10)} </> : <>Sorry, we don't currently have any open positions.</>}
                            </span>
                        </li>
                    </ul>
                }
            </Col>
            <Col xs={12} sm={9}>
                <div className="float-sm-right">
                    <Pagination
                        itemClass="page-item"
                        linkClass="page-link text-secondary"
                        activeLinkClass="bg-info border-info text-light"
                        activePage={pageNum}
                        itemsCountPerPage={perPage}
                        totalItemsCount={totalCount}
                        onChange={(num) => handlePageNumClick(num)}
                        pageRangeDisplayed={5}
                        prevPageText={<FontAwesomeIcon icon={faAngleLeft} />}
                        nextPageText={<FontAwesomeIcon icon={faAngleRight} />}
                        firstPageText={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
                        lastPageText={<FontAwesomeIcon icon={faAngleDoubleRight} />}
                    />
                </div>
            </Col>
        </Row>
    )
}

const TableBody = ({ jobs = [], pageNum, isLoading }) => {
    return (
        <>
            {isLoading &&
                <div className="text-center my-4">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            }
            {!isLoading && jobs.map((job, index) => {
                return <TableRow key={index} job={job} pageNum={pageNum} />
            })}
        </>
    )
}

const DropdownButtonsBar = ({ updateLocation, updateDepartment, updateJobType, clearFilters, updateFiltering, filtering }) => {
    const locations = ["All Locations", "Toronto, ON", "Ottawa, ON", "Waterloo, ON", "Hamilton, ON", "Victoria, BC", "Vancouver, BC"];
    const departments = ["All Departments", "Business", "Engineering", "Finance", "Human Resources", "Information Technology", "Marketing"];
    const jobTypes = ["All Job Types", "Full-Time", "Part-Time", "Contract"];

    return (
        <Form inline className="my-3" onReset={clearFilters}>
            <DropdownButton title={"Job Type"} items={jobTypes} updateJobType={updateJobType} updateFiltering={updateFiltering} />
            <DropdownButton title={"Department"} items={departments} updateDepartment={updateDepartment} updateFiltering={updateFiltering} />
            <DropdownButton title={"Location"} items={locations} updateLocation={updateLocation} updateFiltering={updateFiltering} />
            {filtering && <Button variant="link" type="reset">Clear Filters</Button>}
        </Form>
    )
}

const DropdownButton = ({ items = [], title, updateLocation, updateJobType, updateDepartment, updateFiltering }) => {
    const handleChange = (item) => {
        if (title === "Job Type") updateJobType(item === "All Job Types" ? "" : item);
        else if (title === "Location") updateLocation(item === "All Locations" ? "" : item.split(",")[0]);
        else if (title === "Department") updateDepartment(item === "All Departments" ? "" : item);
        updateFiltering(true);
    }
    return (
        <Form.Group controlId="formGridState" className=" mr-2">
            <Form.Control as="select" defaultValue={items[0]} onChange={(e) => handleChange(e.target.value)}>
                {items.map((item, index) => {
                    return <option key={index}>{item}</option>
                })}
            </Form.Control>
        </Form.Group>
    )
}

const TableRow = ({ job, pageNum }) => {
    let history = useHistory();
    const onClick = () => {
        const to = {
            pathname: `/job/${job._id}-${job.title}`,
            state: { job: job, pageNum: pageNum }
        }
        history.push(to)
    }

    return (
        <Row className="border-bottom my-3" onClick={() => onClick()} style={{ cursor: "pointer" }}>
            <Col sm={10}>
                <span className="lead" style={{ textTransform: "capitalize" }}>{job.title}</span>
                <p className="text-muted">
                    <span><FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 4 }} />{job.location}</span>
                    <span><FontAwesomeIcon icon={faBuilding} style={{ marginLeft: 16, marginRight: 4 }} />{job.employmentType}</span>
                    <span><FontAwesomeIcon icon={faProjectDiagram} style={{ marginLeft: 16, marginRight: 4 }} />{job.department}</span>
                </p>
            </Col>
            <Col sm={2}>
                <Button variant="secondary" className="my-2">Apply</Button>
            </Col>
        </Row>
    )
}


const useQueryInput = initialValue => {
    const [value, setValue] = useState(initialValue);
    let history = useHistory()

    return {
        value,
        setValue,
        update: (val) => {
            setValue(val);
            console.log(val);
            history.push(`/jobs/page/${1}`);
        },
        reset: () => setValue("")
    };
};

export default JobsTable2;