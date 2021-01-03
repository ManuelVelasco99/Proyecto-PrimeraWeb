
const {admin : esAdmin} = require("../models/usuarios");
const logueado = async(id) =>{
    try{
      if(id == undefined) return false;
      return true;
    }catch(e){
      console.log(e);
    }
  };

const admin = async(id) =>{
    try{
        const adm = await esAdmin(id);
        if (adm == 0) return false;
        return true;
    }catch(e){
        console.log(e);
    }
};
  module.exports={logueado,admin};