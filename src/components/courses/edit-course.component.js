import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditCourse extends Component {

  constructor(props) {
    super(props)

    this.onChangeCourseId = this.onChangeCourseId.bind(this);
    this.onChangeCourseName = this.onChangeCourseName.bind(this);
    this.onChangeCoursePre = this.onChangeCoursePre.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    // State
    this.state = {
      course_id: '',
      course_name: '',
      course_prerequisites: '',
    }
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

    axios.put('http://localhost:4000/courses/update-course/' + this.props.match.params.id, courseObject)
      .then((res) => {
        console.log(res.data)
        console.log('Course successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    this.props.history.push('/course-list')
  }


  render() {
    return (<div className="form-wrapper">
      <h1 className="page-header">Update Course</h1>
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Course Id<span> *</span></Form.Label>
          <Form.Control type="number" value={this.state.course_id} onChange={this.onChangeCourseId} required/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Course Name<span> *</span></Form.Label>
          <Form.Control type="text" value={this.state.course_name} onChange={this.onChangeCourseName} required/>
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Prerequisites</Form.Label>
          <Form.Control type="text" value={this.state.course_prerequisites} onChange={this.onChangeCoursePre} />
        </Form.Group>

        <Button variant="success" size="lg" block="block" type="submit">
          Update Course
        </Button>
      </Form>
    </div>);
  }
}
