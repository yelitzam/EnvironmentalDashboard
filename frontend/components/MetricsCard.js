import { useState } from "react";
export default function MetricsCard({title, value}){
    return(
        <div className="bg-white rounded w-40">
            <h3 className="text-sm text-gray-400">{title}</h3>
            <p className="text-xl font-bold">{value}</p>
        </div>
    );
     
}