

// path : api/usuarios

const {Router} =require('express');
const { renewToken } = require('../controller/auth');
const { getUsuarios } = require('../controller/usuarios');

const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/user',validarJWT,getUsuarios)

module.exports = router;