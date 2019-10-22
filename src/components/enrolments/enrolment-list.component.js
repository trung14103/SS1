import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import EnrolmentTableRow from './EnrolmentTableRow';


export default class EnrolmentList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      enrolments: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/enrolments/')
      .then(res => {
        this.setState({
          enrolments: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  componentDidUpdate() {
    axios.get('http://localhost:4000/enrolments/')
      .then(res => {
          this.setState({
            enrolments: res.data
          });
      })
      .catch((error) =>{
          console.log(error);
      })   
  }

  DataTable() {
    return this.state.enrolments.map((res, i) => {
      return <EnrolmentTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      <Link className="create-link" to={"/create-enrolment/"}>
      <Button variant="primary" size="lg">
          Create
        </Button>
        </Link> 
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Semester</th>
            <th>Final Grade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}