const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();
require('./db');
const userRoute = require('./Signup-module/signup-route');
const loginRoute = require('./Login-module/login-route');
const categoryRoute = require('./Category-module/category.route');
const productRoute = require('./Products-module/product-route');
const chnPasswordRouter = require('./Change-password-module/change-password-route');
const resetPasswordRouter = require('./Reset-password-module/reset-route');

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  };
app.use(cors());
app.use(express.json());
app.use('/', userRoute);
app.use('/', loginRoute);
app.use('/category', categoryRoute);
app.use('/product', productRoute);
app.use('/reset', resetPasswordRouter);
app.use('/', chnPasswordRouter);

app.use('/images', express.static(path.join("uploads/images")));

app.listen(5000);
