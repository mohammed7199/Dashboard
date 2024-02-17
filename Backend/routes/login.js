const express = require("express");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken"); // Import jwt module

const router = express.Router();

router.post('/', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email })
    .then(user => {
        if (user) {
            if (user.password === password) {
                const accessToken = jwt.sign({ email: email },
                    "jwt-access-token-secret-key", { expiresIn: '5m' });
                const refreshToken = jwt.sign({ email: email },
                    "jwt-refresh-token-secret-key", { expiresIn: '10m' });

                res.cookie('accessToken', accessToken, { maxAge: 60000 });

                res.cookie('refreshToken', refreshToken,
                    { maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict' });
                return res.json({ Login: true });
            } else {
                // Password doesn't match
                return res.status(401).json({ Login: false, Message: "Invalid password" });
            }
        } else {
            // No user found with the given email
            return res.status(404).json({ Login: false, Message: "No record found" });
        }
    }).catch(err => res.status(500).json({ Login: false, Message: err.message }));
});

module.exports = router;