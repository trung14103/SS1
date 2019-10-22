let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Course Model
let courseSchema = require('../models/Course');

// CREATE Course
router.route('/create-course').post((req, res, next) => {
  courseSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  })
});

// READ Courses
router.route('/').get((req, res) => {
    courseSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

// Get Single Course
router.route('/edit-course/:id').get((req, res) => {
    courseSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})


// Update Course
router.route('/update-course/:id').put((req, res, next) => {
    courseSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error);
    } else {
      res.json(data);
      console.log('Course updated successfully !');
    }
  })
})

// Delete Course
router.route('/delete-course/:id').delete((req, res, next) => {
    courseSchema.findByIdAndRemove(req.params.id, (error, data) => {
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