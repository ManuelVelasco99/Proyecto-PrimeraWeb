const pool = require("./../utils/db");
const T_CATEGORIAS = "categorias";

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

const get = async (idCategoria) =>{
    try{
        var query;
        if (idCategoria == undefined) {query = "SELECT idCategoria, descripcion FROM ?? WHERE eliminado=false"} else 
            {query =   "SELECT idCategoria, descripcion FROM ?? WHERE idCategoria=? AND eliminado=false"};
        const params = [T_CATEGORIAS,idCategoria];
        return await pool.query(query,params);
    }catch(e){
        console.log(e);
    }
};

const update = async(idCategoria,obj) =>{
    //Si obj llega vacio se elimina la fila (borrado lógico).
    try{
        if (obj == undefined) obj={eliminado:1};
        const query = "UPDATE ?? SET ? WHERE idCategoria=?";
        const params = [T_CATEGORIAS,obj,idCategoria];
        return await pool.query(query,params);
    }catch(e){
        console.log(e);
    }
};

module.exports = { create, get, update };
