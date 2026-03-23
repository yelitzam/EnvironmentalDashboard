"use client";
import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import { fetchCityData } from "../../services/api";
import MetricsCard from "../../components/MetricsCard";
import WeatherChart from "../../components/WeatherChart";
import AQIGuage from "../../components/AQIGauge";
import MapView from "../../components/MapView";
import CityComparisonTable from "../../components/CityComparisonTable";
import ApiLogs from "../../components/ApiLogs";


export default function Home(){
  const [citiesData, setCitiesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const removeCity = (index)=>{
    setCitiesData((prev) =>
    prev.filter((_,i) => i !== index)
    );
  };

  const handleSearch = async (city) => {
    try{
      setLoading(true);
      setError(null);
      const result = await fetchCityData(city);
      setCitiesData((prev)=>[...prev, result]);
    }catch(err){
      console.error(err);
      setError("Failed to fetch city data");
    }finally{
      setLoading(false);
    }
  };

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl text-gray-700 font-bold mb-6">EnviroDash</h1>
      {/* Search */}
      <SearchBar onSearch={handleSearch}/>
      {loading && <p className="text-gray-700 mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {/* Content */}
      {citiesData && (
        <>
        <CityComparisonTable cities={citiesData} onRemove={removeCity}/>
        <div className="flex flex-wrap p-4 mt-6">
        <WeatherChart citiesData={citiesData}/>
        </div>
        
        <div className="bg-white p-4 rounded shadow mt-8">
          <h2 className="text-xl text-gray-700 font-semibold">Map View</h2>
          <div className="w-full h-96 border relative overflow-hidden">
            <MapView cities={citiesData}/>
          </div>
        </div>
      <ApiLogs/>
      </>   

      
      )}
    </main>
  );
}





{/* <div className="flex flex-wrap gap-4 mt-6">
          <MetricsCard
            title="Temperature:"
            value={`${data.weather.temperature} F`}/>

          <MetricsCard
            title="Humidity:"
            value={`${data.weather.humidity} mph`}/>

          <MetricsCard
            title="AQI:"
            value={data.airquality.aqi}/>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold mb-2">Temperature Trend</h2>
            
          </div>
          <div className="bg-white p-4 rounded shadow">
            <AQIGuage aqi={data.airquality.aqi}/>
          </div>
        </div>
        
       
        <div className="bg-white p-4 rounded shadow mt-8">
            <h2 className="font-semibold mb-2">Map View</h2>
          <MapView lat={data.coordinates.lat} lon={data.coordinates.lon}/>
        </div> */}


//         const mockData = [
//   {time: "8am", temp:50},
//   {time: "9am", temp:60},
//   {time: "10am", temp:68}
// ];