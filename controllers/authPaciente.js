
const Paciente = require('../models/modelPaciente');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const crearPaciente = async (req, res) => {


    // valinamos que los datos vengan completos 
    const datosPaciente = req.body;
    const email = datosPaciente.email;

    try {
        // verificamos el email que no sea igual a uno existente 
        const emailPaciente = await Paciente.findOne({ email });
        if (emailPaciente) {
            return res.status(404).json({
                ok: false,
                msg: 'El Paciente ya existe con ese correo'
            })
        }

        // crear usuario con el medelo
        const dbPacinte = new Paciente(req.body);

        // Hashar la contraseña 
        const salt = bcrypt.genSaltSync();
        dbPacinte.password = bcrypt.hashSync(datosPaciente.password, salt);
        // generar el JWT JsonToken
        const token = await generarJWT(dbPacinte.id, datosPaciente.cc, datosPaciente.nombres);

        // crear usuario de bd 
        await dbPacinte.save();
        // generar respuesta exitosa 
        return res.status(201).json({
            ok: true,
            id: dbPacinte.id,
            nombre: datosPaciente.nombres,
            apellidos: datosPaciente.apellidos,
            email: datosPaciente.email,
            token
        });



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Porfavor hable con el administrador'
        });
    }


}


// login de Paciente
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // validamos el correo de usuario 
        const dbPacinte = await Paciente.findOne({ email });
        if (!dbPacinte) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario O contraseña Incorrecta!'
            })
        }

        // confirmar si el password hace mmatch
        const validpassword = bcrypt.compareSync(password, dbPacinte.password);
        if (!validpassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario O contraseña Incorrecta!'
            })
        }
        // generar el JWT JsonToken
        const token = await generarJWT(dbPacinte.id, dbPacinte.cc, dbPacinte.nombres);
        // respuesta del servicio 
        return res.status(200).json({
            ok: true,
            id: dbPacinte.id,
            nombre: dbPacinte.nombres,
            apellidos: dbPacinte.apellidos,
            email: dbPacinte.email,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


const validarToken = async(req, res) => {
    const { id } = req;
    // leer la base de datos 
    const dbPacinte = await Paciente.findById(id);


    // generar el JWT JsonToken
    const token = await generarJWT(id, dbPacinte.cc, dbPacinte.name)
    return res.json({
        ok: true,
        id,
        nombre: dbPacinte.nombres,
        apellidos: dbPacinte.apellidos,
        email: dbPacinte.email,
        token


    });

}

const getPaciente = async(req, res) => {


    try {
        const pacientes = await Paciente.find({})
        return res.json({
            pacientes
         });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }); 
    }
  
}

const actualizarPaciente =async(req,res)=>{
    const datosPaciente = req.body;
    try {
           // Hashar la contraseña 
           const salt = bcrypt.genSaltSync();
           datosPaciente.password = bcrypt.hashSync(datosPaciente.password, salt);
        const paciente = await Paciente.findOneAndUpdate({_id : req.params.id}, datosPaciente, {
            new: true
        });
         // generar el JWT JsonToken
         const token = await generarJWT(paciente.id, paciente.cc, paciente.nombres);
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

module.exports = {
    crearPaciente,
    login,
    validarToken,
    getPaciente,
    actualizarPaciente
}