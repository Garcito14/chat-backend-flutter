const { comprobarJWT } = require('../helpers/JWT');
const { io } = require('../index');
const {usuarioConectado,usuarioDesconectado, grabarMensaje} = require('../controller/sockets');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

   

  const [valido,uid] = comprobarJWT(client.handshake.headers['x-token']);

  console.log(valido,uid);
  if(!valido){
    return client.disconnect();
  }
//cliente autenticado
  usuarioConectado(uid);

    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });


    // ingresar al usuario a una sala particular
    //sala global 
    // sala id unico client.id

    client.join(uid);
   
    //escuchar el cliente mensaje


    client.on('mensaje-personal', async( payload ) => {
        console.log( payload);
    await     grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal',payload);
   

    }); 


});
