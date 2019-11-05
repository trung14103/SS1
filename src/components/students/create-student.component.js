import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateStudent extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onHandleInput = this.onHandleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      address: '',
      dob: '',
      errors: {}
    };

  }

  onHandleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit(e) {
    e.preventDefault();

    const studentObject = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      dob: this.state.dob
    };


    axios.post('http://localhost:4000/students/create-student', studentObject)
      .then(res => {
        console.log(res.data);
        this.setState({
          id: '',
          firstName: '',
          lastName: '',
          address: '',
          dob: ''
        });
        this.props.history.push('/student-list');
      })
        .catch((err) => {
          this.setState({
            errors: err.response.data
          })
        });
  }

  render() {
    const {errors} = this.state;
    return (
      <div className="form-wrapper">
        <h1 className="page-header">Create Student</h1>
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="ID">
          <Form.Label>Student ID<span> *</span></Form.Label>
          <Form.Control type="number" name="id" placeholder="Student ID" value={this.state.id} onChange={this.onHandleInput}/>
          {errors.id && <div className="validation" style={{display: 'block'}}>{errors.id}</div>}
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>First Name<span> *</span></Form.Label>
          <Form.Control type="text" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.onHandleInput}/>
          {errors.firstName && <div className="validation" style={{display: 'block'}}>{errors.firstName}</div>}
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Last Name<span> *</span></Form.Label>
          <Form.Control type="text" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.onHandleInput}/>
          {errors.lastName && <div className="validation" style={{display: 'block'}}>{errors.lastName}</div>}
        </Form.Group>

        <Form.Group controlId="Address">
          <Form.Label>Address<span> *</span></Form.Label>
          <Form.Control type="textarea" name="address" placeholder="Address" value={this.state.address} onChange={this.onHandleInput} />
        {errors.address && <div className="validation" style={{display: 'block'}}>{errors.address}</div>}
        </Form.Group>

        <Form.Group controlId="Dob">
          <Form.Label>Date Of Birth<span> *</span></Form.Label>
          <Form.Control type="date" name="dob" value={this.state.dob} onChange={this.onHandleInput} />
          {errors.dob && <div className="validation" style={{display: 'block'}}>{errors.dob}</div>}
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Create Student
        </Button>
      </Form>
    </div>);
  }
}
