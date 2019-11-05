import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';
import StudentTableRow from './StudentTableRow';


export default class StudentList extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      students: [],
      currentPage: 1,
      recordsPerPage: 10,
    };
  }

  handleClick(e) {
    this.setState({
      currentPage: Number(e.target.id),
    });
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

  render() {
    const {students, currentPage, recordsPerPage} = this.state;
    const indexOfLast = currentPage * recordsPerPage;
    const indexOfFirst = indexOfLast - recordsPerPage;
    const currentRecords = students.slice(indexOfFirst, indexOfLast);

    const renderTable = currentRecords.map((res, index) => {
      return <StudentTableRow obj={res} key={index} />;
    })

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(students.length / recordsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <PageItem key={number} id={number} active={this.state.currentPage === number ? true : false} onClick={this.handleClick}>{number}</PageItem>
      );
    });
    return (
      <div className="table-wrapper">
        <div className="page-head">
        <div className="pghead3">
          <h1 className="page-head">Student List</h1>
        </div>
      </div>
      <Link className="create-link" to={"/create-student/"}>
      <Button size="lg" variant="primary">
          Create
        </Button>
        </Link> 
      <Table striped bordered hover>
        <thead className ="thead-color">
          <tr>
            <th>Student ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Date Of Birth</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {renderTable}
        </tbody>
      </Table>
      <Pagination className="pagination" size="md">
        {renderPageNumbers} 
      </Pagination>
    </div>);
  }
}