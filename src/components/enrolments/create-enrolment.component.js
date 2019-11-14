import React, {Component} from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Validator from '../utils/validator';
import axios from 'axios';
import StudentOpts from './StudentOpts';
import CourseOpts from './CourseOpts';


export default class CreateEnrolment extends Component {

    constructor(props) {
        super(props)

        this.onHandleInput = this.onHandleInput.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // State
        this.state = {
            student: '',
            course: '',
            semester: '',
            finalGrade: '',
            Student: '',
            students: [],
            courses: [],
            errors: {}
        }
    }

    onHandleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onSubmit(e) {
        e.preventDefault()

        const enrolmentObject = {
            student: this.state.student,
            course: this.state.course,
            semester: this.state.semester,
            finalGrade: this.state.finalGrade,
            Student: this.state.Student
        };


        axios.post('http://localhost:4000/enrolments/create-enrolment', enrolmentObject)
            .then(res => {
                console.log(res.data);

                this.setState({
                    student: '',
                    course: '',
                    semester: '',
                    finalGrade: '',
                    Student: ''
                });

                this.props.history.push('/enrolment-list');
            })
            .catch((err) => {
                this.setState({
                    errors: err.response.data
                })
            });

    }

    componentDidMount() {
        axios.get('http://localhost:4000/students/')
            .then(response => {
                this.setState({
                    students: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('http://localhost:4000/courses/')
            .then(response => {
                this.setState({
                    courses: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    StudentOpts() {
        return this.state.students.map((response, i) => {
            return <StudentOpts obj={response} key={i}/>;
        });
    }

    CourseOpts() {
        return this.state.courses.map((response, i) => {
            return <CourseOpts obj={response} key={i}/>;
        });
    }

    render() {
        const {errors} = this.state;
        return (
            <div className="form-wrapper">
                <h1 className="page-header">Create Enrolment</h1>
                <Form onSubmit={this.onSubmit}>

                    <Form.Group controlId="Student">
                        <Form.Control type="text" name ="Student" value={this.state.Student} onChange={this.onHandleInput} style={{display: 'none'}}/>
                    </Form.Group>
                    <Form.Group controlId="Id">
                        <Form.Label>Student<span> *</span></Form.Label>
                        <Form.Control type="number" name="student" list="student-id-opts" placeholder="Student ID"
                                      value={this.state.student} onChange={this.onHandleInput} autoComplete="off"/>
                        <datalist id="student-id-opts">{this.StudentOpts()}</datalist>
                        {errors.student &&
                        <div className="validation" style={{display: 'block'}}>{errors.student}</div>}
                    </Form.Group>

                    <Form.Group controlId="Name">
                        <Form.Label>Course<span> *</span></Form.Label>
                        <Form.Control type="text" name="course" list="course-id-opts" placeholder="Course ID"
                                      value={this.state.course} onChange={this.onHandleInput} autoComplete="off"/>
                        <datalist id="course-id-opts">{this.CourseOpts()}</datalist>
                        {errors.course && <div className="validation" style={{display: 'block'}}>{errors.course}</div>}
                    </Form.Group>

                    <Form.Group controlId="Name">
                        <Form.Label>Semester<span> *</span></Form.Label>
                        <Form.Control as="select" name="semester" value={this.state.semester}
                                      onChange={this.onHandleInput}>
                            <option>Please Select</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                        </Form.Control>
                        {errors.semester &&
                        <div className="validation" style={{display: 'block'}}>{errors.semester}</div>}
                    </Form.Group>

                    <Form.Group controlId="Name">
                        <Form.Label>Final Grade</Form.Label>
                        <Form.Control as="select" name="finalGrade" value={this.state.finalGrade}
                                      onChange={this.onHandleInput}>
                            <option>Not Graded</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>F</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="danger" size="lg" block="block" type="submit">
                        Create Enrolment
                    </Button>
                </Form>
            </div>);
    }
}
