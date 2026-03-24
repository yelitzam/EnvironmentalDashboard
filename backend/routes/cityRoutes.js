const express = require("express");
const router = express.Router();

const { getCoordinates } = require("../services/geocodeService");
const { getWeather } = require("../services/weatherService");
const { getAirQuality } = require("../services/airQualityService");
const {addLog, getLogs} = require("../logs/apiLogs");

router.get("/city-data", async (req, res) => {
    try{
        const city = req.query.city;
        if(!city){
            return res.status(400).json({error:"City is required"});
        }
        console.log(city);
        const coords = await getCoordinates(city);
        console.log(coords);
        const weather = await getWeather(coords.lat, coords.lon);
        console.log(coords);
        const airquality = await getAirQuality(coords.lat, coords.lon);
        console.log(coords);
        res.json({
            city,
            coordinates: coords,
            weather,
            airquality
        });
    }
    catch (error){
        res.status(500).json({error: "API Integration error"});
    }
});

router.get("/logs", (req,res) =>{
    res.json(getLogs());
})

module.exports = router; 