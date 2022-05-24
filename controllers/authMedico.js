const Medico = require('../models/modelMedico');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


// metodo para crear a un medico 
const crearMedico = async (req, res) => {


    // valinamos que los datos vengan completos 
    const datosMedico = req.body;
    const email = datosMedico.email;

    try {
        // verificamos el email que no sea igual a uno existente 
        const emailMedico = await Medico.findOne({ email });
        if (emailMedico) {
            return res.status(404).json({
                ok: false,
                msg: 'El Medico ya existe con ese correo'
            })
        }

        // crear usuario con el medelo
        const dbMedico = new Medico(datosMedico);

        // Hashar la contraseña 
        const salt = bcrypt.genSaltSync();
        dbMedico.password = bcrypt.hashSync(datosMedico.password, salt);
        // generar el JWT JsonToken
        const token = await generarJWT(dbMedico.id, datosMedico.cc, datosMedico.nombres);

        // crear usuario de bd 
        await dbMedico.save();
        // generar respuesta exitosa 
        return res.status(201).json({
            ok: true,
            id: dbMedico.id,
            nombre: datosMedico.nombres,
            apellidos: datosMedico.apellidos,
            email: datosMedico.email,
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

//  login para el medico
const loginMedico=async(req,res)=>{
     const {email,password}=req.body;
    try {
            // validamos el correo de usuario 
            const dbMedico = await Medico.findOne({ email });
            if (!dbMedico) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Usuario O contraseña Incorrecta!'
                })
            }

            // confirmar si el password hace mmatch
        const validpassword = bcrypt.compareSync(password,dbMedico.password);
        if (!validpassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario O contraseña Incorrecta!'
            })
        }

        // generar el JWT JsonToken
        const token = await generarJWT(dbMedico.id, dbMedico.cc, dbMedico.nombres);
        // respuesta del servicio 
        return res.status(200).json({
            ok: true,
            id: dbMedico.id,
            nombre: dbMedico.nombres,
            apellidos: dbMedico.apellidos,
            email: dbMedico.email,
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

// validar JWt
const validarTokenMedico = async(req, res) => {
    const { id } = req;
    // leer la base de datos 
    const dbMedico = await Medico.findById(id);


    // generar el JWT JsonToken
    const token = await generarJWT(id, dbMedico.cc, dbMedico.name)
    return res.json({
        ok: true,
        id,
        cc:dbMedico.cc,
        nombre: dbMedico.nombres,
        apellidos: dbMedico.apellidos,
        email: dbMedico.email,
        token


    });

}

// obtener la informacion del medico
const getMedicos=async(req,res)=>{
        try {
            const medicos = await Medico.find({})
            return res.json({
                medicos
             });
    
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: 'Hable con el administrador'
            }); 
        }
    
}

// Actualizar Medico
const actualizarMedico =async(req,res)=>{
    const datosMedico = req.body;
    try {
           // Hashar la contraseña 
           const salt = bcrypt.genSaltSync();
           datosMedico.password = bcrypt.hashSync(datosMedico.password, salt);
        const medico = await Medico.findOneAndUpdate({_id : req.params.id},datosMedico, {
            new: true
        });
         // generar el JWT JsonToken
         const token = await generarJWT(medico.id, medico.cc, medico.nombres);
        return res.json({
            ok:true,
            msg:'Datos Actualizados',
            token

         });
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }); 
    }
}

const EliminarMedico= async(req,res)=>{
    try {
        await Medico.findOneAndDelete({_id : req.params.id});
        return res.status(200).json({
            ok:true,
            msg:'El medico fue eliminado con exito'

        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }); 
    }
}

module.exports ={
    crearMedico,
    loginMedico,
    validarTokenMedico,
    getMedicos,
    actualizarMedico,
    EliminarMedico
}