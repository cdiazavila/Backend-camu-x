const {Router}= require('express');
const { check } = require('express-validator');
const { crearPaciente, login, validarToken, getPaciente, actualizarPaciente } = require('../controllers/authPaciente');
const { validarCampos } = require('../middlewares/validar-campus');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


// rutas para los  pacientes 
// crecion de pacientes
router.post('/paciente',[ 
    check('cc','El numero de cc es obligatorio').not().isEmpty(),
    check('nombres','El nombre es obligatorio').not().isEmpty(),
    check('apellidos','El apellido es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','El password  es obligatorio').isLength({min:6}),
    validarCampos
], crearPaciente)

// ruta para login 
router.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password  es obligatorio').isLength({min:6}),
    validarCampos
],login)

// ruta para validar el token 
router.get('/validarpaciente',validarJWT,validarToken)

// ruta para consultar los pacientes 
router.get('/paciente',getPaciente)
// actualizar paciente

router.put('/paciente/:id',actualizarPaciente)





module.exports=router;