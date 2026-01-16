const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'User email is required']
    },
    passwordHash: {
        type: String,
        required: [true, 'User password is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    },
    resettoken: {
        type: String
    },
    // saltSecret: {
    //     type: String,
    // }
}, {
    timestamps: true
});
// Custom validation for email
userSchema.path('email').validate((val) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


// Methods
userSchema.statics.hashPassword = function hashPassword(password) {
    // bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(this.password, salt, (err, hash) => {
    //         this.password = hash;
    //         this.saltSecret = salt;
    //     });
    // });
    return bcrypt.hashSync(password, 10);
}

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

userSchema.methods.generateJwt = function (remeberMe = false) {
    return jwt.sign({
        _id: this._id,
        isAdmin: this.isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: remeberMe ? '365d' : process.env.JWT_EXP
    });
}

mongoose.model('User', userSchema);