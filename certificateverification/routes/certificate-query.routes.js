const express = require('express');
const router = express.Router();
const certificateQueryCtrl = require('../controllers/certificate-query.controller');
const jwtHelper = require('../middlewares/jwt-helper');

// certificate query routes
router.get('/get-queries', jwtHelper.verifyJwtToken, jwtHelper.isAdmin, certificateQueryCtrl.getCertificateQueries);
router.post('/create-query', certificateQueryCtrl.addNewCertificateQuery);
router.put('/delete-query', certificateQueryCtrl.softDeleteCertificateQuery);

module.exports = router;