const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    id: String,
    name: String,
    year: String,
    genre: String,
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'Users' },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Game = mongoose.model('Games', GameSchema);

module.exports = Game;