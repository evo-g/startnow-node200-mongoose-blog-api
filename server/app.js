const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

if (process.env.ENV === 'production'){
    mongoose.connect(process.env.MONGODB_URI);
} else {
    mongoose.connect('mongodb://localhost/my-blog'), { useMongoClient: true };
};

mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

app.get('/', (req, res) => {
    res.status(200).send('ok');
});

module.exports = app;