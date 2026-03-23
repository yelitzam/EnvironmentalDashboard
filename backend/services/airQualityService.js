const axios = require("axios");
const {addLog} = require("../logs/apiLogs");

async function getAirQuality(lat,lon){
    const startTime = Date.now()
    try{
        const response = await axios.get(
        'http://api.airvisual.com/v2/nearest_city',
        {
            params:{
                lat,
                lon,
                key: process.env.IQAIR_API_KEY
                
            }
        }
        );
        const duration = Date.now()-startTime;
        const pollution = response.data.data.current.pollution;
        addLog({
            service: "Air Quality Index",
            status: response.status,
            latency: duration
        });
        return{
            aqi: pollution.aqius,
            main_pollutant: pollution.mainus
        };
    }catch(error){
        const duration = Date.now()-startTime;
        addLog({
            service: "Air Quality Index",
            status: error.response.status,
            latency: duration,
            error: true
        });
    }


    
}

module.exports = {getAirQuality};
