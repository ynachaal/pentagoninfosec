const mongoose = require('mongoose');
const CertificateQuery = mongoose.model('CertificateQuery');
// const CertificateType = mongoose.model('CertificateType');
const nodemailer = require('nodemailer');

const sendCertificateQueryMail = async (user) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAILER_AUTH_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAILER_AUTH_EMAIL,
            pass: process.env.MAILER_AUTH_PASS
        }
    });

    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: process.env.MAIL_RECIEVER,
        subject: `Questionnare query on Pentagon`,
        html: `<h2>Query from ${user.name || 'N/A'} </h2> 
            <h3> Email:  <strong>${user.email || 'N/A'}</strong></h3>
            <h3> Contact number:  <strong>${user.contactNumber || 'N/A'}</strong></h3>
            <h3> Company Name:  <strong>${user.companyName || 'N/A'}</strong></h3>
            <h3> Certificate Type:  <strong>${user.certificateType || 'N/A'}</strong></h3>
            `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send({
                error: error
            });
        } else {
            console.log('Email sent: ' + info.response);
            res.send({
                res: info.response,
                message: 'E-mail sent successfully'
            });
        }
    });
}

// Get all certificate queries
module.exports.getCertificateQueries = async (req, res, next) => {
    try {
        const certificateQueries = await CertificateQuery.find({ isDeleted: false });
        if (!certificateQueries || certificateQueries.length < 1) {
            return res.status(404).json({
                success: false,
                message: 'No queries found.'
            });
        }
        return res.status(200).json({
            success: true,
            certificateQueries: certificateQueries,
            message: 'Certificate queries fetched successfully'
        });
    } catch (err) {
        return next(err);
    }
}

// Get single detailed certificate query, should be protected by admin role
module.exports.getCertificateQuery = async (req, res, next) => {
    try {
        const certificateQuery = await CertificateQuery.find({ _id: req.body._id });
        if (!certificateQuery) {
            return res.status(404).json({
                success: false,
                message: 'No query found.'
            });
        }
        return res.status(200).json({
            success: true,
            certificateQuery: certificateQuery,
            message: 'Certificate queries fetched successfully!'
        });
    } catch (err) {
        return next(err);
    }
}

// Genrate certificate and check if exists in database
module.exports.addNewCertificateQuery = async (req, res, next) => {
    try {
        // const existingCertificate = await CertificateType.findOne({ valueOfCertificate: req.body.certificateType, isDeleted: false });
        // if (!existingCertificate) {
        //     return res.status(404).json({
        //         success: false,
        //         message: 'No certificate found with this value.'
        //     });
        // }

        const user = {
            name: req.body.name,
            email: req.body.email,
            contactNumber: req.body.contactNumber,
            companyName: req.body.companyName,
            certificateType: req.body.certificateType,
            isDeleted: false
        }
        const certicateQuery = new CertificateQuery(user);

        await sendCertificateQueryMail(user);
        const savedCerticateQuery = await certicateQuery.save();
        if (!savedCerticateQuery) {
            return res.status(404).json({
                success: false,
                message: 'An error occured, Please try again.'
            });
        }
        return res.status(200).json({
            success: true,
            certificateQuery: savedCerticateQuery,
            message: "Certificate query sent successfully"
        });
    } catch (err) {
        return next(err);
    }
}

// Soft delete certificate query
module.exports.softDeleteCertificateQuery = async (req, res, next) => {
    try {
        const filter = { _id: req.body._id, isDeleted: false };
        const updateDoc = {
            $set: {
                isDeleted: true
            }
        }
        const result = await CertificateQuery.updateOne(filter, updateDoc);
        if (!result || !result.matchedCount) {
            return res.status(404).json({
                success: false,
                message: 'No query found with this ID'
            });
        }
        if (!result.modifiedCount) {
            return res.status(404).json({
                success: false,
                message: 'Error in deleting the document, Please try again'
            });
        }
        return res.status(201).json({
            success: true,
            message: 'Questionnare deleted successfully!'
        });
    } catch (error) {
        return next(error);
    }
}