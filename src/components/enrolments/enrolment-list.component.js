import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';
import EnrolmentTableRow from './EnrolmentTableRow';


export default class EnrolmentList extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      enrolments: [],
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

  render() {
    const {enrolments, currentPage, recordsPerPage} = this.state;
    const indexOfLast = currentPage * recordsPerPage;
    const indexOfFirst = indexOfLast - recordsPerPage;
    const currentRecords = enrolments.slice(indexOfFirst, indexOfLast);

    const renderTable = currentRecords.map((res, index) => {
      return <EnrolmentTableRow obj={res} key={index} />;
    })

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(enrolments.length / recordsPerPage); i++) {
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
      <div className="pghead1">
        <h1 className="page-head">Enrolment List</h1>
        </div>
      </div>
      <Link className="create-link" to={"/create-enrolment/"}>
      <Button variant="primary" size="lg">
          Create
        </Button>
        </Link> 
      <Table striped bordered hover>
        <thead className="thead-color">
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Semester</th>
            <th>Final Grade</th>
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