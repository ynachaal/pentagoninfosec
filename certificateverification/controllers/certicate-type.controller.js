const mongoose = require('mongoose');
const CertificateType = mongoose.model('CertificateType');

async function certificateTypeExists(certicateValue) {
    // Logic to check if the certificate with the given number exists in the database
    const existingCertificate = await CertificateType.findOne({ valueOfCertificate: certicateValue, isDeleted: false });
    return existingCertificate !== null;
}

// Get all certificates
module.exports.getCertificateTypes = async (req, res, next) => {
    try {
        const certificates = await CertificateType.find({ isDeleted: false });
        if (!certificates || certificates.length < 1) {
            return res.status(404).json({
                success: false,
                message: 'No certificates found.'
            });
        }
        return res.status(200).json({
            success: true,
            certificates: certificates,
            message: 'Certificate types fetched successfully.'
        });
    } catch (err) {
        return next(err);
    }
}

// Genrate certificate and check if exists in database
module.exports.addNewCertificateType = async (req, res, next) => {
    try {
        if (await certificateTypeExists(req.body.valueOfCertificate)) {
            return res.status(409).json({
                success: false,
                message: 'This ceritificate exists already, Please try another one.'
            })
        }
        const certicateType = new CertificateType({
            nameOfCertificate: req.body.nameOfCertificate,
            valueOfCertificate: req.body.valueOfCertificate,
            isDeleted: false
        });

        const savedCertificateType = await certicateType.save();
        if (!savedCertificateType) {
            return res.status(404).json({
                success: false,
                message: 'An error occured, Please try again.'
            });
        }
        return res.status(200).json({
            success: true,
            certificate: savedCertificateType,
            message: "Certificate type added successfully."
        });
    } catch (err) {
        return next(err);
    }
}

// Soft delete certificate type
module.exports.softDeleteCertificateType = async (req, res, next) => {
    try {
        const existingCertificate = await CertificateType.findOne({ valueOfCertificate: req.body.valueOfCertificate, isDeleted: false });
        if (!existingCertificate) {
            return res.status(404).json({
                success: false,
                message: 'No certificate found with this value.'
            });
        }
        existingCertificate.isDeleted = true;
        const savedCertificateType = await existingCertificate.save();
        if (!savedCertificateType) {
            return res.status(404).json({
                success: false,
                message: 'No certificate found with this value.'
            });
        } else {
            return res.status(201).json({
                success: true,
                certificate: savedCertificateType,
                message: 'Deleted Successfully!'
            });
        }
    } catch (err) {
        return next(err);
    }
}


