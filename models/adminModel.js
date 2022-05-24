const mongoose=require('mongoose');

const AdminSchema = mongoose.Schema({
    cc:{
        type: String,
        required:true
    },
    nombres:{
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

module.exports=mongoose.model('Admin',AdminSchema);