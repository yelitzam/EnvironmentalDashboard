export default function AQIGuage( {aqi}){
    let color = "green";

    if( aqi > 150 ) color = "red";
    else if ( aqi > 100 ) color = "orange";
    else if ( aqi > 50 ) color = "yellow";

    return (
        <div className="p-4 font-bold">
            <h3>Air Quality Index</h3>
            <p style={{color}}> {aqi} </p>
        </div>
    );
}