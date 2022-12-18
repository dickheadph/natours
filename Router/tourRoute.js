const express = require('express');
const tourController = require('../Controller/tourController');
const smartFilter = require('../Controller/smartFilters');

const router = express.Router();

const {
  //CRUD
  getAllTour,
  getSingleTour,
  addTour,
  editTour,
  deleteTour,
} = tourController;

const {
  //SMART FILTERS
  easyTours,
  mediumTours,
  difficultTours,
  top5Cheap,
  topRated,
} = smartFilter;

router.route('/easy-tours').get(easyTours, getAllTour);
router.route('/medium-tours').get(mediumTours, getAllTour);
router.route('/difficult-tours').get(difficultTours, getAllTour);
router.route('/top-rated').get(topRated, getAllTour);
router.route('/top-five-cheap').get(top5Cheap, getAllTour);

router.route('/').get(getAllTour).post(addTour);
router.route('/:id').get(getSingleTour).patch(editTour).delete(deleteTour);

module.exports = router;
