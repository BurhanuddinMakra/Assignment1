const bcrypt = require("bcrypt");
const Users = require("../models/Users");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")

router.post("/signUp", async (req, res) => {
    
    try {
        const { email, password } = req.body
        // checks if email has @ and no spaces (@ cannot be i the beginning or end of the email)
        const emailRegex = /^(?!@)(?!.*@$).*@.*/u 
        if (!emailRegex.test(email)) return res.json({ msg: "INVALID EMAIL" })
        let user = await Users.findOne({ email })
        if (user) return res.json({ msg: "USER EXISTS" })
        //checks if password has atleast 8 characters, 1 capital letter, no spaces and 1 number
        const regex = /^(?=.*[A-Z])(?=.*[0-9])\S{8,}$/ 
        if (!regex.test(password)) return res.json({ msg: "PASSWORD must have: - atleast 8 character - 1 capital letter - no spaces - 1 number" })
        user = await Users.create({ ...req.body, password: await bcrypt.hash(password, 3) });

        return res.json({ msg: "CREATED", user:user })
    } catch (e) {
        console.error(e)
    }
});




router.post("/login", async (req, res) => {
    
    try {
        const { email, password } = req.body

        const user = await Users.findOne({ email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) return res.json({ msg: "WRONG PASSWORD" })

        const token = jwt.sign({
            email,
            createdAt: new Date(),
            admin: user.admin,
        }, "BURHAN_SECRET", { expiresIn: "1d" });

        res.json({
            msg: "LOGGED IN", token
        })
    } catch (error) {
        console.error(error)
    }
});



module.exports = router
