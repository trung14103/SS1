import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default class EnrolmentTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteEnrolment = this.deleteEnrolment.bind(this);
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

    deleteEnrolment() {
        axios.delete('http://localhost:4000/enrolments/delete-enrolment/' + this.props.obj._id)
            .then((res) => {
                console.log('Enrolment successfully deleted!')
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.student}</td>
                <td>{this.props.obj.course}</td>
                <td>{this.props.obj.semester}</td>
                <td>{this.props.obj.finalGrade}</td>
                <td>
                    <Link className="edit-link" to={"/edit-enrolment/" + this.props.obj._id}>
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
                            <Button onClick={this.deleteEnrolment} variant="danger">Delete</Button>
                        </Modal.Footer>
                    </Modal>
                </td>
            </tr>
        );
    }
}