import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);



const sendMailWithNodeMailer = async (from,subject,message)=> {

    return new Promise((resolve, reject) => {

      const transporter = nodemailer.createTransport({
        service:'gmail',
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_AUTH_USERNAME,
          pass: process.env.EMAIL_AUTH_PASSWORD,
        },
      });

       const mailOptions = {
          from,
          to: process.env.EMAIL_TO,
          subject,
          html: `<p>${message}</p> <br> <p>Email sent from ${from} </p>`,
        };

        // eslint-disable-next-line no-unused-vars
        transporter.sendMail(mailOptions, (err, data) => {
          if (err) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(err);
          }
          resolve(true);
        });
      
    }).catch(function(error) {
      console.log("NODE MAILER ERROR", error);
      throw new Error(error);
    });
  };


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
