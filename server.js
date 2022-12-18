const mongoose = require('mongoose');
const app = require('./app');
const env = require('dotenv');

env.config({ path: './.env' });
const DB = process.env.DBATLAS;
mongoose.set('strictQuery', true);
mongoose
  .connect(DB)
  .then(() => {
    console.log('Connected to MongoDB-ATLAS');
    // console.log(con.connections);
  })
  .catch((err) => console.log(err));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
