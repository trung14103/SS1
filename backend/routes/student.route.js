let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Student Model
let studentSchema = require('../models/Student');

//Student Validator
const studentValidator = require('../validation/student');

// CREATE Student
router.route('/create-student').post((req, res, next) => {
    const {errors, isValid} = studentValidator(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const studentId = req.body.id;

    studentSchema.findOne({
        id: studentId
    }).then( student => {
        if (student) {
            errors.id = "Student already exist";
            res.status(404).json(errors);
        } else {
            studentSchema.create(req.body, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.json(data);
                }
            })
        }
    }).catch(err => {
        console.log(err);
    })
});

// READ Students
router.route('/').get((req, res) => {
  studentSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

// Get Single Student
router.route('/edit-student/:id').get((req, res) => {
  studentSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});


// Update Student
router.route('/update-student/:id').put((req, res, next) => {
    const {errors, isValid} = studentValidator(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const studentId = req.body.id;

    studentSchema.findOne({
        id: studentId
    }).then( student => {
        if (student) {
            errors.id = "Student already exist";
            res.status(404).json(errors);
        } else {
            studentSchema.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.json(data);
                    // console.log('Student updated successfully !')
                }
            })
        }
    }).catch(err => {
        console.log(err);
    })

});

// Delete Student
router.route('/delete-student/:id').delete((req, res, next) => {
  studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
    }
  });
});

module.exports = router;