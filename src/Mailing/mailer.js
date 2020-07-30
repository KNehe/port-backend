import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


const sendMail = async (from,subject,message)=> {

    return new Promise((resolve, reject) => {

      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
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
      throw new Error(error);
    });
  };


export default sendMail;
