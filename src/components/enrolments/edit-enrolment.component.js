import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditEnrolment extends Component {

  constructor(props) {
    super(props)

    this.onChangeStudent = this.onChangeStudent.bind(this);
    this.onChangeCourse = this.onChangeCourse.bind(this);
    this.onChangeSemester = this.onChangeSemester.bind(this);
    this.onChangeFinalGrade = this.onChangeFinalGrade.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      student: '',
      course: '',
      semester: '',
      finalGrade: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/students/edit-enrolment/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          student: res.data.student,
          course: res.data.course,
          semester: res.data.semester,
          finalGrade: res.data.finalGrade
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeStudent(e) {
    this.setState({ student: e.target.value })
  }

  onChangeCourse(e) {
    this.setState({ course: e.target.value })
  }

  onChangeSemester(e) {
    this.setState({ semester: e.target.value })
  }

  onChangeFinalGrade(e) {
    this.setState({ finalGrade: e.target.value })
  }


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
        console.log(res.data)
        console.log('Enrolment successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    this.props.history.push('/enrolment-list');
  }


  render() {
    return (<div className="form-wrapper">
      <h1 className="page-header">Update Enrolment</h1>
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Id">
          <Form.Label>Student</Form.Label>
          <Form.Control type="number" value={this.state.student} onChange={this.onChangeStudent} required/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Course</Form.Label>
          <Form.Control type="text" value={this.state.course} onChange={this.onChangeCourse} required/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Semester</Form.Label>
          <Form.Control as="select" value={this.state.semester} onChange={this.onChangeSemester} required>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Final Grade</Form.Label>
          <Form.Control as="select" value={this.state.finalGrade} onChange={this.onChangeFinalGrade} required>
            <option>P</option>
            <option>G</option>
            <option>E</option>
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
