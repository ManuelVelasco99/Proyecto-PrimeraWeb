const nodemailer= require("nodemailer");

const send = async ({
    mail,
    subject="Gracias por registrarte",
    message : html,
}) =>{
    try{
        const transporter = nodemailer.createTransport({          
            host: "smtp.gmail.com",//process.env.MAILHOST,
            port: 465,//process.env.MAIL_PORT,
            auth: {
                user: "proyectoennode99@gmail.com",//process.env.MAIL_USER,
                pass: "Proyectonode9",//process.env.MAIL_PASSWORD,
            },
        });
        const info = {
            to : mail,
            subject,//asunto
            html,
        };
        console.log(process.env.MAIL_USER);
        const {messageId} = await transporter.sendMail(info);        
        return messageId;
    }
    catch(e){
        console.log(e)
    }
};

module.exports={send}