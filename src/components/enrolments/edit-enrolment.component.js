import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Validator from '../utils/validator';
import axios from 'axios';
import StudentOpts from './StudentOpts';
import CourseOpts from './CourseOpts';

export default class EditEnrolment extends Component {

  constructor(props) {
    super(props)

    this.onHandleInput = this.onHandleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      student: '',
      course: '',
      semester: '',
      finalGrade: '',
      students : [],
      courses: [],
      errors: {}
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/enrolments/edit-enrolment/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          student: res.data.studentRef.id,
          course: res.data.courseRef.id,
          semester: res.data.semester,
          finalGrade: res.data.finalGrade
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get('http://localhost:4000/students/')
      .then(response => {
        this.setState({
          students: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get('http://localhost:4000/courses/')
      .then(response => {
        this.setState({
          courses: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onHandleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit(e) {
    e.preventDefault()

    const enrolmentObject = {
      student: this.state.student,
      course: this.state.course,
      semester: this.state.semester,
      finalGrade: this.state.finalGrade
    };

    axios.put('http://localhost:4000/enrolments/update-enrolment/' + this.props.match.params.id, enrolmentObject)
      .then((res) => {
        console.log(res.data);
        // console.log('Enrolment successfully updated');
        this.props.history.push('/enrolment-list');
      }).catch((error) => {
        this.setState({
          errors: error.response.data
        })
      })
  }

  StudentOpts() {
    return this.state.students.map((response,i) => {
      return <StudentOpts obj={response} key={i}/>;
    });
  }

  CourseOpts() {
    return this.state.courses.map((response,i) => {
      return <CourseOpts obj={response} key={i}/>;
    });
  }

  render() {
    const {errors} = this.state;
    return (
      <div className="form-wrapper">
      <h1 className="page-header">Update Enrolment</h1>
      <Form onSubmit={this.onSubmit}>
      <Form.Group controlId="Id">
          <Form.Label>Student<span> *</span></Form.Label>
          <Form.Control type="number" name="student" list="student-id-opts" placeholder="Student ID" value={this.state.student} onChange={this.onHandleInput} autoComplete="off"/>
           <datalist id="student-id-opts">{this.StudentOpts()}</datalist>
           {errors.student && <div className="validation" style={{display: 'block'}}>{errors.student}</div>}
      </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Course<span> *</span></Form.Label>
          <Form.Control type="text" name="course" list="course-id-opts" placeholder="Course ID" value={this.state.course} onChange={this.onHandleInput} autoComplete="off"/>
          <datalist id="course-id-opts">{this.CourseOpts()}</datalist>
          {errors.course && <div className="validation" style={{display: 'block'}}>{errors.course}</div>}
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Semester<span> *</span></Form.Label>
          <Form.Control as="select" name="semester" value={this.state.semester} onChange={this.onHandleInput}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </Form.Control>
          {errors.semester && <div className="validation" style={{display: 'block'}}>{errors.semester}</div>}
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Final Grade</Form.Label>
          <Form.Control as="select" name="finalGrade" value={this.state.finalGrade} onChange={this.onHandleInput}>
            <option>Not Graded</option>
            <option>P</option>
            <option>E</option>
            <option>G</option>
            <option>F</option>
          </Form.Control>
        </Form.Group>

        <Button variant="success" size="lg" block="block" type="submit">
          Update Enrolment
        </Button>
      </Form>
    </div>);
  }
}
