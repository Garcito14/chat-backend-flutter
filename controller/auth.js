
const bcrypt = require('bcryptjs');
const {response} = require("express");
const { generarJWT } = require('../helpers/JWT');
const Usuario = require('../models/usuario');

const crearUsuario = async (req,res =response)=>{

    const {email,password} = req.body;

    try {
        const existeEmail =  await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg :"el correo ya existe"
            })
        }
        const usuario = new Usuario(req.body);

        //encriptar contraseña

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);
        await  usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id);

    res.json({
        ok:true,
        body: usuario,
        token
        });


    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"hable con el admin"
        })
    }

       
  
}

const logear = async (req,res =response)=>{

    const {email,password} = req.body;

    try {
    
            const usuarioDB = await Usuario.findOne({email});

            if(!usuarioDB){
                return res.status(404).json(
                    {
                        ok:false,
                        msg : 'Email no encontrado'
                    }
                );
            }

            const validPassword = bcrypt.compareSync(password,usuarioDB.password);
            if(!validPassword){
                return res.status(400).json(
                    {
                        ok:false,
                        msg: 'la contraseña no es valida'
                    }
                );
            }

            //geenral el jwt

            const token = await generarJWT(usuarioDB.id);
    res.json({
        ok:true,
        body:  usuarioDB,
        token
        
        });


    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"hable con el admin"
        })
    }

       
  
}

const renewToken = async  (req,res = response )=>{

    const uid = req.uid;
    const token = await generarJWT(uid);
    const usuario = await Usuario.findById(uid);

    res.json({
        ok:true,
        usuario,
        token
    })
}

module.exports = {
    crearUsuario,
    logear,
    renewToken
}