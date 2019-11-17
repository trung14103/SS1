let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

//  Model
let enrolmentSchema = require('../models/Enrolment');
let studentSchema = require('../models/Student');
var courseSchema = mongoose.model('Course');

//Validator
const enrolValidator = require('../validation/enrolment');

// CREATE enrolments
router.route('/create-enrolment').post((req, res, next) => {
    const {errors, isValid} = enrolValidator(req.body);
    if (!isValid) {
        res.status(404).json(errors);
    }

    const studentId = req.body.student;
    const courseId = req.body.course;
    const semester = req.body.semester;
    studentSchema.findOne({id: studentId})
        .then(student => {
            courseSchema.findOne({id: courseId})
                .then(course => {
                    if (!course || !student) {
                        errors.course = "Course Not Found";
                        errors.student = "Student Not Found";
                        res.status(404).json(errors);
                    }
                    new enrolmentSchema({
                        courseRef: course._id,
                        studentRef: student._id,
                        semester: semester,
                    }).save((err, data) => {
                        if (err) {
                            res.status(404).json(err);
                        } else {
                            res.json(data);
                        }
                    })
                })
                .catch(err => {
                    res.status(404).json(err)
                })
        })
        .catch(err => {
            res.status(404).json(err);
        })
});

// READ enrolments
router.route('/').get((req, res) => {
    enrolmentSchema.find()
        .populate({path: 'studentRef', options: {sort: {'id': 1}}})
        .populate({path: 'courseRef'})
        .exec((error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        });
});

// Get Single enrolment
router.route('/edit-enrolment/:id').get((req, res) => {
    enrolmentSchema.findById(req.params.id)
        .populate({path: 'studentRef'})
        .populate({path: 'courseRef'})
        .exec((error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        });
});


// Update enrolment
router.route('/update-enrolment/:id').put((req, res, next) => {
    const {errors, isValid} = enrolValidator(req.body);

    if (!isValid) {
        res.status(404).json(errors);
    }
    const finalGrade = req.body.finalGrade;
    let gradeNum;

    if (finalGrade === "F") {
        gradeNum = 1;
    } else if (finalGrade === "P") {
        gradeNum = 2;
    } else if (finalGrade === "G") {
        gradeNum = 3;
    } else {
        gradeNum = 4;
    }

    enrolmentSchema.findByIdAndUpdate(req.params.id, {
        $set: {
            finalGrade: req.body.finalGrade,
            grade: gradeNum
        }
    }, (error, data) => {

        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

// Delete enrolment
router.route('/delete-enrolment/:id').delete((req, res, next) => {
    enrolmentSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

//Find enrolled students of a specific course
router.route('/course-enrolled-students').post((req, res) => {
    let errors = {};
    courseSchema.findOne({id: req.body.course_id}).then(course => {
        if (!course) {
            errors.course_id = 'This Course Not Exist';
            res.status(404).json(errors);
        }
        enrolmentSchema.find({courseRef: course._id}).populate({path: 'studentRef'}).exec(function (err, students) {
            if (err) {
                res.status(404).json(err);
            } else if (students.length === 0) {
                errors.course_id = 'No Student Has Enrol This Course Yet';
                res.status(404).json(errors);
            } else {
                res.json(students);
            }
        })
    })
        .catch((err) => {
            res.status(404).json(err);
        })
});


//Find courses of a specific student
router.route('/student-enrol_course').post((req, res) => {
    let errors = {};
    studentSchema.findOne({id: req.body.student_id}).then(student => {
        if (!student) {
            errors.student_id = 'This Student Not Exist';
            res.status(404).json(errors);
        }
        enrolmentSchema.find({studentRef: student._id}).populate({path: 'courseRef'}).exec(function (err, courses) {
            if (err) {
                res.status(404).json(err);
            } else if (courses.length === 0) {
                errors.student_id = 'This Student Has Not Enrolled Any Course Yet';
                res.status(404).json(errors);
            } else {
                res.json(courses);
            }
        })
    })
        .catch((err) => {
            res.status(404).json(err);
        })
});

//Find list of failed students
router.route('/failed-students').get((req, res) => {
    enrolmentSchema.find({finalGrade: 'F'})
        .populate({path: 'studentRef'})
        .populate({path: 'courseRef'})
        .exec((err, student) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.json(student);
            }
        })
    // .catch((err) => {
    //     res.status(404).json(err);
    // })
});

//

module.exports = router;