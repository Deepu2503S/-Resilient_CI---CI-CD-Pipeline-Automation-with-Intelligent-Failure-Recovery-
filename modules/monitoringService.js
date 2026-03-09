import fs from "fs"

export default class MonitoringService{
    constructor(file = "pipeline_status.json"){
        this.file = file
    }

    trackStatus(status){
        const data = {
            status,
            updatedAt : new Date().toISOString()
        };

        fs.writeFileSync(this.file,JSON.stringify(data,null,2))
    }
}