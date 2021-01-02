const { post } = require("../app");
const { authAdmin } = require("../middlewares/authAdmin");
const { query } = require("./../utils/db");
const pool = require("./../utils/db");
const T_USUARIOS = "usuarios";

const get = async(confirmaciónCorreo,id)=>{
  try{
    const query = "SELECT nombreUsuario FROM ?? WHERE confirmacionCorreo=? OR idUsuario=?";
    const params = [T_USUARIOS,confirmaciónCorreo,id];
    return await pool.query(query,params);
  }catch(e){
    console.log(e);
  }
};

const create = async(obj) =>{try{
  const query="INSERT INTO ?? SET ?"; 
  const params =[T_USUARIOS, obj];
  return await pool.query(query,params);
}
catch (e){
  console.log(e);
}};

const update = async(obj,confirmaciónCorreo,id) =>{
  try{
    const query = "UPDATE ?? SET ? WHERE confirmacionCorreo=? OR idUsuario=?";
    const params = [T_USUARIOS,obj,confirmaciónCorreo,id];
    return await pool.query(query,params);

  }catch(e){
    console.log(e);
  }
};

const auth = async({nombreUsuario,password}) =>{
  try{
    const query = "SELECT idUsuario FROM ?? WHERE nombreUsuario=? AND password=?";
    const params = [T_USUARIOS,nombreUsuario,password];
    return await pool.query(query,params);
  }catch(e){
    console.log(e);
  }
};

const admin = async(idUsuario) =>{
  try{
    const query ="SELECT idUsuario FROM ?? WHERE idUsuario=? AND admin=1";
    const params = [T_USUARIOS,idUsuario];
    return await pool.query(query,params);
  }catch(e){
    console.log(e);
  }
}

module.exports = {create,update,get, auth, admin};