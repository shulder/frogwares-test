const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./api/router');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', router);

app.listen(3000, () => {
  console.log('server started on port 3000!');
});
