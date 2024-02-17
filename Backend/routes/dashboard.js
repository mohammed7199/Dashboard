const express = require("express");
const verifyUser = require('../auth/auth.js')

const router = express.Router();

// Define a callback function for the route handler
const handleGetRequest = (req, res) => {
    try {
        return res.json({ valid: true, message: "authorized" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Use verifyUser as middleware and handleGetRequest as the route handler
router.get('/', verifyUser, handleGetRequest);

module.exports = router;