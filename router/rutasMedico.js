const {Router}= require('express');
const { check } = require('express-validator');
const { crearMedico, loginMedico, validarTokenMedico, getMedicos, actualizarMedico, EliminarMedico } = require('../controllers/authMedico');
const { validarCampos } = require('../middlewares/validar-campus');
const { validarJWT } = require('../middlewares/validar-jwt');
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

// ruta para login del medico 
router.post('/loginMedico',[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password  es obligatorio').isLength({min:6}),
    validarCampos

],loginMedico)
// rutas para validar el token 
router.get('/validarmedico',validarJWT,validarTokenMedico);
// Get todo los Medicos
router.get('/medicos',getMedicos);
// Actualizar Medico con id
router.put('/medico/:id',actualizarMedico);

// Eliminar Un medico con el id
router.delete('/medico/:id',EliminarMedico);


module.exports=router;