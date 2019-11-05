import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default class CourseTableRow extends Component {

    constructor(props) {
        super(props);
        this.deleteCourse = this.deleteCourse.bind(this);
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

    deleteCourse() {
        axios.delete('http://localhost:4000/courses/delete-course/' + this.props.obj._id)
            .then((res) => {
                console.log('Course successfully deleted!');
                this.close();
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <tr>
                <td>{this.props.obj.id}</td>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.prerequisites}</td>
                <td>
                    <Link className="edit-link" to={"/edit-course/" + this.props.obj._id}>
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
                            <Button onClick={this.deleteCourse} variant="danger">Delete</Button>
                        </Modal.Footer>
                    </Modal>
                </td>
            </tr>
        );
    }
}