import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class EditCourse extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onHandleInput = this.onHandleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      id: '',
      name: '',
      prerequisites: '',
      errors: {}
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/courses/edit-course/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          id: res.data.id,
          name: res.data.name,
          prerequisites: res.data.prerequisites
        });
      })
      .catch((error) => {
        this.setState({
          errors: error.response.data
        })
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
      id: this.state.id,
      name: this.state.name,
      prerequisites: this.state.prerequisites
    };


    axios.put('http://localhost:4000/courses/update-course/' + this.props.match.params.id, courseObject)
      .then((res) => {
        console.log(res.data)
        // console.log('Course successfully updated');
        this.props.history.push('/course-list');
      }).catch((error) => {
        this.setState({
          errors: error.response.data
        })
      });  
  }


  render() {
    const {errors} = this.state;
    return (
    <div className="form-wrapper">
      <h1 className="page-header">Update Course</h1>
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="ID">
          <Form.Label>Course Id<span> *</span></Form.Label>
          <Form.Control className={"disabledInput"} type="text" name ="id" placeholder="Course ID"value={this.state.id} onChange={this.onHandleInput} required/>
          {errors.id && <div className="validation" style={{display: 'block'}}>{errors.id}</div>}
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Course Name<span> *</span></Form.Label>
          <Form.Control type="text" name = "name" placeholder="Course Name" value={this.state.name} onChange={this.onHandleInput} required/>
          {errors.name && <div className="validation" style={{display: 'block'}}>{errors.name}</div>}
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Prerequisites</Form.Label>
          <Form.Control type="text" name ="prerequisites" placeholder="Prerequisites" value={this.state.prerequisites} onChange={this.onHandleInput} />
        </Form.Group>

        <Button variant="success" size="lg" block="block" type="submit">
          Update Course
        </Button>
      </Form>
    </div>);
  }
}
