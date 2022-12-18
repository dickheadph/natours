const express = require('express');
const tourController = require('../Controller/tourController');

const { getAllTour, getSingleTour, addTour, editTour, deleteTour } =
  tourController;

const router = express.Router();

router.route('/').get(getAllTour).post(addTour);
router.route('/:id').get(getSingleTour).patch(editTour).delete(deleteTour);

module.exports = router;
