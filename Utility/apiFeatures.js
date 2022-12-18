class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  //FILTER
  filter() {
    const queryObj = { ...this.queryString };
    const removeParams = ['page', 'limit', 'sort', 'feilds'];
    removeParams.forEach((props) => delete queryObj[props]);

    let advQuery = JSON.stringify(queryObj);
    advQuery = advQuery.replace(/\b(gt|gte|lt|lte)\b/g, (query) => `$${query}`);
    const result = JSON.parse(advQuery);

    this.query = this.query.find(result);
    //let query = Tour.find(result);
    return this;
  }

  //SORT
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-duration');
    }
    return this;
  }

  //LIMIT
  limitFeilds() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      console.log(fields);
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  //PAGINATE
  paginate() {
    const pageNum = +this.queryString.page || 1;
    const limitPerPage = +this.queryString.limit || 5;
    const skipPage = (pageNum - 1) * limitPerPage;
    console.log(skipPage);

    this.query = this.query.skip(skipPage).limit(limitPerPage);

    // if (req.query.page) {
    //   const numOfData = await Tour.countDocuments();
    //   if (skipPage >= numOfData) {
    //     res.status(404).json({
    //       status: 'Failed',
    //       message: 'You have reached the end of the page',
    //     });
    //   }
    // }
    return this;
  }
}

module.exports = ApiFeatures;
