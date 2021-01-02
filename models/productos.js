const pool = require("./../utils/db");
const T_PRODUCTOS = "productos";
T_PRECIOS = "preciosProducto"

const create = async (obj) =>{
    try{
        const query="INSERT INTO ?? SET ?"; 
        const params =[T_PRODUCTOS, obj];
        return await pool.query(query,params);
    }
    catch (e){
        console.log(e);
    }
};

const get = async (idProducto) =>{
    try{
        var query;
        if (idProducto == undefined) {query = "SELECT p.idProducto, p.idCategoria, p.descripcion, imagen, stock, valor, idPrecio, cat.descripcion as descripcionCat FROM productos p INNER JOIN preciosProducto pp on p.idProducto = pp.idProducto INNER JOIN categorias cat on p.idCategoria=cat.idCategoria WHERE p.eliminado=false AND hasta IS null"} else 
            {query =   "SELECT p.idProducto, idCategoria, descripcion, imagen, stock, valor, idPrecio FROM productos p INNER JOIN preciosProducto pp on p.idProducto = pp.idProducto WHERE eliminado=false AND hasta IS null AND p.idProducto=?"};
        const params = [idProducto];
        return await pool.query(query,params);
    }catch(e){
        console.log(e);
    }
};

const update = async(idProducto,obj) =>{
    //Si obj llega vacio se elimina la fila (borrado lógico).
    try{
        if (obj == undefined) obj={eliminado:1};
        const query = "UPDATE ?? SET ? WHERE idProducto=?";
        const params = [T_PRODUCTOS,obj,idProducto];
        return await pool.query(query,params);
    }catch(e){
        console.log(e);
    }
};

module.exports = { create, get, update };