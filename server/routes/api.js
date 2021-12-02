const express = require('express')
const router = express.Router()
const City = require('../model/City')
const urllib = require('urllib');

router.get('/city/:cityName', function (req, res) {
    urllib.request(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.cityName}&appid=2b1e67d568aa1ebd879a6fdd23d8e639&units=metric`, function (err, data, result) {

        const city = JSON.parse(data)

        res.send({
            name: city.name,
            temperature: city.main.temp,
            condition: city.weather[0].main,
            conditionPic: city.weather[0].icon
        })
    });
})

router.get('/cities', async function (req, res) {
    const result = await City.find({})
    res.send(result)
})

router.post('/city', function (req, res) {
    const city = req.body
    City.create({ name: city.name, temperature: city.temperature, condition: city.condition, conditionPic: city.conditionPic })
    res.end()
})


router.delete('/city/:cityName', async function (req, res) {
    await City.findOneAndDelete({ name: req.params.cityName })
    res.send('deleted')
})

module.exports = router