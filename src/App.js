import './App.css';
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import JobsTable2 from "./components/JobsTable2";
import AppNavbar from "./components/AppNavbar";
import SignInPage from "./pages/SignInPage"
import React, { useEffect, useState } from 'react';
import JobPage from './pages/JobPage';
import ApplyToJobPage from './pages/ApplyToJobPage';
import axios from 'axios';
import SubmittedApplicationsPage from './pages/SubmittedApplicationsPage';
import AddNewJobPage from './pages/AddNewJobPage';
import Homepage from './pages/Homepage';
import { Container, Button } from 'react-bootstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faBuilding, faCheckCircle, faMapMarkerAlt, faExclamation, faProjectDiagram,
  faExternalLinkAlt, faAngleDoubleLeft, faAngleDoubleRight,
  faAngleLeft, faAngleRight
} from '@fortawesome/free-solid-svg-icons';
library.add(
  faCheckCircle, faExclamation, faMapMarkerAlt,
  faBuilding, faProjectDiagram, faExternalLinkAlt,
  faAngleDoubleLeft, faAngleDoubleRight,
  faAngleLeft, faAngleRight
);

axios.defaults.baseURL = `https://job-board-xc23d56.herokuapp.com`;
// axios.defaults.baseURL = `http://localhost:5000`

function App() {
  const [jobs, setJobs] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const res = await axios.get(`/jobs?limit=10`);
        setJobs(res.data);
      } catch (error) {
        console.log(error)
      }
    }

    getAllJobs();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  }

  const updateAuthenticatedState = () => {
    setIsAuthenticated(false);
  }

  return (
    <Router className="App">
      <AppNavbar isAuthenticated={isAuthenticated} updateAuthenticatedState={updateAuthenticatedState} />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/jobs">
          <JobsTable2 jobs={jobs} />
        </Route>
        <Route exact path="/jobs/page/:id">
          <JobsTable2 jobs={jobs} />
        </Route>
        <Route path="/admin/signin">
          <SignInPage jobs={jobs} login={login} />
        </Route>
        <Route path="/admin/applicants">
          <SubmittedApplicationsPage />
        </Route>
        <Route path="/admin/add-new-job">
          <AddNewJobPage />
        </Route>
        <Route exact path="/job/:id">
          <JobPage />
        </Route>
        <Route exact path="/job/:id/apply">
          <ApplyToJobPage />
        </Route>
        <Route path="*">
          <Err404 />
        </Route>
      </Switch>
    </Router>
  );
}

const Err404 = () => {
  let history = useHistory();
  const handleClick = () => {
    history.push("/");
  }
  return (
    <Container className="text-center">
      <h2 className="my-3">This page does not exist</h2>
      <Button variant="info" size="lg" onClick={() => handleClick()}>Go home</Button>
    </Container>
  )
}

export default App;
