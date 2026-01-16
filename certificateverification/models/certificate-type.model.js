const mongoose = require('mongoose');

const certificateTypeSchema = new mongoose.Schema({
    nameOfCertificate: {
        type: String,
        required: [true, 'Please provide the name of cerificate'],
        trim: true
    },
    valueOfCertificate: {
        type: String,
        required: [true, 'Please provide the value of certificate'],
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

mongoose.model('CertificateType', certificateTypeSchema);