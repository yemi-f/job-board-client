import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import JobsTable2 from "./components/JobsTable2";
import AppNavbar from "./components/AppNavbar";
import SignInPage from "./pages/SignInPage"
import React, { useEffect, useState } from 'react';
import JobPage from './pages/JobPage';
import ApplyToJobPage from './pages/ApplyToJobPage';
import axios from 'axios';
import SubmittedApplicationsPage from './pages/SubmittedApplicationsPage';
import AddNewJobPage from './pages/AddNewJobPage';

import { Container } from 'react-bootstrap';

// axios.defaults.baseURL = `https://job-board-xc23d56.herokuapp.com`;
axios.defaults.baseURL = `http://localhost:5000`

function App() {
  const [jobs, setJobs] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tok, setTok] = useState("");

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

  const updateTok = (str) => {
    setTok(str)
  }

  return (
    <Router className="App">
      <AppNavbar isAuthenticated={isAuthenticated} tok={tok} updateAuthenticatedState={updateAuthenticatedState} />
      <Switch>
        <Route exact path="/">
          <JobsTable2 jobs={jobs} />
        </Route>
        <Route exact path="/page/:id">
          <JobsTable2 jobs={jobs} />
        </Route>
        <Route path="/admin/signin">
          <SignInPage jobs={jobs} login={login} tok={tok} updateTok={updateTok} />
        </Route>
        <Route path="/admin/applicants">
          <SubmittedApplicationsPage tok={tok} />
        </Route>
        <Route path="/admin/add-new-job">
          <AddNewJobPage tok={tok} />
        </Route>
        <Route exact path="/:id">
          <JobPage />
        </Route>
        <Route exact path="/:id/apply">
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
  return (
    <Container>
      <h4>This page does not exist</h4>
    </Container>
  )
}

export default App;
