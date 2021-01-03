const { admin } = require("../utils/session");

const authAdmin = async(req,res,next) =>{
   try{
        if(req.session.idUser == undefined) res.redirect("/login");
        const idUser = req.session.idUser;
        const result = await admin(idUser);
        console.log(result)
        if (!result) {res.render("error" ,{message: "No estas autorizado"});};
        console.log(req.session.idUser);
        next();
    }catch(e){
        console.log(e);
    }
};

module.exports = {authAdmin};