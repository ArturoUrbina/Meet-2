var express = require('express');
var router = express.Router();
const crud = require('../controllers/crud');
var fs = require("fs");
var Tesseract = require('tesseract.js');
const webpush = require('../webpush');


let pushSubscription;

router.post('/subscription', async (req,res)=>{
  pushSubscription = req.body;
  res.status(200).json();
  const mysqlCon = require("../controllers/Connection");
  let cont = -1;
  let con = -1;
    console.log(req.session.login);
    mysqlCon.query('select * from notifications natural join usuario',(err, result)=>{
      for(var f = 0; f<result.length; f++){
        if(result[f].end_not == pushSubscription.endpoint||result[f].p256dh_not == pushSubscription.keys.p256dh||result[f].auth_not == pushSubscription.keys.auth){
          cont = f;
        }
      }
      if(cont==-1){
        mysqlCon.query('select * from usuario where use_us = ?',[req.session.nombre],(err, result6)=>{
          for(let g = 0; g<result.length; g++){
            if(result[g].id_us==result6[0].id_us){
              con = g;
            }
          }
          if(con == -1){
              mysqlCon.query('insert into notifications(id_us,end_not,p256dh_not,auth_not) values(?,?,?,?)',[result6[0].id_us,pushSubscription.endpoint,pushSubscription.keys.p256dh,pushSubscription.keys.auth], async (err, result4)=>{
                  if(err){
                    console.log(err);
                  }
                  const payload = JSON.stringify({
                    title: 'Bienvenido a MeetU',
                    message:  'A partir de ahora podrás recibir notificaciones'
                  });
                  try{
                    
                    await webpush.sendNotification(pushSubscription, payload);
                  }catch(error){
                    console.log(error);
                  }
            });
          }else{
            mysqlCon.query('update notifications set end_not = ?, p256dh_not = ?, auth_not = ? where id_us = ?',[pushSubscription.endpoint,pushSubscription.keys.p256dh,pushSubscription.keys.auth,result6[0].id_us], async (err,result2)=>{
              if(err){
                console.log(err);
              }
              const payload = JSON.stringify({
                title: 'Bienvenido de nuevo a MeetU',
                message:  'Hemos detectado que accedes desde un nuevo dispositivo, no te preocupes, hemos actualizado tus datos'
              });
              try{
                
                await webpush.sendNotification(pushSubscription, payload);
              }catch(error){
                console.log(error);
              }
            });
          } 
        });
      }else{
        mysqlCon.query('select * from usuario where use_us = ?',[req.session.nombre],(err, result1)=>{
          console.log(result1[0].id_us,"Holaaaaa",result[cont].id_us);
          if(result1[0].id_us == result[cont].id_us){
            mysqlCon.query('update notifications set end_not = ?, p256dh_not = ?, auth_not = ? where id_us = ?',[pushSubscription.endpoint,pushSubscription.keys.p256dh,pushSubscription.keys.auth,result1[0].id_us], async (err,result2)=>{
              if(err){
                console.log(err);
              }
              const payload = JSON.stringify({
                title: 'Bienvenido de nuevo a MeetU',
                message:  'Esperamos tengas un gran día'
              });
              try{
                
                await webpush.sendNotification(pushSubscription, payload);
              }catch(error){
                console.log(error);
              }
            });
          }else{
            mysqlCon.query('delete from notifications where id_us = ?',[result[cont].id_us],(err, result3)=>{
              if(err){
                console.log(err);
              }
              mysqlCon.query('insert into notifications(id_us,end_not,p256dh_not,auth_not) values(?,?,?,?)',[result1[0].id_us,pushSubscription.endpoint,pushSubscription.keys.p256dh,pushSubscription.keys.auth], async (err, result4)=>{
                const payload = JSON.stringify({
                  title: 'Bienvenido de nuevo a MeetU',
                  message:  'El sistema ha detectado que has accedido a una cuenta diferente desde el mismo dispositivo, hemos actualizado tus datos'
                });
                try{
                  
                  await webpush.sendNotification(pushSubscription, payload);
                }catch(error){
                  console.log(error);
                }
              });
            });
          }
        });
      }
    });
});

router.post('/new-message', async (req, res)=>{
  const mysqlCon = require("../controllers/Connection");
  pushSubscription = undefined;
  let sdr;
  let msg;
  msg = crud.decipher(req.headers.message);
  mysqlCon.query('select * from usuario where id_us = ?',[req.headers.senderid],(err, result1)=>{
    console.log(result1);
    mysqlCon.query('select * from amigo where id_us = ? and ida_us = ?',[req.headers.senderid,req.headers.destination],(err, result2)=>{
      if(result2[0].trf_am){
        sdr = req.headers.sender;
      }else{
        sdr = result1[0].use_us;
      }
      mysqlCon.query('select * from notifications natural join usuario where id_us = ?',[req.headers.destination], async (err, result)=>{
        if(result!=undefined){
          if(result.length>0){
            pushSubscription = {
              endpoint: result[0].end_not,
              expirationTime: null,
              keys:{
                p256dh: result[0].p256dh_not,
                auth: result[0].auth_not
              }
            }
          }
        }
        if(pushSubscription != undefined){
          const payload = JSON.stringify({
            title: 'Nuevo mensaje en MeetU',
            message:  sdr + ": " + msg
          });
    
          try{
            await webpush.sendNotification(pushSubscription, payload);
          }catch(error){
            console.log(error);
          }
        }
      });
    });
  });
  
});

router.post('/accepted', async (req, res)=>{
  const mysqlCon = require("../controllers/Connection");
  pushSubscription = undefined;
  let sdr;
  mysqlCon.query('select * from usuario where id_us = ?',[req.headers.senderid],(err, result1)=>{
        sdr = result1[0].use_us;
      mysqlCon.query('select * from notifications natural join usuario where id_us = ?',[req.headers.destination], async (err, result)=>{
        if(result!=undefined){
          if(result.length>0){
            result[0].nom_us = crud.decipher(result[0].nom_us);
            pushSubscription = {
              endpoint: result[0].end_not,
              expirationTime: null,
              keys:{
                p256dh: result[0].p256dh_not,
                auth: result[0].auth_not
              }
            }
          }
        }
        if(pushSubscription != undefined){
          const payload = JSON.stringify({
            title: 'Felicidades' + result[0].nom_us + '!',
            message:  sdr + ": Ha aceptado tu solicitud de amistad!"
          });
    
          try{
            await webpush.sendNotification(pushSubscription, payload);
          }catch(error){
            console.log(error);
          }
        }
      });
    
  });
  
});

