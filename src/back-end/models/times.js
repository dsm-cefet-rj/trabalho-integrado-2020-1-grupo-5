  
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const normalize = require('normalize-mongoose');

const timeSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
})

timeSchema.plugin(normalize);

var Times = mongoose.model('Time', timeSchema);

module.exports = Times;