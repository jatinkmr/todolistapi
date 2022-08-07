const { DB_URL } = require('./Constants');
const mongoose = require('mongoose');

mongoose.connect(DB_URL, (err, result) => {
    if(err) {
        console.log("Error");
        throw err;
    }
    console.log("DataBase Connected !!");
});