const pool = require("./../utils/db");
const T_USUARIOS = "usuarios";

const create = async(obj) =>{try{
  const query="INSERT INTO ?? SET ?"; 
  const params =[T_USUARIOS, obj];
  return await pool.query(query,params);
}
catch (e){
  console.log(e);
}};
  

module.exports = {create};