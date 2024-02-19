var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const authRouter = require('./routes/auth');
const authMiddleware = require('./middleware/auth');
const gameRouter = require('./routes/games');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()



app.use('/auth', authRouter);
app.use(authMiddleware);

app.use('/games', gameRouter);

const PORT = 5600;
app.listen(PORT, console.log(`Server running port ${PORT}`));