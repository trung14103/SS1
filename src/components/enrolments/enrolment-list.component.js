import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import EnrolmentTableRow from './EnrolmentTableRow';
import StudentEnrolTableRow from "./StudentEnrolTableRow";
import CourseEnrolTableRow from "./CourseEnrolTableRow";
import StudentOpts from './StudentOpts';
import CourseOpts from './CourseOpts';



export default class EnrolmentList extends Component {

  constructor(props) {
    super(props)
    this.onSubmitCourse = this.onSubmitCourse.bind(this);
    this.onSubmitStudent = this.onSubmitStudent.bind(this);
    this.onHandleInput = this.onHandleInput.bind(this);
    this.closeCourse = this.closeCourse.bind(this);
    this.closeStudent = this.closeStudent.bind(this);
    this.openStudentView = this.openStudentView.bind(this);
    this.openCourseView = this.openCourseView.bind(this);
    this.state = {
      enrolments: [],
      showModalCourse: false,
      showModalStudent: false,
      errors: {},
      student_id: '',
      course_id: '',
      courseEnrol: [],
      studentEnrol: [],
      students : [],
      courses: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/enrolments/')
        .then(res => {
          this.setState({
            enrolments: res.data
          });
        })
        .catch((error) => {
          console.log(error);
        });
    axios.get('http://localhost:4000/students/')
        .then(res => {
          this.setState({
            students: res.data
          });
        })
        .catch((error) => {
          console.log(error);
        });
    axios.get('http://localhost:4000/courses/')
        .then(res => {
          this.setState({
            courses: res.data
          });
        })
        .catch((error) => {
          console.log(error);
        });
  }
  componentDidUpdate() {
    axios.get('http://localhost:4000/enrolments/')
        .then(res => {
          this.setState({
            enrolments: res.data
          });
        })
        .catch((error) =>{
          console.log(error);
        })
  }

  onHandleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmitStudent(e) {
    e.preventDefault()

    const studentObject = {
      student_id: this.state.student_id,
    };


    axios.post('http://localhost:4000/enrolments/student-enrol_course', studentObject)
        .then(res => {
          console.log(res.data);

          this.setState({
            student_id: '',
            courseEnrol: res.data,
            errors: {}
          });
        })
        .catch((err) => {
          this.setState({
            errors: err.response.data,
            courseEnrol: []
          })
        });

  }

  onSubmitCourse(e) {
    e.preventDefault()

    const courseObject = {
      course_id: this.state.course_id,
    };


    axios.post('http://localhost:4000/enrolments/course-enrolled-students', courseObject)
        .then(res => {

          this.setState({
            course_id: '',
            studentEnrol: res.data,
            errors: {}
          });
          console.log(this.state.studentEnrol)
        })
        .catch((err) => {
          this.setState({
            errors: err.response.data,
            studentEnrol: []
          })
        });

  }


  DataTable() {
    return this.state.enrolments.map((res, i) => {
      return <EnrolmentTableRow obj={res} key={i} />;
    });
  }

  courseTable() {
    return this.state.courseEnrol.map((res, i) => {
      return <CourseEnrolTableRow obj={res} key={i} />
    })
  }

  studentTable() {
    return this.state.studentEnrol.map((res, i) => {
      return <StudentEnrolTableRow obj={res} key={i} />
    })
  }

  closeCourse() {
    this.setState({
      showModalCourse: false,
      studentEnrol: [],
      errors: {}
    });
  }

  closeStudent() {
    this.setState({
      showModalStudent: false,
      courseEnrol: [],
      errors: {}
    });
  }

  openStudentView() {
    this.setState({ showModalStudent: true });
  }

  openCourseView() {
    this.setState({ showModalCourse: true });
  }

  StudentOpts() {
    return this.state.students.map((res,i) => {
      return <StudentOpts obj={res} key={i}/>;
    });
  }

  CourseOpts() {
    return this.state.courses.map((res,i) => {
      return <CourseOpts obj={res} key={i}/>;
    });
  }


  render() {
    const {errors} = this.state;
    return (
        <div className="table-wrapper">
          <div className="page-head">
            <div className="pghead1">
              <h1 className="page-head">Enrolment List</h1>
            </div>
          </div>
      <Link to={"/failed-students"}><Button size="sm" className="advbtn" variant="danger">View Failed Students</Button></Link>

      <Button className="advbtn" onClick={this.openCourseView} size="sm" variant="danger">View Course Enrolments</Button>
      <Modal show={this.state.showModalCourse} onHide={this.closeCourse}>
        <Modal.Header closeButton>
          <Modal.Title>Course Enrolments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="Name">
              <Form.Label>Course ID<span> *</span></Form.Label>
              <Form.Control type="number" name="course_id" list="course-id-opts" placeholder="Course ID"
                            value={this.state.course_id} onChange={this.onHandleInput} autoComplete="off"/>
              <datalist id="course-id-opts">{this.CourseOpts()}</datalist>
              {errors.course_id &&
              <div className="validation" style={{display: 'block'}}>{errors.course_id}</div>}
              <Table striped bordered hover>
                <thead className ="thead-skyblue">
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Student Address</th>
                  <th>Semester</th>
                  <th>Final Grade</th>
                </tr>
                </thead>
                <tbody>
                {this.studentTable()}
                </tbody>
              </Table>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeCourse} variant="dark">Cancel</Button>
          <Button onClick={this.onSubmitCourse} variant="danger">View</Button>
        </Modal.Footer>
      </Modal>

      <Button className="advbtn" onClick={this.openStudentView} size="sm" variant="danger">View Student Enrolments</Button>
      <Modal show={this.state.showModalStudent} onHide={this.closeStudent}>
        <Modal.Header closeButton>
          <Modal.Title>Student Enrolments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="studentID">
              <Form.Label>Student ID<span> *</span></Form.Label>
              <Form.Control type="number" name="student_id" list="student-id-opts" placeholder="Student ID"
                            value={this.state.student_id} onChange={this.onHandleInput} autoComplete="off"/>
              <datalist id="student-id-opts">{this.StudentOpts()}</datalist>
              {errors.student_id &&
              <div className="validation" style={{display: 'block'}}>{errors.student_id}</div>}
              <Table striped bordered hover>
                <thead className ="thead-skyblue">
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Prerequisites</th>
                </tr>
                </thead>
                <tbody>
                {this.courseTable()}
                </tbody>
              </Table>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeStudent} variant="dark">Cancel</Button>
          <Button onClick={this.onSubmitStudent} variant="danger">View</Button>
        </Modal.Footer>
      </Modal>
          <Link to={"/sorted-enrolments/"}>
            <Button variant="primary" className="advbtn">
              Sorted List
            </Button>
          </Link>
      <Link className="create-link" to={"/create-enrolment/"}>
        <Button variant="primary" size="lg">
          Create
        </Button>
      </Link>
      <Table striped bordered hover>
        <thead className ="thead-color">
        <tr>
          <th>Student</th>
          <th>Course</th>
          <th>Semester</th>
          <th>Final Grade</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}

