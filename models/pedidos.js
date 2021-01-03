const { query } = require("./../utils/db");
const pool = require("./../utils/db");
const T_PEDIDOS = "pedidos";
const T_LINEAPEDIDOS = "lineaPedido";
const T_PRODUCTOS = "productos";
const T_USUARIOS ="usuarios";
const T_PRECIOS = "preciosProducto";

const crearCarrito = async (idUsuario) =>{
    try{
        const query = `INSERT INTO ?? SET idUsuario=${idUsuario}`;
        const params = [T_PEDIDOS,idUsuario];
        return await pool.query(query,params);

    }catch(e){
        console.log(e);
    }
} ;

const buscarPedido = async(idUsuario) =>{
    try{
        const fecha = null;
        const query = `SELECT idPedido FROM ?? WHERE idUsuario=${idUsuario} AND fecha IS null`;
        const params = [T_PEDIDOS];
        console.log(query);
        return await pool.query(query,params);

    }catch(e){
        console.log(e);
    }
};

const buscarCarrito = async (id) =>{
    try{
        const query = `SELECT pro.descripcion, pro.imagen, li.cantidad, pre.valor, pre.idPrecio, li.idLineaPedido  FROM ?? ped INNER JOIN ?? li ON ped.idPedido=li.idPedido INNER JOIN ?? pro ON li.idProducto=pro.idProducto INNER JOIN ?? u ON ped.idUsuario=u.idUsuario INNER JOIN ?? pre ON pro.idProducto=pre.idProducto WHERE ped.fecha IS null AND pre.hasta IS NULL AND u.idUsuario=${id}`
        const params = [T_PEDIDOS,T_LINEAPEDIDOS,T_PRODUCTOS,T_USUARIOS,T_PRECIOS,id];
        return await pool.query(query,params);

    }catch(e){
        console.log(e);
    }
};
//obj.fecha="CURRENT_TIME()";

const cerrarPedido = async(idPedido, direccionEnvio,factura) => {
    try{
        const query = `UPDATE ?? SET fecha=CURRENT_TIME(), direccionEnvio='${direccionEnvio}',factura='${factura}' WHERE idPedido=${idPedido}`;
        const params =[T_PEDIDOS];
        return await pool.query(query,params);

    }catch(e){
        console.log(e)
    }
};

const crearLinea = async(obj) =>{ //idproducto , idpedido cantidad
    try{
        const query = "INSERT INTO ?? SET ?";
        const params = [T_LINEAPEDIDOS,obj];
        return await pool.query(query,params);
    }catch(e){
        console.log(e);
    }
};

const eliminarLinea = async(id) =>{
    try{
        const query =`DELETE from ?? WHERE idLineaPedido=${id}`
        const params = [T_LINEAPEDIDOS];
        return await pool.query(query,params);

    }catch(e){
        console.log(e);
    }
};

module.exports = { crearCarrito,buscarCarrito,eliminarLinea, crearLinea,buscarPedido,cerrarPedido };