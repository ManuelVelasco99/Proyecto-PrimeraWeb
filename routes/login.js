const express = require('express');
const router = express.Router();
const sha1 = require("sha1");
const {auth} = require("./../models/usuarios");

const login = async (req,res) => {
    try{
        let {nombreUsuario,password} = req.body;
        password = sha1(password);
        //console.log(nombreUsuario,password);
        const result = await auth({nombreUsuario,password});
        if (result == 0) {res.render("login" ,{message: "Usuario o contraseña incorrecto"});};
        const [{idUsuario}]=result;
        //console.log(idUsuario);
        req.session.idUser = idUsuario; // Variable superglobal de sessión.
        res.redirect("/");

    }catch(e){
        console.log(e);
    }
};


router.get("/",(req,res)=>{
    res.render("login");
});
router.post("/",login);
module.exports=router;
