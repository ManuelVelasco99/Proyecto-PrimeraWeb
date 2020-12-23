const express = require('express');
const router = express.Router();
const {register : registro}  = require('../services/registro');
const showView = (req, res) => res.render("register")
const  create = async (req, res) =>{
    try{
        const {body: usuario} = req;
        console.log(usuario);
        await registro(usuario);
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