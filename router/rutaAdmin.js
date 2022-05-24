const {Router}= require('express');
const { check } = require('express-validator');
const { CreateAdmin, loginAdmin } = require('../controllers/authAdmin');
const { validarCampos } = require('../middlewares/validar-campus');
const router = Router();

router.post('/admin',CreateAdmin);
router.post('/loginadmin',[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password  es obligatorio').isLength({min:4}),
    validarCampos
],loginAdmin);

module.exports=router;
