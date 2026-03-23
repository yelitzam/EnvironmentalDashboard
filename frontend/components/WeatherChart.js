import {
    BarChart, Bar, XAxis, YAxis, Tooltip
} from "recharts";

export default function WeatherChart({ citiesData }){
    const chartData = citiesData.map((c)=> ({
        name: c.city,
        temp: c.weather.temperature,
        aqi: c.airquality.aqi
      }));
    return (
        <BarChart width={500} height={300} data={chartData}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="temp" fill="#c0421fff"/>
            <Bar dataKey="aqi" fill="#82ca9d"/>
        </BarChart>
    );
}