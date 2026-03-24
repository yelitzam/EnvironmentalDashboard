const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCityData(city) {
 const res = await fetch(
   `${BASE_URL}/api/city-data?city=${city}`
 );
console.log(BASE_URL);
 if (!res.ok) {
   throw new Error("Failed to fetch data");
 }
 
 return res.json();
}
