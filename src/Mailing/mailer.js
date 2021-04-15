import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN
    }
  });

  return transporter;
};

const sendMailWithNodeMailer = async (from,subject,message)=> {
  try{
    let emailTransporter = await createTransporter();
    const emailOptions = {
      from,
      to: process.env.EMAIL,
      subject,
      html: `<p>${message}</p> <br> <p>Email sent from ${from} </p>`,
    };
    await emailTransporter.sendMail(emailOptions);
  }catch(error){
    console.log("NODE MAILER ERROR", error);
    throw new Error(error);
  }

}


const sendMailWithSendGrid  = async (from,subject,message) =>{

  const msg = {
    to: process.env.EMAIL_TO,
    from: process.env.EMAIL_FROM,
    subject,
    html: `<p>${message}</p> <br> <p>Email sent from ${from} </p>`,
  }
  
  try{
    await sgMail.send(msg);
  }catch(e){
    console.log("SNED GRID ERROR", e)
    throw new Error(e,404);
  }
};

export  {sendMailWithNodeMailer,sendMailWithSendGrid};
