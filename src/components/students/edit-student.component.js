import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Validator from '../utils/validator';
import axios from 'axios';

export default class EditStudent extends Component {

    constructor(props) {
        super(props)

        this.onHandleInput = this.onHandleInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State
        this.state = {
            student_id: '',
            student_firstName: '',
            student_lastName: '',
            student_address: '',
            student_dob: '',
            errors: {}
        };

    };

    componentDidMount() {
        axios.get('http://localhost:4000/students/edit-student/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    id: res.data.id,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    address: res.data.address,
                    dob: res.data.dob
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    onHandleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onSubmit(e) {
        e.preventDefault();

        const studentObject = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            dob: this.state.dob
        };


        axios.put('http://localhost:4000/students/update-student/' + this.props.match.params.id, studentObject)
            .then((res) => {
                console.log(res.data)
                console.log('Student successfully updated');
                this.props.history.push('/student-list');
            }).catch((error) => {
            this.setState({
                errors: error.response.data
            })
        });
    };


    render() {
        const {errors} = this.state;
        return (
            <div className="form-wrapper">
                <h1 className="page-header">Update Student</h1>
                <Form onSubmit={this.onSubmit}>

                    <Form.Group controlId="ID">
                        <Form.Label>ID<span> *</span></Form.Label>
                        <Form.Control type="text" name="id" placeholder="ID" value={this.state.id}
                                      onChange={this.onHandleInput}/>
                        {errors.id && <div className="validation" style={{display: 'block'}}>{errors.id}</div>}
                    </Form.Group>

                    <Form.Group controlId="Name">
                        <Form.Label>First Name<span> *</span></Form.Label>
                        <Form.Control type="text" name="firstName" placeholder="First Name" value={this.state.firstName}
                                      onChange={this.onHandleInput}/>
                        {errors.firstName &&
                        <div className="validation" style={{display: 'block'}}>{errors.firstName}</div>}
                    </Form.Group>

                    <Form.Group controlId="Name">
                        <Form.Label>Last Name<span> *</span></Form.Label>
                        <Form.Control type="text" name="lastName" placeholder="Last Name" value={this.state.lastName}
                                      onChange={this.onHandleInput}/>
                        {errors.lastName &&
                        <div className="validation" style={{display: 'block'}}>{errors.lastName}</div>}
                    </Form.Group>

                    <Form.Group controlId="Address">
                        <Form.Label>Address<span> *</span></Form.Label>
                        <Form.Control type="textarea" name="address" placeholder="Address" value={this.state.address}
                                      onChange={this.onHandleInput}/>
                        {errors.address &&
                        <div className="validation" style={{display: 'block'}}>{errors.address}</div>}
                    </Form.Group>

                    <Form.Group controlId="Dob">
                        <Form.Label>Date Of Birth<span> *</span></Form.Label>
                        <Form.Control type="date" name="dob" value={this.state.dob} onChange={this.onHandleInput}/>
                        {errors.dob && <div className="validation" style={{display: 'block'}}>{errors.dob}</div>}
                    </Form.Group>

                    <Button variant="success" size="lg" block="block" type="submit">
                        Update Student
                    </Button>
                </Form>
            </div>);
    }
}
