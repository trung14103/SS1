import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateStudent extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeStudentId = this.onChangeStudentId.bind(this);
    this.onChangeStudentFirstName = this.onChangeStudentFirstName.bind(this);
    this.onChangeStudentLastName = this.onChangeStudentLastName.bind(this);
    this.onChangeStudentAddr = this.onChangeStudentAddr.bind(this);
    this.onChangeStudentDob = this.onChangeStudentDob.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      student_id: '',
      student_firstName: '',
      student_lastName: '',
      student_address: '',
      student_dob: ''
    }
  }

  onChangeStudentId(e) {
    this.setState({ student_id: e.target.value })
  }

  onChangeStudentFirstName(e) {
    this.setState({ student_firstName: e.target.value })
  }

  onChangeStudentLastName(e) {
    this.setState({ student_lastName: e.target.value })
  }

  onChangeStudentAddr(e) {
    this.setState({ student_address: e.target.value })
  }

  onChangeStudentDob(e) {
    this.setState({ student_dob: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();

    const studentObject = {
      student_id: this.state.student_id,
      student_firstName: this.state.student_firstName,
      student_lastName: this.state.student_lastName,
      student_address: this.state.student_address,
      student_dob: this.state.student_dob
    };

    axios.post('http://localhost:4000/students/create-student', studentObject)
      .then(res => console.log(res.data));

    this.setState({
      student_id: '',
      student_firstName: '',
      student_lastName: '',
      student_address: '',
      student_dob: ''
    });

    this.props.history.push('/student-list');
  }

  render() {
    return (<div className="form-wrapper">
            <h1 className="page-header">Create Student</h1>
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Student ID</Form.Label>
          <Form.Control type="number" placeholder="Student ID" value={this.state.student_id} onChange={this.onChangeStudentId} required/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="First Name" value={this.state.student_firstName} onChange={this.onChangeStudentFirstName} required/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Last Name" value={this.state.student_lastName} onChange={this.onChangeStudentLastName} required/>
        </Form.Group>

        <Form.Group controlId="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Address" value={this.state.student_address} onChange={this.onChangeStudentAddr} required/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Date Of Birth</Form.Label>
          <Form.Control type="date" value={this.state.student_dob} onChange={this.onChangeStudentDob} required/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Create Student
        </Button>
      </Form>
    </div>);
  }
}
