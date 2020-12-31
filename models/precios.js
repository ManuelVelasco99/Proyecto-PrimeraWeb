const pool = require("./../utils/db");
const T_PRECIOS = "preciosProducto";

const create = async (obj) =>{
    try{
        const query="INSERT INTO ?? SET ?"; 
        const params =[T_PRECIOS, obj];
        return await pool.query(query,params);
    }
    catch (e){
        console.log(e);
    }
};

const get = async (idProducto,time) =>{
    try{
        var query =   "SELECT idProducto, idCategoria, descripcion, imagen, stock FROM ?? WHERE idProducto=? AND desde<? AND hasta=null";
        const params = [T_PRECIOS,idProducto,time];
        return await pool.query(query,params);
    }catch(e){
        console.log(e);
    }
};

const update = async(idPrecio) =>{
    try{
        const query = "UPDATE ?? SET hasta=CURRENT_TIMESTAMP() WHERE idPrecio=?";
        const params = [T_PRECIOS,idProducto];
        return await pool.query(query,params);
    }catch(e){
        console.log(e);
    }
};

module.exports = { create, get, update };