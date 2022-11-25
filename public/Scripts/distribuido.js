const socket = io();

const boton = document.getElementById('btn-publicar');
const id_asentamiento = document.getElementById('asentamiento-socket');
const notifications = document.getElementById('notifications');
const notifications_title = document.getElementById('notifications-title');

const audio = new Audio('../audio/cute_notification.mp3');

boton.addEventListener('click', () => {
    socket.emit('click', 'boton picad');
})

socket.on('click-desde-server', data => {
    if (data == id_asentamiento.value) {
        notifications.classList.add('red')
        audio.play()
        notifications_title.classList.add('red')
    }
})