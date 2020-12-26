const { create : createPersona} = require("./../models/personas");
const { create: createUser } = require("./../models/usuarios");
const { send } = require("./../services/mail");
const sha1 = require("sha1");
const  {v4}  = require("uuid");

const register = async ({
    nombre,
    apellido,
    sexo,
    fechaNacimiento,
    nombreUsuario,
    mail,
    password,
    telefono

}={}) =>{
    try {
        // http://localhost:3000/registro/verify/uid
        const uid = v4();
        //console.log(uid);
        const {insertId : idPersona} = await createPersona({
          nombre,
          apellido,
          sexo,
          fechaNacimiento, 
        });
        console.log(idPersona);
        const { insertId: idUsuario } = await createUser({
          nombreUsuario,
          password: sha1(password),
          idPersona,
          confirmacionCorreo: uid, // enlace mágico
          telefono,
          mail,
        });
        // armar token
        await console.log(process.env.URL_SERVER,process.env.PORT,uid);
        const mailObject = {
            
            mail,
            message: `
            <h2>Gracias por registrarte ${nombre} ${apellido}</h2>
            <h3>No olvides verificar tu cuenta para seguir </h3>
            <a href="http://${process.env.URL_SERVER}:${process.env.PORT}/register/verify?uid=${uid}">Enlace mágico </a>
            `,
        };
       await send(mailObject);
        return idUsuario;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {register};