import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import { PORT } from './src/config.js';
import { router } from './router.js';
const app = express();

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

app.listen(PORT, () => {
    console.log('Escuchando en el puerto: ' + PORT);
})