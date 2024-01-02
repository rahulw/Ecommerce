const userModel = require('../Signup-module/signup-model');
const sendMail = require('../email-service/email');
const jwt = require("jsonwebtoken");
const secret = 'Reset Password';
const bcrypt = require("bcryptjs");

exports.forgotPassword = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: `User doesn't exist` });
        }
        const resetToken = jwt.sign({ email: user.email }, secret, { expiresIn: '5m' })
        const options = {
            email: user.email,
            subject: 'Reset Password Link',
            url: `${req.get('Origin') || req.get('Referer')}/reset-password/${resetToken}`
        }
        await sendMail(options);
        res.status(200).json({ message: 'Reset password link has been sent in your mail' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const verifyToken = jwt.verify(req.params.token, secret);
        if (!verifyToken) {
            return res.status(400).json({ message: "Token has been expired" });
        }
        if (req.body.newPassword != req.body.confirmPassword) {
            return res.status(400).json({ message: "New and Confirm password should be same" });
        }
        const user = await userModel.findOne({ email: verifyToken.email });
        if (!user) {
            return res.status(404).json({ message: `User doesn't exist` });
        }
        user.password = await bcrypt.hash(req.body.newPassword, 10);
        await userModel.updateOne(
            { _id: user._id },
            { $set: { password: user.password } }
        );
        res.status(200).json({ message: 'Password has been reset successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}