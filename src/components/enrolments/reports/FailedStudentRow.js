import React, { Component } from 'react';

export default class EnrolmentTableRow extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <tr>
                <td>{this.props.obj.studentRef.id}</td>
                <td>{this.props.obj.studentRef.lastName + ' ' + this.props.obj.studentRef.firstName}</td>
                <td>{this.props.obj.courseRef.name}</td>
                <td>{this.props.obj.semester}</td>
                <td>{this.props.obj.finalGrade}</td>
            </tr>
        );
    }
}