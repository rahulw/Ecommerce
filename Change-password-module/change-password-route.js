const express = require('express');
const chnPasswordRouter = new express.Router();
const chnPasswordController = require('./change-password-controller');
const authMiddleWare = require('../auth-middleware');

chnPasswordRouter.post('/change-password', authMiddleWare.isLoggedIn, chnPasswordController.changePassword);

module.exports = chnPasswordRouter;