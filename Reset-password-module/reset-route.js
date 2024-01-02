const express = require('express');
const resetRouter = new express.Router();
const resetController = require('./reset-controller');

resetRouter.post('/forgotpassword', resetController.forgotPassword);
resetRouter.patch('/resetPassword/:token', resetController.resetPassword);

module.exports = resetRouter;