import { useEffect, useState } from "react";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ApiLogs(){
    const [logs, setLogs] = useState([]);
    useEffect(()=>{
        const interval = setInterval(() => {
            fetch(`${BASE_URL}/api/logs`).then((res)=>res.json()).then(setLogs);
        }, 3000);
        return()=> clearInterval(interval);
    }, []);

    return (
        <div className="mt-8">
            <h2 className="text-xl text-gray-700 font-semibold mb-4">API Logs</h2>
            <table className="min-w-full text-gray-700 bg-white shadow rounded">
                <thead>
                    <tr className="bg-gray-200">
                        <th>Service</th>
                        <th>Status</th>
                        <th>Latency</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log,i) => (
                        <tr key={i}>
                            <td className="p-2 text-center">{log.service}</td>
                            <td className={log.error ? "text-center":""}>{log.status}</td>
                            <td className="text-center">{log.latency}</td>
                            <td className="text-center">{log.timestamp}</td>
                        
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}