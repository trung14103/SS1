import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Moment from 'react-moment';
import Modal from 'react-bootstrap/Modal';

export default class StudentTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.state = {
            showModal: false
        };
    }

    close() {
        this.setState({ showModal: false });
    }
    
    open() {
        this.setState({ showModal: true });
    }

    deleteStudent(e) {
        e.preventDefault();
        axios.delete('http://localhost:4000/students/delete-student/' + this.props.obj._id)
            .then((res) => {
                console.log('Student successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.student_id}</td>
                <td>{this.props.obj.student_firstName}</td>
                <td>{this.props.obj.student_lastName}</td>
                <td>{this.props.obj.student_address}</td>
                <td><Moment format="DD/MM/YYYY">{this.props.obj.student_dob}</Moment></td>
                <td>
                    <Link className="edit-link" to={"/edit-student/" + this.props.obj._id}>
                        Edit
                    </Link>
                    <Button onClick={this.open} size="sm" variant="danger">Delete</Button>
                    <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Record</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this record ?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close} variant="dark">Cancel</Button>
                            <Button onClick={this.deleteStudent} variant="danger">Delete</Button>
                        </Modal.Footer>
                    </Modal>
                </td>
            </tr>
        );
    }
}