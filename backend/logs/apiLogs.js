const logs = [];

function addLog(entry){
    logs.push({...entry, timestamp: new Date().toISOString()});

    //i only want the last 10 logs
    if( logs.length > 30) logs.at.shift();
}

function getLogs(){
    return logs;
}

module.exports = { addLog, getLogs};