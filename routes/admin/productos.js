const express = require('express');
//app.use(express.static('views/images')); 
const router = express.Router();
const { create:crearProducto, get: getProductos} = require("./../../models/productos");
const { get: getCategorias} = require("./../../models/categorias");
const multer = require("multer"); // npm i multer
const config = { dest: `./public/tmp` };
const upload = multer(config);
const { imgFile } = require("./../../utils/fileHandler");

const productos = async (req,res) =>{
    try{
        const categorias = await getCategorias();
        const productos = await getProductos();
        console.log(categorias, productos);
        res.render("adminProductos",{categorias,productos});

    }catch(e){
        console.log(e);
    }
};

const nuevoProducto = async(req,res) =>{
    try{
        //console.log(req);
        const imagen = await imgFile(req.file);
        req.body.imagen = imagen;     
        console.log(req.body,req.file);
        await crearProducto(req.body);
        res.redirect("/admin/productos/all");
    }catch(e){
        console.log(e);
    }
};

router.get("/all",productos);
router.post("/create",upload.single("imagen"), nuevoProducto);
module.exports = router;