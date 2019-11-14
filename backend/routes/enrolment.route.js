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
    const finalGrade = req.body.finalGrade;
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
                        finalGrade: finalGrade
                    }).save((err,data) => {
                        if (err) {
                            res.status(404).json(err);
                        } else {
                            res.json(data);
                            console.log(data);
                        }
                    })
                })
                .catch(err => {
                    res.status(404).json(err)
                    console.log(errors);
                })
        })
        .catch(err => {
            res.status(404).json(err);
            console.log(errors);
        })
});

// READ enrolments
router.route('/').get((req, res) => {
    enrolmentSchema.find()
        .populate({path: 'studentRef', options: { sort: { 'id': 1 } }})
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

    enrolmentSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            // console.log('Enrolment updated successfully !');
        }
    })
})

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

// Find Course of specified Student
router.route('/student-courses/:student').get((req, res) => {
    enrolmentSchema.find({student: req.params.student}, {course: 1})
        .then(courses => {
            res.json(courses);
        })
        .catch((err) => {
            res.status(404).json(err);
        })
});

router.route('/course-enrolled-students').post((req, res) => {
    courseSchema.findOne({id: req.body.course_id}).then(course => {
        enrolmentSchema.find({ courseRef: course._id  }).
        populate({path: 'studentRef'}).
        exec(function (err, students) {
            if (err) {
                res.status(404).json(err);
            };
            console.log(students);
            res.json(students);
        })
    })
    // }).catch((err) => {
    //     res.status(404).json(err);
    // })
});

router.route('/student-enrol_course').post((req, res) => {
    studentSchema.findOne({id: req.body.student_id}).then(student => {
        enrolmentSchema.find({ studentRef: student._id  }).
        populate({path: 'courseRef'}).
        exec(function (err, courses) {
            if (err) {
                res.status(404).json(err);
            };
            res.json(courses);
        })
    })
    // }).catch((err) => {
    //     res.status(404).json(err);
    // })
});


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
})

//

module.exports = router;