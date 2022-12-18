//const router = express.Router();
//const express = require('express');\
const Tour = require('../Model/tourModel');
const ApiFeatures = require('../Utility/apiFeatures');

exports.getAllTour = async (req, res) => {
  try {
    //console.log(req.query);
    // let queryObj = { ...req.query };
    // const removeParams = ['page', 'limit', 'sort', 'feilds'];
    // removeParams.forEach((props) => delete queryObj[props]);

    // let advQuery = JSON.stringify(queryObj);
    // advQuery = advQuery.replace(/\b(gt|gte|lt|lte)\b/g, (query) => `$${query}`);
    // const result = JSON.parse(advQuery);

    //console.log(result);
    // let query = Tour.find(result);

    //SORT
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort('-duration');
    // }
    //LIMIT
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   console.log(fields);
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v');
    // }

    //PAGINATE
    // const pageNum = +req.query.page || 1;
    // const limitPerPage = +req.query.limit || 5;
    // const skipPage = (pageNum - 1) * limitPerPage;
    // console.log(skipPage);

    // query = query.skip(skipPage).limit(limitPerPage);

    // if (req.query.page) {
    //   const numOfData = await Tour.countDocuments();
    //   if (skipPage >= numOfData) {
    //     res.status(404).json({
    //       status: 'Failed',
    //       message: 'You have reached the end of the page',
    //     });
    //   }
    // }

    const apiFeatures = new ApiFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFeilds()
      .paginate();

    const allTours = await apiFeatures.query;

    res.status(200).json({
      status: 'Succesful',
      length: allTours.length,
      data: {
        allTours,
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

exports.getSingleTour = async (req, res, next) => {
  try {
    const singleTour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'Succesful',
      data: {
        singleTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'ID does not exist.',
      error,
    });
  }
};

exports.addTour = async (req, res, next) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'Successful',
      data: {
        allTours: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'POST Failed.',
      error,
    });
  }
};

exports.editTour = async (req, res, next) => {
  try {
    const editTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'Succesful',
      data: {
        editTour,
      },
    });
  } catch (error) {}
  res.status(400).json({
    status: 'Failed',
    message: 'UPDATE Failed.',
    error,
  });
};

exports.deleteTour = async (req, res, next) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'Succesful',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'UPDATE Failed.',
      error,
    });
  }
};