router.post('/deny', async (req, res)=>{
  const mysqlCon = require("../controllers/Connection");
  pushSubscription = undefined;
  let sdr;
  mysqlCon.query('select * from usuario where id_us = ?',[req.headers.senderid],(err, result1)=>{
        sdr = result1[0].use_us;
      mysqlCon.query('select * from notifications natural join usuario where id_us = ?',[req.headers.destination], async (err, result)=>{
        if(result!=undefined){
          if(result.length>0){
            result[0].nom_us = crud.decipher(result[0].nom_us);
            pushSubscription = {
              endpoint: result[0].end_not,
              expirationTime: null,
              keys:{
                p256dh: result[0].p256dh_not,
                auth: result[0].auth_not
              }
            }
          }
        }
        if(pushSubscription != undefined){
          const payload = JSON.stringify({
            title: 'Lo Sentimos ' + result[0].nom_us,
            message:  "Lamentablemente " +sdr + " No ha aceptado tu solicitud de amistad"
          });
    
          try{
            await webpush.sendNotification(pushSubscription, payload);
          }catch(error){
            console.log(error);
          }
        }
      });
    
  });
  
});

router.post('/TRFdeny', async (req, res)=>{
  const mysqlCon = require("../controllers/Connection");
  pushSubscription = undefined;
  let sdr;
  mysqlCon.query('select * from usuario where id_us = ?',[req.headers.senderid],(err, result1)=>{
        sdr = result1[0].use_us;
      mysqlCon.query('select * from notifications natural join usuario where id_us = ?',[req.headers.destination], async (err, result)=>{
        if(result!=undefined){
          if(result.length>0){
            result[0].nom_us = crud.decipher(result[0].nom_us);
            pushSubscription = {
              endpoint: result[0].end_not,
              expirationTime: null,
              keys:{
                p256dh: result[0].p256dh_not,
                auth: result[0].auth_not
              }
            }
          }
        }
        if(pushSubscription != undefined){
          const payload = JSON.stringify({
            title: 'Lo Sentimos' + result[0].nom_us,
            message:  "Lamentablemente " +sdr + " No ha aceptado tu solicitud de amistad verdadera, sin embargo, siguen siendo amigos"
          });
    
          try{
            await webpush.sendNotification(pushSubscription, payload);
          }catch(error){
            console.log(error);
          }
        }
      });
    
  });
  
});

router.post('/TRFaccept', async (req, res)=>{
  const mysqlCon = require("../controllers/Connection");
  pushSubscription = undefined;
  let sdr;
  let sender;
  mysqlCon.query('select * from usuario where id_us = ?',[req.headers.senderid],(err, result1)=>{
        sdr = result1[0].use_us;
        sender = crud.decipher(result1[0].nom_us);
      mysqlCon.query('select * from notifications natural join usuario where id_us = ?',[req.headers.destination], async (err, result)=>{
        if(result!=undefined){
          if(result.length>0){
            result[0].nom_us = crud.decipher(result[0].nom_us);
            pushSubscription = {
              endpoint: result[0].end_not,
              expirationTime: null,
              keys:{
                p256dh: result[0].p256dh_not,
                auth: result[0].auth_not
              }
            }
          }
        }
        if(pushSubscription != undefined){
          const payload = JSON.stringify({
            title: 'Felicidades'+ result[0].nom_us +'!',
            message:  sdr + "Ha aceptado tu solicitud de amistad verdadera! Su verdadero nombre es: " + sender
          });
    
          try{
            await webpush.sendNotification(pushSubscription, payload);
          }catch(error){
            console.log(error);
          }
        }
      });
    
  });
  
});

router.post('/TRFdeny', async (req, res)=>{
  const mysqlCon = require("../controllers/Connection");
  pushSubscription = undefined;
  let sdr;
  mysqlCon.query('select * from usuario where id_us = ?',[req.headers.senderid],(err, result1)=>{
        sdr = result1[0].use_us;
      mysqlCon.query('select * from notifications natural join usuario where id_us = ?',[req.headers.destination], async (err, result)=>{
        if(result!=undefined){
          if(result.length>0){
            result[0].nom_us = crud.decipher(result[0].nom_us);
            pushSubscription = {
              endpoint: result[0].end_not,
              expirationTime: null,
              keys:{
                p256dh: result[0].p256dh_not,
                auth: result[0].auth_not
              }
            }
          }
        }
        if(pushSubscription != undefined){
          const payload = JSON.stringify({
            title: 'Felicidades '+ result[0].nom_us + '!',
            message:  sdr + " Quiere ser tu amigo de verdad!, Si aún no lo conoces bien puedes esperar"
          });
    
          try{
            await webpush.sendNotification(pushSubscription, payload);
          }catch(error){
            console.log(error);
          }
        }
      });
    
  });
  
});

