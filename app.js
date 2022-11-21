import express from 'express';
import { Server as WebSocketServer } from 'socket.io';
import http from 'http';

import bodyParser from 'body-parser';
import session from 'express-session';
import { PORT } from './src/config.js';
import { router } from './router.js';

const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server)

app.use(express.static("public"));
app.use(session({
    secret: 'clase_super_srecreta',
    resave: true,
    saveUninitialized: true
}))

app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use('/', router)

io.on('connection', socket => {
    console.log(`nueva conexion: ${socket.id}`)

    socket.on('click' , data => {
        io.emit('click-desde-server', data)
    })
})

server.listen(PORT)