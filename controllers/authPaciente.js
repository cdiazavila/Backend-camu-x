const { validationResult } = require("express-validator")


const crearPaciente = (req,res)=>{
    console.log(req.body)
    // valinamos que los datos vengan completos 
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            ok:false,
            error: error.mapped()
        })
    }
    return res.json({
        ok:true,
        msg:'Crear paciente / new '
    })
}


const login = (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            ok:false,
            error: error.mapped()
        })
    }
    return res.json({
        ok:true,
        msg:'login' 
    })
}


const validarToken = (req,res)=>{
    return res.json({
        ok:true,
        msg:'validar paciente'
    })
}

const getPaciente = (req,res)=>{
    return res.json({
        ok:true,
        msg:'get pacinete / new '
    })
}


module.exports={
    crearPaciente,
    login,
    validarToken,
    getPaciente
}