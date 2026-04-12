// BUG: the entire sendMail block was commented out
// FIX: uncommented it, fixed the parameter (userEmail was unused), added error handling
import nodemailer from "nodemailer";

export default class NotificationService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host :"smtp.gmail.com",
      port : 465,
      secure : true,
      auth: {
        user: "****",
        pass: "*****",
      },
      tls: {
        rejectUnauthorized : false
      }
    });
  }

  async sendNotification(message, userEmail) {
    const receiver = "anupamlfh@gmail.com";
    try {
      await this.transporter.sendMail({
        from: "anupam.tripathi23b@iiitg.ac.in",
        to: receiver,
        subject: "CI/CD Pipeline Notification",
        text: message,
      });
      console.log("Notification sent to", receiver);
    } catch (error) {
      console.error("Failed to send notification:", error.message);
    }
  }
}