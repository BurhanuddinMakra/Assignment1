const express = require('express');
const router = express.Router();
const Users = require("../models/Users");
const Games = require("../models/Game");


router.post ('/createGame', async (req, res) => {
    try{
        const user = await Users.findOne({ email: req.body.email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })
        await Games.create({...req.body, user: user._id})
        res.json({ msg : "game add"})

    }
    catch (e) {
        console.error(e)
    }
} )


router.get('/getGames', async (req, res) => {
    try{
        const games = await Games.findOne({ name : req.body.name })
        if (!games) return res.json({ msg: "Game unavailable"})
        res.json({ msg: "Game found!", data: games})
    }
    catch (e) {
        console.error(e)
    }

})

router.get('/getGamesUser', async (req, res) => {
    try{
        const games = await Games.findOne({ name : req.body.name }).populate("user")
        if (!games) return res.json({ msg: "Game unavailable"})
        res.json({ msg: "Game found!", data: games})
    }
    catch (e) {
        console.error(e)
    }

})

router.post('/updateYear', async (req, res) => {
    try{
    const { name, year } = req.body
    const Gname = await Games.findOne( {name})
    if (!Gname) return res.json({ msg : "Book does not exist"})
    if (year == Gname.year) return res.json({ msg : "No change in year"})
    await Gname.updateOne({ year: year})
    res.json({ msg : "Year updated"})
    }
    catch (e) {
        console.error(e)
    }
})


router.delete('/deleteGame', async (req, res) => {
    try{
    const name = await Games.findOne({ name : req.body.name})
    if (!name) return res.json({ msg : "Game does not exist already"})
    await Games.deleteOne({ name : req.body.name})
    res.json({ msg : "Game deleted"})
    }
    catch (e) {
        console.error(e)
    }
})


module.exports= router;
