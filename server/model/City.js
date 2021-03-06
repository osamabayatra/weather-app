const mongoose = require('mongoose')
const Schema = mongoose.Schema

// mongoose.connect('mongodb://localhost/weather', { useNewUrlParser: true })
const citySchema = new Schema({
    name: String,
    temperature: Number,
    condition: String,
    conditionPic: String
})

const City = mongoose.model('City', citySchema);

module.exports = City;





