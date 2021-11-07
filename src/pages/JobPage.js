import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const JobPage = () => {
  let location = useLocation();
  let history = useHistory();
  const [job, setJob] = useState([]);

  useEffect(() => {
    const jobId = location.pathname.split("/")[2].split("-")[0];

    const getData = async () => {
      try {
        const res = await axios.get(`/jobs/${jobId}`);
        setJob(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [location.pathname]);

  const handleButtonClick = () => {
    const to = {
      pathname: `/job/${job._id}-${job.title}/apply`,
    };

    history.push(to);
  };

  return (
    <Container>
      <div className="my-4">
        <h3 style={{ textTransform: "capitalize" }}>{job.title}</h3>
        <p className="text-muted">
          <span>
            <FontAwesomeIcon icon="map-marker-alt" style={{ marginRight: 4 }} />
            {job.location}
          </span>
          <span>
            <FontAwesomeIcon
              icon="building"
              style={{ marginLeft: 16, marginRight: 4 }}
            />
            {job.employmentType}
          </span>
          <span>
            <FontAwesomeIcon
              icon="project-diagram"
              style={{ marginLeft: 16, marginRight: 4 }}
            />
            {job.department}
          </span>
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
      <Button
        block
        variant="info"
        className="my-4"
        onClick={() => handleButtonClick()}
      >
        Apply to position
      </Button>
    </Container>
  );
};

const ParagraphToList = ({ arr = [] }) => {
  return (
    <ul>
      {arr.map((responsibility, index) => {
        return <li key={index}>{responsibility}</li>;
      })}
    </ul>
  );
};

export default JobPage;
