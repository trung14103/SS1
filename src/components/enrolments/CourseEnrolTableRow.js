import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default class EnrolmentTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <tr>
                <td>{this.props.obj.courseRef.id}</td>
                <td>{this.props.obj.courseRef.name}</td>
                <td>{this.props.obj.courseRef.prerequisites}</td>
            </tr>
        );
    }
}