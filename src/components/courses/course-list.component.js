import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import CourseTableRow from './CourseTableRow';


export default class CourseList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/courses/')
      .then(res => {
        this.setState({
          courses: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentDidUpdate() {
    axios.get('http://localhost:4000/courses/')
      .then(res => {
          this.setState({
            courses: res.data
          });
      })
      .catch((error) =>{
          console.log(error);
      })   
  }

  DataTable() {
    return this.state.courses.map((res, i) => {
      return <CourseTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (
    <div className="table-wrapper">
      <div className="page-head">
        <div className="pghead2">
          <h1 className="page-head">Course List</h1>
        </div>
      </div>
      <Link className="create-link" to={"/create-course/"}>
      <Button size="lg" variant="primary">
          Create
        </Button>
        </Link> 
      <Table striped bordered hover>
        <thead className="thead-color">
          <tr>
            <th>Course ID</th>
            <th>Course Name</th>
            <th>Prerequisites</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}