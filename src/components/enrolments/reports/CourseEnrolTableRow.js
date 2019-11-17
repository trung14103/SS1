import React, { Component } from 'react';

export default class EnrolmentTableRow extends Component {

    constructor(props) {
        super(props);
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