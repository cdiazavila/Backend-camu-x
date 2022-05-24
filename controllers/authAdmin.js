const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

// Creacion del Admin

const CreateAdmin = async(req,res)=>{
    const datosAdmin = req.body;
    const email = datosAdmin.email;
    try {
        // verificamos el email que no sea igual a uno existente 
        const emailAdmin = await Admin.findOne({ email });
        if (emailAdmin) {
            return res.status(404).json({
                ok: false,
                msg: 'El Admin ya existe con ese correo'
            })
        }
          // crear usuario con el medelo
          const dbAdmin = new Admin(datosAdmin);
           // Hashar la contraseña 
        const salt = bcrypt.genSaltSync();
        dbAdmin.password = bcrypt.hashSync(datosAdmin.password, salt);
         // generar el JWT JsonToken
         const token = await generarJWT(dbAdmin.id, datosAdmin.cc, datosAdmin.nombres);
          // crear usuario de bd 
        await dbAdmin.save();
        // generar respuesta exitosa 
        return res.status(201).json({
            ok: true,
            id: dbAdmin.id,
            cc:dbAdmin.cc,
            nombre: datosAdmin.nombres,
            email: datosAdmin.email,
            token
        });



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }


}

// login de admin

const loginAdmin=async(req,res)=>{
    const {email,password}=req.body;
   try {
           // validamos el correo de usuario 
           const dbAdmin = await Admin.findOne({ email });
           if (!dbAdmin) {
               return res.status(400).json({
                   ok: false,
                   msg: 'Usuario O contraseña Incorrecta!'
               })
           }

           // confirmar si el password hace mmatch
       const validpassword = bcrypt.compareSync(password,dbAdmin.password);
       if (!validpassword) {
           return res.status(400).json({
               ok: false,
               msg: 'Usuario O contraseña Incorrecta!'
           })
       }

       // generar el JWT JsonToken
       const token = await generarJWT(dbAdmin.id, dbAdmin.cc, dbAdmin.nombres);
       // respuesta del servicio 
       return res.status(200).json({
           ok: true,
           id: dbAdmin.id,
           nombre: dbAdmin.nombres,
           email: dbAdmin.email,
           token
       })
   } catch (error) {
       console.log(error)
       res.status(500).json({
           ok: false,
           msg: 'Por favor hable con el administrador'
       }); 
   }

}
module.exports={
    CreateAdmin,
    loginAdmin
}