const express = require('express');
const router = express.Router();
const { v4: uuid } = require("uuid");
const {buscarCarrito, eliminarLinea, crearCarrito, crearLinea,buscarPedido, cerrarPedido } = require("./../models/pedidos");



const pdf = require('html-pdf');

const content = `
<h1>Título en el PDF creado con el paquete html-pdf</h1>
<p>Generando un PDF con un HTML sencillo</p>
`;



const compra = async(req,res) => {
    try{
        carrito = await buscarCarrito(req.session.idUser);
                var total = 0;
                carrito.forEach(carrito => {
                    carrito.valor=carrito.valor*carrito.cantidad
                    total=total+carrito.valor;
                });
        res.render("buy",{total});

    }catch(e){
        console.log(e);
    }
};

const confirmarCompra = async(req,res) =>{
    try{
        console.log(req.body);
        const uid=uuid();
        const factura=`${uid}.pdf`;
        const {direccion:direccionEnvio,importe}=req.body;
        var [{idPedido}] = await buscarPedido(req.session.idUser);
        const content = `
                        <h1>Factura N°${idPedido}</h1>
                        <p>Importe: ${importe}</p>
                        `;
        pdf.create(content).toFile(`./public/facturas/${uid}.pdf`, function(err, res) {
            if (err){
                console.log(err);
            } else {
                console.log(res);
            }
        });
        console.log(idPedido,direccionEnvio,factura);
        await cerrarPedido( idPedido,direccionEnvio,factura);
        res.redirect("/");
        console.log()
    }catch(e){
        console.log(e);
    }

};


router.post("/",confirmarCompra);
router.get("/",compra);
module.exports=router;