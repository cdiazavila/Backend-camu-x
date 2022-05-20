const mongoose = require('mongoose');

const PacienteSchema = mongoose.Schema({
    cc:{
        type: String,
        required:true
    },
    nombres:{
        type: String,
        required:true
    },
    apellidos:{
        type: String,
        required:true
    },
    eps:{
        type: String,
        required:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Paciente',PacienteSchema );