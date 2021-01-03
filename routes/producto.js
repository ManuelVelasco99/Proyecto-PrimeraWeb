const express = require('express');
const router = express.Router();
const {get:getProductos} = require('./../models/productos');

const verProducto = async(req,res) => {
    try{
        //console.log(req.query);
        const [producto] =await getProductos(req.query.idProducto);
        console.log(producto);
        res.render("producto",producto);


    }catch(e){
        console.log(e);
    }
};

router.get("/",verProducto);
module.exports=router;