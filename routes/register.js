const express = require('express');
const router = express.Router();
const {send} = require('../services/mail');
const showView = (req, res) => res.render("register")
const  create = async (req, res) =>{
    try{
        const {body}= req;
        console.log(body);
        const dirmail = body.email;
        console.log(dirmail);
        await send(dirmail,"Confirmacion de email");
        res.render("register", {
            message: "Registro exitoso, se envió un mail de confirmación a tu dirección de correo electrónico",
        });
    }
    catch(e){
        console.log(e);
    }
};


router.get("/", showView);
router.post("/create", create)
module.exports= router;