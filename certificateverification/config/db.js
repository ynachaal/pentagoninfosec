const mongoose = require('mongoose');

require('../models/certificate.model');
require('../models/certificate-type.model');
require('../models/certificate-query.model');
require('../models/user.model');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connection succeeded.');
}).catch((err) => {
    console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2));
});