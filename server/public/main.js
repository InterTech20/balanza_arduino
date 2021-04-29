const socket = io();

const temperatureDisplay = document.getElementById('balanza');

socket.on('balanza',function (data) {
  console.log(data);
balanza.innerHTML =data;
});

let btn = document.querySelector('#btn');
btn.addEventListener('click',function(){
    alert('datos guardados');
});
// 