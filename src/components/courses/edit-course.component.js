import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Validator from '../utils/validator';
import axios from 'axios';

export default class EditCourse extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onHandleInput = this.onHandleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      course_id: '',
      course_name: '',
      course_prerequisites: '',
      errors: {}
    };

    // Validation
    const requiredWith = (value, field, state) => (!state[field] && !value) || !!value;
    const rules = [
      {
        field: 'course_id',
        method: 'isEmpty',
        validWhen: false,
        message: 'Course ID field is required.',
      },
      {
        field: 'course_name',
        method: 'isEmpty',
        validWhen: false,
        message: 'Course Name field is required.',
      },
    ];
    this.validator = new Validator(rules);
  }

  componentDidMount() {
    axios.get('http://localhost:4000/courses/edit-course/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          course_id: res.data.course_id,
          course_name: res.data.course_name,
          course_prerequisites: res.data.course_prerequisites
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onHandleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit(e) {
    e.preventDefault()

    const courseObject = {
      course_id: this.state.course_id,
      course_name: this.state.course_name,
      course_prerequisites: this.state.course_prerequisites
    };

    this.setState({
      errors: this.validator.validate(this.state),
    });

    axios.put('http://localhost:4000/courses/update-course/' + this.props.match.params.id, courseObject)
      .then((res) => {
        console.log(res.data)
        console.log('Course successfully updated');
        this.props.history.push('/course-list');
      }).catch((error) => {
        console.log(error);
      });  
  }


  render() {
    const {errors} = this.state;
    return (
    <div className="form-wrapper">
      <h1 className="page-header">Update Course</h1>
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Course Id<span> *</span></Form.Label>
          <Form.Control type="number" placeholder="Course ID"value={this.state.course_id} onChange={this.onHandleInput} required/>
          {errors.course_id && <div className="validation" style={{display: 'block'}}>{errors.course_id}</div>}
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Course Name<span> *</span></Form.Label>
          <Form.Control type="text" placeholder="Course Name" value={this.state.course_name} onChange={this.onHandleInput} required/>
          {errors.course_name && <div className="validation" style={{display: 'block'}}>{errors.course_name}</div>}
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Prerequisites</Form.Label>
          <Form.Control type="text" placeholder="Prerequisites" value={this.state.course_prerequisites} onChange={this.onHandleInput} />
        </Form.Group>

        <Button variant="success" size="lg" block="block" type="submit">
          Update Course
        </Button>
      </Form>
    </div>);
  }
}
