
import { useState } from "react";

export default function CityComparisonTable({cities, onRemove}){
    return(
        <div>
        <table className="min-w-full text-gray-700 bg-white shadow rounded mt-6 w-full">
            <thead>
                <tr>
                    <th>City</th>
                    <th>Temperature</th>
                    <th>Humidity</th>
                    <th>AQI</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {cities.map((city, index) => (
                    <tr key={index} >
                        <td className="font-medium text-gray-700 text-center">{city.city}</td>
                        <td className="text-center">{city.weather.temperature}F</td>
                        <td className="text-center">{city.weather.humidity}</td>
                        <td className="text-center">{city.airquality.aqi}</td>
                        <td className="p-3 text-center"> 
                            <button onClick={() => onRemove(index)}
                            className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-red-600">Remove
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    ); 
}

