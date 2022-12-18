const express = require('express');
const tourController = require('../Controller/tourController');

const { getAllTour } = tourController;

const router = express.Router();

router.route('/').get(getAllTour);

module.exports = router;
