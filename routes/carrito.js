const express = require('express');
const router = express.Router();
const {buscarCarrito, eliminarLinea, crearCarrito, crearLinea,buscarPedido } = require("./../models/pedidos");
const {logueado,admin} = require("./../utils/session");

const showCarrito = async(req,res) =>{
    try{
        var log = await logueado(req.session.idUser);
        const adm = await admin(req.session.idUser);
        
        //console.log(log);
        if (!log) res.redirect("/login")
        else{
            const {idUser}=req.session;
            var carrito = await buscarPedido(idUser);
            console.log(carrito);
            if (carrito == 0) {await crearCarrito(idUser); res.redirect("/carrito")}
            else{
                carrito = await buscarCarrito(req.session.idUser);
                var total = 0;
                carrito.forEach(carrito => {
                    carrito.valor=carrito.valor*carrito.cantidad
                    total=total+carrito.valor;
                });
                if (carrito == 0) vacio=true; else vacio=false;
                res.render("carrito",{carrito,log,adm,total,vacio});
            };
        };
    }catch(e){
        console.log(e);
    }
};

const quitarProducto = async(req,res) => {
    try{
        const {idLineaPedido} = req.query;//funciona
        await eliminarLinea(idLineaPedido);
        res.redirect("/carrito");
        
    }catch(e){
        console.log(e);
    }
};

const agregarAlcarrito = async(req,res) => {
    try{       
        var log = await logueado(req.session.idUser);
        const adm = await admin(req.session.idUser);
        if (!log) res.redirect("/login")
        else{
            var carrito = await buscarPedido(req.session.idUser);
            var [{idPedido}] = carrito;
            const {idProducto} = req.query;
            console.log(carrito,req.query);
            if (carrito == 0) {await crearCarrito(req.session.idUser); carrito = await buscarPedido(req.session.idUser); }
            else{
                const {cantidad} = req.body;
                await crearLinea({idPedido,cantidad,idProducto});
                res.redirect("/carrito");
            };
        }
    }catch(e){
        console.log(e);
    }
};

router.get("/",showCarrito)
router.get("/delete",quitarProducto);
router.post("/add",agregarAlcarrito);
module.exports=router;
