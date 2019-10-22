import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class CreateCourse extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeCourseId = this.onChangeCourseId.bind(this);
    this.onChangeCourseName = this.onChangeCourseName.bind(this);
    this.onChangeCoursePre = this.onChangeCoursePre.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      course_id: '',
      course_name: '',
      course_prerequisites: '',
    }
  }

  onChangeCourseId(e) {
    this.setState({ course_id: e.target.value })
  }

  onChangeCourseName(e) {
    this.setState({ course_name: e.target.value })
  }

  onChangeCoursePre(e) {
    this.setState({ course_prerequisites: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const courseObject = {
      course_id: this.state.course_id,
      course_name: this.state.course_name,
      course_prerequisites: this.state.course_prerequisites
    };

    axios.post('http://localhost:4000/courses/create-course', courseObject)
      .then(res => console.log(res.data));

    this.setState({
      course_id: '',
      course_name: '',
      course_prerequisites: '',
    });

    this.props.history.push('/course-list');
  }

  render() {
    return (<div className="form-wrapper">
      <h1 className="page-header">Create Course</h1>
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Course Id</Form.Label>
          <Form.Control type="number" placeholder="Course ID"value={this.state.course_id} onChange={this.onChangeCourseId} required/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Course Name</Form.Label>
          <Form.Control type="text" placeholder="Course Name" value={this.state.course_name} onChange={this.onChangeCourseName} required/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Prerequisites</Form.Label>
          <Form.Control type="text" placeholder="Prerequisites" value={this.state.course_prerequisites} onChange={this.onChangeCoursePre} required/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Create Course
        </Button>
      </Form>
    </div>);
  }
}
