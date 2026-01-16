const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const userExists = async (email) => {
    const user = await User.findOne({
        email: email.toLowerCase().trim(),
        isDeleted: false
    });
    return !!user;
}

const sendResetPasswordMail = async (user, res) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILER_AUTH_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAILER_AUTH_EMAIL,
                pass: process.env.MAILER_AUTH_PASS
            }
        });
        // const resetLink = "<a href='" + req.body.domain + "/employee/response-reset-password/'><span>link</span></a>.<br>This is a <b>test</b> email."
        const mailOptions = {
            to: user.email,
            from: process.env.ADMIN_EMAIL,
            subject: 'Pentagon Password Reset',
            html: `
                <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
                <p>Please click on the following link to complete the process.</p>
                <div style="background-color:#3f51b5; color:white;
                padding:24px 2px; max-width: 50%; text-align:center">
                <a style="color:white; text-decoration:none;" href="https://certverify.pentagoninfosec.com/auth/response-reset-password/${user.resettoken}">RESET PASSWORD</a></div>
                
                <p>'If you did not request this, please ignore this email and your password will remain unchanged.</p>
            `,
        }
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                return res.send({
                    error: err
                })
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send({
                    res: info.response,
                    message: 'E-mail sent successfully',
                    success: true
                })
            }
        });
    } catch (error) {
        return next(error);
    }

}

// should be protected with admin middleware
module.exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find({ isDeleted: false }).select('-passwordHash');
        if (!users || users.length < 1) {
            return res.status(404).json({
                success: false,
                message: 'No users found.'
            });
        } else {
            return res.status(200).json({
                success: true,
                users: users
            });
        }
    } catch (err) {
        return next(err);
    }
}

// should be protected with admin middleware
module.exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ isDeleted: false, _id: req._id }).select('-passwordHash');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No account found.'
            });
        } else {
            return res.status(200).json({
                success: true,
                user: user
            });
        }
    } catch (err) {
        return next(err);
    }
}

// should be protected with user role or admin role
module.exports.getUser = async (req, res, next) => {
    try {
        const id = req.params.id ? req.params.id : req._id;
        const filter = { _id: id, isDeleted: false };
        const user = await User.findOne(filter).select('-passwordHash -isAdmin');
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'No account found with this email address!'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'User data fetched succussfully!',
            user: user
        });
    } catch (err) {
        return next(err);
    }
};

// sign up as user
module.exports.createAccount = async (req, res, next) => {
    try {
        const user = new User({
            name: req.body.name,
            passwordHash: User.hashPassword(req.body.password),
            email: req.body.email,
            isDeleted: false
        });
        if (await userExists(req.body.email)) {
            return res.status(409).json({
                success: false,
                message: 'Account with this email address exists already! Please try with different one.'
            })
        }
        const savedUser = await user.save();
        if (!savedUser) {
            return res.status(500).send({
                success: false,
                message: 'An error occured! Please try again.'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Account created succussfully!'
        });

    } catch (err) {
        return next(err);
    }
}

// login as user
module.exports.authenticate = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            isDeleted: false
        });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'No account found with this email address!'
            });
        } else if (!user.verifyPassword(req.body.password)) {

            return res.status(401).send({
                success: false,
                message: 'Incorrect password'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'User authenticated succussfully!',
            _id: user['_id'],
            name: user['name'],
            token: user.generateJwt(req.body.remeberMe)
        });
    } catch (err) {
        return next(err);
    }
};

// update user profile
module.exports.updateUser = async (req, res, next) => {
    try {
        const filter = { _id: req._id };
        // Define the update operation
        const updateDoc = {
            $set: {
                name: req.body.name,
                email: req.body.email,
                isDeleted: false
            }
        };
        const result = await User.findOneAndUpdate(filter, updateDoc, { new: true });
        if (!result) {
            return res.status(404).send({
                success: false,
                message: 'No account found.'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'User account updated succussfully!',
            user: result
        });
    } catch (error) {
        return next(error);
    }
};

// soft delete user account
module.exports.softDeleteUserAccount = async (req, res, next) => {
    try {
        const filter = { _id: req.body._id };

        // Define the update operation
        const updateDoc = {
            $set: {
                isDeleted: true
            }
        };
        const result = await User.findOneAndUpdate(filter, updateDoc, { new: true });
        if (!result) {
            return res.status(404).send({

                success: false,
                message: 'No account found.'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'User account deleted succussfully!',
        });
    } catch (error) {
        return next(error);
    }
}

// reset password APIs
module.exports.resetPassword = async (req, res, next) => {
    try {
        if (!req.body.email) {
            return res.status(500).json({
                message: 'Email is required'
            });
        }
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(409).json({
                message: 'Email does not exist'
            });
        }
        user.resettoken = crypto.randomBytes(16).toString('hex');
        const result = await user.save();
        if (!result) {
            return res.status(500).send({
                msg: err.message
            });
        }
        else {
            User.find({
                _id: user._id,
                resettoken: {
                    $ne: user.resettoken
                }
            }).deleteOne().exec();

            await sendResetPasswordMail(user, res);
        }
    } catch (error) {
        return next(error);
    }
}

// validate password token
module.exports.validPasswordToken = async (req, res) => {
    if (!req.body.resettoken) {
        return res.status(500).json({
            message: 'Token is required!',
            success: false
        });
    }
    const user = await User.findOne({
        resettoken: req.body.resettoken
    });
    if (!user) {
        return res.status(409).json({
            message: 'Invalid URL!',
            success: false
        });
    }
    const result = await User.findOne({
        _id: user._id
    });

    if (!result) {
        return res.status(500).send({
            message: 'No user found!',
            success: false
        });
    }
    return res.status(200).json({
        message: 'Token verified successfully.',
        success: true
    });
}

// set new password after validating token
module.exports.newPassword = async (req, res) => {
    const user = await User.findOne({
        resettoken: req.body.resettoken
    });
    if (!user) {
        return res.status(409).json({
            message: 'User does not exist!',
            success: false
        });
    } else if (!user.resettoken) {
        return res.status(409).json({
            message: 'Token has expired!',
            success: false
        });
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return res.status(401).json({
            success: false,
            message: 'Paswords do no match!'
        });
    }

    user.passwordHash = User.hashPassword(req.body.newPassword);
    user.resettoken = null;
    const result = await user.save();

    if (!result) {
        return res.status(400).json({
            message: 'An error occured, Pls try again!',
            success: false
        });
    }
    else {
        user.resettoken = null;
        return res.status(201).json({
            message: 'Password reset successful.',
            success: true
        });
    }
}

// change password
module.exports.changePassword = async (req, res, next) => {
    try {
        const foundedUser = await User.findById(req._id);
        if (!foundedUser) {
            return res.status(404).send({
                success: false,
                message: 'No account found'
            });
        }
        if (!foundedUser.verifyPassword(req.body.oldPassword)) {
            return res.status(401).json({
                success: false,
                message: 'Old password is incorrect.'
            });
        }
        if (req.body.newPassword !== req.body.confirmNewPassword) {
            return res.status(401).json({
                success: false,
                message: 'Paswords do no match!'
            });
        }
        foundedUser.passwordHash = User.hashPassword(req.body.newPassword);
        const result = await foundedUser.save();
        if (!result) {
            return res.status(400).send({
                success: false,
                message: 'An error occured, Pls try again.'
            });
        }
        return res.status(201).send({
            success: true,
            message: 'Password changed succussfully!',
        });
    } catch (error) {
        return next(error);
    }
};