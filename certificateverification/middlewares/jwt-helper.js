const jwt = require('jsonwebtoken');
const util = require('util');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const verifyJwtAsync = util.promisify(jwt.verify);

module.exports.verifyJwtToken = async (req, res, next) => {
    let token;
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];
    if (!token)
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    else {
        try {
            const decoded = await verifyJwtAsync(token, process.env.JWT_SECRET);
            req._id = decoded._id;
            req._email = decoded._email;
            next();
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: 'Token authentication failed.'
            });
        }
    }
}

module.exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req._id }).lean();
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Not Authorized!'
            });
        } else if (!user.isAdmin) {
            return res.status(401).send({
                message: 'Not Authorized.',
                success: false
            });
        } else {
            next();
        }
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message || 'Internal Server Error'
        });
    }
};

