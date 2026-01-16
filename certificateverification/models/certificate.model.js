const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    certificateName: {
        type: String,
        default: 'HIPAA COMPLIANT',
        trim: true,
        required: [true, 'Please provide certificate name']
    },
    certicateNamePostFix: {
        type: String,
        default: 'HIPAA',
        trim: true,
        required: [false, 'Please provide certificate postfix']
    },
    certicateNumber: {
        type: String,
        index: true,
        trim: true,
        // required: [true, 'Please provide certificate number']
    },
    association: {
        type: String,
        required: [true, 'Mention the name of association'],
        trim: true
    },
    notes: {
        type: String,
        // required: [true, 'Please provide the notes'],
        trim: true
    },
    companyName: {
        type: String,
        required: [true, 'Mention the name to whom you are providing this certicate'],
        trim: true
    },
    issueBy: {
        type: String,
        required: [true, 'Mention the name who is providing this certicate'],
        trim: true
    },

    issuedDate: {
        type: String,
        required: [true, 'Please provide the issue date'],
        trim: true
    },
    validTill: {
        type: String,
        required: [true, 'Please provide valid till date'],
        trim: true
    },
    evidence: {
        type: Array,
        trim: true
        // required: [false, 'Please provide the date of approval'],
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

certificateSchema.index({ certicateNumber: 1 }, { unique: true });

mongoose.model('Certificate', certificateSchema);