router.get('/', function(req, res, next) {
  req.session.nombre = "";
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/accept/:id', crud.accept);

router.get('/denied/:id', crud.denied);

router.get('/Registro', function(req, res, next) {
  if(req.session.nombre!=undefined){
  req.session.nombre = "";
  res.render('Registro', {page:'Home', menuId:'home',data: ""});
  }else{
    res.redirect('/');
  }
});

router.get('/Regact', crud.acr);

router.get('/ProfDos', crud.ProfileDos);

router.get('/RegactAdmin/:id', crud.acad);

router.get('/Interes', crud.inte);

router.get('/Amigo', (req,res)=>{
      const mysqlCon = require("../controllers/Connection");
      let FRid = req.session.FRid;
      let FRidus = req.session.FRidus;
      req.session.FRid = "";
      req.session.FRidus = "";
      mysqlCon.query('select * from usuario where id_us = ?',[FRid],(err, result1)=>{
          mysqlCon.query('select * from notifications natural join usuario where id_us = ?',[FRidus], async (err, result)=>{
            if(result!=undefined){
              if(result.length>0){
                pushSubscription = {
                  endpoint: result[0].end_not,
                  expirationTime: null,
                  keys:{
                    p256dh: result[0].p256dh_not,
                    auth: result[0].auth_not
                  }
                }
              }
            }
            if(pushSubscription != undefined){
              const payload = JSON.stringify({
                title: 'MeetU: Enhorabuena ' + result[0].use_us + ' !',
                message:  result1[0].use_us + " Quiere ser tu amigo!"
              });
        
              try{
                await webpush.sendNotification(pushSubscription, payload);
              }catch(error){
                console.log(error);
              }
            }
          });
      });
      
      crud.fri(req,res);
});

router.post('/Com', crud.com);

router.get('/Inicio', function(req, res, next) {
  if(req.session.nombre!=undefined){
  req.session.nombre = "";
  res.render('Inicio', {page:'Home', menuId:'home',data: null});
  }else{
    res.redirect('/');
  }
});

router.get('/chatAmigo/:id', crud.chat);

router.get('/Chat', crud.ch);

router.get('/RP/:id', crud.rp);

router.get('/LogOut',(req, res)=>{
  req.session.nombre = "";
  res.render('index', {page:'Home', menuId:'home'});
});

router.post('/save', crud.save);

router.post('/Pub', crud.publicaciones);

router.post('/Regupd', crud.actReg);

router.post('/RegupdAd', crud.actRegAd);

router.get('/update/:id', crud.edit);

router.get('/acceptTRF/:id', crud.truefriA);

router.get('/deniedTRF/:id', crud.truefriD);

router.get('/allF',crud.allfri);

router.get('/blc',crud.bck);

router.get('/Revizao',crud.revi);

router.get('/rev/:id',crud.rev);

router.get('/bcked',crud.blck);

router.get('/friend/:id', crud.addFriend);

router.post('/update/:id', crud.update);

router.get('/delete/:id', crud.delete);

router.post('/Reg/Int', crud.intereses);

router.post('/Act/Int', crud.interesesactu);

router.post('/Reg', function(req,res){
  if(req.session.nombre=="" &&req.session.nombre!=undefined){
  fs.renameSync(req.files.archivo.path,"public/img/"+req.body.user+".JPG");
  const mysqlCon = require("../controllers/Connection");
  var ex = 0;
  var error = "";
  var idus = 0;
  var idagcar = 0;
  var idagtur = 0;
  var idaggen = 0;
  var exists = false;
  var coincidence = 0;
  var year = req.body.birthday.split('/');
  if(req.body.name == undefined||req.body.user == undefined||req.body.pass == undefined||req.body.birthday == undefined||req.body.Gender == undefined||req.body.Turno == undefined||req.body.Carrera == undefined||req.body.boleta == undefined||req.body.grupo == undefined||req.files.archivo == undefined||req.body.fotop == undefined){
    error="Primero debes llenar todos los campos";
      res.render('Registro',{
        data: error
      });
  }
  else{
  mysqlCon.query('SELECT * FROM usuario',(err,result)=>{
    if(!err){
      for(var i=0;i<result.length;i++){
        console.log(result[i].use_us);
          if(result[i].use_us==req.body.user){
            exists=true;
            error = "El Usuario ya existe";
          }
        }
        console.log(exists);
    }else{
      console.log("No se pudo conectar a la tabla");
    }
  console.log(exists);
  if(exists==false){
    if(req.body.name.length<3){
      error="El nombre debe ser mayor a 3 caracteres";
      res.render('Registro',{
        data: error
      });
    }
    else if(req.body.name.length>40){
      error="El nombre no puede ser mayor a 40 caracteres";
      res.render('Registro',{
        data: error
      });
    }
    else if(req.body.Gender!="Mujer"&&req.body.Gender!="Hombre"&&req.body.Gender!="Otro"){
      error="Solo puedes seleccionar un género de los establecidos, no hagas trampa";
      res.render('Registro',{
        data: error
      });
    }
    else if(req.body.Turno!="V"&&req.body.Turno!="M"&&req.body.Turno!="Otro"){
      error="Solo puedes seleccionar un turno de los establecidos, no hagas trampa";
      res.render('Registro',{
        data: error
      });
    }
    else if((req.body.School=="CECYT 9"&&req.body.Carrera!="Tronco Común")&&(req.body.School=="CECYT 9"&&req.body.Carrera!="Sistemas Digitales")&&(req.body.School=="CECYT 9"&&req.body.Carrera!="Programación")&&(req.body.School=="CECYT 9"&&req.body.Carrera!="Máquinas con Sistemas Automaztizados")&&(req.body.School=="CECYT 9"&&req.body.Carrera!="Bachillerato General Polivirtual")){
      error="Solo puedes seleccionar una carrera de las establecidas, no hagas trampa";
      res.render('Registro',{
        data: error
      });
    }
    else if(req.body.name.includes('1')||req.body.name.includes('2')||req.body.name.includes('3')||req.body.name.includes('4')||req.body.name.includes('5')||req.body.name.includes('6')||req.body.name.includes('7')||req.body.name.includes('8')||req.body.name.includes('9')||req.body.name.includes('0')||req.body.name.includes('|')||req.body.name.includes('!')||req.body.name.includes('"')||req.body.name.includes('#')||req.body.name.includes('$')||req.body.name.includes('%')||req.body.name.includes('&')||req.body.name.includes('/')||req.body.name.includes('(')||req.body.name.includes(')')||req.body.name.includes('=')||req.body.name.includes('?')||req.body.name.includes('  ')||req.body.name.includes('¡')||req.body.name.includes('¿')||req.body.name.includes('¨')||req.body.name.includes('*')||req.body.name.includes('+')||req.body.name.includes('[')||req.body.name.includes(']')||req.body.name.includes('{')||req.body.name.includes('}')||req.body.name.includes('^')||req.body.name.includes('`')||req.body.name.includes('.')||req.body.name.includes(';')||req.body.name.includes(',')||req.body.name.includes(':')||req.body.name.includes('-')||req.body.name.includes('_')||req.body.name.includes('/')||req.body.name.includes('*')||req.body.name.includes('-')||req.body.name.includes('♥')||req.body.name.includes('☻')||req.body.name.includes('♦')||req.body.name.includes('☺')||req.body.name.includes('♣')||req.body.name.includes('♠')||req.body.name.includes('•')||req.body.name.includes('◘')||req.body.name.includes('○')||req.body.name.includes('<')||req.body.name.includes('>')||req.body.name.includes('°')){
      error="El campo de nombre solo puede incluir letras y espacios";
      res.render('Registro',{
        data: error
      });
    }
    else if(req.body.user.includes('|')||req.body.user.includes('!')||req.body.user.includes('"')||req.body.user.includes('&')||req.body.user.includes('/')||req.body.user.includes('(')||req.body.user.includes(')')||req.body.user.includes('=')||req.body.user.includes('?')||req.body.user.includes('  ')||req.body.user.includes('¡')||req.body.user.includes('¿')||req.body.user.includes('¨')||req.body.user.includes('*')||req.body.user.includes('+')||req.body.user.includes('[')||req.body.user.includes(']')||req.body.user.includes('{')||req.body.user.includes('}')||req.body.user.includes('^')||req.body.user.includes('`')||req.body.user.includes('.')||req.body.user.includes(';')||req.body.user.includes(',')||req.body.user.includes(':')||req.body.user.includes('-')||req.body.user.includes('/')||req.body.user.includes('*')||req.body.user.includes('-')||req.body.user.includes('♥')||req.body.user.includes('☻')||req.body.user.includes('♦')||req.body.user.includes('☺')||req.body.user.includes('♣')||req.body.user.includes('♠')||req.body.user.includes('•')||req.body.user.includes('◘')||req.body.user.includes('○')||req.body.user.includes('<')||req.body.user.includes('>')||req.body.user.includes('°')){
      error="No se admiten ese tipo de caracteres especiales en el usuario";
      res.render('Registro',{
        data: error
      });
    }
    else if(req.body.user.length<3){
      error="El usuario debe ser mayor a 3 caracteres";
      res.render('Registro',{
        data: error
      });
    }
    else if(req.body.user.length>40){
      error="El usuario no puede ser mayor a 40 caracteres";
      res.render('Registro',{
        data: error
      });
    }
    else if(req.body.pass.length<8){
      error="La contraseña no debe ser menor a 8 caracteres";
      res.render('Registro',{
        data: error
      });
    }
    else if(req.body.pass.length>15){
      error="La contraseña no debe ser mayor a 15 caracteres";
      res.render('Registro',{
        data: error
      });
    }
    else if(req.body.pass.includes('|')||req.body.pass.includes('!')||req.body.pass.includes('"')||req.body.pass.includes('&')||req.body.pass.includes('/')||req.body.pass.includes('(')||req.body.pass.includes(')')||req.body.pass.includes('=')||req.body.pass.includes('?')||req.body.pass.includes('  ')||req.body.pass.includes('¡')||req.body.pass.includes('¿')||req.body.pass.includes('¨')||req.body.pass.includes('*')||req.body.pass.includes('+')||req.body.pass.includes('[')||req.body.pass.includes(']')||req.body.pass.includes('{')||req.body.pass.includes('}')||req.body.pass.includes('^')||req.body.pass.includes('`')||req.body.pass.includes('.')||req.body.pass.includes(';')||req.body.pass.includes(',')||req.body.pass.includes(':')||req.body.pass.includes('-')||req.body.pass.includes('/')||req.body.pass.includes('*')||req.body.pass.includes('-')||req.body.pass.includes('♥')||req.body.pass.includes('☻')||req.body.pass.includes('♦')||req.body.pass.includes('☺')||req.body.pass.includes('♣')||req.body.pass.includes('♠')||req.body.pass.includes('•')||req.body.pass.includes('◘')||req.body.pass.includes('○')||req.body.pass.includes('<')||req.body.pass.includes('>')||req.body.pass.includes('°')){
      error="No se admiten ese tipo de caracteres especiales en la contraseña";
      res.render('Registro',{
        data: error
      });
    }
    else if(year[2]>2019){
      error="No puedes venir del futuro";
      res.render('Registro',{
        data: error
      });
    }
    else if((2019-year[2])>99){
      error="No puedes tener más de 99 años";
      res.render('Registro',{
        data: error
      });
    }
    else if((2019-year[2])>99){
      error="No puedes tener más de 99 años";
      res.render('Registro',{
        data: error
      });
    }
    else if((2019-year[2])<14){
      error="Debes ser mayor a 13 años para usar el sistema";
      res.render('Registro',{
        data: error
      });
    }
    else if(req.body.boleta.length<10){
      error="La boleta debe tener mínimo 10 caracteres";
      res.render('Registro',{
        data: error
      });
    }
    else if(req.body.boleta.length>12){
      error="La boleta no puede tener más de 12 caracteres";
      res.render('Registro',{
        data: error
      });
    }
    else if(req.body.grupo.length!=4&&req.body.grupo.length!=5){
      error="El grupo debe ser de 4 caracteres mínimo y máximo de 5";
      res.render('Registro',{
        data: error
      });
    }
    else if(req.body.grupo.charAt(0)!=1&&req.body.grupo.charAt(0)!=2&&req.body.grupo.charAt(0)!=3&&req.body.grupo.charAt(0)!=4&&req.body.grupo.charAt(0)!=5&&req.body.grupo.charAt(0)!=6&&req.body.grupo.charAt(0)!=7&&req.body.grupo.charAt(0)!=8&&req.body.grupo.charAt(0)!=9&&req.body.grupo.charAt(0)!=0&&req.body.grupo.charAt(3)!=1&&req.body.grupo.charAt(3)!=2&&req.body.grupo.charAt(3)!=3&&req.body.grupo.charAt(3)!=4&&req.body.grupo.charAt(3)!=5&&req.body.grupo.charAt(3)!=6&&req.body.grupo.charAt(3)!=7&&req.body.grupo.charAt(3)!=8&&req.body.grupo.charAt(3)!=9&&req.body.grupo.charAt(3)!=0){
      error="El grupo debe tener la siguiente estructura 1AA1 (número, letra, letra, número)";
      res.render('Registro',{
        data: error
      });
    }
    else if(req.body.grupo.charAt(1)==1||req.body.grupo.charAt(1)==2||req.body.grupo.charAt(1)==3||req.body.grupo.charAt(1)==4||req.body.grupo.charAt(1)==5||req.body.grupo.charAt(1)==6||req.body.grupo.charAt(1)==7||req.body.grupo.charAt(1)==8||req.body.grupo.charAt(1)==9||req.body.grupo.charAt(1)==0||req.body.grupo.charAt(2)==1||req.body.grupo.charAt(2)==2||req.body.grupo.charAt(2)==3||req.body.grupo.charAt(2)==4||req.body.grupo.charAt(2)==5||req.body.grupo.charAt(2)==6||req.body.grupo.charAt(2)==7||req.body.grupo.charAt(2)==8||req.body.grupo.charAt(2)==9||req.body.grupo.charAt(2)==0){
      error="El grupo debe tener la siguiente estructura 1AA1 (número, letra, letra, número)";
      res.render('Registro',{
        data: error
      });
    }
    else if(req.body.boleta.includes('A')||req.body.boleta.includes('B')||req.body.boleta.includes('C')||req.body.boleta.includes('D')||req.body.boleta.includes('E')||req.body.boleta.includes('F')||req.body.boleta.includes('G')||req.body.boleta.includes('H')||req.body.boleta.includes('I')||req.body.boleta.includes('J')||req.body.boleta.includes('K')||req.body.boleta.includes('L')||req.body.boleta.includes('N')||req.body.boleta.includes('O')||req.body.boleta.includes('Q')||req.body.boleta.includes('R')||req.body.boleta.includes('S')||req.body.boleta.includes('T')||req.body.boleta.includes('U')||req.body.boleta.includes('V')||req.body.boleta.includes('W')||req.body.boleta.includes('X')||req.body.boleta.includes('Y')&&req.body.boleta.includes('Z')||req.body.boleta.includes('a')||req.body.boleta.includes('b')||req.body.boleta.includes('c')||req.body.boleta.includes('d')||req.body.boleta.includes('e')||req.body.boleta.includes('f')||req.body.boleta.includes('g')||req.body.boleta.includes('h')||req.body.boleta.includes('i')||req.body.boleta.includes('j')||req.body.boleta.includes('k')||req.body.boleta.includes('l')||req.body.boleta.includes('m')||req.body.boleta.includes('n')||req.body.boleta.includes('o')||req.body.boleta.includes('p')||req.body.boleta.includes('q')||req.body.boleta.includes('r')||req.body.boleta.includes('s')||req.body.boleta.includes('t')||req.body.boleta.includes('u')||req.body.boleta.includes('v')||req.body.boleta.includes('w')||req.body.boleta.includes('x')||req.body.boleta.includes('y')||req.body.boleta.includes('z')||req.body.boleta.includes('|')||req.body.boleta.includes('!')||req.body.boleta.includes('"')||req.body.boleta.includes('#')||req.body.boleta.includes('$')||req.body.boleta.includes('%')||req.body.boleta.includes('&')||req.body.boleta.includes('/')||req.body.boleta.includes('(')||req.body.boleta.includes(')')||req.body.boleta.includes('=')||req.body.boleta.includes('?')||req.body.boleta.includes('  ')||req.body.boleta.includes('¡')||req.body.boleta.includes('¿')||req.body.boleta.includes('¨')||req.body.boleta.includes('*')||req.body.boleta.includes('+')||req.body.boleta.includes('[')||req.body.boleta.includes(']')||req.body.boleta.includes('{')||req.body.boleta.includes('}')||req.body.boleta.includes('^')||req.body.boleta.includes('`')||req.body.boleta.includes('.')||req.body.boleta.includes(';')||req.body.boleta.includes(',')||req.body.boleta.includes(':')||req.body.boleta.includes('-')||req.body.boleta.includes('_')||req.body.boleta.includes('/')||req.body.boleta.includes('*')||req.body.boleta.includes('-')||req.body.boleta.includes('♥')||req.body.boleta.includes('☻')||req.body.boleta.includes('♦')||req.body.boleta.includes('☺')||req.body.boleta.includes('♣')||req.body.boleta.includes('♠')||req.body.boleta.includes('•')||req.body.boleta.includes('◘')||req.body.boleta.includes('○')||req.body.boleta.includes('<')||req.body.boleta.includes('>')||req.body.boleta.includes('°')){
      error="El campo de boleta no puede incluir letras (Solo 'P' o 'M' en caso de los de nuevo ingreso)";
      res.render('Registro',{
        data: error
      });
    }
    else if(req.files.archivo.type != 'image/jpeg'&&req.files.archivo.type != 'image/png'){
      error="Por Favor Selecciona un tipo de archivo elegible";
      res.render('Registro',{
        data: error
      });
    }else if(req.body.fotop != 1&&req.body.fotop != 2&&req.body.fotop != 3&&req.body.fotop != 4&&req.body.fotop != 5){
      error="Por Favor Selecciona un avatar (No hagas Trampa)";
      res.render('Registro',{
        data: error
      });
    }
    else{
      console.log(req.body.name + " " + req.body.pass);
      var fotop = "";
      if(req.body.fotop == 1){
        fotop = "./img/one.jpg";
      }else if(req.body.fotop == 2){
        fotop = "./img/two.jpg";
      }else if(req.body.fotop == 3){
        fotop = "./img/three.jpg";
      }else if(req.body.fotop == 4){
        fotop = "./img/four.jpg";
      }else if(req.body.fotop == 5){
        fotop = "./img/five.jpg";
      }
    mysqlCon.query('INSERT INTO usuario(nom_us,con_us,gru_us,bol_us,eda_us,adm_us,fot_us,use_us,ftp_us) VALUES(?,?,?,?,?,false,?,?,?)', [crud.cipher(req.body.name),crud.cipher(req.body.pass),crud.cipher(req.body.grupo),crud.cipher(req.body.boleta),crud.cipher(req.body.birthday),crud.cipher("./img/"+req.body.user+".JPG"),req.body.user,fotop],(err)=>{
      console.log(err);
    });
    mysqlCon.query('SELECT id_us FROM usuario WHERE use_us = ?',[req.body.user], (err,result)=>{
      mysqlCon.query('SELECT id_agCar FROM agruparcarrera natural join escuela WHERE nom_car = ? and nom_es = ?',[req.body.Carrera, req.body.School], (err,result1)=>{
        mysqlCon.query('SELECT id_agTur FROM agruparturno WHERE nom_tur = ?',[req.body.Turno], (err,result2)=>{
          mysqlCon.query('SELECT id_agGen FROM agrupargenero WHERE nom_gen = ?',[req.body.Gender], (err,result3)=>{
            mysqlCon.query('INSERT INTO carrera(id_us,id_agCar) VALUES(?,?)', [result[0].id_us,result1[0].id_agCar],(err)=>{
            });
            mysqlCon.query('INSERT INTO turno(id_us,id_agTur) VALUES(?,?)', [result[0].id_us,result2[0].id_agTur],(err)=>{
            });
            mysqlCon.query('INSERT INTO genero(id_us,id_agGen) VALUES(?,?)', [result[0].id_us,result3[0].id_agGen],(err)=>{
              if(!err){
                res.redirect('/Inicio');
              }
              else{
                res.render('Registro',{
                  data: err
                });
              }
            });
          });
        });
      });
    });
    }
  }else{
    res.render('Registro',{
      data: error
    });
  }
  });
  }
  }
  else{
    res.redirect('/');
  }
});

router.get('/Revision',crud.revision);

router.post('/Reg/ADMIN',function(req,res){
  if(req.session.nombre=="Admin" &&req.session.nombre!=undefined){
    fs.renameSync(req.files.archivo.path,"public/img/"+req.body.user+".JPG");
    var adm = false;
    if(req.body.adm == "Si"){
      adm = true;
    }
    var ex = 0;
    var error = "";
    var idus = 0;
    var idagcar = 0;
    var idagtur = 0;
    var idaggen = 0;
    var exists = false;
    var coincidence = 0;
    var year = req.body.birthday.split('/');
    const mysqlCon = require("../controllers/Connection");
    if(req.body.name == undefined||req.body.user == undefined||req.body.pass == undefined||req.body.birthday == undefined||req.body.Gender == undefined||req.body.Turno == undefined||req.body.Carrera == undefined||req.body.boleta == undefined||req.body.grupo == undefined||req.files.archivo == undefined||req.body.fotop == undefined){
      error="Primero debes llenar todos los campos";
      res.redirect('/AD');
    }
    else{
    mysqlCon.query('SELECT * FROM usuario',(err,result)=>{
      if(!err){
        for(var i=0;i<result.length;i++){
          console.log(result[i].use_us);
            if(result[i].use_us==req.body.user){
              exists=true;
              error = "El Usuario ya existe";
            }
          }
          console.log(exists);
      }else{
        console.log("No se pudo conectar a la tabla");
      }
    console.log(exists);
    if(exists==false){
      if(req.body.name.length<3){
        error="El nombre debe ser mayor a 3 caracteres";
        res.redirect('/AD');
      }
      else if(req.body.name.length>40){
        error="El nombre no puede ser mayor a 40 caracteres";
        res.redirect('/AD');
      }
      else if(req.body.Gender!="Mujer"&&req.body.Gender!="Hombre"&&req.body.Gender!="Otro"){
        error="Solo puedes seleccionar un género de los establecidos, no hagas trampa";
        res.redirect('/AD');
      }
      else if(req.body.Turno!="V"&&req.body.Turno!="M"&&req.body.Turno!="Otro"){
        error="Solo puedes seleccionar un turno de los establecidos, no hagas trampa";
        res.redirect('/AD');
      }
      else if(req.body.Carrera!="T.C."&&req.body.Carrera!="S.D."&&req.body.Carrera!="PROG."&&req.body.Carrera!="M.S.A."){
        error="Solo puedes seleccionar una carrera de las establecidas, no hagas trampa";
        res.redirect('/AD');
      }
      else if(req.body.name.includes('1')||req.body.name.includes('2')||req.body.name.includes('3')||req.body.name.includes('4')||req.body.name.includes('5')||req.body.name.includes('6')||req.body.name.includes('7')||req.body.name.includes('8')||req.body.name.includes('9')||req.body.name.includes('0')||req.body.name.includes('|')||req.body.name.includes('!')||req.body.name.includes('"')||req.body.name.includes('#')||req.body.name.includes('$')||req.body.name.includes('%')||req.body.name.includes('&')||req.body.name.includes('/')||req.body.name.includes('(')||req.body.name.includes(')')||req.body.name.includes('=')||req.body.name.includes('?')||req.body.name.includes('  ')||req.body.name.includes('¡')||req.body.name.includes('¿')||req.body.name.includes('¨')||req.body.name.includes('*')||req.body.name.includes('+')||req.body.name.includes('[')||req.body.name.includes(']')||req.body.name.includes('{')||req.body.name.includes('}')||req.body.name.includes('^')||req.body.name.includes('`')||req.body.name.includes('.')||req.body.name.includes(';')||req.body.name.includes(',')||req.body.name.includes(':')||req.body.name.includes('-')||req.body.name.includes('_')||req.body.name.includes('/')||req.body.name.includes('*')||req.body.name.includes('-')||req.body.name.includes('♥')||req.body.name.includes('☻')||req.body.name.includes('♦')||req.body.name.includes('☺')||req.body.name.includes('♣')||req.body.name.includes('♠')||req.body.name.includes('•')||req.body.name.includes('◘')||req.body.name.includes('○')||req.body.name.includes('<')||req.body.name.includes('>')||req.body.name.includes('°')){
        error="El campo de nombre solo puede incluir letras y espacios";
        res.redirect('/AD');
      }
      else if(req.body.user.includes('|')||req.body.user.includes('!')||req.body.user.includes('"')||req.body.user.includes('&')||req.body.user.includes('/')||req.body.user.includes('(')||req.body.user.includes(')')||req.body.user.includes('=')||req.body.user.includes('?')||req.body.user.includes('  ')||req.body.user.includes('¡')||req.body.user.includes('¿')||req.body.user.includes('¨')||req.body.user.includes('*')||req.body.user.includes('+')||req.body.user.includes('[')||req.body.user.includes(']')||req.body.user.includes('{')||req.body.user.includes('}')||req.body.user.includes('^')||req.body.user.includes('`')||req.body.user.includes('.')||req.body.user.includes(';')||req.body.user.includes(',')||req.body.user.includes(':')||req.body.user.includes('-')||req.body.user.includes('/')||req.body.user.includes('*')||req.body.user.includes('-')||req.body.user.includes('♥')||req.body.user.includes('☻')||req.body.user.includes('♦')||req.body.user.includes('☺')||req.body.user.includes('♣')||req.body.user.includes('♠')||req.body.user.includes('•')||req.body.user.includes('◘')||req.body.user.includes('○')||req.body.user.includes('<')||req.body.user.includes('>')||req.body.user.includes('°')){
        error="No se admiten ese tipo de caracteres especiales en el usuario";
        res.redirect('/AD');
      }
      else if(req.body.user.length<3){
        error="El usuario debe ser mayor a 3 caracteres";
        res.redirect('/AD');
      }
      else if(req.body.user.length>40){
        error="El usuario no puede ser mayor a 40 caracteres";
        res.redirect('/AD');
      }
      else if(req.body.pass.length<8){
        error="La contraseña no debe ser menor a 8 caracteres";
        res.redirect('/AD');
      }
      else if(req.body.pass.length>15){
        error="La contraseña no debe ser mayor a 15 caracteres";
        res.redirect('/AD');
      }
      else if(req.body.pass.includes('|')||req.body.pass.includes('!')||req.body.pass.includes('"')||req.body.pass.includes('&')||req.body.pass.includes('/')||req.body.pass.includes('(')||req.body.pass.includes(')')||req.body.pass.includes('=')||req.body.pass.includes('?')||req.body.pass.includes('  ')||req.body.pass.includes('¡')||req.body.pass.includes('¿')||req.body.pass.includes('¨')||req.body.pass.includes('*')||req.body.pass.includes('+')||req.body.pass.includes('[')||req.body.pass.includes(']')||req.body.pass.includes('{')||req.body.pass.includes('}')||req.body.pass.includes('^')||req.body.pass.includes('`')||req.body.pass.includes('.')||req.body.pass.includes(';')||req.body.pass.includes(',')||req.body.pass.includes(':')||req.body.pass.includes('-')||req.body.pass.includes('/')||req.body.pass.includes('*')||req.body.pass.includes('-')||req.body.pass.includes('♥')||req.body.pass.includes('☻')||req.body.pass.includes('♦')||req.body.pass.includes('☺')||req.body.pass.includes('♣')||req.body.pass.includes('♠')||req.body.pass.includes('•')||req.body.pass.includes('◘')||req.body.pass.includes('○')||req.body.pass.includes('<')||req.body.pass.includes('>')||req.body.pass.includes('°')){
        error="No se admiten ese tipo de caracteres especiales en la contraseña";
        res.redirect('/AD');
      }
      else if(year[2]>2019){
        error="No puedes venir del futuro";
        res.redirect('/AD');
      }
      else if((2019-year[2])>99){
        error="No puedes tener más de 99 años";
        res.redirect('/AD');
      }
      else if((2019-year[2])>99){
        error="No puedes tener más de 99 años";
        res.redirect('/AD');
      }
      else if((2019-year[2])<14){
        error="Debes ser mayor a 13 años para usar el sistema";
        res.redirect('/AD');
      }
      else if(req.body.boleta.length<10){
        error="La boleta debe tener mínimo 10 caracteres";
        res.redirect('/AD');
      }
      else if(req.body.boleta.length>12){
        error="La boleta no puede tener más de 12 caracteres";
        res.redirect('/AD');
      }
      else if(req.body.grupo.length!=4&&req.body.grupo.length!=5){
        error="El grupo debe ser de 4 caracteres mínimo y máximo de 5";
        res.redirect('/AD');
      }
      else if(req.body.grupo.charAt(0)!=1&&req.body.grupo.charAt(0)!=2&&req.body.grupo.charAt(0)!=3&&req.body.grupo.charAt(0)!=4&&req.body.grupo.charAt(0)!=5&&req.body.grupo.charAt(0)!=6&&req.body.grupo.charAt(0)!=7&&req.body.grupo.charAt(0)!=8&&req.body.grupo.charAt(0)!=9&&req.body.grupo.charAt(0)!=0&&req.body.grupo.charAt(3)!=1&&req.body.grupo.charAt(3)!=2&&req.body.grupo.charAt(3)!=3&&req.body.grupo.charAt(3)!=4&&req.body.grupo.charAt(3)!=5&&req.body.grupo.charAt(3)!=6&&req.body.grupo.charAt(3)!=7&&req.body.grupo.charAt(3)!=8&&req.body.grupo.charAt(3)!=9&&req.body.grupo.charAt(3)!=0){
        error="El grupo debe tener la siguiente estructura 1AA1 (número, letra, letra, número)";
        res.redirect('/AD');
      }
      else if(req.body.grupo.charAt(1)==1||req.body.grupo.charAt(1)==2||req.body.grupo.charAt(1)==3||req.body.grupo.charAt(1)==4||req.body.grupo.charAt(1)==5||req.body.grupo.charAt(1)==6||req.body.grupo.charAt(1)==7||req.body.grupo.charAt(1)==8||req.body.grupo.charAt(1)==9||req.body.grupo.charAt(1)==0||req.body.grupo.charAt(2)==1||req.body.grupo.charAt(2)==2||req.body.grupo.charAt(2)==3||req.body.grupo.charAt(2)==4||req.body.grupo.charAt(2)==5||req.body.grupo.charAt(2)==6||req.body.grupo.charAt(2)==7||req.body.grupo.charAt(2)==8||req.body.grupo.charAt(2)==9||req.body.grupo.charAt(2)==0){
        error="El grupo debe tener la siguiente estructura 1AA1 (número, letra, letra, número)";
        res.redirect('/AD');
      }
      else if(req.body.boleta.includes('A')||req.body.boleta.includes('B')||req.body.boleta.includes('C')||req.body.boleta.includes('D')||req.body.boleta.includes('E')||req.body.boleta.includes('F')||req.body.boleta.includes('G')||req.body.boleta.includes('H')||req.body.boleta.includes('I')||req.body.boleta.includes('J')||req.body.boleta.includes('K')||req.body.boleta.includes('L')||req.body.boleta.includes('N')||req.body.boleta.includes('O')||req.body.boleta.includes('Q')||req.body.boleta.includes('R')||req.body.boleta.includes('S')||req.body.boleta.includes('T')||req.body.boleta.includes('U')||req.body.boleta.includes('V')||req.body.boleta.includes('W')||req.body.boleta.includes('X')||req.body.boleta.includes('Y')&&req.body.boleta.includes('Z')||req.body.boleta.includes('a')||req.body.boleta.includes('b')||req.body.boleta.includes('c')||req.body.boleta.includes('d')||req.body.boleta.includes('e')||req.body.boleta.includes('f')||req.body.boleta.includes('g')||req.body.boleta.includes('h')||req.body.boleta.includes('i')||req.body.boleta.includes('j')||req.body.boleta.includes('k')||req.body.boleta.includes('l')||req.body.boleta.includes('m')||req.body.boleta.includes('n')||req.body.boleta.includes('o')||req.body.boleta.includes('p')||req.body.boleta.includes('q')||req.body.boleta.includes('r')||req.body.boleta.includes('s')||req.body.boleta.includes('t')||req.body.boleta.includes('u')||req.body.boleta.includes('v')||req.body.boleta.includes('w')||req.body.boleta.includes('x')||req.body.boleta.includes('y')||req.body.boleta.includes('z')||req.body.boleta.includes('|')||req.body.boleta.includes('!')||req.body.boleta.includes('"')||req.body.boleta.includes('#')||req.body.boleta.includes('$')||req.body.boleta.includes('%')||req.body.boleta.includes('&')||req.body.boleta.includes('/')||req.body.boleta.includes('(')||req.body.boleta.includes(')')||req.body.boleta.includes('=')||req.body.boleta.includes('?')||req.body.boleta.includes('  ')||req.body.boleta.includes('¡')||req.body.boleta.includes('¿')||req.body.boleta.includes('¨')||req.body.boleta.includes('*')||req.body.boleta.includes('+')||req.body.boleta.includes('[')||req.body.boleta.includes(']')||req.body.boleta.includes('{')||req.body.boleta.includes('}')||req.body.boleta.includes('^')||req.body.boleta.includes('`')||req.body.boleta.includes('.')||req.body.boleta.includes(';')||req.body.boleta.includes(',')||req.body.boleta.includes(':')||req.body.boleta.includes('-')||req.body.boleta.includes('_')||req.body.boleta.includes('/')||req.body.boleta.includes('*')||req.body.boleta.includes('-')||req.body.boleta.includes('♥')||req.body.boleta.includes('☻')||req.body.boleta.includes('♦')||req.body.boleta.includes('☺')||req.body.boleta.includes('♣')||req.body.boleta.includes('♠')||req.body.boleta.includes('•')||req.body.boleta.includes('◘')||req.body.boleta.includes('○')||req.body.boleta.includes('<')||req.body.boleta.includes('>')||req.body.boleta.includes('°')){
        error="El campo de boleta no puede incluir letras (Solo 'P' o 'M' en caso de los de nuevo ingreso)";
        res.redirect('/AD');
      }
      else if(req.files.archivo.type != 'image/jpeg'&&req.files.archivo.type != 'image/png'){
        error="Por Favor Selecciona un tipo de archivo elegible";
        res.redirect('/AD');
      }else if(req.body.fotop != 1&&req.body.fotop != 2&&req.body.fotop != 3&&req.body.fotop != 4&&req.body.fotop != 5){
        error="Por Favor Selecciona un avatar (No hagas Trampa)";
        res.redirect('/AD');
      }
      else{
        console.log(req.body.name + " " + req.body.pass);
        var fotop = "";
        if(req.body.fotop == 1){
          fotop = "./img/one.jpg";
        }else if(req.body.fotop == 2){
          fotop = "./img/two.jpg";
        }else if(req.body.fotop == 3){
          fotop = "./img/three.jpg";
        }else if(req.body.fotop == 4){
          fotop = "./img/four.jpg";
        }else if(req.body.fotop == 5){
          fotop = "./img/five.jpg";
        }
      mysqlCon.query('INSERT INTO usuario(nom_us,con_us,gru_us,bol_us,eda_us,adm_us,fot_us,use_us,ftp_us) VALUES(?,?,?,?,?,?,?,?,?)', [crud.cipher(req.body.name),crud.cipher(req.body.pass),crud.cipher(req.body.grupo),crud.cipher(req.body.boleta),crud.cipher(req.body.birthday),adm,crud.cipher("./img/"+req.body.user+".JPG"),req.body.user,fotop],(err)=>{
        console.log(err);
      });
      mysqlCon.query('SELECT id_us FROM usuario WHERE use_us = ?',[req.body.user], (err,result)=>{
        mysqlCon.query('SELECT id_agCar FROM agruparcarrera WHERE nom_car = ?',[req.body.Carrera], (err,result1)=>{
          mysqlCon.query('SELECT id_agTur FROM agruparturno WHERE nom_tur = ?',[req.body.Turno], (err,result2)=>{
            mysqlCon.query('SELECT id_agGen FROM agrupargenero WHERE nom_gen = ?',[req.body.Gender], (err,result3)=>{
              mysqlCon.query('INSERT INTO carrera(id_us,id_agCar) VALUES(?,?)', [result[0].id_us,result1[0].id_agCar],(err)=>{
              });
              mysqlCon.query('INSERT INTO turno(id_us,id_agTur) VALUES(?,?)', [result[0].id_us,result2[0].id_agTur],(err)=>{
              });
              mysqlCon.query('INSERT INTO genero(id_us,id_agGen) VALUES(?,?)', [result[0].id_us,result3[0].id_agGen],(err)=>{
                if(!err){
                  res.redirect('/AD');
                }
                else{
                  res.redirect('/AD');
                }
              });
            });
          });
        });
      });
      }
    }else{
      res.redirect('/AD');
    }
    });
    }
    }
    else{
      res.redirect('/');
    }
});

router.get('/reported',crud.report);

router.get('/sop/:id',crud.sop);

router.get('/bqd/:id',crud.bqd);

router.get('/bqs/:id',crud.bqs);

router.get('/stalker/:id',crud.stalk);

router.get('/profile/:id',crud.prof);

router.get('/Prof',crud.profile);

router.get('/stalk',crud.stlk);

router.get('/trueFriend/:id',crud.truefri);

router.get('/AD', crud.list);

router.get('/SelfPub', crud.SelfPub);

router.post('/Match', crud.Match);

router.get('/SelfPub2',crud.SelfPub2);

module.exports = router;
