let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

//  Model
let enrolmentSchema = require('../models/Enrolment');

// CREATE 
router.route('/create-enrolment').post((req, res, next) => {
    enrolmentSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  })
});

// READ 
router.route('/').get((req, res) => {
    enrolmentSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

// Get Single 
router.route('/edit-enrolment/:id').get((req, res) => {
    enrolmentSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})


// Update 
router.route('/update-enrolment/:id').put((req, res, next) => {
    enrolmentSchema.findByIdAndUpdate(req.params.id, {
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

// Delete 
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