const mongoose = require('mongoose');

const MedicoSchema = mongoose.Schema({
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
    especialidad:{
        type: String,
        required:true
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

module.exports=mongoose.model('Medico',MedicoSchema );