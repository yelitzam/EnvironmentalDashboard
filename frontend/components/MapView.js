import mapboxgl from "mapbox-gl";
import { GSP_NO_RETURNED_VALUE } from "next/dist/lib/constants";
import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken=process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

function getAQIColor(aqi){
    
    if( aqi > 150 ) return "red";
    else if ( aqi > 100 ) return "orange";
    else if ( aqi > 50 ) return"yellow";
    return "green";

}
const mapBounds = [
    [-128.8, 23.6], // Southwest coordinates
    [-65.4, 50.2]  // Northeast coordinates
];

export default function MapView({cities}){
    const mapContainer = useRef(null);
    const mapRef = useRef(null); // storing map instance
    const markersRef = useRef([])

    useEffect( ()=>{
        //delay map container init
        // if(!mapContainer.current) return;

        // const {width, height} = mapContainer.current.getBoundingClientRect();
        // if(!width || !height) return;

        if(!mapRef.current){
            mapRef.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [0,20],
                zoom:2,
                // interactive: false
            });
        } 

        //remove old markers
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        //adding markers for each city
        cities.forEach((city) => {
            const{lat, lon} = city.coordinates;
            const marker = new mapboxgl.Marker({
                color: getAQIColor(city.airquality.aqi),
                anchor: "bottom",
                margin:0,
            }).setLngLat([lon, lat])
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${city.city}</h3><p>AQI:${city.airquality.aqi}</p>`))
            .addTo(mapRef.current);
            markersRef.current.push(marker);
        });
    
        mapRef.current.resize();

        
    }, [cities]);

    return <div ref={mapContainer} className="w-full h-96"/>
}

//error after getting a basic view of charts and maps is that after every search a new map object is created. after searching 3 cities
//I have three maps. need to fix this by checking whether map exists, if it does then you just reset the center using new lat and lon