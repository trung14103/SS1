import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditStudent extends Component {

  constructor(props) {
    super(props)

    this.onChangeStudentFirstName = this.onChangeStudentFirstName.bind(this);
    this.onChangeStudentLastName = this.onChangeStudentLastName.bind(this);
    this.onChangeStudentAddr = this.onChangeStudentAddr.bind(this);
    this.onChangeStudentDob = this.onChangeStudentDob.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      student_id: '',
      student_firstName: '',
      student_lastName: '',
      student_address: '',
      student_dob: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/students/edit-student/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          student_id: res.data.student_id,
          student_firstName: res.data.student_firstName,
          student_lastName: res.data.student_lastName,
          student_address: res.data.student_address,
          student_dob: res.data.student_dob
        });
      })
      .catch((error) => {
        console.log(error);
      })
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
    e.preventDefault()

    const studentObject = {
      student_id: this.state.student_id,
      student_firstName: this.state.student_firstName,
      student_lastName: this.state.student_lastName,
      student_address: this.state.student_address,
      student_dob: this.state.student_dob
    };

    axios.put('http://localhost:4000/students/update-student/' + this.props.match.params.id, studentObject)
      .then((res) => {
        console.log(res.data)
        console.log('Student successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    this.props.history.push('/student-list')
  }


  render() {
    return (<div className="form-wrapper">
      <h1 className="page-header">Update Student</h1>
      <Form onSubmit={this.onSubmit}>
      <Form.Group controlId="Name">
          <Form.Label>Student ID</Form.Label>
          <Form.Control type="number" id="disabledInput" disabled value={this.state.student_id}/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" value={this.state.student_firstName} onChange={this.onChangeStudentFirstName} required/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" value={this.state.student_lastName} onChange={this.onChangeStudentLastName} required/>
        </Form.Group>

        <Form.Group controlId="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={this.state.student_address} onChange={this.onChangeStudentAddr} required/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Date Of Birth</Form.Label>
          <Form.Control type="date" value={this.state.student_dob} onChange={this.onChangeStudentDob} required/>
        </Form.Group>
        <Button variant="success" size="lg" block="block" type="submit">
          Update Student
        </Button>
      </Form>
    </div>);
  }
}
