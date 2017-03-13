const express = require('express');
let app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');

const port = process.env.port || 3000; // default port is 3000

// *** routes *** //
const routes = require('./routes/index_route.js');

// *** connect to mongodb *** //
mongoose.connect('mongodb://admin:admin@ds129090.mlab.com:29090/node-api-workshop', (err) => {
    if (err) {
        console.log('Error connecting to the database. ' + err);
    } else {
        console.log('Connected to Database.');
    }
});


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// *** main routes *** //
app.get('/', (req, res) => {
    res.send('Hello, book API is available at /api/books');
});

app.use('/api', routes); // api routes


app.listen(port, () => {
    console.log('Server is running on port ' + port + '.');
});
