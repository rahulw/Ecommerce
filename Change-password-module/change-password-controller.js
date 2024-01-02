const userModel = require('../Signup-module/signup-model');
const bcrypt = require('bcrypt');

exports.changePassword = async (req, res) => {
    try{
        const user = await userModel.findOne({ email: req.user.email });
        if(req.body.oldPassword == req.body.newPassword) {
            return res.status(400).json({message: "Old and New password should not same"});
        }
        if(user) {
            const oldPswCheck = await bcrypt.compare(req.body.oldPassword, user.password);
            if(oldPswCheck) {
                req.body.newPassword = await bcrypt.hash(req.body.newPassword, 10);
                const updatePassword = await userModel.updateOne( {_id: user._id}, {password: req.body.newPassword});
                return res.status(200).json({message: "Password has been changed successfully"});
            } else {
                res.status(400).json({ error: "Old password doesn't match" });
            }
        }
        else if(!req.body.oldPassword || !req.body.newPassword) {
            req.status(400).json({ error: "Required" });
        }
        else {
            req.status(400).json({error: "User does't exist"});
        }
    }
    catch(err) {
        res.status(500).json({ message: error.message });  
    }
}