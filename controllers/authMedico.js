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

module.exports ={
    crearMedico
}