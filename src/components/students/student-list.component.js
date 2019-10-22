import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import StudentTableRow from './StudentTableRow';


export default class StudentList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      students: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/students/')
      .then(res => {
        this.setState({
          students: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  componentDidUpdate() {
    axios.get('http://localhost:4000/students/')
      .then(res => {
          this.setState({
            students: res.data
          });
      })
      .catch((error) =>{
          console.log(error);
      })   
  }

  DataTable() {
    return this.state.students.map((res, i) => {
      return <StudentTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      <Link className="create-link" to={"/create-student/"}>
      <Button size="lg" variant="primary">
          Create
        </Button>
        </Link> 
      <Table striped bordered hover>
        <thead>
          <tr className ="info">
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Date Of Birth</th>
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