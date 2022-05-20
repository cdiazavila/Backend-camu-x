const {Router}= require('express');
const { check } = require('express-validator');
const { crearMedico } = require('../controllers/authMedico');
const { validarCampos } = require('../middlewares/validar-campus');
//const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

// rutas Para el Objeto Medico 
// crecion de un medico
router.post('/medico',[ 
    check('cc','El numero de cc es obligatorio').not().isEmpty(),
    check('nombres','El nombre es obligatorio').not().isEmpty(),
    check('apellidos','El apellido es obligatorio').not().isEmpty(),
    check('especialidad','La especialidad es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','El password  es obligatorio').isLength({min:6}),
    validarCampos
], crearMedico)

module.exports=router;