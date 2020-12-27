const express = require('express');
const router = express.Router();
const {get,create : crearCategoria} = require('../../models/categorias');

const categorias = async (req, res) =>{
    try{   
        const categorias = await get();
        console.log(categorias);
        res.render("categorias",{categorias});
    } catch(e){
        console.log(e);
    }
};

const nuevaCategoria = async(req,res) =>{
    try{
        const {body:cate} = req;
        console.log(cate);
        await crearCategoria(cate);
        const categorias = await get();
        res.render("categorias",{categorias});
    }catch(e){
        console.log(e);
    }
};

router.get("/all",categorias);
router.post("/create", nuevaCategoria);
module.exports = router;