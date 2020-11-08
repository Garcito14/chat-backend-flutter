

// path : api/login

const {Router} =require('express');
const { check } = require('express-validator');
const { crearUsuario,logear,renewToken } = require('../controller/auth');
const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new',[
check('nombre','el nombre es obligatorio').not().isEmpty(),
 check('password','las password es obligatoria').not().isEmpty(),
check('email','el email es obligatorio').not().isEmpty(),
check('email','formato de email incorrecto').isEmail(),
validarCampos
],crearUsuario);


router.post('/log',[
    check('password','las password es obligatoria').not().isEmpty(),
    check('email','el email es obligatorio').not().isEmpty(),
    check('email','formato de email incorrecto').isEmail(),

    validarCampos
    ],logear);
        //validarJWT
    router.get('/renew',validarJWT,renewToken)


module.exports = router;