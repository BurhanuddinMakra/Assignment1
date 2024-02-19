const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")


router.use(async (req, res, next) => {
    
    try {
        const token = req.headers.authorization;
        const user = jwt.verify(token.split(" ")[1], "BURHAN_SECRET")
        req.user = user;
        next()
    } catch (e) {
        return res.json({ msg: "TOKEN NOT FOUND / INVALID" })
    }
})

module.exports = router;