const Tour = require('../Model/tourModel');
exports.easyTours = async (req, res, next) => {
  try {
    const easyTours = await Tour.find({ difficulty: 'easy' });
    res.status(200).json({
      status: 'Succesful',
      length: easyTours.length,
      data: {
        easyTours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'Path Not Found',
      error,
    });
  }
  //next();
};
exports.mediumTours = async (req, res, next) => {
  try {
    const mediumTours = await Tour.find({ difficulty: 'medium' });
    res.status(200).json({
      status: 'Succesful',
      length: mediumTours.length,
      data: {
        mediumTours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'Path Not Found',
      error,
    });
  }
  // next();
};
exports.difficultTours = async (req, res, next) => {
  try {
    const difficultTours = await Tour.find({ difficulty: 'difficult' });
    res.status(200).json({
      status: 'Succesful',
      length: difficultTours.length,
      data: {
        difficultTours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'Path Not Found',
      error,
    });
  }
  // next();
};

exports.top5Cheap = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.feilds = 'name,ratingsAverage,summary,difficulty,price';
  next();
};

exports.topRated = (req, res, next) => {
  req.query.sort = '-ratingsAverage';
  next();
};
