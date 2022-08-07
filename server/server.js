const { API_PORT, DB_URL } = require('../Constants');
const publicRoute = require('../Route/index');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const db = require('../DataBase');

//cors settings
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use('/api', publicRoute);

app.use(function (err, req, res, next) {
    console.log('error -> ', err);
    next(err);
});

app.listen(API_PORT, () => {
    console.log(`Server is listening at ${API_PORT}`);
});