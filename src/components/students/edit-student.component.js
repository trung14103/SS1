import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Validator from '../utils/validator';
import axios from 'axios';

export default class EditStudent extends Component {

  constructor(props) {
    super(props)

    this.onHandleInput = this.onHandleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      student_id: '',
      student_firstName: '',
      student_lastName: '',
      student_address: '',
      student_dob: '',
      errors: {}
    };

    // Validation
    const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;
    const rules = [
      {
        field: 'student_firstName',
        method: 'isEmpty',
        validWhen: false,
        message: 'First Name field is required.',
      },
      {
        field: 'student_lastName',
        method: 'isEmpty',
        validWhen: false,
        message: 'Last Name field is required.',
      },
      {
        field: 'student_address',
        method: 'isEmpty',
        validWhen: false,
        message: 'Address field is required.',
      },
      {
        field: 'student_dob',
        method: 'isEmpty',
        validWhen: false,
        message: 'Date of Birth is required.',
      }
    ];
    this.validator = new Validator(rules);
  };

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
      });
  };

  onHandleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit(e) {
    e.preventDefault();

    const studentObject = {
      student_id: this.state.student_id,
      student_firstName: this.state.student_firstName,
      student_lastName: this.state.student_lastName,
      student_address: this.state.student_address,
      student_dob: this.state.student_dob
    };

    this.setState({
      errors: this.validator.validate(this.state),
    });

    axios.put('http://localhost:4000/students/update-student/' + this.props.match.params.id, studentObject)
      .then((res) => {
        console.log(res.data)
        console.log('Student successfully updated');
        this.props.history.push('/student-list');
      }).catch((error) => {
        console.log(error);
      });
  };


  render() {
    const {errors} = this.state;
    return (
      <div className="form-wrapper">
      <h1 className="page-header">Update Student</h1>
      <Form onSubmit={this.onSubmit}>
      <Form.Group controlId="Name">
          <Form.Label>Student ID<span> *</span></Form.Label>
          <Form.Control type="number" id="disabledInput" disabled value={this.state.student_id} />
          </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>First Name<span> *</span></Form.Label>
          <Form.Control type="text" name="student_firstName" placeholder="First Name" value={this.state.student_firstName} onChange={this.onHandleInput}/>
          {errors.student_firstName && <div className="validation" style={{display: 'block'}}>{errors.student_firstName}</div>}
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Last Name<span> *</span></Form.Label>
          <Form.Control type="text" name="student_lastName" placeholder="Last Name" value={this.state.student_lastName} onChange={this.onHandleInput}/>
          {errors.student_lastName && <div className="validation" style={{display: 'block'}}>{errors.student_lastName}</div>}
        </Form.Group>

        <Form.Group controlId="Address">
          <Form.Label>Address<span> *</span></Form.Label>
          <Form.Control type="textarea" name="student_address" placeholder="Address" value={this.state.student_address} onChange={this.onHandleInput} />
        {errors.student_address && <div className="validation" style={{display: 'block'}}>{errors.student_address}</div>}
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Date Of Birth<span> *</span></Form.Label>
          <Form.Control type="date" name="student_dob" value={this.state.student_dob} onChange={this.onHandleInput} />
          {errors.student_dob && <div className="validation" style={{display: 'block'}}>{errors.student_dob}</div>}
        </Form.Group>

        <Button variant="success" size="lg" block="block" type="submit">
          Update Student
        </Button>
      </Form>
    </div>);
  }
}
