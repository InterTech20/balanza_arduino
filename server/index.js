const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));
server.listen(3000, () => console.log('server on port 3000'));
//------------------------------------
app.use(express.static("static"));
/*============================================================== */
const mysql = require('mysql');

function guardar_bd(peso) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'balanza'
 });
 
 connection.connect(function(error){
   try{ 
 
     if(error){ 
         console.log("Error al establecer la conexión a la BD -- " + error); 
     }else{  
         console.log("Conexión exitosa"); 
     } 
 }
 catch(x){ 
     console.log("Contacto.agregarUsuario.connect --Error-- " + x); 
 }
 });

 const query = connection.query('INSERT INTO peso(peso) VALUES( ?)',
 [peso]
 ,
  function(error, result){
   if(error){
      throw error;
   }else{
      console.log(result);
   }
 }
 );
 
 connection.end();
}
/*============================================================== */

/*======*/
io.on('connection', (socket) =>{
  
        socket.on('message', (data)=>{ 
        io.sockets.emit('message', data);
        guardar_bd(data);   
        });

});
/*======*/

const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

const port = new SerialPort("COM3", {
  baudRate: 9600
});
const parser = port.pipe(new ReadLine({ delimiter: '\r\n' }));

parser.on('open', function () {
  console.log('connection is opened');
});

parser.on('data', function (data) {
  console.log(data);
 io.emit('data',data);
});


parser.on('error', (err) => console.log(err));
port.on('error', (err) => console.log(err));



