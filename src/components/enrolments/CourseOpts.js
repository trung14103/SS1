import React, { Component } from 'react';

export default class StudentOpts extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <option>{this.props.obj.id}</option>       
        );
    }
}