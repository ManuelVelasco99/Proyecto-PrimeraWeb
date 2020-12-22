const nodemailer= require("nodemailer");

const send = async (mail,subject) =>{
    try{
        console.log(mail+" aca tendria q estar el mail");
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
            subject : subject,//asunto
            text: "Holi",
            html: '<p>Confirmá tu cuenta <a href="">Link mágico</a></p>',
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