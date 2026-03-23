import { useState } from "react";

export default function SearchBar({ onSearch }){
    const [city, setCity] = useState("");
    return(
        <div className="flex gap-2">
            <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                className="text-gray-700 border p-2 rounded"/>
            <button onClick={()=> onSearch(city)}
                className="bg-green-500 text-white px-4 py-2 rounded">
                Search
            </button>
        </div>
    );
}