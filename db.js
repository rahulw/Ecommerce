const mongoose = require('mongoose');
// const url = "mongodb://127.0.0.1:27017/ecommerce";
const url = process.env.mongo_url;

mongoose.connect(url);