const express = require('express');
const router = express.Router();

const compra = async(req,res) => {
    try{
        res.render("buy");

    }catch(e){
        console.log(e);
    }
};

const confirmarCompra = async(req,res) =>{
    try{
        console.log(req.body);
        res.end();
        
    }catch(e){
        console.log(e);
    }

};


router.post("/",confirmarCompra);
router.get("/",compra);
module.exports=router;