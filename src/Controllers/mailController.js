import sendMail from './../Mailing/mailer';

const contactUs = async (req,res,next)=>{

    try{

        if(!req.body.from || !req.body.message || !req.body.subject){
            return  res.status(400)
            .json({
               "message": "Invalid and bad request"
        });

        }

        const { from, subject, message} = req.body;

        await sendMail(from,subject,message);

        return  res.status(200).json({ "message":"Email sent"});

    }catch(e){
      console.log(e)
      return res.status(500)
          .json({
             "message": "An error occured while sending email"
      });

    }

};

export default {contactUs};