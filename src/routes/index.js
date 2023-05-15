const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');

// Ruta default
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/login.html'));
  });

//ruta para registrarse
router.get('/signup', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../Public/signup.html'));
});

//escuchar datos en ruta para registrarse
router.post('/signup', passport.authenticate('local-signup', {
    /*mofidicar para que se vaya al perfil del usuario */
    successRedirect: '/profile',
    failRedirect: '/signup',
    passReqToCallback: true
}));

//ruta para logearse
router.get('/login', (req, res, next)=>{
    res.sendFile(path.join(__dirname, '../Public/login.html'));
});

//escuchar datos en ruta para logearse
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    passReqToCallback: true
}));

router.get('/logout', (req, res) => {
    req.logout(function(err) {
      if (err) {
        // Manejar el error si es necesario
        return next(err);
      }
      // Realizar cualquier acción adicional después de cerrar la sesión
      res.redirect('/');
    });
  });
  

router.get('/profile', isAuthenticated,(req, res, next)=>{
    res.sendFile(path.join(__dirname, '../Public/profile.html'));
});

//Middleware
function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
  
    res.redirect('/login')
  }

module.exports = router;