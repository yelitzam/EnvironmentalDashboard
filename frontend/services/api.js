export async function fetchCityData(city){
    const res = await fetch(
        `http://localhost:5000/api/city-data?city=${city}`
    );
    // if(!city){
    //     console.log("must enter city");
    // }
    if(!res.ok){
        console.log("error");
        throw new Error("failed to fetch data");
    }

    return res.json();
}