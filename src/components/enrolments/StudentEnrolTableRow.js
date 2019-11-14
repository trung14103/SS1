import React, { Component } from 'react';

export default class EnrolmentTableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <tr>
                <td>{this.props.obj.studentRef.id}</td>
                <td>{this.props.obj.studentRef.firstName + ' ' + this.props.obj.studentRef.lastName}</td>
                <td>{this.props.obj.studentRef.address}</td>
                <td>{this.props.obj.semester}</td>
                <td>{this.props.obj.finalGrade}</td>
            </tr>
        );
    }
}