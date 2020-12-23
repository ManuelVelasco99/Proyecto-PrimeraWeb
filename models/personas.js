const pool = require("./../utils/db");
const T_PERSONAS = "personas";

const create = async (obj) =>{
    try{
        const query="INSERT INTO ?? SET ?"; 
        const params =[T_PERSONAS, obj];
        return await pool.query(query,params);
    }
    catch (e){
        console.log(e);
    }
}

module.exports = { create };
