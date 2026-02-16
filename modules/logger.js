import fs from "fs";

export default class Logger{
    log(message){
        const timestamp = new Date().toISOString();
        const logmessage = `[${timestamp}] : ${message}\n`;

        fs.appendFileSync("execution.log",logmessage)
    }
}