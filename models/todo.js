const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('todo', TodoSchema);