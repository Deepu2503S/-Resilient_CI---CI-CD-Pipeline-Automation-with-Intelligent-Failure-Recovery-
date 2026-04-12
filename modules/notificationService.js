import nodemailer from "nodemailer"

export default class NotificationService{
    constructor(){
        this.transporter = nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS

            }
        });
    }
async sendNotification(message,userEmail){
    // const reciver = userEmail || process.env.EMAIL_TO;
    // await this.transporter.sendMail({
    //     from : process.env.EMAIL_USER,
    //     to : reciver,
    //     subject : "CI/CD Pipeline Notification",
    //     text : message
    // })
    console.log("Notification send")

}


}
