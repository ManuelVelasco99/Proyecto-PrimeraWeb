const express = require('express');
const router = express.Router();


const borrarSesion = async(req,res) =>{
    try{
        req.session.idUser=undefined;
        res.redirect("/");
    }catch(e){
        console.log(e);
    }
};

router.get("/",borrarSesion);
module.exports=router; 