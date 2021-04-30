const socket = io();

const balanza = document.getElementById('balanza');

socket.on('data',function (data) {
balanza.innerHTML =data;
});

let btn = document.querySelector('#btn');
btn.addEventListener('click',function(){
  socket.emit('message', document.getElementById("balanza").innerHTML);
  alert('datos guardados: '+balanza.innerHTML);
});

/*
Escaner codigo de barras libreria ejemplo: https://ourcodeworld.co/articulos/leer/460/como-crear-un-escaner-de-codigo-de-barras-en-vivo-usando-la-camara-web-en-javascript

*/
