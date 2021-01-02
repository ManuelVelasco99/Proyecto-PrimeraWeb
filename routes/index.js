var express = require('express');
var router = express.Router();
const {get:getCategorias,create : crearCategoria, update : deleteCat, update} = require('../models/categorias');
const { get:getProductos, getDescPar:getpProductosDesc }= require('../models/productos')

const showView = async(req,res) =>{
  try{
    console.log(req.query);
    const categorias = await getCategorias();
    //var productos = await getProductos();
    if (req.query.idCategoria != undefined){ 
      const {idCategoria} = req.query;
      console.log(idCategoria);   
      var productos = await getProductos(idProducto = undefined,idCategoria);
      if (productos == 0) var message = "Esta categoría no tiene productos";
      res.render("index",{message,productos,categorias})};
    var productos = await getProductos();
    res.render('index', { title: 'Inicio',log:true,categorias,productos});
  }catch(e){
    console.log(e);
  }
};

const busqueda = async(req,res) => {
  try{
    console.log(req.body);
    const categorias = await getCategorias();
    var productos = await getpProductosDesc(req.body.descripcion);
    if (productos == 0) var message = "No se encontraron productos con esa descripción";
    res.render('index', { title: 'Inicio',log:true,categorias,productos,message});
  }catch(e){
    console.log(e);

  }
};
/* GET home page. */
router.get('/', showView);
router.post('/serach',busqueda);
module.exports = router;
