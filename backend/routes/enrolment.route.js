let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

//  Model
let enrolmentSchema = require('../models/Enrolment');
// let studentSchema = require('../models/Student');
// let courseSchema = require('../models/Course');

//Validator
const enrolValidator = require('../validation/enrolment');

// CREATE enrolments
router.route('/create-enrolment').post((req, res, next) => {
    // const {errors, isValid} = enrolValidator(req.body);
    // if (!isValid) {
    //     res.status(404).json(errors);
    // }

    // const studentId = req.student;
    // const courseId = req.course;
    //
    // enrolmentSchema.find({student: studentId, course: courseId})

    enrolmentSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      // console.log(data);
      res.json(data);
    }
  })
});

// READ enrolments
router.route('/').get((req, res) => {
    enrolmentSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

// Get Single enrolment
router.route('/edit-enrolment/:id').get((req, res) => {
    enrolmentSchema.findById(req.params.id, (error, data) => {
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
})

module.exports = router;