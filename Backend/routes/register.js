const express = require("express");
const UserModel = require("../models/User");

const router = express.Router();

router.post('/', (req, res) => {
    const {name, email, password} = req.body;
    UserModel.create({name, email, password})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

module.exports = router;