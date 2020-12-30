const pool = require("./../utils/db");
const T_CATEGORIAS = "productos";

const create = async (obj) =>{
    try{
        const query="INSERT INTO ?? SET ?"; 
        const params =[T_CATEGORIAS, obj];
        return await pool.query(query,params);
    }
    catch (e){
        console.log(e);
    }
};

const get = async (idProducto) =>{
    try{
        var query;
        if (idProducto == undefined) {query = "SELECT idProducto, idCategoria, descripcion, imagen, stock FROM ?? WHERE eliminado=false"} else 
            {query =   "SELECT idProducto, descripcion FROM ?? WHERE idCategoria=? AND eliminado=false"};
        const params = [T_CATEGORIAS,idProducto];
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
        const params = [T_CATEGORIAS,obj,idProducto];
        return await pool.query(query,params);
    }catch(e){
        console.log(e);
    }
};

module.exports = { create, get, update };