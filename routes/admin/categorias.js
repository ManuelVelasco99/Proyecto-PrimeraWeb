const express = require('express');
const router = express.Router();
const {get} = require('../../models/categorias');

const categorias = async (req, res) =>{
    try{   
        const categorias = await get();
        console.log(categorias);
        res.render("categorias",{categorias});
    } catch(e){
        console.log(e);
    }
};

router.get("/all",categorias);
module.exports = router;