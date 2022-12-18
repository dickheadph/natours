const express = require('express');
const tourController = require('../Controller/tourController');

const {
  //CRUD
  getAllTour,
  getSingleTour,
  addTour,
  editTour,
  deleteTour,
  //SMART FILTERS
  easyTours,
  mediumTours,
  difficultTours,
  top5Cheap,
} = tourController;

const router = express.Router();

router.route('/easy-tours').get(easyTours, getAllTour);
router.route('/medium-tours').get(mediumTours, getAllTour);
router.route('/difficult-tours').get(difficultTours, getAllTour);
router.route('/top-five-cheap').get(top5Cheap, getAllTour);

router.route('/').get(getAllTour).post(addTour);
router.route('/:id').get(getSingleTour).patch(editTour).delete(deleteTour);

module.exports = router;
