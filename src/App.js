import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import logo from "./logo.jpg";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateStudent from "./components/students/create-student.component";
import EditStudent from "./components/students/edit-student.component";
import StudentList from "./components/students/student-list.component";
import CreateCourse from "./components/courses/create-course.component";
import EditCourse from "./components/courses/edit-course.component";
import CourseList from "./components/courses/course-list.component";
import CreateEnrolment from "./components/enrolments/create-enrolment.component";
import EditEnrolment from "./components/enrolments/edit-enrolment.component";
import EnrolmentList from "./components/enrolments/enrolment-list.component";
import Homepage from "./components/home";


function App() {
  return (<Router>
    <div className="App">
      <header className="App-header">
        <Navbar>
          <Container>

            <Navbar.Brand>
            <a className="navbar-brand" href="/">
              <img src={logo} width="125" height="125" alt="FIT PORTAL" />
            </a>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </Nav>

              <Nav>
                <Link to={"/course-list"} className="nav-link">
                  Courses
                </Link>
              </Nav>

              <Nav>
                <Link to={"/student-list"} className="nav-link">
                  Students
                </Link>
              </Nav>

              <Nav>
                <Link to={"/enrolment-list"} className="nav-link">
                  Enrolments
                </Link>
              </Nav>

            </Nav>

          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={Homepage} />
                <Route path="/create-student" component={CreateStudent} />
                <Route path="/edit-student/:id" component={EditStudent} />
                <Route path="/student-list" component={StudentList} />
                <Route path="/create-course" component={CreateCourse} />
                <Route path="/edit-course/:id" component={EditCourse} />
                <Route path="/course-list" component={CourseList} />
                <Route path="/create-enrolment" component={CreateEnrolment} />
                <Route path="/edit-enrolment/:id" component={EditEnrolment} />
                <Route path="/enrolment-list" component={EnrolmentList} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;