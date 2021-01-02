const { admin } = require("../models/usuarios");

const authAdmin = async(req,res,next) =>{
    if(req.session.idUser == undefined) res.redirect("/login");
    const idUser = req.session.idUser
    const result = await admin(idUser);
    console.log("hola"+result)
    if (result == 0) {res.render("error" ,{message: "No estas autorizado"});};
    console.log(req.session.idUser);
    next();
};

module.exports = {authAdmin};