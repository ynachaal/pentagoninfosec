const express = require('express');
const router = express.Router();

const certificateCtrl = require('../controllers/certificate.controller');
const certificateTypeCtrl = require('../controllers/certicate-type.controller');
const jwtHelper = require('../middlewares/jwt-helper');
const extractFile = require("../middlewares/file-upload");

// certificate routes // jwt authentication is commented for some time, ucomment upper line and comment lower line to use authentication.

router.get('/verify-certificate', certificateCtrl.getCertificate);
router.get('/get-certificates', jwtHelper.verifyJwtToken, jwtHelper.isAdmin, certificateCtrl.getCertificates);
router.post('/generate-certificate', jwtHelper.verifyJwtToken, jwtHelper.isAdmin, extractFile.array('evidence', 20), certificateCtrl.generateCertificate);
router.put('/delete-certificate', jwtHelper.verifyJwtToken, jwtHelper.isAdmin, certificateCtrl.softDeleteCertificate);
router.post('/send-form-mail', certificateCtrl.postGetInTouchMail);
router.get('/get-expiring-certificates', jwtHelper.verifyJwtToken, jwtHelper.isAdmin, certificateCtrl.getExpiringCertificates);

// certificate type routes;
router.post('/add-new-certificate-type', jwtHelper.verifyJwtToken, jwtHelper.isAdmin, certificateTypeCtrl.addNewCertificateType);
router.get('/get-certificate-types', certificateTypeCtrl.getCertificateTypes);
router.put('/delete-certificate-type', jwtHelper.verifyJwtToken, jwtHelper.isAdmin, certificateTypeCtrl.softDeleteCertificateType);

module.exports = router;