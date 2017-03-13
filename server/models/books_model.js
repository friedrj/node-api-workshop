const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {type: String, required: true},
    subtitle: String,
    description: {type: String, required: true},
    price: Number,
    year: {type: Number, min: 2000, max: 2017}
});


module.exports = mongoose.model('books', bookSchema);