const mongoose = require('mongoose');

const certificateQuerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        trim: true
    },
    contactNumber: {
        type: String,
        required: [true, 'Please provide your Contact Number'],
        trim: true
    },
    companyName: {
        type: String,
        // required: [true, 'Please provide your Company Name'],
        trim: true
    },
    certificateType: {
        type: String,
        required: [true, 'Please provide your Certificate Type'],
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

mongoose.model('CertificateQuery', certificateQuerySchema);