const {response} = require('express');
const jwt=require('jsonwebtoken');

const validarJWT=(req,res=response,next)=>{
    const token =req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'Error en el token'
        })
    }
    try {
     const {id,cc,nombre}  = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.id=id;
    req.cc=cc;
    req.nombre=nombre;
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        })
    }

//TODO OK
    next();
}

module.exports={
    validarJWT
}

