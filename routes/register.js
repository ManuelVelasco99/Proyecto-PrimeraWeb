const express = require('express');
const router = express.Router();
const {register : registro}  = require('../services/registro');
const showView = (req, res) => res.render("register")
const {update : validarCorreo} = require('../models/usuarios');
const {get : getNombreUsuario} = require('../models/usuarios')
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
const verify = async (req, res) => {
    try{
        console.log(req.query);
        const {uid} = req.query;
        const {insertId} = await validarCorreo({habilitado : true},uid);
        console.log(insertId);
        //const nombreUsuario="manolete";
        const [{nombreUsuario}] = await getNombreUsuario(uid);
        console.log(nombreUsuario);
        res.render("verify",{message : nombreUsuario});
    } catch(e){
        console.log(e);
    }

};


router.get("/", showView);
router.post("/create", create);
router.get("/verify", verify);
module.exports= router;
