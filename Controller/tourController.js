//const router = express.Router();
//const express = require('express');
const Tour = require('../Model/tourModel');

exports.getAllTour = async (req, res) => {
  try {
    const toursx = await Tour.find();
    console.log(toursx);
    res.status(200).json({
      status: 'Succesful',
      length: toursx.length,
      data: {
        toursx,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'Path Not Found',
      error,
    });
  }
};
