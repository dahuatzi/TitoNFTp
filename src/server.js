const express = require('express');
const app = express();
const path = require('path');
const signup = require('./routes/index');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

//Inicializaciones
require('./db/connectDB');
require('./passport/local-auth');

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
//se almacena en una sesión
app.use(passport.session());


//Starting Server
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
})

// Rutas
app.use('/api/HOME', signup);
app.use('/', signup); // Puedes ajustar esta ruta según tus necesidades
app.use(express.static(path.join(__dirname, 'Public')));

// Ruta default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public/HOME.html'));
});