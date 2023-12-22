const express = require('express');
const router = express.Router();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');


//Redireccionar al registro de usuario
const pool = require('../database');
router.get('/add', (req,res) =>{
    res.render('links/add');
});

//Redireccionar al login
router.get('/login', (req,res) =>{
    res.render('links/login');
});

router.get('/confirmacionreg', (req,res) =>{
    res.render('links/confregistro');
});

//Validando credenciales de inicio de sesion
router.post('/login', async (req,res) =>{
    
        
        const {ali, clave} = req.body;
        const values = {
             ali,
            clave}
          
             const values2 = [ ali, clave ] 
         await pool.query("SELECT * FROM user  WHERE email = ? AND  clave = ?", values2, (err, result) =>{
             console.log(err)
            if(err){
                res.status(500).send(err);
            }else{
                if(result.length > 0){
                    res.status(200)
                    res.render('links/menu');

                }
                else{
                    
                    res.render('links/errorlogin');
                }
                console.log(err)
            }
           
           
        });
       await  pool.end();
    });



//Agregar un usuario
router.post('/add', async (req,res) =>{
    console.log(req.body);
    const {tipodoc ,numcc ,nombre ,apellido,email ,telefono , clave,rol} = req.body;
    const newUsuario= { 
        tipodoc, 
        numcc,
        nombre, 
        apellido,
        email, 
        telefono,
        clave, 
        rol, 
    }

    console.log(newUsuario);
    await pool.query('INSERT  INTO user set ?', [newUsuario]);
    res.render('links/confregistro');
});

router.get('/listado' , async(req,res) => {
    const lconf = await pool.query('SELECT * FROM conferencia');
    console.log(lconf);
    res.render('links/list', { lconf })
});

router.get('/calendario' , async(req,res) => {
    const lprueba2s = await pool.query('SELECT * FROM prueba');
    console.log(lprueba2s);
    res.render('links/calendar', { lprueba2s })
});


module.exports = router;