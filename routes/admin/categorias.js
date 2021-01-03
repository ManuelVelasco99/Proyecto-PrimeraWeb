const express = require('express');
const router = express.Router();
const {get,create : crearCategoria, update : deleteCat, update} = require('../../models/categorias');
const {logueado,admin} = require("../../utils/session");


const categorias = async (req, res) =>{
    try{   
        if(req.session.idUser == undefined) res.redirect("/login")
        const log = await logueado(req.session.idUser);
        const adm = await admin(req.session.idUser);
        const categorias = await get();
        console.log(categorias);
        res.render("adminCategorias",{categorias,title:"Categorias",log,adm});
    } catch(e){
        console.log(e);
    }
};

const nuevaCategoria = async(req,res) =>{
    try{
        let {body:cate} = req;
        console.log(cate);
        await crearCategoria(cate);
        const categorias = await get();
        console.log(categorias);
        res.redirect("/admin/categorias/all");
    }catch(e){
        console.log(e);
    }
};

const borrarCategoria = async(req,res) =>{
    try{
        let {idCategoria} = req.query;
        console.log(idCategoria);
        await deleteCat(idCategoria);
        res.redirect("/admin/categorias/all");
        
    }catch(e){
        console.log(e);
    }
};

const editarCategoria = async(req,res) =>{
    try{
        const log = await logueado(req.session.idUser);
        const adm = await admin(req.session.idUser);
        console.log(req.query);
        let {idCategoria} = req.query;
        let [{descripcion}] = await get(idCategoria);
        res.render("adminCategoria",{idCategoria,descripcion,title:"Editar categoria"});
        
    }catch(e){
        console.log(e);
    }
};

const actualizarCategoria = async(req , res) =>{
    try{
        let cate = req.body;
        console.log(cate);
        const {descripcion} = req.body;
        await update(req.body.idCategoria,{descripcion});
        res.redirect("/admin/categorias/all");
    }catch(e){
        console.log(e);
    }
};

router.get("/all",categorias);
router.post("/create", nuevaCategoria);
router.get("/delete",borrarCategoria);
router.get("/edit", editarCategoria);
router.post("/update", actualizarCategoria );
module.exports = router;