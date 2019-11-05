let mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();

// course Model
let courseSchema = require('../models/course');

//course Validator
const courseValidator = require('../validation/course');

// CREATE course
router.route('/create-course').post((req, res, next) => {
    const {errors, isValid} = courseValidator(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const courseId = req.body.id;

    courseSchema.findOne({
        id: courseId
    }).then( course => {
        if (course) {
            errors.id = "Course already exist";
            res.status(404).json(errors);
        } else {
            courseSchema.create(req.body, (error, data) => {
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

// READ courses
router.route('/').get((req, res) => {
    courseSchema.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Get Single course
router.route('/edit-course/:id').get((req, res) => {
    courseSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});


// Update course
router.route('/update-course/:id').put((req, res, next) => {
    const {errors, isValid} = courseValidator(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const courseId = req.body.id;

    courseSchema.findOne({
        id: courseId
    }).then( course => {
        if (course) {
            errors.id = "course already exist";
            res.status(404).json(errors);
        } else {
            courseSchema.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.json(data);
                    // console.log('course updated successfully !')
                }
            })
        }
    }).catch(err => {
        console.log(err);
    })

});

// Delete course
router.route('/delete-course/:id').delete((req, res, next) => {
    courseSchema.findByIdAndRemove(req.params.id, (error, data) => {
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