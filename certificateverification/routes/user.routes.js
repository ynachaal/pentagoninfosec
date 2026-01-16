const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const jwtHelper = require('../middlewares/jwt-helper');


// user login, signup and delete routes
router.get('/get-users', jwtHelper.verifyJwtToken, jwtHelper.isAdmin, userCtrl.getUsers);
router.get('/get-user', jwtHelper.verifyJwtToken, userCtrl.getUser);
router.post('/user-signup', userCtrl.createAccount);
router.post('/user-login', userCtrl.authenticate);
router.put('/delete-user-account', jwtHelper.verifyJwtToken, jwtHelper.isAdmin, userCtrl.softDeleteUserAccount);
router.put('/change-password', jwtHelper.verifyJwtToken, userCtrl.changePassword);

// forgot password
router.post('/req-reset-password', userCtrl.resetPassword);
router.post('/validate-password-token', userCtrl.validPasswordToken);
router.put('/new-password', userCtrl.newPassword);
router.put('/update-profile', jwtHelper.verifyJwtToken, userCtrl.updateUser);

module.exports = router;