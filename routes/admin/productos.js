const express = require('express');
//app.use(express.static('views/images')); 
const router = express.Router();
const { 
    create:crearProducto, 
    get: getProductos, 
    update : deleteProd, 
    update : updateProducto
} = require("./../../models/productos");
const { get: getCategorias} = require("./../../models/categorias");
const {create : createPrecio, update : updatePrecio} = require("./../../models/precios")
const multer = require("multer"); // npm i multer
const config = { dest: `./public/tmp` };
const upload = multer(config);
const { imgFile ,deleteTemp : eliminarImagen } = require("./../../utils/fileHandler");

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
        let {valor} = req.body;
        delete req.body.valor;
        //console.log(req.body,req.file,valor);
        let {insertId : idProducto} = await crearProducto(req.body);
        //console.log(idProducto);
        await createPrecio({valor,idProducto});
        res.redirect("/admin/productos/all");
    }catch(e){
        console.log(e);
    }
};

const borrarProducto = async(req,res) =>{
    try{
        let {idProducto} = req.query;
        console.log(idProducto);
        await deleteProd(idProducto);
        res.redirect("/admin/productos/all");
        
    }catch(e){
        console.log(e);
    }
};

const editarProducto = async(req,res) =>{
    try{
        const categorias = await getCategorias();
        console.log(categorias);
        console.log(req.query);
        let {idProducto} = req.query;
        let productos = await getProductos(idProducto);
        console.log(productos);
        let [{ idCategoria, descripcion, imagen, stock, valor, idPrecio}] = productos;
        
        console.log({ idCategoria, descripcion, imagen, stock});
        res.render("adminProducto",{idProducto, idCategoria,descripcion,descripcion, imagen,stock,categorias,valor,idPrecio});
        
    }catch(e){
        console.log(e);
    }
};

const actualizarProducto = async(req , res) =>{
    try{
        console.log(req.body,req.file,req.query.idProducto);
        let [productos] = await getProductos(req.query.idProducto);
        let {imagen : imagenAnterior} = productos;
        let {idProducto,idCategoria,descripcion,stock,valor,valorPred,idPrecio} = req.body;
        
        console.log(stock,descripcion);
        if (req.file != undefined) {
            const imagen = await imgFile(req.file);
            req.body.imagen = imagen; //si se selecciona una imagen agrega al objeto el nombre de la misma para ser insertado en la db
            await updateProducto(req.body.idProducto,{idCategoria,imagen,descripcion,stock});
            eliminarImagen(`./public/images/${imagenAnterior}`); //luego de insertar la imagen nueva elimina la anterior.
            res.redirect("/admin/productos/all");
        };
        await updateProducto(idProducto,{idCategoria,descripcion,stock});
        if (valor != valorPred){
            await updatePrecio(idPrecio);
            await createPrecio({idProducto,valor});
        };
        res.redirect("/admin/productos/all");
    }catch(e){
        console.log(e);
    }
};

router.get("/all",productos);
router.post("/create",upload.single("imagen"), nuevoProducto);
router.get("/delete",borrarProducto);
router.get("/edit",editarProducto);
router.post("/update", upload.single("imagen"), actualizarProducto);
module.exports = router;