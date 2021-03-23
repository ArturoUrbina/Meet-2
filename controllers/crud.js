const prueba = {};
const mysqlConnection = require("../controllers/Connection");
var CryptoJS = require("crypto-js");
var fs = require("fs");

prueba.list = (req, res) => {
  console.log("Hola");
  mysqlConnection.query('SELECT * FROM usuario', (err, result) => {
    mysqlConnection.query('select * from revision natural join usuario natural join blockeduser',(err345,result345)=>{
      for(var i = 0; i<result.length; i++){
        result[i].nom_us = prueba.decipher(result[i].nom_us);
        result[i].con_us = prueba.decipher(result[i].con_us);
        result[i].gru_us = prueba.decipher(result[i].gru_us);
        result[i].bol_us = prueba.decipher(result[i].bol_us);
        result[i].eda_us = prueba.decipher(result[i].eda_us);
        result[i].fot_us = prueba.decipher(result[i].fot_us);
      }
      for(var i = 0; i<result345.length; i++){
        result345[i].nom_us = prueba.decipher(result345[i].nom_us);
        result345[i].con_us = prueba.decipher(result345[i].con_us);
        result345[i].gru_us = prueba.decipher(result345[i].gru_us);
        result345[i].bol_us = prueba.decipher(result345[i].bol_us);
        result345[i].eda_us = prueba.decipher(result345[i].eda_us);
        result345[i].fot_us = prueba.decipher(result345[i].fot_us);
      }
      res.render('Admin',{
            data: result,
            rev: result345,
            user: req.session.nombre
          });
      });
    });
};
prueba.save = (req, res) => {
  var yes=0;
  var mist = "";
  var coincidence = 0;
  var friends = [];
  var l = 0;
  var m = 0;
  var error = null;
  console.log(prueba.cipher("Hola") + " "+ prueba.decipher(prueba.cipher("Hola")));
  if(req.body.user == undefined||req.body.pass == undefined){
    error="Primero debes llenar todos los campos";
      res.render('Inicio',{
        data: error
      });
  }
  else if(req.body.pass.length<8){
    error="La contraseña no debe ser menor a 8 caracteres";
    res.render('Inicio',{
      data: error
    });
  }
  else if(req.body.user.includes('|')||req.body.user.includes('!')||req.body.user.includes('"')||req.body.user.includes('&')||req.body.user.includes('/')||req.body.user.includes('(')||req.body.user.includes(')')||req.body.user.includes('=')||req.body.user.includes('?')||req.body.user.includes('  ')||req.body.user.includes('¡')||req.body.user.includes('¿')||req.body.user.includes('¨')||req.body.user.includes('*')||req.body.user.includes('+')||req.body.user.includes('[')||req.body.user.includes(']')||req.body.user.includes('{')||req.body.user.includes('}')||req.body.user.includes('^')||req.body.user.includes('`')||req.body.user.includes('.')||req.body.user.includes(';')||req.body.user.includes(',')||req.body.user.includes(':')||req.body.user.includes('-')||req.body.user.includes('/')||req.body.user.includes('*')||req.body.user.includes('-')||req.body.user.includes('♥')||req.body.user.includes('☻')||req.body.user.includes('♦')||req.body.user.includes('☺')||req.body.user.includes('♣')||req.body.user.includes('♠')||req.body.user.includes('•')||req.body.user.includes('◘')||req.body.user.includes('○')||req.body.user.includes('<')||req.body.user.includes('>')||req.body.user.includes('°')){
    error="No se admiten ese tipo de caracteres especiales en el usuario";
    res.render('Inicio',{
      data: error
    });
  }
  else if(req.body.pass.includes('|')||req.body.pass.includes('!')||req.body.pass.includes('"')||req.body.pass.includes('&')||req.body.pass.includes('/')||req.body.pass.includes('(')||req.body.pass.includes(')')||req.body.pass.includes('=')||req.body.pass.includes('?')||req.body.pass.includes('  ')||req.body.pass.includes('¡')||req.body.pass.includes('¿')||req.body.pass.includes('¨')||req.body.pass.includes('*')||req.body.pass.includes('+')||req.body.pass.includes('[')||req.body.pass.includes(']')||req.body.pass.includes('{')||req.body.pass.includes('}')||req.body.pass.includes('^')||req.body.pass.includes('`')||req.body.pass.includes('.')||req.body.pass.includes(';')||req.body.pass.includes(',')||req.body.pass.includes(':')||req.body.pass.includes('-')||req.body.pass.includes('/')||req.body.pass.includes('*')||req.body.pass.includes('-')||req.body.pass.includes('♥')||req.body.pass.includes('☻')||req.body.pass.includes('♦')||req.body.pass.includes('☺')||req.body.pass.includes('♣')||req.body.pass.includes('♠')||req.body.pass.includes('•')||req.body.pass.includes('◘')||req.body.pass.includes('○')||req.body.pass.includes('<')||req.body.pass.includes('>')||req.body.pass.includes('°')){
    error="No se admiten ese tipo de caracteres especiales en la contraseña";
    res.render('Inicio',{
      data: error
    });
  }
  else{
  mysqlConnection.query("SELECT * FROM usuario",(err,result)=>{
    if(!err){
      for(var i=0;i<result.length;i++){
          if((result[i].use_us==req.body.user)&&prueba.decipher(result[i].con_us)==req.body.pass){
            yes++;
            coincidence = i;
            req.session.nombre = req.body.user;
          }
        }
        if(yes==0){
          error = "Los Datos Introducidos no concuerdan con ningún usuario registrado";
          res.render('Inicio',{
            data: error
          });
        }
        else{
          if(result[coincidence].adm_us){
            req.session.nombre="Admin";
            mysqlConnection.query('select * from revision natural join usuario natural join blockeduser',(err345,result345)=>{
              for(var i = 0; i<result.length; i++){
                result[i].nom_us = prueba.decipher(result[i].nom_us);
                result[i].con_us = prueba.decipher(result[i].con_us);
                result[i].gru_us = prueba.decipher(result[i].gru_us);
                result[i].bol_us = prueba.decipher(result[i].bol_us);
                result[i].eda_us = prueba.decipher(result[i].eda_us);
                result[i].fot_us = prueba.decipher(result[i].fot_us);
              }
              for(var i = 0; i<result345.length; i++){
                result345[i].nom_us = prueba.decipher(result345[i].nom_us);
                result345[i].con_us = prueba.decipher(result345[i].con_us);
                result345[i].gru_us = prueba.decipher(result345[i].gru_us);
                result345[i].bol_us = prueba.decipher(result345[i].bol_us);
                result345[i].eda_us = prueba.decipher(result345[i].eda_us);
                result345[i].fot_us = prueba.decipher(result345[i].fot_us);
              }
              res.render('Admin',{
                    data: result,
                    rev: result345,
                    user: req.session.nombre
                  });
              });
          }else{
          mysqlConnection.query('select * from blockeduser where id_us = ?',[result[coincidence].id_us],(err78,result78)=>{
              if(result78[0]!=undefined){
                if(result78[0].blo_bl){
                  if(result78[0].wrn_bl!=99&&result78[0].wrn_bl!=1080){
                    error = "Haz sido bloqueado definitivamente del sistema, cuida tu comportamiento en el sistema " + prueba.decipher(result[coincidence].nom_us)+" Razón de bloqueo: "+result78[0].rea_bl;
                    res.render('Inicio',{
                      data: error
                    });
                  }else if(result78[0].wrn_bl!=1080){
                    error=req.session.nombre+", Ya haz solicitado revisión anteriormente y se ha determinado una suspensión permanente de tu cuenta";
                        res.render('Inicio',{
                          data: error
                        });
                  }else{
                    error=req.session.nombre+", Se te advirtió que reportar sin fundamento llevaría a una sanción permanente de tu cuenta";
                        res.render('Inicio',{
                          data: error
                        });
                  }
                }else{
              mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where use_us = ?',[req.session.nombre],(err6,result6)=>{
                mysqlConnection.query("select * from publicaciones natural join registro natural join usuario where use_us = ?",[req.session.nombre],(err1234,result1234)=>{
                  console.log(result1234);
                  result6[0].pub = result1234;
              mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where ida_us = ?',[result[coincidence].id_us],(err44,result44)=>{
              if(result6.length>0&&result44.length==0){
                console.log("Hola");
                for(var i = 0;i<result6.length;i++){
                  req.session.i = i;
                  req.session.r = result6.length;
                  console.log(result6[i]);
                  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result6[i].ida_us,result6[i].id_us],(err22,result22)=>{
                    if(result22[0]!=undefined){
                    mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
                      mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result22[0].id_us,result22[0].ida_us,result22[0].id_us,result22[0].ida_us],(err444,result444)=>{
                        result22[0].chat = result444.length;
                      });
                      
                      var blocked = false;
                      if(result56[0]!=undefined){
                        blocked = true;
                      }
                    if(result22[0]!=undefined){
                      result22[0].blocked = blocked;
                      var ll = 0;
                      for(var i = 0; i<friends.length;i++){
                        if(friends[i].chat<result22[0].chat){
                          friends.splice(i,0,result22[0]);
                          ll++;
                        }
                      }
                      if(ll==0){
                        friends.push(result22[0]);
                      }
                    }
                    else{
                      req.session.r -= 1; 
                    }
                    if((friends.length==req.session.r)&&l==0){
                      l++;
                      result6[0].nom_us = prueba.decipher(result6[0].nom_us);
                      result6[0].con_us = prueba.decipher(result6[0].con_us);
                      result6[0].gru_us = prueba.decipher(result6[0].gru_us);
                      result6[0].bol_us = prueba.decipher(result6[0].bol_us);
                      result6[0].eda_us = prueba.decipher(result6[0].eda_us);
                      result6[0].fot_us = prueba.decipher(result6[0].fot_us);
                      for(var i = 0; i<friends.length; i++){
                        friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                        friends[i].con_us = prueba.decipher(friends[i].con_us);
                        friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                        friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                        friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                        friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                      }
                      console.log(friends + "ha");
                      
                      res.render('User',{
                        data: result6[0],
                        amigos: friends,
                        error: req.session.error,
                        user: req.session.nombre,
                        pub: null
                      });
                      i = req.session.r.length;
                    }
                  });
                  }else{
                    req.session.r -= 1; 
                    if((friends.length==req.session.r)&&l==0){
                      l++;
                      result6[0].nom_us = prueba.decipher(result6[0].nom_us);
                      result6[0].con_us = prueba.decipher(result6[0].con_us);
                      result6[0].gru_us = prueba.decipher(result6[0].gru_us);
                      result6[0].bol_us = prueba.decipher(result6[0].bol_us);
                      result6[0].eda_us = prueba.decipher(result6[0].eda_us);
                      result6[0].fot_us = prueba.decipher(result6[0].fot_us);
                      for(var i = 0; i<friends.length; i++){
                        friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                        friends[i].con_us = prueba.decipher(friends[i].con_us);
                        friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                        friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                        friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                        friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                      }
                      console.log(friends + "haha");
                      
                      res.render('User',{
                        data: result6[0],
                        amigos: friends,
                        error: req.session.error,
                        user: req.session.nombre,
                        pub: null
                      });
                      i = req.session.r.length;
                    }
                  }
                  });
                }
              }
              else if(result44.length>0&&result6.length==0){
                console.log("Holaa");
                mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
                for(var i = 0;i<result44.length;i++){
                  req.session.i = i;
                  req.session.r = result44.length;
                  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
                    if(result22[0]!=undefined){
                    mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
                      mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result22[0].id_us,result22[0].ida_us,result22[0].id_us,result22[0].ida_us],(err444,result444)=>{
                          result22[0].chat = result444.length;
                        });
                        var blocked = false;
                        if(result56[0]!=undefined){
                          blocked = true;
                        }
                      if(result22[0]!=undefined){
                        result22[0].blocked = blocked;
                        var lll = 0;
                        for(var i = 0; i<friends.length;i++){
                          if(friends[i].chat<result22[0].chat){
                            friends.splice(i,0,result22[0]);
                            lll++;
                          }
                        }
                        if(lll==0){
                          friends.push(result22[0]);
                        }
                      }
                    else{
                      req.session.r -= 1; 
                    }
                    if((friends.length==req.session.r)&&l==0){
                      l++;
                      result16[0].nom_us = prueba.decipher(result16[0].nom_us);
                      result16[0].con_us = prueba.decipher(result16[0].con_us);
                      result16[0].gru_us = prueba.decipher(result16[0].gru_us);
                      result16[0].bol_us = prueba.decipher(result16[0].bol_us);
                      result16[0].eda_us = prueba.decipher(result16[0].eda_us);
                      result16[0].fot_us = prueba.decipher(result16[0].fot_us);
                      for(var i = 0; i<friends.length; i++){
                        friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                        friends[i].con_us = prueba.decipher(friends[i].con_us);
                        friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                        friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                        friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                        friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                      }
                      console.log(friends + "hahaha");
                      
                      res.render('User',{
                        data: result16[0],
                        amigos: friends,
                        error: req.session.error,
                        user: req.session.nombre,
                        pub: null
                      });
                      i = req.session.r.length;
                    }
                  });
                }else{
                  req.session.r -= 1; 
                  if((friends.length==req.session.r)&&l==0){
                    l++;
                    result6[0].nom_us = prueba.decipher(result6[0].nom_us);
                      result6[0].con_us = prueba.decipher(result6[0].con_us);
                      result6[0].gru_us = prueba.decipher(result6[0].gru_us);
                      result6[0].bol_us = prueba.decipher(result6[0].bol_us);
                      result6[0].eda_us = prueba.decipher(result6[0].eda_us);
                      result6[0].fot_us = prueba.decipher(result6[0].fot_us);
                      for(var i = 0; i<friends.length; i++){
                        friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                        friends[i].con_us = prueba.decipher(friends[i].con_us);
                        friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                        friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                        friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                        friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                      }
                      console.log(friends + "hahahaha");
                      
                    res.render('User',{
                      data: result6[0],
                      amigos: friends,
                      error: req.session.error,
                      user: req.session.nombre,
                      pub: null
                    });
                    i = req.session.r.length;
                  }
                }
                  });
                }
              });
              }
              else if(result44.length>0&&result6.length>0){
                console.log("Holaaa");
                for(var i = 0;i<result6.length;i++){
                  req.session.i = i;
                  req.session.r = result6.length;
                  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result6[i].ida_us,result6[i].id_us],(err22,result22)=>{
                    if(result22[0]!=undefined){
                    mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
                      mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result22[0].id_us,result22[0].ida_us,result22[0].id_us,result22[0].ida_us],(err444,result444)=>{
                        result22[0].chat = result444.length;
                      });
                      var blocked = false;
                      if(result56[0]!=undefined){
                        blocked = true;
                      }
                    if(result22[0]!=undefined){
                      result22[0].blocked = blocked;
                      var llll = 0;
                      for(var i = 0; i<friends.length;i++){
                        if(friends[i].chat<result22[0].chat){
                          friends.splice(i,0,result22[0]);
                          llll++;
                        }
                      }
                      if(llll==0){
                        friends.push(result22[0]);
                      }
                    }
                    else{
                      req.session.r -= 1; 
                    }
                    if((friends.length==req.session.r)&&l==0){
                      req.session.r += result44.length;
                      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
                        for(var i = 0;i<result44.length;i++){
                          req.session.i = i;
                          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
                            if(result22[0]!=undefined){
                            mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err57,result57)=>{
                              var block = false;
                              if(result57[0]!=undefined){
                                block = true;
                              }
                            if(result22[0]!=undefined&&friends.map(function(e) { return e.id_us; }).indexOf(result22[0].id_us)==-1){
                              result22[0].blocked = block;
                              friends.push(result22[0]);
                            }
                            else{
                              req.session.r -= 1; 
                            }
                            if((friends.length==req.session.r)&&m==0){
                              m++;
                              result16[0].nom_us = prueba.decipher(result16[0].nom_us);
                              result16[0].con_us = prueba.decipher(result16[0].con_us);
                              result16[0].gru_us = prueba.decipher(result16[0].gru_us);
                              result16[0].bol_us = prueba.decipher(result16[0].bol_us);
                              result16[0].eda_us = prueba.decipher(result16[0].eda_us);
                              result16[0].fot_us = prueba.decipher(result16[0].fot_us);
                              for(var i = 0; i<friends.length; i++){
                                friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                                friends[i].con_us = prueba.decipher(friends[i].con_us);
                                friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                                friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                                friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                                friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                              }
                              console.log(friends + "hahahahaha");
                              
                              res.render('User',{
                                data: result16[0],
                                amigos: friends,
                                error: req.session.error,
                                user: req.session.nombre,
                                pub: null
                              });
                              i = req.session.r.length;
                            }
                          });
                        }else{
                          req.session.r -= 1;
                          if((friends.length==req.session.r)&&m==0){
                            m++;
                              result16[0].nom_us = prueba.decipher(result16[0].nom_us);
                              result16[0].con_us = prueba.decipher(result16[0].con_us);
                              result16[0].gru_us = prueba.decipher(result16[0].gru_us);
                              result16[0].bol_us = prueba.decipher(result16[0].bol_us);
                              result16[0].eda_us = prueba.decipher(result16[0].eda_us);
                              result16[0].fot_us = prueba.decipher(result16[0].fot_us);
                              for(var i = 0; i<friends.length; i++){
                                friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                                friends[i].con_us = prueba.decipher(friends[i].con_us);
                                friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                                friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                                friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                                friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                              }
                              console.log(friends + "hahahahahaha");
                              
                            res.render('User',{
                              data: result16[0],
                              amigos: friends,
                              error: req.session.error,
                              user: req.session.nombre,
                              pub: null
                            });
                            i = req.session.r.length;
                          }
                        }
                        });
                        }
                      });
                      l++;
                      i = req.session.r.length;
                    }
                  });
                  }else{
                    req.session.r -= 1;
                    if((friends.length==req.session.r)&&l==0){
                      req.session.r += result44.length;
                      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
                        for(var i = 0;i<result44.length;i++){
                          req.session.i = i;
                          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
                            mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err57,result57)=>{
                              mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result22[0].id_us,result22[0].ida_us,result22[0].id_us,result22[0].ida_us],(err444,result444)=>{
                                result22[0].chat = result444.length;
                              });
                              var blocked = false;
                              if(result56[0]!=undefined){
                                blocked = true;
                              }
                            if(result22[0]!=undefined){
                              result22[0].blocked = blocked;
                              var lllll = 0;
                              for(var i = 0; i<friends.length;i++){
                                if(friends[i].chat<result22[0].chat){
                                  friends.splice(i,0,result22[0]);
                                  lllll++;
                                }
                              }
                              if(lllll==0){
                                friends.push(result22[0]);
                              }
                            }
                            else{
                              req.session.r -= 1; 
                            }
                            if((friends.length==req.session.r)&&m==0){
                              m++;
                              result16[0].nom_us = prueba.decipher(result16[0].nom_us);
                              result16[0].con_us = prueba.decipher(result16[0].con_us);
                              result16[0].gru_us = prueba.decipher(result16[0].gru_us);
                              result16[0].bol_us = prueba.decipher(result16[0].bol_us);
                              result16[0].eda_us = prueba.decipher(result16[0].eda_us);
                              result16[0].fot_us = prueba.decipher(result16[0].fot_us);
                              for(var i = 0; i<friends.length; i++){
                                friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                                friends[i].con_us = prueba.decipher(friends[i].con_us);
                                friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                                friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                                friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                                friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                              }
                              console.log(friends + "hahahahahahaha");
                              
                              res.render('User',{
                                data: result16[0],
                                amigos: friends,
                                error: req.session.error,
                                user: req.session.nombre,
                                pub: null
                              });
                              i = req.session.r.length;
                            }
                          });
                        });
                        }
                      });
                      l++;
                      i = req.session.r.length;
                    }
                  }
                  });
                }
              }
              else{
            mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
              console.log(result12[0]);
              if(result12.length>0){
                              result12[0].nom_us = prueba.decipher(result12[0].nom_us);
                              result12[0].con_us = prueba.decipher(result12[0].con_us);
                              result12[0].gru_us = prueba.decipher(result12[0].gru_us);
                              result12[0].bol_us = prueba.decipher(result12[0].bol_us);
                              result12[0].eda_us = prueba.decipher(result12[0].eda_us);
                              result12[0].fot_us = prueba.decipher(result12[0].fot_us);
                              console.log(friends + "hahahahahahahaha");
                              
                res.render('User',{
                  data: result12[0],
                  amigos: null,
                  error: req.session.error,
                  user: req.session.nombre,
                  pub: null
                });
              }
              else{
                mysqlConnection.query('SELECT * FROM usuario WHERE use_us = ?', [req.session.nombre] , (err,result)=>{
                  console.log("Hola");
                              result[0].nom_us = prueba.decipher(result[0].nom_us);
                              result[0].con_us = prueba.decipher(result[0].con_us);
                              result[0].gru_us = prueba.decipher(result[0].gru_us);
                              result[0].bol_us = prueba.decipher(result[0].bol_us);
                              result[0].eda_us = prueba.decipher(result[0].eda_us);
                              result[0].fot_us = prueba.decipher(result[0].fot_us);
                              console.log(friends + "hahahahahahahahaha");
                              
                  res.render('User',{
                    data: result[0],
                    amigos: null,
                    error: req.session.error,
                    user: req.session.nombre,
                    pub: null
                  });
                });
              }
              
            });
              }
            });
            });
              });
              }
            }else{
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where use_us = ?',[req.session.nombre],(err6,result6)=>{
            mysqlConnection.query("select * from publicaciones natural join registro natural join usuario where use_us = ?",[req.session.nombre],(err1234,result1234)=>{
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where ida_us = ?',[result[coincidence].id_us],(err44,result44)=>{
          if(result6.length>0&&result44.length==0){
            console.log("Hola");
            for(var i = 0;i<result6.length;i++){
              req.session.i = i;
              req.session.r = result6.length;
              console.log(result6[i]);
              mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result6[i].ida_us,result6[i].id_us],(err22,result22)=>{
                if(result22[0]!=undefined){
                mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
                  mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result22[0].id_us,result22[0].ida_us,result22[0].id_us,result22[0].ida_us],(err444,result444)=>{
                    result22[0].chat = result444.length;
                  });
                  var blocked = false;
                  if(result56[0]!=undefined){
                    blocked = true;
                  }
                if(result22[0]!=undefined){
                  result22[0].blocked = blocked;
                  var llllll = 0;
                  for(var i = 0; i<friends.length;i++){
                    if(friends[i].chat<result22[0].chat){
                      friends.splice(i,0,result22[0]);
                      llllll++;
                    }
                  }
                  if(llllll==0){
                    friends.push(result22[0]);
                  }
                }
                else{
                  req.session.r -= 1; 
                }
                if((friends.length==req.session.r)&&l==0){
                  l++;
                              result6[0].nom_us = prueba.decipher(result6[0].nom_us);
                              result6[0].con_us = prueba.decipher(result6[0].con_us);
                              result6[0].gru_us = prueba.decipher(result6[0].gru_us);
                              result6[0].bol_us = prueba.decipher(result6[0].bol_us);
                              result6[0].eda_us = prueba.decipher(result6[0].eda_us);
                              result6[0].fot_us = prueba.decipher(result6[0].fot_us);
                              for(var i = 0; i<friends.length; i++){
                                friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                                friends[i].con_us = prueba.decipher(friends[i].con_us);
                                friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                                friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                                friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                                friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                              }
                              console.log(friends + "hahahahahahahahahaha");
                              
                  res.render('User',{
                    data: result6[0],
                    amigos: friends,
                    error: req.session.error,
                    user: req.session.nombre,
                    pub: result1234
                  });
                  i = req.session.r.length;
                }
              });
              }else{
                req.session.r -= 1; 
                if((friends.length==req.session.r)&&l==0){
                  l++;
                              result6[0].nom_us = prueba.decipher(result6[0].nom_us);
                              result6[0].con_us = prueba.decipher(result6[0].con_us);
                              result6[0].gru_us = prueba.decipher(result6[0].gru_us);
                              result6[0].bol_us = prueba.decipher(result6[0].bol_us);
                              result6[0].eda_us = prueba.decipher(result6[0].eda_us);
                              result6[0].fot_us = prueba.decipher(result6[0].fot_us);
                              for(var i = 0; i<friends.length; i++){
                                friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                                friends[i].con_us = prueba.decipher(friends[i].con_us);
                                friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                                friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                                friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                                friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                              }
                              console.log(friends + "hahahahahahahahahahaha");
                              
                  res.render('User',{
                    data: result6[0],
                    amigos: friends,
                    error: req.session.error,
                    user: req.session.nombre,
                    pub: result1234
                  });
                  i = req.session.r.length;
                }
              }
              });
            }
          }
          else if(result44.length>0&&result6.length==0){
            console.log("Holaa");
            mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
            for(var i = 0;i<result44.length;i++){
              req.session.i = i;
              req.session.r = result44.length;
              mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
                if(result22[0]!=undefined){
                mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
                  mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result22[0].id_us,result22[0].ida_us,result22[0].id_us,result22[0].ida_us],(err444,result444)=>{
                    result22[0].chat = result444.length;
                  });
                  var blocked = false;
                  if(result56[0]!=undefined){
                    blocked = true;
                  }
                if(result22[0]!=undefined){
                  result22[0].blocked = blocked;
                  var lllllll = 0;
                  for(var i = 0; i<friends.length;i++){
                    if(friends[i].chat<result22[0].chat){
                      friends.splice(i,0,result22[0]);
                      lllllll++;
                    }
                  }
                  if(lllllll==0){
                    friends.push(result22[0]);
                  }
                }
                else{
                  req.session.r -= 1; 
                }
                if((friends.length==req.session.r)&&l==0){
                  l++;
                              result16[0].nom_us = prueba.decipher(result16[0].nom_us);
                              result16[0].con_us = prueba.decipher(result16[0].con_us);
                              result16[0].gru_us = prueba.decipher(result16[0].gru_us);
                              result16[0].bol_us = prueba.decipher(result16[0].bol_us);
                              result16[0].eda_us = prueba.decipher(result16[0].eda_us);
                              result16[0].fot_us = prueba.decipher(result16[0].fot_us);
                              for(var i = 0; i<friends.length; i++){
                                friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                                friends[i].con_us = prueba.decipher(friends[i].con_us);
                                friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                                friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                                friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                                friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                              }
                              console.log(friends + "hahahahahahahahahahahaha");
                              
                  res.render('User',{
                    data: result16[0],
                    amigos: friends,
                    error: req.session.error,
                    user: req.session.nombre,
                    pub: result1234
                  });
                  i = req.session.r.length;
                }
              });
            }else{
              req.session.r -= 1; 
              if((friends.length==req.session.r)&&l==0){
                l++;
                              result1[0].nom_us = prueba.decipher(result1[0].nom_us);
                              result1[0].con_us = prueba.decipher(result1[0].con_us);
                              result1[0].gru_us = prueba.decipher(result1[0].gru_us);
                              result1[0].bol_us = prueba.decipher(result1[0].bol_us);
                              result1[0].eda_us = prueba.decipher(result1[0].eda_us);
                              result1[0].fot_us = prueba.decipher(result1[0].fot_us);
                              for(var i = 0; i<friends.length; i++){
                                friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                                friends[i].con_us = prueba.decipher(friends[i].con_us);
                                friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                                friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                                friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                                friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                              }
                              console.log(friends + "hahahahahahahahahahahahaha");
                              
                res.render('User',{
                  data: result6[0],
                  amigos: friends,
                  error: req.session.error,
                  user: req.session.nombre,
                  pub: result1234
                });
                i = req.session.r.length;
              }
            }
              });
            }
          });
          }
          else if(result44.length>0&&result6.length>0){
            console.log("Holaaa");
            for(var i = 0;i<result6.length;i++){
              req.session.i = i;
              req.session.r = result6.length;
              mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result6[i].ida_us,result6[i].id_us],(err22,result22)=>{
                if(result22[0]!=undefined){
                mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
                  mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result22[0].id_us,result22[0].ida_us,result22[0].id_us,result22[0].ida_us],(err444,result444)=>{
                    result22[0].chat = result444.length;
                  });
                  var blocked = false;
                  if(result56[0]!=undefined){
                    blocked = true;
                  }
                if(result22[0]!=undefined){
                  result22[0].blocked = blocked;
                  var llllllll = 0;
                  for(var i = 0; i<friends.length;i++){
                    if(friends[i].chat<result22[0].chat){
                      friends.splice(i,0,result22[0]);
                      llllllll++;
                    }
                  }
                  if(llllllll==0){
                    friends.push(result22[0]);
                  }
                }
                else{
                  req.session.r -= 1; 
                }
                if((friends.length==req.session.r)&&l==0){
                  req.session.r += result44.length;
                  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
                    for(var i = 0;i<result44.length;i++){
                      req.session.i = i;
                      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
                        if(result22[0]!=undefined){
                        mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err57,result57)=>{
                          var block = false;
                          if(result57[0]!=undefined){
                            block = true;
                          }
                        if(result22[0]!=undefined&&friends.map(function(e) { return e.id_us; }).indexOf(result22[0].id_us)==-1){
                          result22[0].blocked = block;
                          friends.push(result22[0]);
                        }
                        else{
                          req.session.r -= 1; 
                        }
                        if((friends.length==req.session.r)&&m==0){
                          m++;
                              result16[0].nom_us = prueba.decipher(result16[0].nom_us);
                              result16[0].con_us = prueba.decipher(result16[0].con_us);
                              result16[0].gru_us = prueba.decipher(result16[0].gru_us);
                              result16[0].bol_us = prueba.decipher(result16[0].bol_us);
                              result16[0].eda_us = prueba.decipher(result16[0].eda_us);
                              result16[0].fot_us = prueba.decipher(result16[0].fot_us);
                              for(var i = 0; i<friends.length; i++){
                                friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                                friends[i].con_us = prueba.decipher(friends[i].con_us);
                                friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                                friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                                friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                                friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                              }
                              console.log(friends.length + ": Server");
                              
                          res.render('User',{
                            data: result16[0],
                            amigos: friends,
                            error: req.session.error,
                            user: req.session.nombre,
                            pub: result1234
                          });
                          i = req.session.r.length;
                        }
                      });
                    }else{
                      req.session.r -= 1;
                      if((friends.length==req.session.r)&&m==0){
                        m++;
                              result16[0].nom_us = prueba.decipher(result16[0].nom_us);
                              result16[0].con_us = prueba.decipher(result16[0].con_us);
                              result16[0].gru_us = prueba.decipher(result16[0].gru_us);
                              result16[0].bol_us = prueba.decipher(result16[0].bol_us);
                              result16[0].eda_us = prueba.decipher(result16[0].eda_us);
                              result16[0].fot_us = prueba.decipher(result16[0].fot_us);
                              for(var i = 0; i<friends.length; i++){
                                friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                                friends[i].con_us = prueba.decipher(friends[i].con_us);
                                friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                                friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                                friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                                friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                              }
                              console.log(friends + "hahahahahahahahahahahahahahaha");
                              
                        res.render('User',{
                          data: result16[0],
                          amigos: friends,
                          error: req.session.error,
                          user: req.session.nombre,
                          pub: result1234
                        });
                        i = req.session.r.length;
                      }
                    }
                    });
                    }
                  });
                  l++;
                  i = req.session.r.length;
                }
              });
              }else{
                req.session.r -= 1;
                if((friends.length==req.session.r)&&l==0){
                  req.session.r += result44.length;
                  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
                    for(var i = 0;i<result44.length;i++){
                      req.session.i = i;
                      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
                        mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err57,result57)=>{
                          mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result22[0].id_us,result22[0].ida_us,result22[0].id_us,result22[0].ida_us],(err444,result444)=>{
                            result22[0].chat = result444.length;
                          });
                          var blocked = false;
                          if(result57[0]!=undefined){
                            blocked = true;
                          }
                        if(result22[0]!=undefined){
                          result22[0].blocked = blocked;
                          var lllllllll = 0;
                          for(var i = 0; i<friends.length;i++){
                            if(friends[i].chat<result22[0].chat){
                              friends.splice(i,0,result22[0]);
                              lllllllll++;
                            }
                          }
                          if(lllllllll==0){
                            friends.push(result22[0]);
                          }
                        }
                        else{
                          req.session.r -= 1; 
                        }
                        if((friends.length==req.session.r)&&m==0){
                          m++;
                              result16[0].nom_us = prueba.decipher(result16[0].nom_us);
                              result16[0].con_us = prueba.decipher(result16[0].con_us);
                              result16[0].gru_us = prueba.decipher(result16[0].gru_us);
                              result16[0].bol_us = prueba.decipher(result16[0].bol_us);
                              result16[0].eda_us = prueba.decipher(result16[0].eda_us);
                              result16[0].fot_us = prueba.decipher(result16[0].fot_us);
                              for(var i = 0; i<friends.length; i++){
                                friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                                friends[i].con_us = prueba.decipher(friends[i].con_us);
                                friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                                friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                                friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                                friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                              }
                              console.log(friends + "hahahahahahahahahahahahahahahaha");
                              
                          res.render('User',{
                            data: result16[0],
                            amigos: friends,
                            error: req.session.error,
                            user: req.session.nombre,
                            pub: result1234
                          });
                          i = req.session.r.length;
                        }
                      });
                    });
                    }
                  });
                  l++;
                  i = req.session.r.length;
                }
              }
              });
            }
          }
          else{
        mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
          console.log(result12[0]);
          if(result12.length>0){
                              result12[0].nom_us = prueba.decipher(result12[0].nom_us);
                              result12[0].con_us = prueba.decipher(result12[0].con_us);
                              result12[0].gru_us = prueba.decipher(result12[0].gru_us);
                              result12[0].bol_us = prueba.decipher(result12[0].bol_us);
                              result12[0].eda_us = prueba.decipher(result12[0].eda_us);
                              result12[0].fot_us = prueba.decipher(result12[0].fot_us);
                              
            res.render('User',{
              data: result12[0],
              amigos: null,
              error: req.session.error,
              user: req.session.nombre,
              pub: result1234
            });
          }
          else{
            mysqlConnection.query('SELECT * FROM usuario WHERE use_us = ?', [req.session.nombre] , (err,result)=>{
              console.log("Hola");
                              result[0].nom_us = prueba.decipher(result[0].nom_us);
                              result[0].con_us = prueba.decipher(result[0].con_us);
                              result[0].gru_us = prueba.decipher(result[0].gru_us);
                              result[0].bol_us = prueba.decipher(result[0].bol_us);
                              result[0].eda_us = prueba.decipher(result[0].eda_us);
                              result[0].fot_us = prueba.decipher(result[0].fot_us);
                              
                              
              res.render('User',{
                data: result[0],
                amigos: null,
                error: req.session.error,
                user: req.session.nombre,
                pub: result1234
              });
            });
          }
          
        });
          }
        });
          });
          });
          }
          });
          }
        }
    }else{
      console.log(err);
    }
    
  });
  }
};
prueba.inte = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
    if(result12.length>0){
      console.log(result12[0].fot_us);
        result12[0].nom_us=prueba.decipher(result12[0].nom_us);
        result12[0].con_us=prueba.decipher(result12[0].con_us);
        result12[0].gru_us=prueba.decipher(result12[0].gru_us);
        result12[0].bol_us=prueba.decipher(result12[0].bol_us);
        result12[0].fot_us=prueba.decipher(result12[0].fot_us);
        result12[0].eda_us=prueba.decipher(result12[0].eda_us);
      res.render('User',{
        data: result12[0],
        amigos: null,
        error: req.session.error,
        user: req.session.nombre,
        pub: null
      });
    }
    else{
      mysqlConnection.query('SELECT * FROM usuario WHERE use_us = ?', [req.session.nombre] , (err,result)=>{
        result[0].nom_us=prueba.decipher(result[0].nom_us);
        result[0].con_us=prueba.decipher(result[0].con_us);
        result[0].gru_us=prueba.decipher(result[0].gru_us);
        result[0].bol_us=prueba.decipher(result[0].bol_us);
        result[0].fot_us=prueba.decipher(result[0].fot_us);
        result[0].eda_us=prueba.decipher(result[0].eda_us);
        res.render('User',{
          data: result[0],
          amigos: null,
          error: req.session.error,
          user: req.session.nombre,
          pub: null
        });
      });
    }
  });
  }else{
    res.redirect('/Inicio');
  }
}
prueba.fri = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
  var friends = [];
  var l = 0;
  var m = 0;
  console.log(req.session.nombre);
  mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err,result)=>{
    mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where use_us = ?',[req.session.nombre],(err6,result6)=>{
      mysqlConnection.query("select * from publicaciones natural join registro natural join usuario where use_us = ?",[req.session.nombre],(err1234,result1234)=>{
      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where ida_us = ?',[result[0].id_us],(err44,result44)=>{
      if(result6.length>0&&result44.length==0){
        console.log("Hola");
        for(var i = 0;i<result6.length;i++){
          req.session.i = i;
          req.session.r = result6.length;
          console.log(result6[i]);
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result6[i].ida_us,result6[i].id_us],(err22,result22)=>{
            if(result22[0]!=undefined){
            mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
              var blocked = false;
              if(result56[0]!=undefined){
                blocked = true;
              }
            if(result22[0]!=undefined){
              result22[0].blocked = blocked;
              friends.push(result22[0]);
            }
            else{
              req.session.r -= 1; 
            }
            if((friends.length==req.session.r)&&l==0){
              l++;
                          result6[0].nom_us = prueba.decipher(result6[0].nom_us);
                          result6[0].con_us = prueba.decipher(result6[0].con_us);
                          result6[0].gru_us = prueba.decipher(result6[0].gru_us);
                          result6[0].bol_us = prueba.decipher(result6[0].bol_us);
                          result6[0].eda_us = prueba.decipher(result6[0].eda_us);
                          result6[0].fot_us = prueba.decipher(result6[0].fot_us);
                          for(var i = 0; i<friends.length; i++){
                            friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                            friends[i].con_us = prueba.decipher(friends[i].con_us);
                            friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                            friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                            friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                            friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                          }
              res.render('User',{
                data: result6[0],
                amigos: friends,
                error: req.session.error,
                user: req.session.nombre,
                pub: result1234
              });
              i = req.session.r.length;
            }
          });
          }else{
            req.session.r -= 1; 
            if((friends.length==req.session.r)&&l==0){
              l++;
                          result6[0].nom_us = prueba.decipher(result6[0].nom_us);
                          result6[0].con_us = prueba.decipher(result6[0].con_us);
                          result6[0].gru_us = prueba.decipher(result6[0].gru_us);
                          result6[0].bol_us = prueba.decipher(result6[0].bol_us);
                          result6[0].eda_us = prueba.decipher(result6[0].eda_us);
                          result6[0].fot_us = prueba.decipher(result6[0].fot_us);
                          for(var i = 0; i<friends.length; i++){
                            friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                            friends[i].con_us = prueba.decipher(friends[i].con_us);
                            friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                            friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                            friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                            friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                          }
              res.render('User',{
                data: result6[0],
                amigos: friends,
                error: req.session.error,
                user: req.session.nombre,
                pub: result1234
              });
              i = req.session.r.length;
            }
          }
          });
        }
      }
      else if(result44.length>0&&result6.length==0){
        console.log("Holaa");
        mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
        for(var i = 0;i<result44.length;i++){
          req.session.i = i;
          req.session.r = result44.length;
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
            if(result22[0]!=undefined){
            mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
              var blocked = false;
              if(result56[0]!=undefined){
                blocked = true;
              }
            if(result22[0]!=undefined){
              result22[0].blocked = blocked;
              friends.push(result22[0]);
            }
            else{
              req.session.r -= 1; 
            }
            if((friends.length==req.session.r)&&l==0){
              l++;
                          result16[0].nom_us = prueba.decipher(result16[0].nom_us);
                          result16[0].con_us = prueba.decipher(result16[0].con_us);
                          result16[0].gru_us = prueba.decipher(result16[0].gru_us);
                          result16[0].bol_us = prueba.decipher(result16[0].bol_us);
                          result16[0].eda_us = prueba.decipher(result16[0].eda_us);
                          result16[0].fot_us = prueba.decipher(result16[0].fot_us);
                          for(var i = 0; i<friends.length; i++){
                            friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                            friends[i].con_us = prueba.decipher(friends[i].con_us);
                            friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                            friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                            friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                            friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                          }
              res.render('User',{
                data: result16[0],
                amigos: friends,
                error: req.session.error,
                user: req.session.nombre,
                pub: result1234
              });
              i = req.session.r.length;
            }
          });
        }else{
          req.session.r -= 1; 
          if((friends.length==req.session.r)&&l==0){
            l++;
                          result1[0].nom_us = prueba.decipher(result1[0].nom_us);
                          result1[0].con_us = prueba.decipher(result1[0].con_us);
                          result1[0].gru_us = prueba.decipher(result1[0].gru_us);
                          result1[0].bol_us = prueba.decipher(result1[0].bol_us);
                          result1[0].eda_us = prueba.decipher(result1[0].eda_us);
                          result1[0].fot_us = prueba.decipher(result1[0].fot_us);
                          for(var i = 0; i<friends.length; i++){
                            friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                            friends[i].con_us = prueba.decipher(friends[i].con_us);
                            friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                            friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                            friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                            friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                          }
            res.render('User',{
              data: result6[0],
              amigos: friends,
              error: req.session.error,
              user: req.session.nombre,
              pub: result1234
            });
            i = req.session.r.length;
          }
        }
          });
        }
      });
      }
      else if(result44.length>0&&result6.length>0){
        console.log("Holaaa");
        for(var i = 0;i<result6.length;i++){
          req.session.i = i;
          req.session.r = result6.length;
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result6[i].ida_us,result6[i].id_us],(err22,result22)=>{
            if(result22[0]!=undefined){
            mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
              var blocked = false;
              if(result56[0]!=undefined){
                blocked = true;
              }
            if(result22[0]!=undefined&&friends.map(function(e) { return e.id_us; }).indexOf(result22[0].id_us)==-1){
              result22[0].blocked = blocked;
              friends.push(result22[0]);
            }
            else{
              req.session.r -= 1; 
            }
            if((friends.length==req.session.r)&&l==0){
              req.session.r += result44.length;
              mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
                for(var i = 0;i<result44.length;i++){
                  req.session.i = i;
                  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
                    if(result22[0]!=undefined){
                    mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err57,result57)=>{
                      var block = false;
                      if(result57[0]!=undefined){
                        block = true;
                      }
                    if(result22[0]!=undefined&&friends.map(function(e) { return e.id_us; }).indexOf(result22[0].id_us)==-1){
                      result22[0].blocked = block;
                      friends.push(result22[0]);
                    }
                    else{
                      req.session.r -= 1; 
                    }
                    if((friends.length==req.session.r)&&m==0){
                      m++;
                          result16[0].nom_us = prueba.decipher(result16[0].nom_us);
                          result16[0].con_us = prueba.decipher(result16[0].con_us);
                          result16[0].gru_us = prueba.decipher(result16[0].gru_us);
                          result16[0].bol_us = prueba.decipher(result16[0].bol_us);
                          result16[0].eda_us = prueba.decipher(result16[0].eda_us);
                          result16[0].fot_us = prueba.decipher(result16[0].fot_us);
                          for(var i = 0; i<friends.length; i++){
                            friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                            friends[i].con_us = prueba.decipher(friends[i].con_us);
                            friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                            friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                            friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                            friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                          }
                      res.render('User',{
                        data: result16[0],
                        amigos: friends,
                        error: req.session.error,
                        user: req.session.nombre,
                        pub: result1234
                      });
                      i = req.session.r.length;
                    }
                  });
                }else{
                  req.session.r -= 1;
                  if((friends.length==req.session.r)&&m==0){
                    m++;
                          result16[0].nom_us = prueba.decipher(result16[0].nom_us);
                          result16[0].con_us = prueba.decipher(result16[0].con_us);
                          result16[0].gru_us = prueba.decipher(result16[0].gru_us);
                          result16[0].bol_us = prueba.decipher(result16[0].bol_us);
                          result16[0].eda_us = prueba.decipher(result16[0].eda_us);
                          result16[0].fot_us = prueba.decipher(result16[0].fot_us);
                          for(var i = 0; i<friends.length; i++){
                            friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                            friends[i].con_us = prueba.decipher(friends[i].con_us);
                            friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                            friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                            friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                            friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                          }
                    res.render('User',{
                      data: result16[0],
                      amigos: friends,
                      error: req.session.error,
                      user: req.session.nombre,
                      pub: result1234
                    });
                    i = req.session.r.length;
                  }
                }
                });
                }
              });
              l++;
              i = req.session.r.length;
            }
          });
          }else{
            req.session.r -= 1;
            if((friends.length==req.session.r)&&l==0){
              req.session.r += result44.length;
              mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
                for(var i = 0;i<result44.length;i++){
                  req.session.i = i;
                  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
                    mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err57,result57)=>{
                      var block = false;
                      if(result57[0]!=undefined){
                        block = true;
                      }
                    if(result22[0]!=undefined&&friends.map(function(e) { return e.id_us; }).indexOf(result22[0].id_us)==-1){
                      result22[0].blocked = block;
                      friends.push(result22[0]);
                    }
                    else{
                      req.session.r -= 1; 
                    }
                    if((friends.length==req.session.r)&&m==0){
                      m++;
                          result16[0].nom_us = prueba.decipher(result16[0].nom_us);
                          result16[0].con_us = prueba.decipher(result16[0].con_us);
                          result16[0].gru_us = prueba.decipher(result16[0].gru_us);
                          result16[0].bol_us = prueba.decipher(result16[0].bol_us);
                          result16[0].eda_us = prueba.decipher(result16[0].eda_us);
                          result16[0].fot_us = prueba.decipher(result16[0].fot_us);
                          for(var i = 0; i<friends.length; i++){
                            friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                            friends[i].con_us = prueba.decipher(friends[i].con_us);
                            friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                            friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                            friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                            friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                          }
                      res.render('User',{
                        data: result16[0],
                        amigos: friends,
                        error: req.session.error,
                        user: req.session.nombre,
                        pub: result1234
                      });
                      i = req.session.r.length;
                    }
                  });
                });
                }
              });
              l++;
              i = req.session.r.length;
            }
          }
          });
        }
      }
      else{
    mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
      console.log(result12[0]);
      if(result12.length>0){
                          result12[0].nom_us = prueba.decipher(result12[0].nom_us);
                          result12[0].con_us = prueba.decipher(result12[0].con_us);
                          result12[0].gru_us = prueba.decipher(result12[0].gru_us);
                          result12[0].bol_us = prueba.decipher(result12[0].bol_us);
                          result12[0].eda_us = prueba.decipher(result12[0].eda_us);
                          result12[0].fot_us = prueba.decipher(result12[0].fot_us);
        res.render('User',{
          data: result12[0],
          amigos: null,
          error: req.session.error,
          user: req.session.nombre,
          pub: result1234
        });
      }
      else{
        mysqlConnection.query('SELECT * FROM usuario WHERE use_us = ?', [req.session.nombre] , (err,result)=>{
          console.log("Hola");
                          result[0].nom_us = prueba.decipher(result[0].nom_us);
                          result[0].con_us = prueba.decipher(result[0].con_us);
                          result[0].gru_us = prueba.decipher(result[0].gru_us);
                          result[0].bol_us = prueba.decipher(result[0].bol_us);
                          result[0].eda_us = prueba.decipher(result[0].eda_us);
                          result[0].fot_us = prueba.decipher(result[0].fot_us);
          res.render('User',{
            data: result[0],
            amigos: null,
            error: req.session.error,
            user: req.session.nombre,
            pub: result1234
          });
        });
      }
      
    });
      }
    });
      });
    });
  });

}else{
  res.redirect('/Inicio');
}
}
prueba.allfri = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
  var friends = [];
  var l = 0;
  var m = 0;
  console.log(req.session.nombre);
  mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err,result)=>{
    mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where use_us = ?',[req.session.nombre],(err6,result6)=>{
      mysqlConnection.query("select * from publicaciones natural join registro natural join usuario where use_us = ?",[req.session.nombre],(err1234,result1234)=>{
      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where ida_us = ?',[result[0].id_us],(err44,result44)=>{
      if(result6.length>0&&result44.length==0){
        console.log("Hola");
        for(var i = 0;i<result6.length;i++){
          req.session.i = i;
          req.session.r = result6.length;
          console.log(result6[i]);
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result6[i].ida_us,result6[i].id_us],(err22,result22)=>{
            if(result22[0]!=undefined){
            mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
              var blocked = false;
              if(result56[0]!=undefined){
                blocked = true;
              }
            if(result22[0]!=undefined){
              result22[0].blocked = blocked;
              friends.push(result22[0]);
            }
            else{
              req.session.r -= 1; 
            }
            if((friends.length==req.session.r)&&l==0){
              l++;
                          result6[0].nom_us = prueba.decipher(result6[0].nom_us);
                          result6[0].con_us = prueba.decipher(result6[0].con_us);
                          result6[0].gru_us = prueba.decipher(result6[0].gru_us);
                          result6[0].bol_us = prueba.decipher(result6[0].bol_us);
                          result6[0].eda_us = prueba.decipher(result6[0].eda_us);
                          result6[0].fot_us = prueba.decipher(result6[0].fot_us);
                          for(var i = 0; i<friends.length; i++){
                            friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                            friends[i].con_us = prueba.decipher(friends[i].con_us);
                            friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                            friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                            friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                            friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                          }
              res.render('AllFriends',{
                data: result6[0],
                amigos: friends,
                error: req.session.error,
                user: req.session.nombre,
                pub: result1234
              });
              i = req.session.r.length;
            }
          });
          }else{
            req.session.r -= 1; 
            if((friends.length==req.session.r)&&l==0){
              l++;
                          result6[0].nom_us = prueba.decipher(result6[0].nom_us);
                          result6[0].con_us = prueba.decipher(result6[0].con_us);
                          result6[0].gru_us = prueba.decipher(result6[0].gru_us);
                          result6[0].bol_us = prueba.decipher(result6[0].bol_us);
                          result6[0].eda_us = prueba.decipher(result6[0].eda_us);
                          result6[0].fot_us = prueba.decipher(result6[0].fot_us);
                          for(var i = 0; i<friends.length; i++){
                            friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                            friends[i].con_us = prueba.decipher(friends[i].con_us);
                            friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                            friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                            friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                            friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                          }
              res.render('AllFriends',{
                data: result6[0],
                amigos: friends,
                error: req.session.error,
                user: req.session.nombre,
                pub: result1234
              });
              i = req.session.r.length;
            }
          }
          });
        }
      }
      else if(result44.length>0&&result6.length==0){
        console.log("Holaa");
        mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
        for(var i = 0;i<result44.length;i++){
          req.session.i = i;
          req.session.r = result44.length;
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
            if(result22[0]!=undefined){
            mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
              var blocked = false;
              if(result56[0]!=undefined){
                blocked = true;
              }
            if(result22[0]!=undefined){
              result22[0].blocked = blocked;
              friends.push(result22[0]);
            }
            else{
              req.session.r -= 1; 
            }
            if((friends.length==req.session.r)&&l==0){
              l++;
                          result16[0].nom_us = prueba.decipher(result16[0].nom_us);
                          result16[0].con_us = prueba.decipher(result16[0].con_us);
                          result16[0].gru_us = prueba.decipher(result16[0].gru_us);
                          result16[0].bol_us = prueba.decipher(result16[0].bol_us);
                          result16[0].eda_us = prueba.decipher(result16[0].eda_us);
                          result16[0].fot_us = prueba.decipher(result16[0].fot_us);
                          for(var i = 0; i<friends.length; i++){
                            friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                            friends[i].con_us = prueba.decipher(friends[i].con_us);
                            friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                            friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                            friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                            friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                          }
              res.render('AllFriends',{
                data: result16[0],
                amigos: friends,
                error: req.session.error,
                user: req.session.nombre,
                pub: result1234
              });
              i = req.session.r.length;
            }
          });
        }else{
          req.session.r -= 1; 
          if((friends.length==req.session.r)&&l==0){
            l++;
                          result1[0].nom_us = prueba.decipher(result1[0].nom_us);
                          result1[0].con_us = prueba.decipher(result1[0].con_us);
                          result1[0].gru_us = prueba.decipher(result1[0].gru_us);
                          result1[0].bol_us = prueba.decipher(result1[0].bol_us);
                          result1[0].eda_us = prueba.decipher(result1[0].eda_us);
                          result1[0].fot_us = prueba.decipher(result1[0].fot_us);
                          for(var i = 0; i<friends.length; i++){
                            friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                            friends[i].con_us = prueba.decipher(friends[i].con_us);
                            friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                            friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                            friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                            friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                          }
            res.render('AllFriends',{
              data: result6[0],
              amigos: friends,
              error: req.session.error,
              user: req.session.nombre,
              pub: result1234
            });
            i = req.session.r.length;
          }
        }
          });
        }
      });
      }
      else if(result44.length>0&&result6.length>0){
        console.log("Holaaa");
        for(var i = 0;i<result6.length;i++){
          req.session.i = i;
          req.session.r = result6.length;
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result6[i].ida_us,result6[i].id_us],(err22,result22)=>{
            if(result22[0]!=undefined){
            mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
              var blocked = false;
              if(result56[0]!=undefined){
                blocked = true;
              }
            if(result22[0]!=undefined&&friends.map(function(e) { return e.id_us; }).indexOf(result22[0].id_us)==-1){
              result22[0].blocked = blocked;
              friends.push(result22[0]);
            }
            else{
              req.session.r -= 1; 
            }
            if((friends.length==req.session.r)&&l==0){
              req.session.r += result44.length;
              mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
                for(var i = 0;i<result44.length;i++){
                  req.session.i = i;
                  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
                    if(result22[0]!=undefined){
                    mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err57,result57)=>{
                      var block = false;
                      if(result57[0]!=undefined){
                        block = true;
                      }
                    if(result22[0]!=undefined&&friends.map(function(e) { return e.id_us; }).indexOf(result22[0].id_us)==-1){
                      result22[0].blocked = block;
                      friends.push(result22[0]);
                    }
                    else{
                      req.session.r -= 1; 
                    }
                    if((friends.length==req.session.r)&&m==0){
                      m++;
                          result16[0].nom_us = prueba.decipher(result16[0].nom_us);
                          result16[0].con_us = prueba.decipher(result16[0].con_us);
                          result16[0].gru_us = prueba.decipher(result16[0].gru_us);
                          result16[0].bol_us = prueba.decipher(result16[0].bol_us);
                          result16[0].eda_us = prueba.decipher(result16[0].eda_us);
                          result16[0].fot_us = prueba.decipher(result16[0].fot_us);
                          for(var i = 0; i<friends.length; i++){
                            friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                            friends[i].con_us = prueba.decipher(friends[i].con_us);
                            friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                            friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                            friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                            friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                          }
                      res.render('AllFriends',{
                        data: result16[0],
                        amigos: friends,
                        error: req.session.error,
                        user: req.session.nombre,
                        pub: result1234
                      });
                      i = req.session.r.length;
                    }
                  });
                }else{
                  req.session.r -= 1;
                  if((friends.length==req.session.r)&&m==0){
                    m++;
                          result16[0].nom_us = prueba.decipher(result16[0].nom_us);
                          result16[0].con_us = prueba.decipher(result16[0].con_us);
                          result16[0].gru_us = prueba.decipher(result16[0].gru_us);
                          result16[0].bol_us = prueba.decipher(result16[0].bol_us);
                          result16[0].eda_us = prueba.decipher(result16[0].eda_us);
                          result16[0].fot_us = prueba.decipher(result16[0].fot_us);
                          for(var i = 0; i<friends.length; i++){
                            friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                            friends[i].con_us = prueba.decipher(friends[i].con_us);
                            friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                            friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                            friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                            friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                          }
                    res.render('AllFriends',{
                      data: result16[0],
                      amigos: friends,
                      error: req.session.error,
                      user: req.session.nombre,
                      pub: result1234
                    });
                    i = req.session.r.length;
                  }
                }
                });
                }
              });
              l++;
              i = req.session.r.length;
            }
          });
          }else{
            req.session.r -= 1;
            if((friends.length==req.session.r)&&l==0){
              req.session.r += result44.length;
              mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
                for(var i = 0;i<result44.length;i++){
                  req.session.i = i;
                  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
                    mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err57,result57)=>{
                      var block = false;
                      if(result57[0]!=undefined){
                        block = true;
                      }
                    if(result22[0]!=undefined&&friends.map(function(e) { return e.id_us; }).indexOf(result22[0].id_us)==-1){
                      result22[0].blocked = block;
                      friends.push(result22[0]);
                    }
                    else{
                      req.session.r -= 1; 
                    }
                    if((friends.length==req.session.r)&&m==0){
                      m++;
                          result16[0].nom_us = prueba.decipher(result16[0].nom_us);
                          result16[0].con_us = prueba.decipher(result16[0].con_us);
                          result16[0].gru_us = prueba.decipher(result16[0].gru_us);
                          result16[0].bol_us = prueba.decipher(result16[0].bol_us);
                          result16[0].eda_us = prueba.decipher(result16[0].eda_us);
                          result16[0].fot_us = prueba.decipher(result16[0].fot_us);
                          for(var i = 0; i<friends.length; i++){
                            friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                            friends[i].con_us = prueba.decipher(friends[i].con_us);
                            friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                            friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                            friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                            friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                          }
                      res.render('AllFriends',{
                        data: result16[0],
                        amigos: friends,
                        error: req.session.error,
                        user: req.session.nombre,
                        pub: result1234
                      });
                      i = req.session.r.length;
                    }
                  });
                });
                }
              });
              l++;
              i = req.session.r.length;
            }
          }
          });
        }
      }
      else{
    mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
      console.log(result12[0]);
      if(result12.length>0){
                          result12[0].nom_us = prueba.decipher(result12[0].nom_us);
                          result12[0].con_us = prueba.decipher(result12[0].con_us);
                          result12[0].gru_us = prueba.decipher(result12[0].gru_us);
                          result12[0].bol_us = prueba.decipher(result12[0].bol_us);
                          result12[0].eda_us = prueba.decipher(result12[0].eda_us);
                          result12[0].fot_us = prueba.decipher(result12[0].fot_us);
        res.render('AllFriends',{
          data: result12[0],
          amigos: null,
          error: req.session.error,
          user: req.session.nombre
        });
      }
      else{
        mysqlConnection.query('SELECT * FROM usuario WHERE use_us = ?', [req.session.nombre] , (err,result)=>{
          console.log("Hola");
                          result[0].nom_us = prueba.decipher(result[0].nom_us);
                          result[0].con_us = prueba.decipher(result[0].con_us);
                          result[0].gru_us = prueba.decipher(result[0].gru_us);
                          result[0].bol_us = prueba.decipher(result[0].bol_us);
                          result[0].eda_us = prueba.decipher(result[0].eda_us);
                          result[0].fot_us = prueba.decipher(result[0].fot_us);
          res.render('AllFriends',{
            data: result[0],
            amigos: null,
            error: req.session.error,
            user: req.session.nombre,
            pub: result1234
          });
        });
      }
      
    });
      }
    });
      });
    });
  });
  }else{
    res.redirect('/Inicio');
  }
}
prueba.accept = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
  var friends = [];
  var l = 0;
  const { id } = req.params;
  mysqlConnection.query('select*from usuario where use_us = ?',[req.session.nombre],(err,result47)=>{
    mysqlConnection.query('update amigo set isf_am = true, rec_am= false where id_us = ? and ida_us = ?',[id,result47[0].id_us],(err,result34)=>{
    });
    mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err,result)=>{
      mysqlConnection.query('INSERT INTO amigo(id_us,ida_us,isf_am,ref_am,rec_am,trf_am) values(?,?,true,false,false,false)',[result[0].id_us,id],(err1)=>{
        if(err1){
          console.log(err1);
        }
        res.redirect('/Amigo');
      });
    });
  });
}else{
  res.redirect('/Inicio');
}
}
prueba.denied = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
  var friends = [];
  var l = 0;
  const { id } = req.params;
  mysqlConnection.query('select*from usuario where use_us = ?',[req.session.nombre],(err,result47)=>{
    mysqlConnection.query('update amigo set isf_am = false, rec_am= true where id_us = ? and ida_us = ?',[id,result47[0].id_us],(err,result34)=>{
    });
    mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err,result)=>{
      mysqlConnection.query('INSERT INTO amigo(id_us,ida_us,isf_am,ref_am,rec_am,trf_am) values(?,?,false,false,true,false)',[result[0].id_us,id],(err1)=>{
        if(err1){
          console.log(err1);
        }
        res.redirect('/Amigo');
      });
    });
  });
}else{
  res.redirect('/Inicio');
}
}
prueba.truefri = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
  var friends = [];
  var l = 0;
  const { id } = req.params;
  mysqlConnection.query('select*from usuario where use_us = ?',[req.session.nombre],(err,result47)=>{
    mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err,result)=>{
      mysqlConnection.query('update amigo set isf_am = true, rec_am= false, ref_am = false, trf_am = true where id_us = ? and ida_us = ?',[result[0].id_us,id],(err1)=>{
        if(err1){
          console.log(err1);
        }
        res.redirect('/Amigo');
      });
    });
  });
}else{
  res.redirect('/Inicio');
}
}
prueba.truefriA = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
  var friends = [];
  var l = 0;
  const { id } = req.params;
  mysqlConnection.query('select*from usuario where use_us = ?',[req.session.nombre],(err,result47)=>{
    mysqlConnection.query('update amigo set isf_am = true, rec_am= false, ref_am = true, trf_am = true where id_us = ? and ida_us = ?',[id,result47[0].id_us],(err,result34)=>{
    });
    mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err,result)=>{
      mysqlConnection.query('update amigo set isf_am = true, rec_am= false, ref_am = true, trf_am = true where id_us = ? and ida_us = ?',[result[0].id_us,id],(err1)=>{
        if(err1){
          console.log(err1);
        }
        res.redirect('/Amigo');
      });
    });
  });
}else{
  res.redirect('/Inicio');
}
}
prueba.truefriD = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
  var friends = [];
  var l = 0;
  const { id } = req.params;
  mysqlConnection.query('select*from usuario where use_us = ?',[req.session.nombre],(err,result47)=>{
    mysqlConnection.query('update amigo set isf_am = true, rec_am= false, ref_am = false, trf_am = false where id_us = ? and ida_us = ?',[id,result47[0].id_us],(err,result34)=>{
    });
    mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err,result)=>{
      mysqlConnection.query('update amigo set isf_am = true, rec_am= false, ref_am = false, trf_am = false where id_us = ? and ida_us = ?',[result[0].id_us,id],(err1)=>{
        if(err1){
          console.log(err1);
        }
        res.redirect('/Amigo');
      });
    });
  });
}else{
  res.redirect('/Inicio');
}
}
prueba.Match = (req,res)=>{
  let percentage;
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
    console.log("Hola");
    if(req.body.crit=="Clásico (Recomendado para principiantes)*"){
      if(req.body.crite != undefined&&req.body.crite != ""){
        if(req.body.crite == "75%"){
          percentage = 38;
        }
        else if(req.body.crite== "50%"){
          percentage = 25;
        }
        else if(req.body.crite == "25%"){
          percentage = 13;
        }
        else if(req.body.crite == "10%"){
          percentage = 5;
        }
        else if(req.body.crite == "0%"){
          percentage = 0;
        }
      }
  var posmatch = [];
  var z = 0;
  var ñ = 0;
  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
    if(result12.length>0){
      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos', (err, result)=>{
        req.session.r = result.length;
        for(var i=0; i<result.length;i++){
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join escuela where id_us = ?',[result[i].id_us],(err1, result1)=>{
            if(result1.length>0){
              if(result1[0].use_us!=result12[0].use_us){
                mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join escuela where id_us = ?',[result12[0].id_us],(err13, result13)=>{
                  console.log(result13);
                  mysqlConnection.query('select * from usuario natural join amigo where id_us = ? and ida_us = ? or id_us = ? and ida_us = ?',[result12[0].id_us,result1[0].id_us,result1[0].id_us,result12[0].id_us],(err33,result33)=>{
                    var coin = 0;
                    ñ++;
                if(result1[0].nom_pel==result13[0].nom_pel){
                  console.log("Pelicula");
                  coin+=5;
                }
                if(result1[0].nom_dep==result13[0].nom_dep){
                  console.log("Deporte");
                  coin+=5;
                }
                if(result1[0].nom_lec==result13[0].nom_lec){
                  console.log("Lectura");
                  coin+=5;
                }
                if(result1[0].nom_vid==result13[0].nom_vid){
                  console.log("VideoGames");
                  coin+=5;
                }
                if(result1[0].nom_mus==result13[0].nom_mus){
                  console.log("Music");
                  coin+=5;
                }
                if((result1[0].nom_gen=="Mujer"&&result13[0].nom_gen=="Hombre")||(result1[0].nom_gen=="Hombre"&&result13[0].nom_gen=="Mujer")){
                  console.log("GenHM");
                  coin+=5;
                }
                else if(result1[0].nom_gen==result13[0].nom_gen){
                  console.log("GenN");
                  coin++;
                }
                if(result1[0].nom_tur==result13[0].nom_tur){
                  console.log("Turno");
                  coin++;
                }
                if(result1[0].nom_car==result13[0].nom_car){
                  console.log("Carrera");
                  coin++;
                }
                if(result1[0].nom_es==result13[0].nom_es){
                  console.log("Escuela");
                  coin+=13;
                }
                if(result1[0].gru_us==result13[0].gru_us){
                  console.log("Grupo");
                  coin+=3;
                }
                var año = result1[0].eda_us.split('/');
                var años = result13[0].eda_us.split('/');
                if(año[2] == años[2]){
                  console.log("Edad");
                  coin+=2;
                }
                else if(año[2] == años[2]-1||año[2]-1 == años[2]){
                  console.log("Edad");
                  coin+=1;
                }
                if(año[2]>años[2]){
                  if(año[2]-años[2]>3){
                    coin-=5;
                  }
                }else if(año[2]<años[2]){
                  if(años[2]-año[2]>3){
                    coin-=5;
                  }
                }
                console.log(coin);
                if(coin>=percentage&&result33[0]==undefined){
                    coin = ((coin*100)/50);
                    console.log("%"+coin + " " + result1[0].use_us);
                    result1[0].nom_us=prueba.decipher(result1[0].nom_us);
                    result1[0].gru_us=prueba.decipher(result1[0].gru_us);
                    result1[0].con_us=prueba.decipher(result1[0].con_us);
                    result1[0].bol_us=prueba.decipher(result1[0].bol_us);
                    result1[0].fot_us=prueba.decipher(result1[0].fot_us);
                    result1[0].eda_us=prueba.decipher(result1[0].eda_us);
                    var mat = {
                    user: result1,
                    coincidence: coin
                    }
                  var l = 0;
                  if(posmatch.length>0){
                    for(var j=0; j<posmatch.length;j++){
                      if(posmatch[j].coincidence<coin){
                        posmatch.splice(j,0,mat);
                        l++;
                        j=posmatch.length;
                      }
                    }
                    if(l==0){
                      posmatch.push(mat);
                    }
                  }
                  else{
                    posmatch.push(mat);
                  }
                }
                console.log(req.session.r + " " + posmatch.length);
                if((ñ == req.session.r-1)&&z==0){
                  z++;
                  res.render('Match',{
                    data: posmatch,
                    user: result12[0]
                  });
                }
              });
              });
              }
            }
          });
        }
      });
    }
    else{
      res.redirect('/Amigo');
    }
    
  });
  }else if(req.body.crit=="Por Escuela/Carrera"){
    console.log(req.body.crite);
    var posmatch = [];
    var z = 0;
    var ñ = 0;
    mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
      if(result12.length>0){
        mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos', (err, result)=>{
          req.session.r = result.length;
          for(var i=0; i<result.length;i++){
            mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join escuela where id_us = ?',[result[i].id_us],(err1, result1)=>{
              if(result1.length>0){
                if(result1[0].use_us!=result12[0].use_us){
                  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join escuela where id_us = ?',[result12[0].id_us],(err13, result13)=>{
                    mysqlConnection.query('select * from usuario natural join amigo where id_us = ? and ida_us = ? or id_us = ? and ida_us = ?',[result12[0].id_us,result1[0].id_us,result1[0].id_us,result12[0].id_us],(err33,result33)=>{
                      var coin = 0;
                      ñ++;
                      console.log(result1[0].nom_es + " " + req.body.crite);
                  if(result1[0].nom_pel==result13[0].nom_pel){
                    console.log("Pelicula");
                    coin+=5;
                  }
                  if(result1[0].nom_dep==result13[0].nom_dep){
                    console.log("Deporte");
                    coin+=5;
                  }
                  if(result1[0].nom_lec==result13[0].nom_lec){
                    console.log("Lectura");
                    coin+=5;
                  }
                  if(result1[0].nom_vid==result13[0].nom_vid){
                    console.log("VideoGames");
                    coin+=5;
                  }
                  if(result1[0].nom_mus==result13[0].nom_mus){
                    console.log("Music");
                    coin+=5;
                  }
                  if((result1[0].nom_gen=="Mujer"&&result13[0].nom_gen=="Hombre")||(result1[0].nom_gen=="Hombre"&&result13[0].nom_gen=="Mujer")){
                    console.log("GenHM");
                    coin+=5;
                  }
                  else if(result1[0].nom_gen==result13[0].nom_gen){
                    console.log("GenN");
                    coin++;
                  }
                  if(result1[0].nom_tur==result13[0].nom_tur){
                    console.log("Turno");
                    coin++;
                  }
                  if(result1[0].nom_car==result13[0].nom_car){
                    console.log("Carrera");
                    coin++;
                  }
                  if(result1[0].gru_us==result13[0].gru_us){
                    console.log("Grupo");
                    coin+=3;
                  }
                  if(result1[0].nom_es==req.body.crite){
                    console.log("Escuela");
                    coin+=50;
                  }
                  if(result1[0].nom_car==req.body.criter){
                    console.log("Carrera");
                    coin+=50;
                  }
                  var año = result1[0].eda_us.split('/');
                  var años = result13[0].eda_us.split('/');
                  if(año[2] == años[2]){
                    console.log("Edad");
                    coin+=2;
                  }
                  else if(año[2] == años[2]-1||año[2]-1 == años[2]){
                    console.log("Edad");
                    coin+=1;
                  }
                  if(año[2]>años[2]){
                    if(año[2]-años[2]>3){
                      coin-=5;
                    }
                  }else if(año[2]<años[2]){
                    if(años[2]-año[2]>3){
                      coin-=5;
                    }
                  }
                  console.log(coin);
                  if(coin>=100&&result33[0]==undefined){
                      coin = ((coin*100)/137);
                      console.log("%"+coin + " " + result1[0].use_us);
                      result1[0].nom_us=prueba.decipher(result1[0].nom_us);
                      result1[0].gru_us=prueba.decipher(result1[0].gru_us);
                      result1[0].con_us=prueba.decipher(result1[0].con_us);
                      result1[0].bol_us=prueba.decipher(result1[0].bol_us);
                      result1[0].fot_us=prueba.decipher(result1[0].fot_us);
                      result1[0].eda_us=prueba.decipher(result1[0].eda_us);
                      var mat = {
                      user: result1,
                      coincidence: coin
                      }
                    var l = 0;
                    if(posmatch.length>0){
                      for(var j=0; j<posmatch.length;j++){
                        if(posmatch[j].coincidence<coin){
                          posmatch.splice(j,0,mat);
                          l++;
                          j=posmatch.length;
                        }
                      }
                      if(l==0){
                        posmatch.push(mat);
                      }
                    }
                    else{
                      posmatch.push(mat);
                    }
                  }
                  console.log(req.session.r + " " + posmatch.length);
                  if((ñ == req.session.r-1)&&z==0){
                    z++;
                    res.render('Match',{
                      data: posmatch
                    });
                  }
                });
                });
                }
              }
            });
          }
        });
      }
      else{
        res.redirect('/Amigo');
      }
      
    });   
  }else if(req.body.crit=="Por Gustos Musicales"){
    var posmatch = [];
  var z = 0;
  var ñ = 0;
  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
    if(result12.length>0){
      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos', (err, result)=>{
        req.session.r = result.length;
        for(var i=0; i<result.length;i++){
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join escuela where id_us = ?',[result[i].id_us],(err1, result1)=>{
            if(result1.length>0){
              if(result1[0].use_us!=result12[0].use_us){
                mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join escuela where id_us = ?',[result12[0].id_us],(err13, result13)=>{
                  console.log(result13);
                  mysqlConnection.query('select * from usuario natural join amigo where id_us = ? and ida_us = ? or id_us = ? and ida_us = ?',[result12[0].id_us,result1[0].id_us,result1[0].id_us,result12[0].id_us],(err33,result33)=>{
                    var coin = 0;
                    ñ++;
                if(result1[0].nom_pel==result13[0].nom_pel){
                  console.log("Pelicula");
                  coin+=5;
                }
                if(result1[0].nom_dep==result13[0].nom_dep){
                  console.log("Deporte");
                  coin+=5;
                }
                if(result1[0].nom_lec==result13[0].nom_lec){
                  console.log("Lectura");
                  coin+=5;
                }
                if(result1[0].nom_vid==result13[0].nom_vid){
                  console.log("VideoGames");
                  coin+=5;
                }
                if(result1[0].nom_mus==result13[0].nom_mus){
                  console.log("Music");
                  coin+=5;
                }
                if(result1[0].nom_mus==req.body.crite){
                  console.log("Music");
                  coin+=100;
                }
                if((result1[0].nom_gen=="Mujer"&&result13[0].nom_gen=="Hombre")||(result1[0].nom_gen=="Hombre"&&result13[0].nom_gen=="Mujer")){
                  console.log("GenHM");
                  coin+=5;
                }
                else if(result1[0].nom_gen==result13[0].nom_gen){
                  console.log("GenN");
                  coin++;
                }
                if(result1[0].nom_tur==result13[0].nom_tur){
                  console.log("Turno");
                  coin++;
                }
                if(result1[0].nom_car==result13[0].nom_car){
                  console.log("Carrera");
                  coin++;
                }
                if(result1[0].nom_es==result13[0].nom_es){
                  console.log("Escuela");
                  coin+=13;
                }
                if(result1[0].gru_us==result13[0].gru_us){
                  console.log("Grupo");
                  coin+=3;
                }
                var año = result1[0].eda_us.split('/');
                var años = result13[0].eda_us.split('/');
                if(año[2] == años[2]){
                  console.log("Edad");
                  coin+=2;
                }
                else if(año[2] == años[2]-1||año[2]-1 == años[2]){
                  console.log("Edad");
                  coin+=1;
                }
                if(año[2]>años[2]){
                  if(año[2]-años[2]>3){
                    coin-=5;
                  }
                }else if(año[2]<años[2]){
                  if(años[2]-año[2]>3){
                    coin-=5;
                  }
                }
                console.log(coin);
                if(coin>=100&&result33[0]==undefined){
                    coin = ((coin*100)/150);
                    console.log("%"+coin + " " + result1[0].use_us);
                    result1[0].nom_us=prueba.decipher(result1[0].nom_us);
                    result1[0].gru_us=prueba.decipher(result1[0].gru_us);
                    result1[0].con_us=prueba.decipher(result1[0].con_us);
                    result1[0].bol_us=prueba.decipher(result1[0].bol_us);
                    result1[0].fot_us=prueba.decipher(result1[0].fot_us);
                    result1[0].eda_us=prueba.decipher(result1[0].eda_us);
                    var mat = {
                    user: result1,
                    coincidence: coin
                    }
                  var l = 0;
                  if(posmatch.length>0){
                    for(var j=0; j<posmatch.length;j++){
                      if(posmatch[j].coincidence<coin){
                        posmatch.splice(j,0,mat);
                        l++;
                        j=posmatch.length;
                      }
                    }
                    if(l==0){
                      posmatch.push(mat);
                    }
                  }
                  else{
                    posmatch.push(mat);
                  }
                }
                console.log(req.session.r + " " + posmatch.length);
                if((ñ == req.session.r-1)&&z==0){
                  z++;
                  res.render('Match',{
                    data: posmatch
                  });
                }
              });
              });
              }
            }
          });
        }
      });
    }
    else{
      res.redirect('/Amigo');
    }
    
  });
  }else if(req.body.crit=="Por Gustos Deportivos"){
    var posmatch = [];
  var z = 0;
  var ñ = 0;
  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
    if(result12.length>0){
      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos', (err, result)=>{
        req.session.r = result.length;
        for(var i=0; i<result.length;i++){
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join escuela where id_us = ?',[result[i].id_us],(err1, result1)=>{
            if(result1.length>0){
              if(result1[0].use_us!=result12[0].use_us){
                mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join escuela where id_us = ?',[result12[0].id_us],(err13, result13)=>{
                  console.log(result13);
                  mysqlConnection.query('select * from usuario natural join amigo where id_us = ? and ida_us = ? or id_us = ? and ida_us = ?',[result12[0].id_us,result1[0].id_us,result1[0].id_us,result12[0].id_us],(err33,result33)=>{
                    var coin = 0;
                    ñ++;
                if(result1[0].nom_pel==result13[0].nom_pel){
                  console.log("Pelicula");
                  coin+=5;
                }
                if(result1[0].nom_dep==result13[0].nom_dep){
                  console.log("Deporte");
                  coin+=5;
                }
                if(result1[0].nom_dep==req.body.crite){
                  console.log("Deporte");
                  coin+=100;
                }
                if(result1[0].nom_lec==result13[0].nom_lec){
                  console.log("Lectura");
                  coin+=5;
                }
                if(result1[0].nom_vid==result13[0].nom_vid){
                  console.log("VideoGames");
                  coin+=5;
                }
                if(result1[0].nom_mus==result13[0].nom_mus){
                  console.log("Music");
                  coin+=5;
                }
                if((result1[0].nom_gen=="Mujer"&&result13[0].nom_gen=="Hombre")||(result1[0].nom_gen=="Hombre"&&result13[0].nom_gen=="Mujer")){
                  console.log("GenHM");
                  coin+=5;
                }
                else if(result1[0].nom_gen==result13[0].nom_gen){
                  console.log("GenN");
                  coin++;
                }
                if(result1[0].nom_tur==result13[0].nom_tur){
                  console.log("Turno");
                  coin++;
                }
                if(result1[0].nom_car==result13[0].nom_car){
                  console.log("Carrera");
                  coin++;
                }
                if(result1[0].nom_es==result13[0].nom_es){
                  console.log("Escuela");
                  coin+=13;
                }
                if(result1[0].gru_us==result13[0].gru_us){
                  console.log("Grupo");
                  coin+=3;
                }
                var año = result1[0].eda_us.split('/');
                var años = result13[0].eda_us.split('/');
                if(año[2] == años[2]){
                  console.log("Edad");
                  coin+=2;
                }
                else if(año[2] == años[2]-1||año[2]-1 == años[2]){
                  console.log("Edad");
                  coin+=1;
                }
                if(año[2]>años[2]){
                  if(año[2]-años[2]>3){
                    coin-=5;
                  }
                }else if(año[2]<años[2]){
                  if(años[2]-año[2]>3){
                    coin-=5;
                  }
                }
                console.log(coin);
                if(coin>=100&&result33[0]==undefined){
                    coin = ((coin*100)/150);
                    console.log("%"+coin + " " + result1[0].use_us);
                    result1[0].nom_us=prueba.decipher(result1[0].nom_us);
                    result1[0].gru_us=prueba.decipher(result1[0].gru_us);
                    result1[0].con_us=prueba.decipher(result1[0].con_us);
                    result1[0].bol_us=prueba.decipher(result1[0].bol_us);
                    result1[0].fot_us=prueba.decipher(result1[0].fot_us);
                    result1[0].eda_us=prueba.decipher(result1[0].eda_us);
                    var mat = {
                    user: result1,
                    coincidence: coin
                    }
                  var l = 0;
                  if(posmatch.length>0){
                    for(var j=0; j<posmatch.length;j++){
                      if(posmatch[j].coincidence<coin){
                        posmatch.splice(j,0,mat);
                        l++;
                        j=posmatch.length;
                      }
                    }
                    if(l==0){
                      posmatch.push(mat);
                    }
                  }
                  else{
                    posmatch.push(mat);
                  }
                }
                console.log(req.session.r + " " + posmatch.length);
                if((ñ == req.session.r-1)&&z==0){
                  z++;
                  res.render('Match',{
                    data: posmatch
                  });
                }
              });
              });
              }
            }
          });
        }
      });
    }
    else{
      res.redirect('/Amigo');
    }
    
  });
  }else if(req.body.crit=="Por Gustos De Lectura"){
    var posmatch = [];
  var z = 0;
  var ñ = 0;
  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
    if(result12.length>0){
      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos', (err, result)=>{
        req.session.r = result.length;
        for(var i=0; i<result.length;i++){
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join escuela where id_us = ?',[result[i].id_us],(err1, result1)=>{
            if(result1.length>0){
              if(result1[0].use_us!=result12[0].use_us){
                mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join escuela where id_us = ?',[result12[0].id_us],(err13, result13)=>{
                  console.log(result13);
                  mysqlConnection.query('select * from usuario natural join amigo where id_us = ? and ida_us = ? or id_us = ? and ida_us = ?',[result12[0].id_us,result1[0].id_us,result1[0].id_us,result12[0].id_us],(err33,result33)=>{
                    var coin = 0;
                    ñ++;
                if(result1[0].nom_pel==result13[0].nom_pel){
                  console.log("Pelicula");
                  coin+=5;
                }
                if(result1[0].nom_dep==result13[0].nom_dep){
                  console.log("Deporte");
                  coin+=5;
                }
                if(result1[0].nom_lec==req.body.crite){
                  console.log("Lectura");
                  coin+=100;
                }
                if(result1[0].nom_lec==result13[0].nom_lec){
                  console.log("Lectura");
                  coin+=5;
                }
                if(result1[0].nom_vid==result13[0].nom_vid){
                  console.log("VideoGames");
                  coin+=5;
                }
                if(result1[0].nom_mus==result13[0].nom_mus){
                  console.log("Music");
                  coin+=5;
                }
                if((result1[0].nom_gen=="Mujer"&&result13[0].nom_gen=="Hombre")||(result1[0].nom_gen=="Hombre"&&result13[0].nom_gen=="Mujer")){
                  console.log("GenHM");
                  coin+=5;
                }
                else if(result1[0].nom_gen==result13[0].nom_gen){
                  console.log("GenN");
                  coin++;
                }
                if(result1[0].nom_tur==result13[0].nom_tur){
                  console.log("Turno");
                  coin++;
                }
                if(result1[0].nom_car==result13[0].nom_car){
                  console.log("Carrera");
                  coin++;
                }
                if(result1[0].nom_es==result13[0].nom_es){
                  console.log("Escuela");
                  coin+=13;
                }
                if(result1[0].gru_us==result13[0].gru_us){
                  console.log("Grupo");
                  coin+=3;
                }
                var año = result1[0].eda_us.split('/');
                var años = result13[0].eda_us.split('/');
                if(año[2] == años[2]){
                  console.log("Edad");
                  coin+=2;
                }
                else if(año[2] == años[2]-1||año[2]-1 == años[2]){
                  console.log("Edad");
                  coin+=1;
                }
                if(año[2]>años[2]){
                  if(año[2]-años[2]>3){
                    coin-=5;
                  }
                }else if(año[2]<años[2]){
                  if(años[2]-año[2]>3){
                    coin-=5;
                  }
                }
                console.log(coin);
                if(coin>=100&&result33[0]==undefined){
                    coin = ((coin*100)/150);
                    console.log("%"+coin + " " + result1[0].use_us);
                    result1[0].nom_us=prueba.decipher(result1[0].nom_us);
                    result1[0].gru_us=prueba.decipher(result1[0].gru_us);
                    result1[0].con_us=prueba.decipher(result1[0].con_us);
                    result1[0].bol_us=prueba.decipher(result1[0].bol_us);
                    result1[0].fot_us=prueba.decipher(result1[0].fot_us);
                    result1[0].eda_us=prueba.decipher(result1[0].eda_us);
                    var mat = {
                    user: result1,
                    coincidence: coin
                    }
                  var l = 0;
                  if(posmatch.length>0){
                    for(var j=0; j<posmatch.length;j++){
                      if(posmatch[j].coincidence<coin){
                        posmatch.splice(j,0,mat);
                        l++;
                        j=posmatch.length;
                      }
                    }
                    if(l==0){
                      posmatch.push(mat);
                    }
                  }
                  else{
                    posmatch.push(mat);
                  }
                }
                console.log(req.session.r + " " + posmatch.length);
                if((ñ == req.session.r-1)&&z==0){
                  z++;
                  res.render('Match',{
                    data: posmatch
                  });
                }
              });
              });
              }
            }
          });
        }
      });
    }
    else{
      res.redirect('/Amigo');
    }
    
  });
  }else if(req.body.crit=="Por Gustos De Películas"){
    var posmatch = [];
  var z = 0;
  var ñ = 0;
  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
    if(result12.length>0){
      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos', (err, result)=>{
        req.session.r = result.length;
        for(var i=0; i<result.length;i++){
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join escuela where id_us = ?',[result[i].id_us],(err1, result1)=>{
            if(result1.length>0){
              if(result1[0].use_us!=result12[0].use_us){
                mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join escuela where id_us = ?',[result12[0].id_us],(err13, result13)=>{
                  console.log(result13);
                  mysqlConnection.query('select * from usuario natural join amigo where id_us = ? and ida_us = ? or id_us = ? and ida_us = ?',[result12[0].id_us,result1[0].id_us,result1[0].id_us,result12[0].id_us],(err33,result33)=>{
                    var coin = 0;
                    ñ++;
                if(result1[0].nom_pel==result13[0].nom_pel){
                  console.log("Pelicula");
                  coin+=5;
                }
                if(result1[0].nom_dep==result13[0].nom_dep){
                  console.log("Deporte");
                  coin+=5;
                }
                if(result1[0].nom_pel==req.body.crite){
                  console.log("Pelicula");
                  coin+=100;
                }
                if(result1[0].nom_lec==result13[0].nom_lec){
                  console.log("Lectura");
                  coin+=5;
                }
                if(result1[0].nom_vid==result13[0].nom_vid){
                  console.log("VideoGames");
                  coin+=5;
                }
                if(result1[0].nom_mus==result13[0].nom_mus){
                  console.log("Music");
                  coin+=5;
                }
                if((result1[0].nom_gen=="Mujer"&&result13[0].nom_gen=="Hombre")||(result1[0].nom_gen=="Hombre"&&result13[0].nom_gen=="Mujer")){
                  console.log("GenHM");
                  coin+=5;
                }
                else if(result1[0].nom_gen==result13[0].nom_gen){
                  console.log("GenN");
                  coin++;
                }
                if(result1[0].nom_tur==result13[0].nom_tur){
                  console.log("Turno");
                  coin++;
                }
                if(result1[0].nom_car==result13[0].nom_car){
                  console.log("Carrera");
                  coin++;
                }
                if(result1[0].nom_es==result13[0].nom_es){
                  console.log("Escuela");
                  coin+=13;
                }
                if(result1[0].gru_us==result13[0].gru_us){
                  console.log("Grupo");
                  coin+=3;
                }
                var año = result1[0].eda_us.split('/');
                var años = result13[0].eda_us.split('/');
                if(año[2] == años[2]){
                  console.log("Edad");
                  coin+=2;
                }
                else if(año[2] == años[2]-1||año[2]-1 == años[2]){
                  console.log("Edad");
                  coin+=1;
                }
                if(año[2]>años[2]){
                  if(año[2]-años[2]>3){
                    coin-=5;
                  }
                }else if(año[2]<años[2]){
                  if(años[2]-año[2]>3){
                    coin-=5;
                  }
                }
                console.log(coin);
                if(coin>=100&&result33[0]==undefined){
                    coin = ((coin*100)/150);
                    console.log("%"+coin + " " + result1[0].use_us);
                    result1[0].nom_us=prueba.decipher(result1[0].nom_us);
                    result1[0].gru_us=prueba.decipher(result1[0].gru_us);
                    result1[0].con_us=prueba.decipher(result1[0].con_us);
                    result1[0].bol_us=prueba.decipher(result1[0].bol_us);
                    result1[0].fot_us=prueba.decipher(result1[0].fot_us);
                    result1[0].eda_us=prueba.decipher(result1[0].eda_us);
                    var mat = {
                    user: result1,
                    coincidence: coin
                    }
                  var l = 0;
                  if(posmatch.length>0){
                    for(var j=0; j<posmatch.length;j++){
                      if(posmatch[j].coincidence<coin){
                        posmatch.splice(j,0,mat);
                        l++;
                        j=posmatch.length;
                      }
                    }
                    if(l==0){
                      posmatch.push(mat);
                    }
                  }
                  else{
                    posmatch.push(mat);
                  }
                }
                console.log(req.session.r + " " + posmatch.length);
                if((ñ == req.session.r-1)&&z==0){
                  z++;
                  res.render('Match',{
                    data: posmatch
                  });
                }
              });
              });
              }
            }
          });
        }
      });
    }
    else{
      res.redirect('/Amigo');
    }
    
  });
  }else if(req.body.crit=="Por Gustos De Videojuegos"){
    var posmatch = [];
    var z = 0;
    var ñ = 0;
    mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
      if(result12.length>0){
        mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos', (err, result)=>{
          req.session.r = result.length;
          for(var i=0; i<result.length;i++){
            mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join escuela where id_us = ?',[result[i].id_us],(err1, result1)=>{
              if(result1.length>0){
                if(result1[0].use_us!=result12[0].use_us){
                  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join escuela where id_us = ?',[result12[0].id_us],(err13, result13)=>{
                    console.log(result13);
                    mysqlConnection.query('select * from usuario natural join amigo where id_us = ? and ida_us = ? or id_us = ? and ida_us = ?',[result12[0].id_us,result1[0].id_us,result1[0].id_us,result12[0].id_us],(err33,result33)=>{
                      var coin = 0; 
                      ñ++;
                  if(result1[0].nom_pel==result13[0].nom_pel){
                    console.log("Pelicula");
                    coin+=5;
                  }
                  if(result1[0].nom_dep==result13[0].nom_dep){
                    console.log("Deporte");
                    coin+=5;
                  }
                  if(result1[0].nom_vid==req.body.crite){
                    console.log("VideoGames");
                    coin+=100;
                  }
                  if(result1[0].nom_lec==result13[0].nom_lec){
                    console.log("Lectura");
                    coin+=5;
                  }
                  if(result1[0].nom_vid==result13[0].nom_vid){
                    console.log("VideoGames");
                    coin+=5;
                  }
                  if(result1[0].nom_mus==result13[0].nom_mus){
                    console.log("Music");
                    coin+=5;
                  }
                  if((result1[0].nom_gen=="Mujer"&&result13[0].nom_gen=="Hombre")||(result1[0].nom_gen=="Hombre"&&result13[0].nom_gen=="Mujer")){
                    console.log("GenHM");
                    coin+=5;
                  }
                  else if(result1[0].nom_gen==result13[0].nom_gen){
                    console.log("GenN");
                    coin++;
                  }
                  if(result1[0].nom_tur==result13[0].nom_tur){
                    console.log("Turno");
                    coin++;
                  }
                  if(result1[0].nom_car==result13[0].nom_car){
                    console.log("Carrera");
                    coin++;
                  }
                  if(result1[0].nom_es==result13[0].nom_es){
                    console.log("Escuela");
                    coin+=13;
                  }
                  if(result1[0].gru_us==result13[0].gru_us){
                    console.log("Grupo");
                    coin+=3;
                  }
                  var año = result1[0].eda_us.split('/');
                  var años = result13[0].eda_us.split('/');
                  if(año[2] == años[2]){
                    console.log("Edad");
                    coin+=2;
                  }
                  else if(año[2] == años[2]-1||año[2]-1 == años[2]){
                    console.log("Edad");
                    coin+=1;
                  }
                  if(año[2]>años[2]){
                    if(año[2]-años[2]>3){
                      coin-=5;
                    }
                  }else if(año[2]<años[2]){
                    if(años[2]-año[2]>3){
                      coin-=5;
                    }
                  }
                  console.log(coin);
                  if(coin>=100&&result33[0]==undefined){
                      coin = ((coin*100)/150);
                      console.log("%"+coin + " " + result1[0].use_us);
                      result1[0].nom_us=prueba.decipher(result1[0].nom_us);
                      result1[0].gru_us=prueba.decipher(result1[0].gru_us);
                      result1[0].con_us=prueba.decipher(result1[0].con_us);
                      result1[0].bol_us=prueba.decipher(result1[0].bol_us);
                      result1[0].fot_us=prueba.decipher(result1[0].fot_us);
                      result1[0].eda_us=prueba.decipher(result1[0].eda_us);
                      var mat = {
                      user: result1,
                      coincidence: coin
                      }
                    var l = 0;
                    if(posmatch.length>0){
                      for(var j=0; j<posmatch.length;j++){
                        if(posmatch[j].coincidence<coin){
                          posmatch.splice(j,0,mat);
                          l++;
                          j=posmatch.length;
                        }
                      }
                      if(l==0){
                        posmatch.push(mat);
                      }
                    }
                    else{
                      posmatch.push(mat);
                    }
                  }
                  console.log(req.session.r + " " + posmatch.length);
                  if((ñ == req.session.r-1)&&z==0){
                    z++;
                    res.render('Match',{
                      data: posmatch
                    });
                  }
                });
                });
                }
              }
            });
          }
        });
      }
      else{
        res.redirect('/Amigo');
      }
      
    });
  }
}else{
  res.redirect('/Inicio');
}
}
prueba.addFriend = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM usuario WHERE use_us = ?',[req.session.nombre],(err,result)=>{
    if(err){
      console.log(err);
    }
    mysqlConnection.query('INSERT INTO amigo(id_us,ida_us,isf_am,ref_am,rec_am,trf_am) values(?,?,false,false,false,false)',[result[0].id_us,id],(err1)=>{
      if(err1){
        console.log(err1);
      }
      req.session.FRid = result[0].id_us;
      req.session.FRidus = id;
      res.redirect('/Amigo');
    });
  });
}else{
  res.redirect('/Inicio');
}
}
prueba.chat = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
  const { id } = req.params;
  req.session.cham = id;
  res.redirect('/Chat');
}else{
  res.redirect('/Inicio');
}
}
prueba.ch = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined&&req.session.cham!=undefined){
  var friends = [];
  var l = 0;
  var m = 0;
  console.log(req.session.nombre);
  mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err,result)=>{
    mysqlConnection.query('insert into registro(id_us) values(?)',[result[0].id_us],(err667,result667)=>{
    });
    mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where use_us = ?',[req.session.nombre],(err6,result6)=>{
      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where ida_us = ?',[result[0].id_us],(err44,result44)=>{
      if(result6.length>0&&result44.length==0){
        console.log("Hola");
        for(var i = 0;i<result6.length;i++){
          req.session.i = i;
          req.session.r = result6.length;
          console.log(result6[i]);
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result6[i].ida_us,result6[i].id_us],(err22,result22)=>{
            if(result22[0]!=undefined){
            mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
              var blocked = false;
              if(result56[0]!=undefined){
                blocked = true;
              }
            if(result22[0]!=undefined){
              result22[0].blocked = blocked;
              friends.push(result22[0]);
            }
            else{
              req.session.r -= 1; 
            }
            if((friends.length==req.session.r)&&l==0){
              l++;
              mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join amigo where id_us = ? and ida_us = ?',[req.session.cham,result[0].id_us],(err555,result555)=>{
                mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result[0].id_us,result555[0].id_us,result[0].id_us,result555[0].id_us],(err444,result444)=>{
                 mysqlConnection.query('select * from registro where id_us = ?',[result555[0].id_us],(err610,result610)=>{
                  for(var i = 0; i<result444.length; i++){
                    if(result444[i].msg_ms!=undefined){
                      result444[i].msg_ms = prueba.decipher(result444[i].msg_ms);
                    }
                  }
                  if(result610[0]!=undefined){
                      result555[0].log = result610[result610.length-1].log;
                   }else{
                      result555[0].log = "El usuario no ha entrado a chat aún";
                   }
                  mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result555[0].ida_us, result555[0].id_us],(err57,result57)=>{
                    var block = false;
                    if(result57[0]!=undefined){
                      block = true;
                    }
                    result555[0].blocked = block;
                    result16[0].nom_us=prueba.decipher(result16[0].nom_us);
                    result16[0].gru_us=prueba.decipher(result16[0].gru_us);
                    result16[0].con_us=prueba.decipher(result16[0].con_us);
                    result16[0].bol_us=prueba.decipher(result16[0].bol_us);
                    result16[0].fot_us=prueba.decipher(result16[0].fot_us);
                    result16[0].eda_us=prueba.decipher(result16[0].eda_us);
                    for(var i = 0; i<friends.length; i++){
                      friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                      friends[i].con_us = prueba.decipher(friends[i].con_us);
                      friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                      friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                      friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                      friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                    }
                    result555[0].nom_us=prueba.decipher(result555[0].nom_us);
                    result555[0].gru_us=prueba.decipher(result555[0].gru_us);
                    result555[0].con_us=prueba.decipher(result555[0].con_us);
                    result555[0].bol_us=prueba.decipher(result555[0].bol_us);
                    result555[0].fot_us=prueba.decipher(result555[0].fot_us);
                    result555[0].eda_us=prueba.decipher(result555[0].eda_us);
                  res.render('Chat',{
                    data: result16[0],
                    amigos: friends,
                    chat: result555[0],
                    msg: result444,
                    user: req.session.nombre
                  });
                  });
                });
                });
              });
              i = req.session.r.length;
            }
          });
          }else{
            req.session.r -= 1; 
            if((friends.length==req.session.r)&&l==0){
              l++;
              mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join amigo where id_us = ? and ida_us = ?',[req.session.cham,result[0].id_us],(err555,result555)=>{
                mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result[0].id_us,result555[0].id_us,result[0].id_us,result555[0].id_us],(err444,result444)=>{
                  mysqlConnection.query('select * from registro where id_us = ?',[result555[0].id_us],(err610,result610)=>{
                    for(var i = 0; i<result444.length; i++){
                      if(result444[i].msg_ms!=undefined){
                        result444[i].msg_ms = prueba.decipher(result444[i].msg_ms);
                      }
                    }
                    if(result610[0]!=undefined){
                       result555[0].log = result610[result610.length-1].log;
                    }else{
                       result555[0].log = "El usuario no ha entrado a chat aún";
                    }
                  mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result555[0].ida_us, result555[0].id_us],(err57,result57)=>{
                    var block = false;
                    if(result57[0]!=undefined){
                      block = true;
                    }
                    result555[0].blocked = block;
                    result16[0].nom_us=prueba.decipher(result16[0].nom_us);
                    result16[0].gru_us=prueba.decipher(result16[0].gru_us);
                    result16[0].con_us=prueba.decipher(result16[0].con_us);
                    result16[0].bol_us=prueba.decipher(result16[0].bol_us);
                    result16[0].fot_us=prueba.decipher(result16[0].fot_us);
                    result16[0].eda_us=prueba.decipher(result16[0].eda_us);
                    
                    result555[0].nom_us=prueba.decipher(result555[0].nom_us);
                    result555[0].gru_us=prueba.decipher(result555[0].gru_us);
                    result555[0].con_us=prueba.decipher(result555[0].con_us);
                    result555[0].bol_us=prueba.decipher(result555[0].bol_us);
                    result555[0].fot_us=prueba.decipher(result555[0].fot_us);
                    result555[0].eda_us=prueba.decipher(result555[0].eda_us);
                    for(var i = 0; i<friends.length; i++){
                      friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                      friends[i].con_us = prueba.decipher(friends[i].con_us);
                      friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                      friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                      friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                      friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                    }
                  res.render('Chat',{
                    data: result16[0],
                    amigos: friends,
                    chat: result555[0],
                    msg: result444,
                    user: req.session.nombre
                  });
                });
              });
                });
              });
              i = req.session.r.length;
            }
          }
          });
        }
      }
      else if(result44.length>0&&result6.length==0){
        console.log("Holaa");
        mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
        for(var i = 0;i<result44.length;i++){
          req.session.i = i;
          req.session.r = result44.length;
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
            if(result22[0]!=undefined){
            mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
              var blocked = false;
              if(result56[0]!=undefined){
                blocked = true;
              }
            if(result22[0]!=undefined){
              result22[0].blocked = blocked;
              friends.push(result22[0]);
            }
            else{
              req.session.r -= 1; 
            }
            if((friends.length==req.session.r)&&l==0){
              l++;
              mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join amigo where id_us = ? and ida_us = ?',[req.session.cham,result[0].id_us],(err555,result555)=>{
                mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result[0].id_us,result555[0].id_us,result[0].id_us,result555[0].id_us],(err444,result444)=>{
                  mysqlConnection.query('select * from registro where id_us = ?',[result555[0].id_us],(err610,result610)=>{
                    for(var i = 0; i<result444.length; i++){
                      if(result444[i].msg_ms!=undefined){
                        result444[i].msg_ms = prueba.decipher(result444[i].msg_ms);
                      }
                    }
                    if(result610[0]!=undefined){
                       result555[0].log = result610[result610.length-1].log;
                    }else{
                       result555[0].log = "El usuario no ha entrado a chat aún";
                    }
                  mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result555[0].ida_us, result555[0].id_us],(err57,result57)=>{
                    var block = false;
                    if(result57[0]!=undefined){
                      block = true;
                    }
                    result555[0].blocked = block;
                    result16[0].nom_us=prueba.decipher(result16[0].nom_us);
                    result16[0].gru_us=prueba.decipher(result16[0].gru_us);
                    result16[0].con_us=prueba.decipher(result16[0].con_us);
                    result16[0].bol_us=prueba.decipher(result16[0].bol_us);
                    result16[0].fot_us=prueba.decipher(result16[0].fot_us);
                    result16[0].eda_us=prueba.decipher(result16[0].eda_us);
                    for(var i = 0; i<friends.length; i++){
                      friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                      friends[i].con_us = prueba.decipher(friends[i].con_us);
                      friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                      friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                      friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                      friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                    }
                    result555[0].nom_us=prueba.decipher(result555[0].nom_us);
                    result555[0].gru_us=prueba.decipher(result555[0].gru_us);
                    result555[0].con_us=prueba.decipher(result555[0].con_us);
                    result555[0].bol_us=prueba.decipher(result555[0].bol_us);
                    result555[0].fot_us=prueba.decipher(result555[0].fot_us);
                    result555[0].eda_us=prueba.decipher(result555[0].eda_us);
                  res.render('Chat',{
                    data: result16[0],
                    amigos: friends,
                    chat: result555[0],
                    msg: result444,
                    user: req.session.nombre
                  });
                });
              });
                });
              });
              i = req.session.r.length;
            }
          });
        }else{
          req.session.r -= 1; 
          if((friends.length==req.session.r)&&l==0){
            l++;
            mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join amigo where id_us = ? and ida_us = ?',[req.session.cham,result[0].id_us],(err555,result555)=>{
              mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result[0].id_us,result555[0].id_us,result[0].id_us,result555[0].id_us],(err444,result444)=>{
                mysqlConnection.query('select * from registro where id_us = ?',[result555[0].id_us],(err610,result610)=>{
                  for(var i = 0; i<result444.length; i++){
                    if(result444[i].msg_ms!=undefined){
                      result444[i].msg_ms = prueba.decipher(result444[i].msg_ms);
                    }
                  }
                  if(result610[0]!=undefined){
                     result555[0].log = result610[result610.length-1].log;
                  }else{
                     result555[0].log = "El usuario no ha entrado a chat aún";
                  }
                mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result555[0].ida_us, result555[0].id_us],(err57,result57)=>{
                  var block = false;
                  if(result57[0]!=undefined){
                    block = true;
                  }
                  result555[0].blocked = block;
                  result16[0].nom_us=prueba.decipher(result16[0].nom_us);
                    result16[0].gru_us=prueba.decipher(result16[0].gru_us);
                    result16[0].con_us=prueba.decipher(result16[0].con_us);
                    result16[0].bol_us=prueba.decipher(result16[0].bol_us);
                    result16[0].fot_us=prueba.decipher(result16[0].fot_us);
                    result16[0].eda_us=prueba.decipher(result16[0].eda_us);
                    for(var i = 0; i<friends.length; i++){
                      friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                      friends[i].con_us = prueba.decipher(friends[i].con_us);
                      friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                      friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                      friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                      friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                    }
                    result555[0].nom_us=prueba.decipher(result555[0].nom_us);
                    result555[0].gru_us=prueba.decipher(result555[0].gru_us);
                    result555[0].con_us=prueba.decipher(result555[0].con_us);
                    result555[0].bol_us=prueba.decipher(result555[0].bol_us);
                    result555[0].fot_us=prueba.decipher(result555[0].fot_us);
                    result555[0].eda_us=prueba.decipher(result555[0].eda_us);
                res.render('Chat',{
                  data: result16[0],
                  amigos: friends,
                  chat: result555[0],
                  msg: result444,
                  user: req.session.nombre
                });
              });
            });
              });
            });
            i = req.session.r.length;
          }
        }
          });
        }
      });
      }
      else if(result44.length>0&&result6.length>0){
        console.log("Holaaa");
        for(var i = 0;i<result6.length;i++){
          req.session.i = i;
          req.session.r = result6.length;
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result6[i].ida_us,result6[i].id_us],(err22,result22)=>{
            if(result22[0]!=undefined){
            mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
              var blocked = false;
              if(result56[0]!=undefined){
                blocked = true;
              }
            if(result22[0]!=undefined&&friends.map(function(e) { return e.id_us; }).indexOf(result22[0].id_us)==-1){
              result22[0].blocked = blocked;
              friends.push(result22[0]);
            }
            else{
              req.session.r -= 1; 
            }
            if((friends.length==req.session.r)&&l==0){
              req.session.r += result44.length;
              mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
                for(var i = 0;i<result44.length;i++){
                  req.session.i = i;
                  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
                    if(result22[0]!=undefined){
                    mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err57,result57)=>{
                      var block = false;
                      if(result57[0]!=undefined){
                        block = true;
                      }
                    if(result22[0]!=undefined&&friends.map(function(e) { return e.id_us; }).indexOf(result22[0].id_us)==-1){
                      result22[0].blocked = block;
                      friends.push(result22[0]);
                    }
                    else{
                      req.session.r -= 1; 
                    }
                    if((friends.length==req.session.r)&&m==0){
                      m++;
                      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join amigo where id_us = ? and ida_us = ?',[req.session.cham,result[0].id_us],(err555,result555)=>{
                        mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result[0].id_us,result555[0].id_us,result[0].id_us,result555[0].id_us],(err444,result444)=>{
                          mysqlConnection.query('select * from registro where id_us = ?',[result555[0].id_us],(err610,result610)=>{
                            for(var i = 0; i<result444.length; i++){
                              if(result444[i].msg_ms!=undefined){
                                result444[i].msg_ms = prueba.decipher(result444[i].msg_ms);
                              }
                            }
                            if(result610[0]!=undefined){
                               result555[0].log = result610[result610.length-1].log;
                            }else{
                               result555[0].log = "El usuario no ha entrado a chat aún";
                            }
                          mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result555[0].ida_us, result555[0].id_us],(err57,result57)=>{
                            var block = false;
                            if(result57[0]!=undefined){
                              block = true;
                            }
                            result555[0].blocked = block;
                            result16[0].nom_us=prueba.decipher(result16[0].nom_us);
                    result16[0].gru_us=prueba.decipher(result16[0].gru_us);
                    result16[0].con_us=prueba.decipher(result16[0].con_us);
                    result16[0].bol_us=prueba.decipher(result16[0].bol_us);
                    result16[0].fot_us=prueba.decipher(result16[0].fot_us);
                    result16[0].eda_us=prueba.decipher(result16[0].eda_us);
                    for(var i = 0; i<friends.length; i++){
                      friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                      friends[i].con_us = prueba.decipher(friends[i].con_us);
                      friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                      friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                      friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                      friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                    }
                    result555[0].nom_us=prueba.decipher(result555[0].nom_us);
                    result555[0].gru_us=prueba.decipher(result555[0].gru_us);
                    result555[0].con_us=prueba.decipher(result555[0].con_us);
                    result555[0].bol_us=prueba.decipher(result555[0].bol_us);
                    result555[0].fot_us=prueba.decipher(result555[0].fot_us);
                    result555[0].eda_us=prueba.decipher(result555[0].eda_us);
                          res.render('Chat',{
                            data: result16[0],
                            amigos: friends,
                            chat: result555[0],
                            msg: result444,
                            user: req.session.nombre
                          });
                        });
                      });
                        });
                      });
                      i = req.session.r.length;
                    }
                  });
                }else{
                  req.session.r -= 1;
                  if((friends.length==req.session.r)&&m==0){
                    m++;
                    mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join amigo where id_us = ? and ida_us = ?',[req.session.cham,result[0].id_us],(err555,result555)=>{
                      mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result[0].id_us,result555[0].id_us,result[0].id_us,result555[0].id_us],(err444,result444)=>{
                        mysqlConnection.query('select * from registro where id_us = ?',[result555[0].id_us],(err610,result610)=>{
                          for(var i = 0; i<result444.length; i++){
                            if(result444[i].msg_ms!=undefined){
                              result444[i].msg_ms = prueba.decipher(result444[i].msg_ms);
                            }
                          }
                          if(result610[0]!=undefined){
                             result555[0].log = result610[result610.length-1].log;
                          }else{
                             result555[0].log = "El usuario no ha entrado a chat aún";
                          }
                        mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result555[0].ida_us, result555[0].id_us],(err57,result57)=>{
                          var block = false;
                          if(result57[0]!=undefined){
                            block = true;
                          }
                          result555[0].blocked = block;
                          result16[0].nom_us=prueba.decipher(result16[0].nom_us);
                    result16[0].gru_us=prueba.decipher(result16[0].gru_us);
                    result16[0].con_us=prueba.decipher(result16[0].con_us);
                    result16[0].bol_us=prueba.decipher(result16[0].bol_us);
                    result16[0].fot_us=prueba.decipher(result16[0].fot_us);
                    result16[0].eda_us=prueba.decipher(result16[0].eda_us);
                    for(var i = 0; i<friends.length; i++){
                      friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                      friends[i].con_us = prueba.decipher(friends[i].con_us);
                      friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                      friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                      friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                      friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                    }
                    result555[0].nom_us=prueba.decipher(result555[0].nom_us);
                    result555[0].gru_us=prueba.decipher(result555[0].gru_us);
                    result555[0].con_us=prueba.decipher(result555[0].con_us);
                    result555[0].bol_us=prueba.decipher(result555[0].bol_us);
                    result555[0].fot_us=prueba.decipher(result555[0].fot_us);
                    result555[0].eda_us=prueba.decipher(result555[0].eda_us);
                        res.render('Chat',{
                          data: result16[0],
                          amigos: friends,
                          chat: result555[0],
                          msg: result444,
                          user: req.session.nombre
                        });
                      });
                    });
                      });
                    });
                    i = req.session.r.length;
                  }
                }
                });
                }
              });
              l++;
              i = req.session.r.length;
            }
          });
          }else{
            req.session.r -= 1;
            if((friends.length==req.session.r)&&l==0){
              req.session.r += result44.length;
              mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
                for(var i = 0;i<result44.length;i++){
                  req.session.i = i;
                  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
                    mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err57,result57)=>{
                      var block = false;
                      if(result57[0]!=undefined){
                        block = true;
                      }
                    if(result22[0]!=undefined&&friends.map(function(e) { return e.id_us; }).indexOf(result22[0].id_us)==-1){
                      result22[0].blocked = block;
                      friends.push(result22[0]);
                    }
                    else{
                      req.session.r -= 1; 
                    }
                    if((friends.length==req.session.r)&&m==0){
                      m++;
                      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join amigo where id_us = ? and ida_us = ?',[req.session.cham,result[0].id_us],(err555,result555)=>{
                        mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result[0].id_us,result555[0].id_us,result[0].id_us,result555[0].id_us],(err444,result444)=>{
                          mysqlConnection.query('select * from registro where id_us = ?',[result555[0].id_us],(err610,result610)=>{
                            for(var i = 0; i<result444.length; i++){
                              if(result444[i].msg_ms!=undefined){
                                result444[i].msg_ms = prueba.decipher(result444[i].msg_ms);
                              }
                            }
                            if(result610[0]!=undefined){
                               result555[0].log = result610[result610.length-1].log;
                            }else{
                               result555[0].log = "El usuario no ha entrado a chat aún";
                            }
                          mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result555[0].ida_us, result555[0].id_us],(err57,result57)=>{
                            var block = false;
                            if(result57[0]!=undefined){
                              block = true;
                            }
                            result555[0].blocked = block;
                            result16[0].nom_us=prueba.decipher(result16[0].nom_us);
                    result16[0].gru_us=prueba.decipher(result16[0].gru_us);
                    result16[0].con_us=prueba.decipher(result16[0].con_us);
                    result16[0].bol_us=prueba.decipher(result16[0].bol_us);
                    result16[0].fot_us=prueba.decipher(result16[0].fot_us);
                    result16[0].eda_us=prueba.decipher(result16[0].eda_us);
                    for(var i = 0; i<friends.length; i++){
                      friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                      friends[i].con_us = prueba.decipher(friends[i].con_us);
                      friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                      friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                      friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                      friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                    }
                    result555[0].nom_us=prueba.decipher(result555[0].nom_us);
                    result555[0].gru_us=prueba.decipher(result555[0].gru_us);
                    result555[0].con_us=prueba.decipher(result555[0].con_us);
                    result555[0].bol_us=prueba.decipher(result555[0].bol_us);
                    result555[0].fot_us=prueba.decipher(result555[0].fot_us);
                    result555[0].eda_us=prueba.decipher(result555[0].eda_us);
                          res.render('Chat',{
                            data: result16[0],
                            amigos: friends,
                            chat: result555[0],
                            msg: result444,
                            user: req.session.nombre
                          });
                        });
                      });
                        });
                      });
                      i = req.session.r.length;
                    }
                  });
                });
                }
              });
              l++;
              i = req.session.r.length;
            }
          }
          });
        }
      }
      else{
    mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
      console.log(result12[0]);
      if(result12.length>0){
        mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join amigo where id_us = ? and ida_us = ?',[req.session.cham,result[0].id_us],(err555,result555)=>{
          mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result[0].id_us,result555[0].id_us,result[0].id_us,result555[0].id_us],(err444,result444)=>{
            mysqlConnection.query('select * from registro where id_us = ?',[result555[0].id_us],(err610,result610)=>{
              for(var i = 0; i<result444.length; i++){
                if(result444[i].msg_ms!=undefined){
                  result444[i].msg_ms = prueba.decipher(result444[i].msg_ms);
                }
              }
              if(result610[0]!=undefined){
                 result555[0].log = result610[result610.length-1].log;
              }else{
                 result555[0].log = "El usuario no ha entrado a chat aún";
              }
            mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result555[0].ida_us, result555[0].id_us],(err57,result57)=>{
              var block = false;
              if(result57[0]!=undefined){
                block = true;
              }
              result555[0].blocked = block;
              result16[0].nom_us=prueba.decipher(result16[0].nom_us);
                    result16[0].gru_us=prueba.decipher(result16[0].gru_us);
                    result16[0].con_us=prueba.decipher(result16[0].con_us);
                    result16[0].bol_us=prueba.decipher(result16[0].bol_us);
                    result16[0].fot_us=prueba.decipher(result16[0].fot_us);
                    result16[0].eda_us=prueba.decipher(result16[0].eda_us);
                    for(var i = 0; i<friends.length; i++){
                      friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                      friends[i].con_us = prueba.decipher(friends[i].con_us);
                      friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                      friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                      friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                      friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                    }
                    result555[0].nom_us=prueba.decipher(result555[0].nom_us);
                    result555[0].gru_us=prueba.decipher(result555[0].gru_us);
                    result555[0].con_us=prueba.decipher(result555[0].con_us);
                    result555[0].bol_us=prueba.decipher(result555[0].bol_us);
                    result555[0].fot_us=prueba.decipher(result555[0].fot_us);
                    result555[0].eda_us=prueba.decipher(result555[0].eda_us);
            res.render('Chat',{
              data: result16[0],
              amigos: friends,
              chat: result555[0],
              msg: result444,
              user: req.session.nombre
            });
          });
        });
          });
        });
      }
      else{
        mysqlConnection.query('SELECT * FROM usuario WHERE use_us = ?', [req.session.nombre] , (err,result)=>{
          console.log("Hola");
          res.render('User',{
            data: result[0],
            amigos: null,
            error: req.session.error,
            user: req.session.nombre,
            pub: null
          });
        });
      }
      
    });
      }
    });
  });
  });
}else{
  res.redirect('/Inicio');
}
}
prueba.intereses = (req,res) =>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
    console.log("Holaaa");
    if(req.body.Gustos == undefined||req.body.Musica == undefined||req.body.Lectura == undefined||req.body.Peliculas == undefined||req.body.Deportes == undefined||req.body.Video == undefined){
      error="Primero debes llenar todos los campos";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else if(req.body.Gustos.length<8){
      error="El campo de gustos debe tener 8 o más letras";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else if(req.body.Gustos.length>150){
      error="El campo de gustos no puede ser mayor a 150 caracteres";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else if(req.body.Gustos.includes('1')||req.body.Gustos.includes('2')||req.body.Gustos.includes('3')||req.body.Gustos.includes('4')||req.body.Gustos.includes('5')||req.body.Gustos.includes('6')||req.body.Gustos.includes('7')||req.body.Gustos.includes('8')||req.body.Gustos.includes('9')||req.body.Gustos.includes('0')||req.body.Gustos.includes('|')||req.body.Gustos.includes('!')||req.body.Gustos.includes('"')||req.body.Gustos.includes('#')||req.body.Gustos.includes('$')||req.body.Gustos.includes('%')||req.body.Gustos.includes('&')||req.body.Gustos.includes('/')||req.body.Gustos.includes('(')||req.body.Gustos.includes(')')||req.body.Gustos.includes('=')||req.body.Gustos.includes('?')||req.body.Gustos.includes('  ')||req.body.Gustos.includes('¡')||req.body.Gustos.includes('¿')||req.body.Gustos.includes('¨')||req.body.Gustos.includes('*')||req.body.Gustos.includes('+')||req.body.Gustos.includes('[')||req.body.Gustos.includes(']')||req.body.Gustos.includes('{')||req.body.Gustos.includes('}')||req.body.Gustos.includes('^')||req.body.Gustos.includes('`')||req.body.Gustos.includes('.')||req.body.Gustos.includes(';')||req.body.Gustos.includes(',')||req.body.Gustos.includes(':')||req.body.Gustos.includes('-')||req.body.Gustos.includes('_')||req.body.Gustos.includes('/')||req.body.Gustos.includes('*')||req.body.Gustos.includes('-')||req.body.Gustos.includes('♥')||req.body.Gustos.includes('☻')||req.body.Gustos.includes('♦')||req.body.Gustos.includes('☺')||req.body.Gustos.includes('♣')||req.body.Gustos.includes('♠')||req.body.Gustos.includes('•')||req.body.Gustos.includes('◘')||req.body.Gustos.includes('○')||req.body.Gustos.includes('<')||req.body.Gustos.includes('>')||req.body.Gustos.includes('°')){
      error="El campo de gustos solo puede incluir letras y espacios";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else if(req.body.Musica!="Dubstep"&&req.body.Musica!="Blues"&&req.body.Musica!="Country"&&req.body.Musica!="Cumbia"&&req.body.Musica!="Disco"&&req.body.Musica!="Electrónica"&&req.body.Musica!="Flamenco"&&req.body.Musica!="Folk"&&req.body.Musica!="Funk"&&req.body.Musica!="Gospel"&&req.body.Musica!="Heavy Metal"&&req.body.Musica!="Hip Hop"&&req.body.Musica!="Reggaeton"&&req.body.Musica!="Rock"&&req.body.Musica!="Rap"&&req.body.Musica!="Deathstep"&&req.body.Musica!="Alternativa"&&req.body.Musica!="SynthWave"&&req.body.Musica!="Pop"&&req.body.Musica!="Riddim"&&req.body.Musica!="Brostep"&&req.body.Musica!="Para Otakus"&&req.body.Musica!="Drum and Bass"&&req.body.Musica!="Jazz"&&req.body.Musica!="Clásica"&&req.body.Musica!="Instrumental"&&req.body.Musica!="Perreo"&&req.body.Musica!="Punk"&&req.body.Musica!="Rumba"&&req.body.Musica!="Tango"&&req.body.Musica!="Indie"&&req.body.Musica!="Soul"&&req.body.Musica!="House"&&req.body.Musica!="Techno"&&req.body.Musica!="Reggae"&&req.body.Musica!="Salsa"&&req.body.Musica!="Banda Sonora"&&req.body.Musica!="No Me Gusta"){
      error="Solo puedes seleccionar una opción de las establecidas, no hagas trampa";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else if(req.body.Lectura!="Drama"&&req.body.Lectura!="Terror"&&req.body.Lectura!="Suspenso"&&req.body.Lectura!="Sci-Fi"&&req.body.Lectura!="Aventura"&&req.body.Lectura!="Históricos"&&req.body.Lectura!="Juvenil"&&req.body.Lectura!="Futuristas"&&req.body.Lectura!="Literatura Clásica"&&req.body.Lectura!="Lírico"&&req.body.Lectura!="Didáctico"&&req.body.Lectura!="Épico"&&req.body.Lectura!="Narrativo"&&req.body.Lectura!="No Me Gusta"){
      error="Solo puedes seleccionar una opción de las establecidas, no hagas trampa";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else if(req.body.Peliculas!="Acción"&&req.body.Peliculas!="Aventuras"&&req.body.Peliculas!="Comedia"&&req.body.Peliculas!="Dramáticas"&&req.body.Peliculas!="Terror"&&req.body.Peliculas!="Musicales"&&req.body.Peliculas!="Ciencia Ficción"&&req.body.Peliculas!="Bélicas"&&req.body.Peliculas!="Para Otakus"&&req.body.Peliculas!="Suspenso"&&req.body.Peliculas!="Clásicas"&&req.body.Peliculas!="Futuristas"&&req.body.Peliculas!="Clásicas"&&req.body.Peliculas!="Futuristas"&&req.body.Peliculas!="Adultos"&&req.body.Peliculas!="Románticas"&&req.body.Peliculas!="Adaptaciones"&&req.body.Peliculas!="Super Héroes"&&req.body.Peliculas!="Animadas"&&req.body.Peliculas!="Infantiles"&&req.body.Peliculas!="Life Action"&&req.body.Peliculas!="Fantasia"&&req.body.Peliculas!="Princesas"&&req.body.Peliculas!="Para Otakus"&&req.body.Peliculas!="Para Otakus adultos"&&req.body.Peliculas!="Policiacas"&&req.body.Peliculas!="Originales De Netflix"&&req.body.Peliculas!="Mudas"&&req.body.Peliculas!="Blanco y Negro"&&req.body.Peliculas!="Western"&&req.body.Peliculas!="Crimen"&&req.body.Peliculas!="Del Tianguis"&&req.body.Peliculas!="No Me Gusta"){
      error="Solo puedes seleccionar una opción de las establecidas, no hagas trampa";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else if(req.body.Deportes!="Soccer"&&req.body.Deportes!="Football"&&req.body.Deportes!="Baseball"&&req.body.Deportes!="Rugby"&&req.body.Deportes!="Natación"&&req.body.Deportes!="Artes Marciales"&&req.body.Deportes!="Basketball"&&req.body.Deportes!="Patinaje Artístico"&&req.body.Deportes!="Polo"&&req.body.Deportes!="Hockey"&&req.body.Deportes!="Box"&&req.body.Deportes!="Ballet"&&req.body.Deportes!="Gimnasia"&&req.body.Deportes!="Tiro Con Arco"&&req.body.Deportes!="Volleyball"&&req.body.Deportes!="Atletismo"&&req.body.Deportes!="Ping Pong"&&req.body.Deportes!="Ajedrez"&&req.body.Deportes!="Frontón"&&req.body.Deportes!="Gym"&&req.body.Deportes!="Squash"&&req.body.Deportes!="No Me Gusta"){
      error="Solo puedes seleccionar una opción de las establecidas, no hagas trampa";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else if(req.body.Video!="RPG"&&req.body.Video!="Acción"&&req.body.Video!="Aventura"&&req.body.Video!="PvP"&&req.body.Video!="PvE"&&req.body.Video!="Battle Royale"&&req.body.Video!="Puzzle"&&req.body.Video!="Suspenso"&&req.body.Video!="Terror"&&req.body.Video!="Deportivos"&&req.body.Video!="Arcade"&&req.body.Video!="Simulación"&&req.body.Video!="Musicales"&&req.body.Video!="Mesa"&&req.body.Video!="Shooters"&&req.body.Video!="No Me Gusta"){
      error="Solo puedes seleccionar una opción de las establecidas, no hagas trampa";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else{
      mysqlConnection.query('SELECT * FROM usuario WHERE use_us = ?', [req.session.nombre] , (err,result)=>{
          if(err){
            console.log(err);
          }
          mysqlConnection.query('INSERT INTO gustos(id_us,nom_gus) values(?,?)',[result[0].id_us,req.body.Gustos],(err1,result1)=>{
            if(err1){
              console.log(err1);
            }
            mysqlConnection.query('SELECT * FROM agrupardeportes WHERE nom_dep = ?',[req.body.Deportes],(err2, result2)=>{
              if(err2){
                console.log(err2);
              }
              mysqlConnection.query('SELECT * FROM agruparpeliculas WHERE nom_pel = ?',[req.body.Peliculas],(err3, result3)=>{
                if(err3){
                  console.log(err3);
                }
                mysqlConnection.query('SELECT * FROM agruparlectura WHERE nom_lec = ?',[req.body.Lectura],(err4, result4)=>{
                  if(err4){
                    console.log(err4);
                  }
                  mysqlConnection.query('SELECT * FROM agruparvideojuegos WHERE nom_vid = ?',[req.body.Video],(err5, result5)=>{
                    if(err5){
                      console.log(err5);
                    }
                    mysqlConnection.query('SELECT * FROM generosmusica WHERE nom_mus = ?',[req.body.Musica],(err6, result6)=>{
                      if(err6){
                        console.log(err6);
                      }
                      mysqlConnection.query('INSERT INTO deportes(id_agDep, id_us) VALUES(?,?)',[result2[0].id_agDep,result[0].id_us],(err7, result7)=>{
                        if(err7){
                          console.log(err7);
                        }
                        mysqlConnection.query('INSERT INTO peliculas(id_agPel, id_us) VALUES(?,?)',[result3[0].id_agPel,result[0].id_us],(err8, result8)=>{
                          if(err8){
                            console.log(err8);
                          }
                          mysqlConnection.query('INSERT INTO lectura(id_agLec, id_us) VALUES(?,?)',[result4[0].id_agLec,result[0].id_us],(err9, result9)=>{
                            if(err9){
                              console.log(err9);
                            }
                            mysqlConnection.query('INSERT INTO videojuegos(id_agVid, id_us) VALUES(?,?)',[result5[0].id_agVid,result[0].id_us],(err10, result10)=>{
                              if(err10){
                                console.log(err10);
                              }
                              mysqlConnection.query('INSERT INTO musica(id_agMus, id_us) VALUES(?,?)',[result6[0].id_agMus,result[0].id_us],(err11, result11)=>{
                                if(err11){
                                  console.log(err11);
                                }
        
                                mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where id_us = ?',[result[0].id_us],(err12, result12)=>{
                                  if(err12){
                                    console.log(err12);
                                  }
                                  else{
                                    res.redirect('/Interes');
                                  }
                                  
                                });
        
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
      });
    }
}else{
  res.redirect('/Inicio');
}
}
prueba.interesesactu = (req,res) =>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
    if(req.body.Gustos == undefined||req.body.Musica == undefined||req.body.Lectura == undefined||req.body.Peliculas == undefined||req.body.Deportes == undefined||req.body.Video == undefined){
      error="Primero debes llenar todos los campos";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else if(req.body.Gustos.length<8){
      error="El campo de gustos debe tener 8 o más letras";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else if(req.body.Gustos.length>150){
      error="El campo de gustos no puede ser mayor a 150 caracteres";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else if(req.body.Gustos.includes('1')||req.body.Gustos.includes('2')||req.body.Gustos.includes('3')||req.body.Gustos.includes('4')||req.body.Gustos.includes('5')||req.body.Gustos.includes('6')||req.body.Gustos.includes('7')||req.body.Gustos.includes('8')||req.body.Gustos.includes('9')||req.body.Gustos.includes('0')||req.body.Gustos.includes('|')||req.body.Gustos.includes('!')||req.body.Gustos.includes('"')||req.body.Gustos.includes('#')||req.body.Gustos.includes('$')||req.body.Gustos.includes('%')||req.body.Gustos.includes('&')||req.body.Gustos.includes('/')||req.body.Gustos.includes('(')||req.body.Gustos.includes(')')||req.body.Gustos.includes('=')||req.body.Gustos.includes('?')||req.body.Gustos.includes('  ')||req.body.Gustos.includes('¡')||req.body.Gustos.includes('¿')||req.body.Gustos.includes('¨')||req.body.Gustos.includes('*')||req.body.Gustos.includes('+')||req.body.Gustos.includes('[')||req.body.Gustos.includes(']')||req.body.Gustos.includes('{')||req.body.Gustos.includes('}')||req.body.Gustos.includes('^')||req.body.Gustos.includes('`')||req.body.Gustos.includes('.')||req.body.Gustos.includes(';')||req.body.Gustos.includes(',')||req.body.Gustos.includes(':')||req.body.Gustos.includes('-')||req.body.Gustos.includes('_')||req.body.Gustos.includes('/')||req.body.Gustos.includes('*')||req.body.Gustos.includes('-')||req.body.Gustos.includes('♥')||req.body.Gustos.includes('☻')||req.body.Gustos.includes('♦')||req.body.Gustos.includes('☺')||req.body.Gustos.includes('♣')||req.body.Gustos.includes('♠')||req.body.Gustos.includes('•')||req.body.Gustos.includes('◘')||req.body.Gustos.includes('○')||req.body.Gustos.includes('<')||req.body.Gustos.includes('>')||req.body.Gustos.includes('°')){
      error="El campo de gustos solo puede incluir letras y espacios";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else if(req.body.Musica!="Dubstep"&&req.body.Musica!="Blues"&&req.body.Musica!="Country"&&req.body.Musica!="Cumbia"&&req.body.Musica!="Disco"&&req.body.Musica!="Electrónica"&&req.body.Musica!="Flamenco"&&req.body.Musica!="Folk"&&req.body.Musica!="Funk"&&req.body.Musica!="Gospel"&&req.body.Musica!="Heavy Metal"&&req.body.Musica!="Hip Hop"&&req.body.Musica!="Reggaeton"&&req.body.Musica!="Rock"&&req.body.Musica!="Rap"&&req.body.Musica!="Deathstep"&&req.body.Musica!="Alternativa"&&req.body.Musica!="SynthWave"&&req.body.Musica!="Pop"&&req.body.Musica!="Riddim"&&req.body.Musica!="Brostep"&&req.body.Musica!="Para Otakus"&&req.body.Musica!="Drum and Bass"&&req.body.Musica!="Jazz"&&req.body.Musica!="Clásica"&&req.body.Musica!="Instrumental"&&req.body.Musica!="Perreo"&&req.body.Musica!="Punk"&&req.body.Musica!="Rumba"&&req.body.Musica!="Tango"&&req.body.Musica!="Indie"&&req.body.Musica!="Soul"&&req.body.Musica!="House"&&req.body.Musica!="Techno"&&req.body.Musica!="Reggae"&&req.body.Musica!="Salsa"&&req.body.Musica!="Banda Sonora"&&req.body.Musica!="No Me Gusta"){
      error="Solo puedes seleccionar una opción de las establecidas, no hagas trampa";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else if(req.body.Lectura!="Drama"&&req.body.Lectura!="Terror"&&req.body.Lectura!="Suspenso"&&req.body.Lectura!="Sci-Fi"&&req.body.Lectura!="Aventura"&&req.body.Lectura!="Históricos"&&req.body.Lectura!="Juvenil"&&req.body.Lectura!="Futuristas"&&req.body.Lectura!="Literatura Clásica"&&req.body.Lectura!="Lírico"&&req.body.Lectura!="Didáctico"&&req.body.Lectura!="Épico"&&req.body.Lectura!="Narrativo"&&req.body.Lectura!="No Me Gusta"){
      error="Solo puedes seleccionar una opción de las establecidas, no hagas trampa";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else if(req.body.Peliculas!="Acción"&&req.body.Peliculas!="Aventuras"&&req.body.Peliculas!="Comedia"&&req.body.Peliculas!="Dramáticas"&&req.body.Peliculas!="Terror"&&req.body.Peliculas!="Musicales"&&req.body.Peliculas!="Ciencia Ficción"&&req.body.Peliculas!="Bélicas"&&req.body.Peliculas!="Para Otakus"&&req.body.Peliculas!="Suspenso"&&req.body.Peliculas!="Clásicas"&&req.body.Peliculas!="Futuristas"&&req.body.Peliculas!="Clásicas"&&req.body.Peliculas!="Futuristas"&&req.body.Peliculas!="Adultos"&&req.body.Peliculas!="Románticas"&&req.body.Peliculas!="Adaptaciones"&&req.body.Peliculas!="Super Héroes"&&req.body.Peliculas!="Animadas"&&req.body.Peliculas!="Infantiles"&&req.body.Peliculas!="Life Action"&&req.body.Peliculas!="Fantasia"&&req.body.Peliculas!="Princesas"&&req.body.Peliculas!="Para Otakus"&&req.body.Peliculas!="Para Otakus adultos"&&req.body.Peliculas!="Policiacas"&&req.body.Peliculas!="Originales De Netflix"&&req.body.Peliculas!="Mudas"&&req.body.Peliculas!="Blanco y Negro"&&req.body.Peliculas!="Western"&&req.body.Peliculas!="Crimen"&&req.body.Peliculas!="Del Tianguis"&&req.body.Peliculas!="No Me Gusta"){
      error="Solo puedes seleccionar una opción de las establecidas, no hagas trampa";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else if(req.body.Deportes!="Soccer"&&req.body.Deportes!="Football"&&req.body.Deportes!="Baseball"&&req.body.Deportes!="Rugby"&&req.body.Deportes!="Natación"&&req.body.Deportes!="Artes Marciales"&&req.body.Deportes!="Basketball"&&req.body.Deportes!="Patinaje Artístico"&&req.body.Deportes!="Polo"&&req.body.Deportes!="Hockey"&&req.body.Deportes!="Box"&&req.body.Deportes!="Ballet"&&req.body.Deportes!="Gimnasia"&&req.body.Deportes!="Tiro Con Arco"&&req.body.Deportes!="Volleyball"&&req.body.Deportes!="Atletismo"&&req.body.Deportes!="Ping Pong"&&req.body.Deportes!="Ajedrez"&&req.body.Deportes!="Frontón"&&req.body.Deportes!="Gym"&&req.body.Deportes!="Squash"&&req.body.Deportes!="No Me Gusta"){
      error="Solo puedes seleccionar una opción de las establecidas, no hagas trampa";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else if(req.body.Video!="RPG"&&req.body.Video!="Acción"&&req.body.Video!="Aventura"&&req.body.Video!="PvP"&&req.body.Video!="PvE"&&req.body.Video!="Battle Royale"&&req.body.Video!="Puzzle"&&req.body.Video!="Suspenso"&&req.body.Video!="Terror"&&req.body.Video!="Deportivos"&&req.body.Video!="Arcade"&&req.body.Video!="Simulación"&&req.body.Video!="Musicales"&&req.body.Video!="Mesa"&&req.body.Video!="Shooters"&&req.body.Video!="No Me Gusta"){
      error="Solo puedes seleccionar una opción de las establecidas, no hagas trampa";
      req.session.error = error;
      res.redirect('/Amigo');
    }
    else{
      mysqlConnection.query('SELECT * FROM usuario WHERE use_us = ?', [req.session.nombre] , (err,result)=>{
          if(err){
            console.log(err);
          }
          mysqlConnection.query('update gustos set nom_gus = ? where id_us = ?',[req.body.Gustos,result[0].id_us],(err1,result1)=>{
            if(err1){
              console.log(err1);
            }
            mysqlConnection.query('SELECT * FROM agrupardeportes WHERE nom_dep = ?',[req.body.Deportes],(err2, result2)=>{
              if(err2){
                console.log(err2);
              }
              mysqlConnection.query('SELECT * FROM agruparpeliculas WHERE nom_pel = ?',[req.body.Peliculas],(err3, result3)=>{
                if(err3){
                  console.log(err3);
                }
                mysqlConnection.query('SELECT * FROM agruparlectura WHERE nom_lec = ?',[req.body.Lectura],(err4, result4)=>{
                  if(err4){
                    console.log(err4);
                  }
                  mysqlConnection.query('SELECT * FROM agruparvideojuegos WHERE nom_vid = ?',[req.body.Video],(err5, result5)=>{
                    if(err5){
                      console.log(err5);
                    }
                    mysqlConnection.query('SELECT * FROM generosmusica WHERE nom_mus = ?',[req.body.Musica],(err6, result6)=>{
                      if(err6){
                        console.log(err6);
                      }
                      mysqlConnection.query('update deportes set id_agDep = ? where id_us = ? ',[result2[0].id_agDep,result[0].id_us],(err7, result7)=>{
                        if(err7){
                          console.log(err7);
                        }
                        mysqlConnection.query('update peliculas set id_agPel = ? where id_us = ?',[result3[0].id_agPel,result[0].id_us],(err8, result8)=>{
                          if(err8){
                            console.log(err8);
                          }
                          mysqlConnection.query('update lectura set id_agLec = ? where id_us = ?',[result4[0].id_agLec,result[0].id_us],(err9, result9)=>{
                            if(err9){
                              console.log(err9);
                            }
                            mysqlConnection.query('update videojuegos set id_agVid = ? where id_us = ?',[result5[0].id_agVid,result[0].id_us],(err10, result10)=>{
                              if(err10){
                                console.log(err10);
                              }
                              mysqlConnection.query('update musica set id_agMus = ? where id_us = ?',[result6[0].id_agMus,result[0].id_us],(err11, result11)=>{
                                if(err11){
                                  console.log(err11);
                                }
                                else{
                                  res.redirect('/Amigo');
                                }
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
      });
    }
}else{
  res.redirect('/Inicio');
}
}
prueba.update = (req, res) => {
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
  const { id } = req.params;
  
  req.getConnection((err, conn) => {

  conn.query('UPDATE prueba set nom_us = ?, con_us = ?, gru_us = ?, bol_us = ?, adm_us = ?, fot_us = ?, use_us = ?, eda_us = ? where id_prueba = ?', [newCustomer, id], (err, rows) => {
    res.redirect('/AD');
  });
  });
}else{
  res.redirect('/Inicio');
}
};
prueba.edit = (req, res) => {
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
  const { id } = req.params;
  conexion((err, conn) => {
    conn.query("SELECT * FROM usuario WHERE id_us = ?", [id], (err, result) => {
      result[0].nom_us=prueba.decipher(result[0].nom_us);
      result[0].gru_us=prueba.decipher(result[0].gru_us);
      result[0].con_us=prueba.decipher(result[0].con_us);
      result[0].bol_us=prueba.decipher(result[0].bol_us);
      result[0].fot_us=prueba.decipher(result[0].fot_us);
      result[0].eda_us=prueba.decipher(result[0].eda_us);
      res.render('Modificar', {
        data: result
      })
    });
  });
}else{
  res.redirect('/Inicio');
}
};
prueba.delete = (req, res) => {
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
  const { id } = req.params;
  var ñ = 0;
  let g = 0;
  mysqlConnection.query('SELECT * FROM usuario WHERE id_us = ?', [id], (err, result) => {
    fs.exists("public/img/"+result[0].use_us+".JPG",(exists)=>{
      if(exists){
        fs.unlinkSync("public/img/"+result[0].use_us+".JPG");
      }
    });
    });
    mysqlConnection.query('DELETE FROM registro WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM blockeduser WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM chat WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM msgchat WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM rp WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM amigo WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM amigo WHERE ida_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM msgchat WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM msgchat WHERE ida_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM chat WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM chat WHERE ida_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM videojuegos WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM agruparvideojuegos WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM gustos WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM lectura WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM agruparlectura WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM carrera WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM agruparcarrera WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM deportes WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM agrupardeportes WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM genero WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM agrupargenero WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM peliculas WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM agruparpeliculas WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM turno WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM agruparturno WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM musica WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM generosmusica WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM registro WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM blockeduser WHERE id_us = ?', [id], (err, rows) => {
    });
    mysqlConnection.query('DELETE FROM notifications WHERE id_us = ?', [id], (err, rows) => {
      if(err){
        console.log(err);
      }
    });
    mysqlConnection.query('SELECT * FROM publicaciones WHERE id_us = ?', [id], (err, resu) => {
      if(err){
        console.log(err);
      }
      if(resu.length==0){
        mysqlConnection.query('DELETE FROM publicaciones WHERE id_us = ?', [id], (err, rows) => {
          if(err){
            console.log(err);
          }
        });
        mysqlConnection.query('DELETE FROM comentarios WHERE id_us = ?', [id], (err, rows) => {
          if(err){
            console.log(err);
          }
        });
        mysqlConnection.query('DELETE FROM reacciones WHERE id_us = ?', [id], (err, rows) => {
          if(err){
            console.log(err);
          }
        });
        mysqlConnection.query('SELECT * FROM chat WHERE id_us = ?',[id],(err, result)=>{
          if(result.length==0){
            mysqlConnection.query('DELETE FROM usuario WHERE id_us = ?', [id], (err, rows) => {
              if(err){
                console.log(err);
              }
              res.redirect('/AD');  
            });
          }else{
            for(var i = 0;i<result.length; i++){
              mysqlConnection.query('DELETE FROM msgchat WHERE id_ch = ?',[result[i].id_ch],(err, result)=>{});
              if(ñ==result.length-1){
                mysqlConnection.query('DELETE FROM chat WHERE id_us = ?', [id], (err, rows) => {
                });
                mysqlConnection.query('DELETE FROM rp WHERE id_us = ?', [id], (err, rows) => {
                });
                mysqlConnection.query('DELETE FROM usuario WHERE id_us = ?', [id], (err, rows) => {
                  if(err){
                    console.log(err);
                  }
                  res.redirect('/AD');  
                });
              }
              ñ++;
            }
          }
        });
      }else{
        for(var i = 0;i<resu.length; i++){
            mysqlConnection.query('DELETE FROM comentarios WHERE id_us = ? or id_pub = ?', [id, resu[i].pub], (err, rows) => {
              if(err){
                console.log(err);
              }
            });
            mysqlConnection.query('DELETE FROM reacciones WHERE id_us = ? or id_pub = ?', [id, resu[i].pub], (err, rows) => {
              if(err){
                console.log(err);
              }
            });
          if(g==resu.length-1){
            mysqlConnection.query('DELETE FROM publicaciones WHERE id_us = ?', [id], (err, rows) => {
              if(err){
                console.log(err);
              }
            });
            mysqlConnection.query('SELECT * FROM chat WHERE id_us = ?',[id],(err, result)=>{
              console.log(result);
              if(result.length==0){
                mysqlConnection.query('DELETE FROM usuario WHERE id_us = ?', [id], (err, rows) => {
                  if(err){
                    console.log(err);
                  }
                  res.redirect('/AD');  
                });
              }else{
                for(var i = 0;i<result.length; i++){
                  mysqlConnection.query('DELETE FROM msgchat WHERE id_ch = ?',[result[i].id_ch],(err, result)=>{});
                  if(ñ==result.length-1){
                    mysqlConnection.query('DELETE FROM chat WHERE id_us = ?', [id], (err, rows) => {
                    });
                    mysqlConnection.query('DELETE FROM rp WHERE id_us = ?', [id], (err, rows) => {
                    });
                    mysqlConnection.query('DELETE FROM usuario WHERE id_us = ?', [id], (err, rows) => {
                      if(err){
                        console.log(err);
                      }
                      res.redirect('/AD');  
                    });
                  }
                  ñ++;
                }
              }
            });
          }
          g++;
        }
      }
    });
    
    
}else{
  res.redirect('/Inicio');
}
}
prueba.rp = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
    console.log(req.params.id);
    req.session.block = req.params.id;
    res.redirect('/blc');
  }else{
    res.redirect('/Inicio');
  }
}
prueba.bck = (req,res)=>{
  if(req.session.nombre!=""&&req.session.id!=""&&req.session.nombre!=undefined&&req.session.id!=undefined){
  mysqlConnection.query('select * from usuario where id_us = ?',[req.session.block],(err, result)=>{
    result[0].nom_us=prueba.decipher(result[0].nom_us);
    result[0].gru_us=prueba.decipher(result[0].gru_us);
    result[0].con_us=prueba.decipher(result[0].con_us);
    result[0].bol_us=prueba.decipher(result[0].bol_us);
    result[0].fot_us=prueba.decipher(result[0].fot_us);
    result[0].eda_us=prueba.decipher(result[0].eda_us);
    res.render('Block',{
      data: result[0]
    });
  });
}else{
  res.redirect('/Inicio');
}
}
prueba.blck = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
    const { id } = req.session.block;
  console.log('HOOOOOOOOOOOOLA');
  mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err,result47)=>{
    console.log(result47[0].id_us);
    console.log(id);
    console.log('Weed HAHA');
    mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result47[0].id_us,req.session.block],(err3,result3)=>{
      console.log(result3[0]);
      if(result3[0]==undefined){
        console.log("Weeeeeeeeed HAHA");
        mysqlConnection.query('insert into rp(id_us,id_usa) values(?,?)',[result47[0].id_us,req.session.block],(err4,result4)=>{
          mysqlConnection.query('insert into rp(id_usa,id_us) values(?,?)',[result47[0].id_us,req.session.block],(err4,result4)=>{});
                res.redirect('/Amigo');
                req.session.block = "";
        });
      }
      else{
        res.redirect('/Amigo');
      }
    });
  });
}else{
  res.redirect('/Inicio');
}
}
prueba.acr = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
  mysqlConnection.query('select * from usuario natural join carrera natural join agruparcarrera natural join turno natural join agruparturno natural join genero natural join agrupargenero where use_us = ?',[req.session.nombre],(err,result)=>{
    result[0].nom_us=prueba.decipher(result[0].nom_us);
    result[0].gru_us=prueba.decipher(result[0].gru_us);
    result[0].con_us=prueba.decipher(result[0].con_us);
    result[0].bol_us=prueba.decipher(result[0].bol_us);
    result[0].fot_us=prueba.decipher(result[0].fot_us);
    result[0].eda_us=prueba.decipher(result[0].eda_us);
    res.render('Registroupd', {page:'Home', menuId:'home',data: "", info: result[0]});
  });
  }else{
    res.redirect('/Inicio');
  }
}
prueba.acad = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
    const {id} = req.params;
  mysqlConnection.query('select * from usuario natural join carrera natural join agruparcarrera natural join turno natural join agruparturno natural join genero natural join agrupargenero where id_us = ?',[id],(err,result)=>{
    result[0].nom_us=prueba.decipher(result[0].nom_us);
    result[0].gru_us=prueba.decipher(result[0].gru_us);
    result[0].con_us=prueba.decipher(result[0].con_us);
    result[0].bol_us=prueba.decipher(result[0].bol_us);
    result[0].fot_us=prueba.decipher(result[0].fot_us);
    result[0].eda_us=prueba.decipher(result[0].eda_us);
    res.render('Registroupd Admin', {page:'Home', menuId:'home',data: "", info: result[0]});
  });
  }else{
    res.redirect('/Inicio');
  }
}
prueba.actReg = (req,res)=>{
  if(req.session.nombre!=undefined&&req.session.nombre!=""){
  mysqlConnection.query('SELECT * FROM usuario WHERE use_us = ?', [req.session.nombre], (err, result) => {
    fs.exists("public/img/"+prueba.decipher(result[0].use_us)+".JPG",(exists)=>{
      if(exists){
        fs.unlinkSync("public/img/"+prueba.decipher(result[0].use_us)+".JPG");
      }
    });
  var ex = 0;
  var error = "";
  var idus = 0;
  var idagcar = 0;
  var idagtur = 0;
  var idaggen = 0;
  var exists = false;
  var year = req.body.birthday.split('/');
  if(req.body.pass == undefined||req.body.birthday == undefined||req.body.Gender == undefined||req.body.Turno == undefined||req.body.Carrera == undefined||req.body.boleta == undefined||req.body.grupo == undefined||req.files.archivo == undefined||req.body.fotop == undefined){
    error="Primero debes llenar todos los campos";
      res.render('Registro',{
        data: error
      });
  }
  else{
    if(req.body.Gender!="Mujer"&&req.body.Gender!="Hombre"&&req.body.Gender!="Otro"){
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
    else if(req.body.Carrera!="T.C."&&req.body.Carrera!="S.D."&&req.body.Carrera!="PROG."&&req.body.Carrera!="M.S.A."){
      error="Solo puedes seleccionar una carrera de las establecidas, no hagas trampa";
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
    fs.renameSync(req.files.archivo.path,"public/img/"+req.session.nombre+".JPG");
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
      mysqlConnection.query('update usuario set con_us = ?,gru_us = ?,bol_us = ?,eda_us = ?,fot_us = ?,ftp_us = ? where use_us = ?', [prueba.cipher(req.body.pass),prueba.cipher(req.body.grupo),prueba.cipher(req.body.boleta),prueba.cipher(req.body.birthday),prueba.cipher("./img/"+req.session.nombre+".JPG"),fotop,req.session.nombre],(err)=>{
      console.log(err);
    });
    mysqlConnection.query('SELECT id_us FROM usuario WHERE use_us = ?',[req.session.nombre], (err,result)=>{
      mysqlConnection.query('SELECT id_agCar FROM agruparcarrera WHERE nom_car = ?',[req.body.Carrera], (err,result1)=>{
        mysqlConnection.query('SELECT id_agTur FROM agruparturno WHERE nom_tur = ?',[req.body.Turno], (err,result2)=>{
          mysqlConnection.query('SELECT id_agGen FROM agrupargenero WHERE nom_gen = ?',[req.body.Gender], (err,result3)=>{
            mysqlConnection.query('update carrera set id_agCar = ? where id_us = ?', [result1[0].id_agCar,result[0].id_us],(err)=>{
            });
            mysqlConnection.query('update turno set id_agTur = ? where id_us = ?', [result2[0].id_agTur,result[0].id_us],(err)=>{
            });
            mysqlConnection.query('update genero set id_agGen = ? where id_us = ?', [result3[0].id_agGen,result[0].id_us],(err)=>{
              if(!err){
                res.redirect('/Amigo');
              }
              else{
                res.redirect('/Amigo');
              }
            });
          });
        });
      });
    });
    }
  }
  
  });
}else{
  res.redirect('/Inicio');
}

}
prueba.actRegAd = (req,res)=>{
  if(req.session.nombre!=undefined&&req.session.nombre=="Admin"){
  mysqlConnection.query('SELECT * FROM usuario WHERE use_us = ?', [req.body.user], (err, result) => {
    fs.exists("public/img/"+req.body.user+".JPG",(exists)=>{
      if(exists){
        fs.unlinkSync("public/img/"+req.body.user+".JPG");
      }
    });
  var ex = 0;
  var error = "";
  var idus = 0;
  var idagcar = 0;
  var idagtur = 0;
  var idaggen = 0;
  var exists = false;
  var year = req.body.birthday.split('/');
  if(req.body.pass == undefined||req.body.birthday == undefined||req.body.Gender == undefined||req.body.Turno == undefined||req.body.Carrera == undefined||req.body.boleta == undefined||req.body.grupo == undefined||req.files.archivo == undefined||req.body.fotop == undefined){
    error="Primero debes llenar todos los campos";
      res.render('Registro',{
        data: error
      });
  }
  else{
    if(req.body.Gender!="Mujer"&&req.body.Gender!="Hombre"&&req.body.Gender!="Otro"){
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
    else if(req.body.Carrera!="T.C."&&req.body.Carrera!="S.D."&&req.body.Carrera!="PROG."&&req.body.Carrera!="M.S.A."){
      error="Solo puedes seleccionar una carrera de las establecidas, no hagas trampa";
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
    fs.renameSync(req.files.archivo.path,"public/img/"+req.body.user+".JPG");
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
      mysqlConnection.query('update usuario set con_us = ?,gru_us = ?,bol_us = ?,eda_us = ?,fot_us = ?,ftp_us = ? where use_us = ?', [prueba.cipher(req.body.pass),prueba.cipher(req.body.grupo),prueba.cipher(req.body.boleta),prueba.cipher(req.body.birthday),prueba.cipher("./img/"+req.body.user+".JPG"),fotop,req.body.user],(err)=>{
      console.log(err);
    });
    mysqlConnection.query('SELECT id_us FROM usuario WHERE use_us = ?',[req.body.user], (err,result)=>{
      mysqlConnection.query('SELECT id_agCar FROM agruparcarrera WHERE nom_car = ?',[req.body.Carrera], (err,result1)=>{
        mysqlConnection.query('SELECT id_agTur FROM agruparturno WHERE nom_tur = ?',[req.body.Turno], (err,result2)=>{
          mysqlConnection.query('SELECT id_agGen FROM agrupargenero WHERE nom_gen = ?',[req.body.Gender], (err,result3)=>{
            mysqlConnection.query('update carrera set id_agCar = ? where id_us = ?', [result1[0].id_agCar,result[0].id_us],(err)=>{
            });
            mysqlConnection.query('update turno set id_agTur = ? where id_us = ?', [result2[0].id_agTur,result[0].id_us],(err)=>{
            });
            mysqlConnection.query('update genero set id_agGen = ? where id_us = ?', [result3[0].id_agGen,result[0].id_us],(err)=>{
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
  }
  
  });
}else{
  res.redirect('/Inicio');
}

}
prueba.report = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
  mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err,result47)=>{
    console.log(result47[0].id_us);
    console.log('Weed HAHA');
    mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result47[0].id_us,req.session.block],(err3,result3)=>{
      console.log(result3[0]);
      if(result3[0]==undefined){
        console.log("Weeeeeeeeed HAHA");
        mysqlConnection.query('insert into rp(id_us,id_usa) values(?,?)',[result47[0].id_us,req.session.block],(err4,result4)=>{
          mysqlConnection.query('insert into rp(id_usa,id_us) values(?,?)',[result47[0].id_us,req.session.block],(err4,result4)=>{});
          console.log(err4);
          mysqlConnection.query('select * from blockeduser where id_us = ?',[req.session.block],(err5, result5)=>{
            console.log(err5);
            if(result5.length>0&&result5[0].wrn_bl>1){
              mysqlConnection.query('update blockeduser set blo_bl = ?, rea_bl = ?, wrn_bl = ? where id_us = ?',[true,"El usuario ha sido reportado en su tercera incidencia con el sistema",3,req.session.block],(err6,result6)=>{
                console.log(err6);
                req.session.block = "";
                res.redirect('/Amigo');
              });
            }else if(result5.length>0&&result5[0].wrn_bl<2){
              mysqlConnection.query('update blockeduser set wrn_bl = ? where id_us=?',[result5[0].wrn_bl + 1,req.session.block],(err6,result6)=>{
                console.log(err6);
                req.session.block = "";
                res.redirect('/Amigo');
              });
            }
            else{
              mysqlConnection.query('insert into blockeduser(wrn_bl,blo_bl,id_us) values(?,?,?) ',[1,false,req.session.block],(err6,result6)=>{
                console.log(err6);
                req.session.block = "";
                res.redirect('/Amigo');
              });
            }
          });
        });
      }
      else{
        req.session.block = "";
        res.redirect('/Amigo');
      }
    });
  });
  }else{
  res.redirect('/Inicio');
}
}
prueba.revi = (req,res)=>{
    if(req.session.nombre!=undefined&&req.session.nombre!=""){
      mysqlConnection.query('select*from usuario where use_us = ?',[req.session.nombre],(err,result)=>{
        mysqlConnection.query('select * from revision where id_us = ?',[result[0].id_us],(err2, result2)=>{
          if(result2[0] == undefined){
            mysqlConnection.query('select * from blockeduser where id_us = ? ',[result[0].id_us],(err3, result3)=>{
              if(result3[0].wrn_bl!=99&&result3[0].wrn_bl!=1080){
                mysqlConnection.query('insert into revision(id_us,id_bl) values(?,?)',[result[0].id_us,result3[0].id_bl],(err4, result4)=>{
                  error="La revisión está en proceso, "+req.session.nombre+", si consideramos que no hay razón de bloqueo, se te devolverá tu cuenta";
                    res.render('Inicio',{
                      data: error
                    });
                });
              }else if(result3[0].wrn_bl!=1080){
                error=req.session.nombre+", Ya haz solicitado revisión anteriormente y se ha determinado una suspensión permanente de tu cuenta";
                    res.render('Inicio',{
                      data: error
                    });
              }else{
                error=req.session.nombre+", Se te advirtió que reportar sin fundamento llevaría a una sanción permanente de tu cuenta";
                    res.render('Inicio',{
                      data: error
                    });
              }
            });
          }else{
            error="Ya hay una revisión en proceso, "+req.session.nombre;
            res.render('Inicio',{
              data: error
            });
          }
        });
      });
    }else{
      res.redirect('/Inicio');
    }
}
prueba.rev = (req,res)=>{
  req.session.rev = req.params.id;
  res.redirect('/Revision');
}
prueba.revision = (req,res)=>{
  if(req.session.nombre!=undefined&&req.session.nombre!=""){
  var friendr = [];
  var chatr = [];
  var s = 0;
  var n = 0;
  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ?',[req.session.rev],(err6,result6)=>{
    mysqlConnection.query('select * from rp where id_us = ?',[req.session.rev],(err5,result5)=>{
      for(var i = 0;i<result5.length; i++){
        mysqlConnection.query('select * from usuario where id_us = ?',[result5[i].id_usa],(err4, result4)=>{
                              result4[0].nom_us = prueba.decipher(result4[0].nom_us);
                              result4[0].con_us = prueba.decipher(result4[0].con_us);
                              result4[0].gru_us = prueba.decipher(result4[0].gru_us);
                              result4[0].bol_us = prueba.decipher(result4[0].bol_us);
                              result4[0].eda_us = prueba.decipher(result4[0].eda_us);
                              result4[0].fot_us = prueba.decipher(result4[0].fot_us);
          friendr.push(result4[0]);
          if(s==result5.length-1){
            for(var j = 0;j<result5.length; j++){
            mysqlConnection.query('select * from chat natural join msgchat natural join usuario where id_us = ? and ida_us =? ',[result5[j].id_us,result5[j].id_usa],(err56, result56)=>{
              chatr.push(result56);
                              result6[0].nom_us = prueba.decipher(result6[0].nom_us);
                              result6[0].con_us = prueba.decipher(result6[0].con_us);
                              result6[0].gru_us = prueba.decipher(result6[0].gru_us);
                              result6[0].bol_us = prueba.decipher(result6[0].bol_us);
                              result6[0].eda_us = prueba.decipher(result6[0].eda_us);
                              result6[0].fot_us = prueba.decipher(result6[0].fot_us);
              if(n==result5.length-1){
              res.render('Revision',{
              data: result6[0],
              rev: friendr,
              chat: chatr,
              user: req.session.nombre
              });
              }
              n++;
            });
            }
          }
          s++;
          
        });
      }
    });
  });
}else{
  res.redirect('/Inicio');
}
}
prueba.sop = (req,res)=>{
  if(req.session.nombre!=undefined&&req.session.nombre!=""){
  const { id } = req.params;
  console.log(id);
  mysqlConnection.query('delete from revision where id_us = ?',[id],()=>{
  });
  mysqlConnection.query('delete from blockeduser where id_us = ?',[id],(err)=>{
    console.log(err);
  });
  res.redirect('/AD');
  }else{
    res.redirect('/Inicio');
  }
}
prueba.bqd = (req,res)=>{
  if(req.session.nombre!=undefined&&req.session.nombre!=""){
  const { id } = req.params;
  console.log(id);
  mysqlConnection.query('delete from revision where id_us = ?',[id],()=>{
  });
  mysqlConnection.query('update blockeduser set wrn_bl = 99, rea_bl = "Se ha analizado el caso y se ha determinado que hay fundamento suficiente para bloquearlo del sistema" where id_us = ?',[id],(err)=>{
    console.log(err);
  });
  res.redirect('/AD');
  }else{
    res.redirect('/Inicio');
  }
}
prueba.bqs = (req,res)=>{
  if(req.session.nombre!=undefined&&req.session.nombre!=""){
  const { id } = req.params;
  console.log(id + "HOla");
  mysqlConnection.query('delete from revision where id_us = ?',[id],()=>{
  });
  mysqlConnection.query('select * from blockeduser where id_us = ?',[id],(err, result)=>{
    if(result.length>0){
      mysqlConnection.query('update blockeduser set wrn_bl = 1080, rea_bl = "Uno de los usuarios que haz reportado solicitó revisión, y hemos determinado que lo has bloqueado sin razón alguna" where id_us = ?',[id],(err)=>{
      });
    }else{
      mysqlConnection.query('insert into blockeduser(wrn_bl,rea_bl,id_us,blo_bl) values(1080,"Uno de los usuarios que haz reportado solicitó revisión, y hemos determinado que lo has bloqueado sin razón alguna",?,true)',[id],(err)=>{
      });
    }
  });
  res.redirect('/AD');
  }else{
    res.redirect('/Inicio');
  }
}
prueba.stalk = (req,res)=>{
  req.session.stlk = req.params.id;
  res.redirect('/stalk');
}
prueba.stlk = (req,res)=>{
  if(req.session.nombre!=undefined&&req.session.nombre!=""){
    console.log(req.session.stalk);
    var friendr = [];
    var chatr = [];
    var s = 0;
    var n = 0;
    console.log("Hola");
    mysqlConnection.query('select * from usuario natural join turno natural join agruparturno natural join genero natural join agrupargenero natural join carrera natural join agruparcarrera natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo natural join escuela where id_us = ?',[req.session.stlk],(err6,result6)=>{
      if(result6.length==0){
        console.log("Hola2");
        mysqlConnection.query('select * from usuario natural join turno natural join agruparturno natural join genero natural join agrupargenero natural join carrera natural join agruparcarrera natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join escuela where id_us = ?',[req.session.stlk],(err65,result65)=>{
          if(result65.length==0){
            console.log("Hola3");
            mysqlConnection.query('select * from usuario natural join turno natural join agruparturno natural join genero natural join agrupargenero natural join carrera natural join agruparcarrera natural join escuela where id_us = ?',[req.session.stlk],(err656,result656)=>{
              result656[0].nom_us=prueba.decipher(result656[0].nom_us);
                      result656[0].con_us=prueba.decipher(result656[0].con_us);
                      result656[0].gru_us=prueba.decipher(result656[0].gru_us);
                      result656[0].bol_us=prueba.decipher(result656[0].bol_us);
                      result656[0].fot_us=prueba.decipher(result656[0].fot_us);
                      result656[0].eda_us=prueba.decipher(result656[0].eda_us);
                      for (var i = 0; i <friendr.length; i++) {
                        friendr[i].nom_us=prueba.decipher(friendr[i].nom_us);
                        friendr[i].con_us=prueba.decipher(friendr[i].con_us);
                        friendr[i].gru_us=prueba.decipher(friendr[i].gru_us);
                        friendr[i].bol_us=prueba.decipher(friendr[i].bol_us);
                        friendr[i].fot_us=prueba.decipher(friendr[i].fot_us);
                        friendr[i].eda_us=prueba.decipher(friendr[i].eda_us);
                  } 
              res.render('Stalker',{
                data: result656[0],
                rev: friendr,
                chat: chatr,
                user: req.session.nombre
                });
            });
          }else{
            result65[0].nom_us=prueba.decipher(result65[0].nom_us);
                      result65[0].con_us=prueba.decipher(result65[0].con_us);
                      result65[0].gru_us=prueba.decipher(result65[0].gru_us);
                      result65[0].bol_us=prueba.decipher(result65[0].bol_us);
                      result65[0].fot_us=prueba.decipher(result65[0].fot_us);
                      result65[0].eda_us=prueba.decipher(result65[0].eda_us);
                      for (var i = 0; i <friendr.length; i++) {
                        friendr[i].nom_us=prueba.decipher(friendr[i].nom_us);
                        friendr[i].con_us=prueba.decipher(friendr[i].con_us);
                        friendr[i].gru_us=prueba.decipher(friendr[i].gru_us);
                        friendr[i].bol_us=prueba.decipher(friendr[i].bol_us);
                        friendr[i].fot_us=prueba.decipher(friendr[i].fot_us);
                        friendr[i].eda_us=prueba.decipher(friendr[i].eda_us);
                  } 
            res.render('Stalker',{
              data: result65[0],
              rev: friendr,
              chat: chatr,
              user: req.session.nombre
              });
          }
        });
      }
      else{
      mysqlConnection.query('select * from amigo where ida_us = ?',[req.session.stlk],(err5,result5)=>{
        console.log(result5.length);
        if(result5.length>0){
          for(var i = 0;i<result5.length; i++){
            mysqlConnection.query('select * from usuario where id_us = ?',[result5[i].id_us],(err4, result4)=>{
              friendr.push(result4[0]);
              if(s==result5.length-1){
                for(var j = 0;j<result5.length; j++){
                mysqlConnection.query('select * from chat natural join msgchat natural join usuario where id_us = ? and ida_us =? ',[result5[j].ida_us,result5[j].id_us],(err56, result56)=>{
                  chatr.push(result56);
                  if(n==result5.length-1){
                  for (var i = 0; i <friendr.length; i++) {
                        friendr[i].nom_us=prueba.decipher(friendr[i].nom_us);
                        friendr[i].con_us=prueba.decipher(friendr[i].con_us);
                        friendr[i].gru_us=prueba.decipher(friendr[i].gru_us);
                        friendr[i].bol_us=prueba.decipher(friendr[i].bol_us);
                        friendr[i].fot_us=prueba.decipher(friendr[i].fot_us);
                        friendr[i].eda_us=prueba.decipher(friendr[i].eda_us);
                  } 
                        result6[0].nom_us=prueba.decipher(result6[0].nom_us);
                        result6[0].con_us=prueba.decipher(result6[0].con_us);
                        result6[0].gru_us=prueba.decipher(result6[0].gru_us);
                        result6[0].bol_us=prueba.decipher(result6[0].bol_us);
                        result6[0].fot_us=prueba.decipher(result6[0].fot_us);
                        result6[0].eda_us=prueba.decipher(result6[0].eda_us); 
                  res.render('Stalker',{
                  data: result6[0],
                  rev: friendr,
                  chat: chatr,
                  user: req.session.nombre
                  });
                  }
                  n++;
                });
                }
              }
              s++;
              
            });
          }
        }else{
                        result6[0].nom_us=prueba.decipher(result6[0].nom_us);
                        result6[0].con_us=prueba.decipher(result6[0].con_us);
                        result6[0].gru_us=prueba.decipher(result6[0].gru_us);
                        result6[0].bol_us=prueba.decipher(result6[0].bol_us);
                        result6[0].fot_us=prueba.decipher(result6[0].fot_us);
                        result6[0].eda_us=prueba.decipher(result6[0].eda_us); 
          res.render('Stalker',{
            data: result6[0],
            rev: friendr,
            chat: chatr,
            user: req.session.nombre
            });
        }
      });
      }
  });
  }else{
    res.redirect('/Inicio');
  }
}
prueba.cipher = (text)=>{
  var ciphertext = CryptoJS.AES.encrypt(text, 'EmilianeVícterLuesMigueleMeetUqw');
  return ciphertext.toString();
}
prueba.decipher = (text)=>{
  var bytes  = CryptoJS.AES.decrypt(text, 'EmilianeVícterLuesMigueleMeetUqw');
  var plaintext = bytes.toString(CryptoJS.enc.Utf8);
  return plaintext;
}
prueba.validaUserLengthInicio = (user)=>{
  var val = true;
  if(user.length<3||user.length>40){
    val = false;
  }
  return val;
}
prueba.validaPassLengthInicio = (pass)=>{
  var val = true;
  if(pass.length<8||pass.length>15){
    val = false;
  }
  return val;
}
prueba.validaUserInicio = (user)=>{
  var val = true;
  if(user.includes('|')||user.includes('!')||user.includes('"')||user.includes('&')||user.includes('/')||user.includes('(')||user.includes(')')||user.includes('=')||user.includes('?')||user.includes('  ')||user.includes('¡')||user.includes('¿')||user.includes('¨')||user.includes('*')||user.includes('+')||user.includes('[')||user.includes(']')||user.includes('{')||user.includes('}')||user.includes('^')||user.includes('`')||user.includes('.')||user.includes(';')||user.includes(',')||user.includes(':')||user.includes('-')||user.includes('/')||user.includes('*')||user.includes('-')||user.includes('♥')||user.includes('☻')||user.includes('♦')||user.includes('☺')||user.includes('♣')||user.includes('♠')||user.includes('•')||user.includes('◘')||user.includes('○')||user.includes('<')||user.includes('>')||user.includes('°')){
    val = false;
  }
  return val;
}
prueba.validaPassInicio = (pass)=>{
  var val = true;
  if(pass.includes('|')||pass.includes('!')||pass.includes('"')||pass.includes('&')||pass.includes('/')||pass.includes('(')||pass.includes(')')||pass.includes('=')||pass.includes('?')||pass.includes('  ')||pass.includes('¡')||pass.includes('¿')||pass.includes('¨')||pass.includes('*')||pass.includes('+')||pass.includes('[')||pass.includes(']')||pass.includes('{')||pass.includes('}')||pass.includes('^')||pass.includes('`')||pass.includes('.')||pass.includes(';')||pass.includes(',')||pass.includes(':')||pass.includes('-')||pass.includes('/')||pass.includes('*')||pass.includes('-')||pass.includes('♥')||pass.includes('☻')||pass.includes('♦')||pass.includes('☺')||pass.includes('♣')||pass.includes('♠')||pass.includes('•')||pass.includes('◘')||pass.includes('○')||pass.includes('<')||pass.includes('>')||pass.includes('°')){
    val = false;
  }
  return val;
}
prueba.validaInteresesVacíos = (Gustos,Musica,Lectura,Peliculas,Deportes,Video)=>{
  var val = true;
  if(Gustos == undefined||Musica == undefined||Lectura == undefined||Peliculas == undefined||Deportes == undefined||Video == undefined){
    val = false;
  }
  return val;
}
prueba.validaInteresesGustosLength = (Gustos)=>{
  var val = true;
  if(Gustos.length<8||Gustos.length>150){
    val = false;
  }
  return val;
}
prueba.validaInteresesGustos = (Gustos)=>{
  var val = true;
  if(Gustos.includes('1')||Gustos.includes('2')||Gustos.includes('3')||Gustos.includes('4')||Gustos.includes('5')||Gustos.includes('6')||Gustos.includes('7')||Gustos.includes('8')||Gustos.includes('9')||Gustos.includes('0')||Gustos.includes('|')||Gustos.includes('!')||Gustos.includes('"')||Gustos.includes('#')||Gustos.includes('$')||Gustos.includes('%')||Gustos.includes('&')||Gustos.includes('/')||Gustos.includes('(')||Gustos.includes(')')||Gustos.includes('=')||Gustos.includes('?')||Gustos.includes('  ')||Gustos.includes('¡')||Gustos.includes('¿')||Gustos.includes('¨')||Gustos.includes('*')||Gustos.includes('+')||Gustos.includes('[')||Gustos.includes(']')||Gustos.includes('{')||Gustos.includes('}')||Gustos.includes('^')||Gustos.includes('`')||Gustos.includes('.')||Gustos.includes(';')||Gustos.includes(',')||Gustos.includes(':')||Gustos.includes('-')||Gustos.includes('_')||Gustos.includes('/')||Gustos.includes('*')||Gustos.includes('-')||Gustos.includes('♥')||Gustos.includes('☻')||Gustos.includes('♦')||Gustos.includes('☺')||Gustos.includes('♣')||Gustos.includes('♠')||Gustos.includes('•')||Gustos.includes('◘')||Gustos.includes('○')||Gustos.includes('<')||Gustos.includes('>')||Gustos.includes('°')){
    val = false;
  }
  return val;
}
prueba.validaInteresesMusica = (Musica)=>{
  var val = true;
  if(Musica!="Dubstep"&&Musica!="Blues"&&Musica!="Country"&&Musica!="Cumbia"&&Musica!="Disco"&&Musica!="Electrónica"&&Musica!="Flamenco"&&Musica!="Folk"&&Musica!="Funk"&&Musica!="Gospel"&&Musica!="Heavy Metal"&&Musica!="Hip Hop"&&Musica!="Reggaeton"&&Musica!="Rock"&&Musica!="Rap"&&Musica!="Deathstep"&&Musica!="Alternativa"&&Musica!="SynthWave"&&Musica!="Pop"&&Musica!="Riddim"&&Musica!="Brostep"&&Musica!="Para Otakus"&&Musica!="Drum and Bass"&&Musica!="Jazz"&&Musica!="Clásica"&&Musica!="Instrumental"&&Musica!="Perreo"&&Musica!="Punk"&&Musica!="Rumba"&&Musica!="Tango"&&Musica!="Indie"&&Musica!="Soul"&&Musica!="House"&&Musica!="Techno"&&Musica!="Reggae"&&Musica!="Salsa"&&Musica!="Banda Sonora"&&Musica!="No Me Gusta"){
    val = false;
  }
  return val;
}
prueba.validaInteresesLectura = (Lectura)=>{
  var val = true;
  if(Lectura!="Drama"&&Lectura!="Terror"&&Lectura!="Suspenso"&&Lectura!="Sci-Fi"&&Lectura!="Aventura"&&Lectura!="Históricos"&&Lectura!="Juvenil"&&Lectura!="Futuristas"&&Lectura!="Literatura Clásica"&&Lectura!="Lírico"&&Lectura!="Didáctico"&&Lectura!="Épico"&&Lectura!="Narrativo"&&Lectura!="No Me Gusta"){
    val = false
  }
  return val;
}
prueba.validaInteresesPeliculas = (Peliculas)=>{
  var val = true;
  if(Peliculas!="Acción"&&Peliculas!="Aventuras"&&Peliculas!="Comedia"&&Peliculas!="Dramáticas"&&Peliculas!="Terror"&&Peliculas!="Musicales"&&Peliculas!="Ciencia Ficción"&&Peliculas!="Bélicas"&&Peliculas!="Para Otakus"&&Peliculas!="Suspenso"&&Peliculas!="Clásicas"&&Peliculas!="Futuristas"&&Peliculas!="Clásicas"&&Peliculas!="Futuristas"&&Peliculas!="Adultos"&&Peliculas!="Románticas"&&Peliculas!="Adaptaciones"&&Peliculas!="Super Héroes"&&Peliculas!="Animadas"&&Peliculas!="Infantiles"&&Peliculas!="Life Action"&&Peliculas!="Fantasia"&&Peliculas!="Princesas"&&Peliculas!="Para Otakus"&&Peliculas!="Para Otakus adultos"&&Peliculas!="Policiacas"&&Peliculas!="Originales De Netflix"&&Peliculas!="Mudas"&&Peliculas!="Blanco y Negro"&&Peliculas!="Western"&&Peliculas!="Crimen"&&Peliculas!="Del Tianguis"&&Peliculas!="No Me Gusta"){
    val = false;
  }
  return val;
}
prueba.validaInteresesDeportes = (Deportes)=>{
  var val = true;
  if(Deportes!="Soccer"&&Deportes!="Football"&&Deportes!="Baseball"&&Deportes!="Rugby"&&Deportes!="Natación"&&Deportes!="Artes Marciales"&&Deportes!="Basketball"&&Deportes!="Patinaje Artístico"&&Deportes!="Polo"&&Deportes!="Hockey"&&Deportes!="Box"&&Deportes!="Ballet"&&Deportes!="Gimnasia"&&Deportes!="Tiro Con Arco"&&Deportes!="Volleyball"&&Deportes!="Atletismo"&&Deportes!="Ping Pong"&&Deportes!="Ajedrez"&&Deportes!="Frontón"&&Deportes!="Gym"&&Deportes!="Squash"&&Deportes!="No Me Gusta"){
    val = false;
  }
  return val;
}
prueba.validaInteresesVideoJuegos = (Video)=>{
  var val = true;
  if(Video!="RPG"&&Video!="Acción"&&Video!="Aventura"&&Video!="PvP"&&Video!="PvE"&&Video!="Battle Royale"&&Video!="Puzzle"&&Video!="Suspenso"&&Video!="Terror"&&Video!="Deportivos"&&Video!="Arcade"&&Video!="Simulación"&&Video!="Musicales"&&Video!="Mesa"&&Video!="Shooters"&&Video!="No Me Gusta"){
    val = false;
  }
  return val;
}
prueba.publicaciones = (req,res)=>{
  if(req.session.nombre!=undefined&&req.session.nombre!=""){
    fs.renameSync(req.files.archivo.path,"public/img/"+req.body.tit+"---"+req.session.nombre+".JPG");
    let fri = req.body.fri;
    let fr;
    let img = "";
    if(fri == "0"){
      fr=true;
      img = "./img/"+req.body.tit+"---"+req.session.nombre+".JPG";
    }else{
      fr=false;
      img = "blank"
    }
    mysqlConnection.query("select * from publicaciones natural join usuario natural join registro where use_us = ?",[req.session.nombre],(err34,result34)=>{
      if(result34.length>4){
        res.redirect('/Amigo');
      }else{
        mysqlConnection.query("select * from usuario where use_us = ?",[req.session.nombre],(err,result)=>{
          if(img == "blank"){
            img = result[0].ftp_us;
          }
          mysqlConnection.query("insert into registro(id_us) values(?)",[result[0].id_us],(err1,result1)=>{
            mysqlConnection.query("select * from registro where id_us = ?",[result[0].id_us],(err2,result2)=>{
              mysqlConnection.query("insert into publicaciones(tex_pub,img_pub,trf_pub,id_reg,id_us,tit_pub) values(?,?,?,?,?,?)",[req.body.pub,img,fr,result2[result2.length-1].id_reg,result[0].id_us,req.body.tit],(err,result)=>{
                res.redirect('/Amigo');
              });
            });
          });
        });
      }
    });
  }else{
    res.redirect("/Inicio");
  }
}
prueba.prof = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
    const { id } = req.params;
    req.session.prof = id;
    res.redirect('/Prof');
  }else{
    res.redirect('/Inicio');
  }
}
prueba.profile = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined&&req.session.prof!=undefined){
    var friends = [];
    var l = 0;
    var m = 0;
    let com = [];
    let teta = 0;
    let geta = 0;
    let heta = 0;
    let id_pub;
    mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err,result)=>{
      mysqlConnection.query('insert into registro(id_us) values(?)',[result[0].id_us],(err667,result667)=>{
      });
      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where use_us = ?',[req.session.nombre],(err6,result6)=>{
        mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where ida_us = ?',[result[0].id_us],(err44,result44)=>{
        if(result6.length>0&&result44.length==0){
          for(var i = 0;i<result6.length;i++){
            req.session.i = i;
            req.session.r = result6.length;
            mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result6[i].ida_us,result6[i].id_us],(err22,result22)=>{
              if(result22[0]!=undefined){
              mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
                var blocked = false;
                if(result56[0]!=undefined){
                  blocked = true;
                }
              if(result22[0]!=undefined){
                result22[0].blocked = blocked;
                friends.push(result22[0]);
              }
              else{
                req.session.r -= 1; 
              }
              if((friends.length==req.session.r)&&l==0){
                l++;
                mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join amigo where id_us = ? and ida_us = ?',[req.session.prof,result[0].id_us],(err555,result555)=>{
                  mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result[0].id_us,result555[0].id_us,result[0].id_us,result555[0].id_us],(err444,result444)=>{
                    mysqlConnection.query("select * from publicaciones natural join registro natural join usuario where use_us = ?",[result555[0].use_us],(err1234,result1234)=>{
                    mysqlConnection.query('select * from registro where id_us = ?',[result555[0].id_us],(err610,result610)=>{
                    for(var i = 0; i<result444.length; i++){
                      if(result444[i].msg_ms!=undefined){
                        result444[i].msg_ms = prueba.decipher(result444[i].msg_ms);
                      }
                    }
                    if(result610[0]!=undefined){
                        result555[0].log = result610[result610.length-1].log;
                     }else{
                        result555[0].log = "El usuario no ha entrado a chat aún";
                     }
                    mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result555[0].ida_us, result555[0].id_us],(err57,result57)=>{
                      var block = false;
                      if(result57[0]!=undefined){
                        block = true;
                      }
                      result555[0].blocked = block;
                      result16[0].nom_us=prueba.decipher(result16[0].nom_us);
                      result16[0].gru_us=prueba.decipher(result16[0].gru_us);
                      result16[0].con_us=prueba.decipher(result16[0].con_us);
                      result16[0].bol_us=prueba.decipher(result16[0].bol_us);
                      result16[0].fot_us=prueba.decipher(result16[0].fot_us);
                      result16[0].eda_us=prueba.decipher(result16[0].eda_us);
                      for(var i = 0; i<friends.length; i++){
                        friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                        friends[i].con_us = prueba.decipher(friends[i].con_us);
                        friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                        friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                        friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                        friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                      }
                      result555[0].nom_us=prueba.decipher(result555[0].nom_us);
                      result555[0].gru_us=prueba.decipher(result555[0].gru_us);
                      result555[0].con_us=prueba.decipher(result555[0].con_us);
                      result555[0].bol_us=prueba.decipher(result555[0].bol_us);
                      result555[0].fot_us=prueba.decipher(result555[0].fot_us);
                      result555[0].eda_us=prueba.decipher(result555[0].eda_us);
                      console.log("a");
                      if(result1234.length == 0){
                        res.render('Profile',{
                          data: result16[0],
                          amigos: friends,
                          chat: result555[0],
                          msg: result444,
                          user: req.session.nombre,
                          pub: result1234,
                          com: com
                          });
                      }else{
                      for(var phi = 0; phi<result1234.length; phi++){
                        mysqlConnection.query('select * from comentarios natural join usuario where id_pub = ?',[result1234[geta].id_pub],(err,result1206)=>{
                            if(result1206.length>0){
                              id_pub = result1206[0].id_pub;
                            }
                            console.log(id_pub);
                          mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err2160,result2160)=>{
                                    heta = 0;
                                if(result1206.length>0){
                                  result1206.id_pub = result1206[0].id_pub;
                                }
                                  com.push(result1206);
                                
                          if(teta==result1234.length-1){
                            phi = result1234.length;
                              req.session.data = result16[0];
                              req.session.amigos = friends;
                              req.session.chat = result555[0];
                              req.session.msg = result444;
                              req.session.pub = result1234;
                              req.session.com = com;
                              res.redirect('/ProfDos');
                            }
                            teta++;
                          });
                          });
                          geta++;
                        }
                      }
                    });
                  });
                  
                  });
                });
                });
                i = req.session.r.length;
              }
            });
            }else{
              req.session.r -= 1; 
              if((friends.length==req.session.r)&&l==0){
                l++;
                mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join amigo where id_us = ? and ida_us = ?',[req.session.prof,result[0].id_us],(err555,result555)=>{
                  mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result[0].id_us,result555[0].id_us,result[0].id_us,result555[0].id_us],(err444,result444)=>{
                    mysqlConnection.query("select * from publicaciones natural join registro natural join usuario where use_us = ?",[result555[0].use_us],(err1234,result1234)=>{
                    mysqlConnection.query('select * from registro where id_us = ?',[result555[0].id_us],(err610,result610)=>{
                      for(var i = 0; i<result444.length; i++){
                        if(result444[i].msg_ms!=undefined){
                          result444[i].msg_ms = prueba.decipher(result444[i].msg_ms);
                        }
                      }
                      if(result610[0]!=undefined){
                         result555[0].log = result610[result610.length-1].log;
                      }else{
                         result555[0].log = "El usuario no ha entrado a chat aún";
                      }
                    mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result555[0].ida_us, result555[0].id_us],(err57,result57)=>{
                      var block = false;
                      if(result57[0]!=undefined){
                        block = true;
                      }
                      result555[0].blocked = block;
                      result16[0].nom_us=prueba.decipher(result16[0].nom_us);
                      result16[0].gru_us=prueba.decipher(result16[0].gru_us);
                      result16[0].con_us=prueba.decipher(result16[0].con_us);
                      result16[0].bol_us=prueba.decipher(result16[0].bol_us);
                      result16[0].fot_us=prueba.decipher(result16[0].fot_us);
                      result16[0].eda_us=prueba.decipher(result16[0].eda_us);
                      
                      result555[0].nom_us=prueba.decipher(result555[0].nom_us);
                      result555[0].gru_us=prueba.decipher(result555[0].gru_us);
                      result555[0].con_us=prueba.decipher(result555[0].con_us);
                      result555[0].bol_us=prueba.decipher(result555[0].bol_us);
                      result555[0].fot_us=prueba.decipher(result555[0].fot_us);
                      result555[0].eda_us=prueba.decipher(result555[0].eda_us);
                      for(var i = 0; i<friends.length; i++){
                        friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                        friends[i].con_us = prueba.decipher(friends[i].con_us);
                        friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                        friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                        friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                        friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                      }
                      console.log("b");
                      if(result1234.length == 0){
                        res.render('Profile',{
                          data: result16[0],
                          amigos: friends,
                          chat: result555[0],
                          msg: result444,
                          user: req.session.nombre,
                          pub: result1234,
                          com: com
                          });
                      }else{
                      for(var phi = 0; phi<result1234.length; phi++){
                        mysqlConnection.query('select * from comentarios natural join usuario where id_pub = ?',[result1234[geta].id_pub],(err,result1206)=>{
                            if(result1206.length>0){
                              id_pub = result1206[0].id_pub;
                            }
                            console.log(id_pub);
                          mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err2160,result2160)=>{
                                    heta = 0;
                                if(result1206.length>0){
                                  result1206.id_pub = result1206[0].id_pub;
                                }
                                  com.push(result1206);
                                
                          if(teta==result1234.length-1){
                            phi = result1234.length;
                              req.session.data = result16[0];
                              req.session.amigos = friends;
                              req.session.chat = result555[0];
                              req.session.msg = result444;
                              req.session.pub = result1234;
                              req.session.com = com;
                              res.redirect('/ProfDos');
                            }
                            teta++;
                          });
                          });
                          geta++;
                        }
                      }
                  });
                });
              });
                  });
                });
                i = req.session.r.length;
              }
            }
            });
          }
        }
        else if(result44.length>0&&result6.length==0){
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
          for(var i = 0;i<result44.length;i++){
            req.session.i = i;
            req.session.r = result44.length;
            mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
              if(result22[0]!=undefined){
              mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
                var blocked = false;
                if(result56[0]!=undefined){
                  blocked = true;
                }
              if(result22[0]!=undefined){
                result22[0].blocked = blocked;
                friends.push(result22[0]);
              }
              else{
                req.session.r -= 1; 
              }
              if((friends.length==req.session.r)&&l==0){
                l++;
                mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join amigo where id_us = ? and ida_us = ?',[req.session.prof,result[0].id_us],(err555,result555)=>{
                  mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result[0].id_us,result555[0].id_us,result[0].id_us,result555[0].id_us],(err444,result444)=>{
                    mysqlConnection.query("select * from publicaciones natural join registro natural join usuario where use_us = ?",[result555[0].use_us],(err1234,result1234)=>{
                    mysqlConnection.query('select * from registro where id_us = ?',[result555[0].id_us],(err610,result610)=>{
                      for(var i = 0; i<result444.length; i++){
                        if(result444[i].msg_ms!=undefined){
                          result444[i].msg_ms = prueba.decipher(result444[i].msg_ms);
                        }
                      }
                      if(result610[0]!=undefined){
                         result555[0].log = result610[result610.length-1].log;
                      }else{
                         result555[0].log = "El usuario no ha entrado a chat aún";
                      }
                    mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result555[0].ida_us, result555[0].id_us],(err57,result57)=>{
                      var block = false;
                      if(result57[0]!=undefined){
                        block = true;
                      }
                      result555[0].blocked = block;
                      result16[0].nom_us=prueba.decipher(result16[0].nom_us);
                      result16[0].gru_us=prueba.decipher(result16[0].gru_us);
                      result16[0].con_us=prueba.decipher(result16[0].con_us);
                      result16[0].bol_us=prueba.decipher(result16[0].bol_us);
                      result16[0].fot_us=prueba.decipher(result16[0].fot_us);
                      result16[0].eda_us=prueba.decipher(result16[0].eda_us);
                      for(var i = 0; i<friends.length; i++){
                        friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                        friends[i].con_us = prueba.decipher(friends[i].con_us);
                        friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                        friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                        friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                        friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                      }
                      result555[0].nom_us=prueba.decipher(result555[0].nom_us);
                      result555[0].gru_us=prueba.decipher(result555[0].gru_us);
                      result555[0].con_us=prueba.decipher(result555[0].con_us);
                      result555[0].bol_us=prueba.decipher(result555[0].bol_us);
                      result555[0].fot_us=prueba.decipher(result555[0].fot_us);
                      result555[0].eda_us=prueba.decipher(result555[0].eda_us);
                      console.log("c");
                      if(result1234.length == 0){
                        res.render('Profile',{
                          data: result16[0],
                          amigos: friends,
                          chat: result555[0],
                          msg: result444,
                          user: req.session.nombre,
                          pub: result1234,
                          com: com
                          });
                      }else{
                      for(var phi = 0; phi<result1234.length; phi++){
                        mysqlConnection.query('select * from comentarios natural join usuario where id_pub = ?',[result1234[geta].id_pub],(err,result1206)=>{
                            if(result1206.length>0){
                              id_pub = result1206[0].id_pub;
                            }
                            console.log(id_pub);
                          mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err2160,result2160)=>{
                                    heta = 0;
                                if(result1206.length>0){
                                  result1206.id_pub = result1206[0].id_pub;
                                }
                                  com.push(result1206);
                                
                          if(teta==result1234.length-1){
                            phi = result1234.length;
                              req.session.data = result16[0];
                              req.session.amigos = friends;
                              req.session.chat = result555[0];
                              req.session.msg = result444;
                              req.session.pub = result1234;
                              req.session.com = com;
                              res.redirect('/ProfDos');
                            }
                            teta++;
                          });
                          });
                          geta++;
                        }
                      }
                  });
                });
              });
                  });
                });
                i = req.session.r.length;
              }
            });
          }else{
            req.session.r -= 1; 
            if((friends.length==req.session.r)&&l==0){
              l++;
              mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join amigo where id_us = ? and ida_us = ?',[req.session.prof,result[0].id_us],(err555,result555)=>{
                mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result[0].id_us,result555[0].id_us,result[0].id_us,result555[0].id_us],(err444,result444)=>{
                  mysqlConnection.query("select * from publicaciones natural join registro natural join usuario where use_us = ?",[result555[0].use_us],(err1234,result1234)=>{
                  mysqlConnection.query('select * from registro where id_us = ?',[result555[0].id_us],(err610,result610)=>{
                    for(var i = 0; i<result444.length; i++){
                      if(result444[i].msg_ms!=undefined){
                        result444[i].msg_ms = prueba.decipher(result444[i].msg_ms);
                      }
                    }
                    if(result610[0]!=undefined){
                       result555[0].log = result610[result610.length-1].log;
                    }else{
                       result555[0].log = "El usuario no ha entrado a chat aún";
                    }
                  mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result555[0].ida_us, result555[0].id_us],(err57,result57)=>{
                    var block = false;
                    if(result57[0]!=undefined){
                      block = true;
                    }
                    result555[0].blocked = block;
                    result16[0].nom_us=prueba.decipher(result16[0].nom_us);
                      result16[0].gru_us=prueba.decipher(result16[0].gru_us);
                      result16[0].con_us=prueba.decipher(result16[0].con_us);
                      result16[0].bol_us=prueba.decipher(result16[0].bol_us);
                      result16[0].fot_us=prueba.decipher(result16[0].fot_us);
                      result16[0].eda_us=prueba.decipher(result16[0].eda_us);
                      for(var i = 0; i<friends.length; i++){
                        friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                        friends[i].con_us = prueba.decipher(friends[i].con_us);
                        friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                        friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                        friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                        friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                      }
                      result555[0].nom_us=prueba.decipher(result555[0].nom_us);
                      result555[0].gru_us=prueba.decipher(result555[0].gru_us);
                      result555[0].con_us=prueba.decipher(result555[0].con_us);
                      result555[0].bol_us=prueba.decipher(result555[0].bol_us);
                      result555[0].fot_us=prueba.decipher(result555[0].fot_us);
                      result555[0].eda_us=prueba.decipher(result555[0].eda_us);
                      console.log("d");
                      if(result1234.length == 0){
                        res.render('Profile',{
                          data: result16[0],
                          amigos: friends,
                          chat: result555[0],
                          msg: result444,
                          user: req.session.nombre,
                          pub: result1234,
                          com: com
                          });
                      }else{
                      for(var phi = 0; phi<result1234.length; phi++){
                        mysqlConnection.query('select * from comentarios natural join usuario where id_pub = ?',[result1234[geta].id_pub],(err,result1206)=>{
                            if(result1206.length>0){
                              id_pub = result1206[0].id_pub;
                            }
                            console.log(id_pub);
                          mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err2160,result2160)=>{
                                    heta = 0;
                                if(result1206.length>0){
                                  result1206.id_pub = result1206[0].id_pub;
                                }
                                  com.push(result1206);
                                
                          if(teta==result1234.length-1){
                            phi = result1234.length;
                              req.session.data = result16[0];
                              req.session.amigos = friends;
                              req.session.chat = result555[0];
                              req.session.msg = result444;
                              req.session.pub = result1234;
                              req.session.com = com;
                              res.redirect('/ProfDos');
                            }
                            teta++;
                          });
                          });
                          geta++;
                        }
                      }
                });
              });
            });
                });
              });
              i = req.session.r.length;
            }
          }
            });
          }
        });
        }
        else if(result44.length>0&&result6.length>0){
          for(var i = 0;i<result6.length;i++){
            req.session.i = i;
            req.session.r = result6.length;
            mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result6[i].ida_us,result6[i].id_us],(err22,result22)=>{
              if(result22[0]!=undefined){
              mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err56,result56)=>{
                var blocked = false;
                if(result56[0]!=undefined){
                  blocked = true;
                }
              if(result22[0]!=undefined&&friends.map(function(e) { return e.id_us; }).indexOf(result22[0].id_us)==-1){
                result22[0].blocked = blocked;
                friends.push(result22[0]);
              }
              else{
                req.session.r -= 1; 
              }
              if((friends.length==req.session.r)&&l==0){
                req.session.r += result44.length;
                mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
                  for(var i = 0;i<result44.length;i++){
                    req.session.i = i;
                    mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
                      if(result22[0]!=undefined){
                      mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err57,result57)=>{
                        var block = false;
                        if(result57[0]!=undefined){
                          block = true;
                        }
                      if(result22[0]!=undefined&&friends.map(function(e) { return e.id_us; }).indexOf(result22[0].id_us)==-1){
                        result22[0].blocked = block;
                        friends.push(result22[0]);
                      }
                      else{
                        req.session.r -= 1; 
                      }
                      if((friends.length==req.session.r)&&m==0){
                        m++;
                        mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join amigo where id_us = ? and ida_us = ?',[req.session.prof,result[0].id_us],(err555,result555)=>{
                          mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result[0].id_us,result555[0].id_us,result[0].id_us,result555[0].id_us],(err444,result444)=>{
                            mysqlConnection.query("select * from publicaciones natural join registro natural join usuario where use_us = ?",[result555[0].use_us],(err1234,result1234)=>{
                            mysqlConnection.query('select * from registro where id_us = ?',[result555[0].id_us],(err610,result610)=>{
                              for(var i = 0; i<result444.length; i++){
                                if(result444[i].msg_ms!=undefined){
                                  result444[i].msg_ms = prueba.decipher(result444[i].msg_ms);
                                }
                              }
                              if(result610[0]!=undefined){
                                 result555[0].log = result610[result610.length-1].log;
                              }else{
                                 result555[0].log = "El usuario no ha entrado a chat aún";
                              }
                            mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result555[0].ida_us, result555[0].id_us],(err57,result57)=>{
                              var block = false;
                              if(result57[0]!=undefined){
                                block = true;
                              }
                              result555[0].blocked = block;
                              result16[0].nom_us=prueba.decipher(result16[0].nom_us);
                      result16[0].gru_us=prueba.decipher(result16[0].gru_us);
                      result16[0].con_us=prueba.decipher(result16[0].con_us);
                      result16[0].bol_us=prueba.decipher(result16[0].bol_us);
                      result16[0].fot_us=prueba.decipher(result16[0].fot_us);
                      result16[0].eda_us=prueba.decipher(result16[0].eda_us);
                      for(var i = 0; i<friends.length; i++){
                        friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                        friends[i].con_us = prueba.decipher(friends[i].con_us);
                        friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                        friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                        friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                        friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                      }
                      result555[0].nom_us=prueba.decipher(result555[0].nom_us);
                      result555[0].gru_us=prueba.decipher(result555[0].gru_us);
                      result555[0].con_us=prueba.decipher(result555[0].con_us);
                      result555[0].bol_us=prueba.decipher(result555[0].bol_us);
                      result555[0].fot_us=prueba.decipher(result555[0].fot_us);
                      result555[0].eda_us=prueba.decipher(result555[0].eda_us);
                      console.log("e");
                      if(result1234.length == 0){
                        res.render('Profile',{
                          data: result16[0],
                          amigos: friends,
                          chat: result555[0],
                          msg: result444,
                          user: req.session.nombre,
                          pub: result1234,
                          com: com
                          });
                      }else{
                      for(var phi = 0; phi<result1234.length; phi++){
                        mysqlConnection.query('select * from comentarios natural join usuario where id_pub = ?',[result1234[geta].id_pub],(err,result1206)=>{
                            if(result1206.length>0){
                              id_pub = result1206[0].id_pub;
                            }
                            console.log(id_pub);
                          mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err2160,result2160)=>{
                                    heta = 0;
                                if(result1206.length>0){
                                  result1206.id_pub = result1206[0].id_pub;
                                }
                                  com.push(result1206);
                                
                          if(teta==result1234.length-1){
                            phi = result1234.length;
                              req.session.data = result16[0];
                              req.session.amigos = friends;
                              req.session.chat = result555[0];
                              req.session.msg = result444;
                              req.session.pub = result1234;
                              req.session.com = com;
                              res.redirect('/ProfDos');
                            }
                            teta++;
                          });
                          });
                          geta++;
                        }
                      }
                          });
                        });
                      });
                          });
                        });
                        i = req.session.r.length;
                      }
                    });
                  }else{
                    req.session.r -= 1;
                    if((friends.length==req.session.r)&&m==0){
                      m++;
                      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join amigo where id_us = ? and ida_us = ?',[req.session.prof,result[0].id_us],(err555,result555)=>{
                        mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result[0].id_us,result555[0].id_us,result[0].id_us,result555[0].id_us],(err444,result444)=>{
                          mysqlConnection.query("select * from publicaciones natural join registro natural join usuario where use_us = ?",[result555[0].use_us],(err1234,result1234)=>{
                          mysqlConnection.query('select * from registro where id_us = ?',[result555[0].id_us],(err610,result610)=>{
                            for(var i = 0; i<result444.length; i++){
                              if(result444[i].msg_ms!=undefined){
                                result444[i].msg_ms = prueba.decipher(result444[i].msg_ms);
                              }
                            }
                            if(result610[0]!=undefined){
                               result555[0].log = result610[result610.length-1].log;
                            }else{
                               result555[0].log = "El usuario no ha entrado a chat aún";
                            }
                          mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result555[0].ida_us, result555[0].id_us],(err57,result57)=>{
                            var block = false;
                            if(result57[0]!=undefined){
                              block = true;
                            }
                            result555[0].blocked = block;
                            result16[0].nom_us=prueba.decipher(result16[0].nom_us);
                      result16[0].gru_us=prueba.decipher(result16[0].gru_us);
                      result16[0].con_us=prueba.decipher(result16[0].con_us);
                      result16[0].bol_us=prueba.decipher(result16[0].bol_us);
                      result16[0].fot_us=prueba.decipher(result16[0].fot_us);
                      result16[0].eda_us=prueba.decipher(result16[0].eda_us);
                      for(var i = 0; i<friends.length; i++){
                        friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                        friends[i].con_us = prueba.decipher(friends[i].con_us);
                        friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                        friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                        friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                        friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                      }
                      result555[0].nom_us=prueba.decipher(result555[0].nom_us);
                      result555[0].gru_us=prueba.decipher(result555[0].gru_us);
                      result555[0].con_us=prueba.decipher(result555[0].con_us);
                      result555[0].bol_us=prueba.decipher(result555[0].bol_us);
                      result555[0].fot_us=prueba.decipher(result555[0].fot_us);
                      result555[0].eda_us=prueba.decipher(result555[0].eda_us);
                      console.log("f");
                      if(result1234.length == 0){
                        res.render('Profile',{
                          data: result16[0],
                          amigos: friends,
                          chat: result555[0],
                          msg: result444,
                          user: req.session.nombre,
                          pub: result1234,
                          com: com
                          });
                      }else{
                      for(var phi = 0; phi<result1234.length; phi++){
                        mysqlConnection.query('select * from comentarios natural join usuario where id_pub = ?',[result1234[geta].id_pub],(err,result1206)=>{
                            if(result1206.length>0){
                              id_pub = result1206[0].id_pub;
                            }
                            console.log(id_pub);
                          mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err2160,result2160)=>{
                                    heta = 0;
                                if(result1206.length>0){
                                  result1206.id_pub = result1206[0].id_pub;
                                }
                                  com.push(result1206);
                                
                          if(teta==result1234.length-1){
                            phi = result1234.length;
                              req.session.data = result16[0];
                              req.session.amigos = friends;
                              req.session.chat = result555[0];
                              req.session.msg = result444;
                              req.session.pub = result1234;
                              req.session.com = com;
                              res.redirect('/ProfDos');
                            }
                            teta++;
                          });
                          });
                          geta++;
                        }
                      }
                        });
                      });
                    });
                        });
                      });
                      i = req.session.r.length;
                    }
                  }
                  });
                  }
                });
                l++;
                i = req.session.r.length;
              }
            });
            }else{
              req.session.r -= 1;
              if((friends.length==req.session.r)&&l==0){
                req.session.r += result44.length;
                mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err16,result16)=>{
                  for(var i = 0;i<result44.length;i++){
                    req.session.i = i;
                    mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where id_us = ? and ida_us = ?',[result44[i].id_us, result16[0].id_us],(err22,result22)=>{
                      mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result22[0].ida_us, result22[0].id_us],(err57,result57)=>{
                        var block = false;
                        if(result57[0]!=undefined){
                          block = true;
                        }
                      if(result22[0]!=undefined&&friends.map(function(e) { return e.id_us; }).indexOf(result22[0].id_us)==-1){
                        result22[0].blocked = block;
                        friends.push(result22[0]);
                      }
                      else{
                        req.session.r -= 1; 
                      }
                      if((friends.length==req.session.r)&&m==0){
                        m++;
                        mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join amigo where id_us = ? and ida_us = ?',[req.session.prof,result[0].id_us],(err555,result555)=>{
                          mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result[0].id_us,result555[0].id_us,result[0].id_us,result555[0].id_us],(err444,result444)=>{
                            mysqlConnection.query("select * from publicaciones natural join registro natural join usuario where use_us = ?",[result555[0].use_us],(err1234,result1234)=>{
                            mysqlConnection.query('select * from registro where id_us = ?',[result555[0].id_us],(err610,result610)=>{
                              for(var i = 0; i<result444.length; i++){
                                if(result444[i].msg_ms!=undefined){
                                  result444[i].msg_ms = prueba.decipher(result444[i].msg_ms);
                                }
                              }
                              if(result610[0]!=undefined){
                                 result555[0].log = result610[result610.length-1].log;
                              }else{
                                 result555[0].log = "El usuario no ha entrado a chat aún";
                              }
                            mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result555[0].ida_us, result555[0].id_us],(err57,result57)=>{
                              var block = false;
                              if(result57[0]!=undefined){
                                block = true;
                              }
                              result555[0].blocked = block;
                              result16[0].nom_us=prueba.decipher(result16[0].nom_us);
                      result16[0].gru_us=prueba.decipher(result16[0].gru_us);
                      result16[0].con_us=prueba.decipher(result16[0].con_us);
                      result16[0].bol_us=prueba.decipher(result16[0].bol_us);
                      result16[0].fot_us=prueba.decipher(result16[0].fot_us);
                      result16[0].eda_us=prueba.decipher(result16[0].eda_us);
                      for(var i = 0; i<friends.length; i++){
                        friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                        friends[i].con_us = prueba.decipher(friends[i].con_us);
                        friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                        friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                        friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                        friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                      }
                      result555[0].nom_us=prueba.decipher(result555[0].nom_us);
                      result555[0].gru_us=prueba.decipher(result555[0].gru_us);
                      result555[0].con_us=prueba.decipher(result555[0].con_us);
                      result555[0].bol_us=prueba.decipher(result555[0].bol_us);
                      result555[0].fot_us=prueba.decipher(result555[0].fot_us);
                      result555[0].eda_us=prueba.decipher(result555[0].eda_us);
                      console.log("g");
                      if(result1234.length == 0){
                        res.render('Profile',{
                          data: result16[0],
                          amigos: friends,
                          chat: result555[0],
                          msg: result444,
                          user: req.session.nombre,
                          pub: result1234,
                          com: com
                          });
                      }else{
                      for(var phi = 0; phi<result1234.length; phi++){
                        mysqlConnection.query('select * from comentarios natural join usuario where id_pub = ?',[result1234[geta].id_pub],(err,result1206)=>{
                            if(result1206.length>0){
                              id_pub = result1206[0].id_pub;
                            }
                            console.log(id_pub);
                          mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err2160,result2160)=>{
                                    heta = 0;
                                if(result1206.length>0){
                                  result1206.id_pub = result1206[0].id_pub;
                                }
                                  com.push(result1206);
                                
                          if(teta==result1234.length-1){
                            phi = result1234.length;
                              req.session.data = result16[0];
                              req.session.amigos = friends;
                              req.session.chat = result555[0];
                              req.session.msg = result444;
                              req.session.pub = result1234;
                              req.session.com = com;
                              res.redirect('/ProfDos');
                            }
                            teta++;
                          });
                          });
                          geta++;
                        }
                      }
                          });
                        });
                      });
                          });
                        });
                        i = req.session.r.length;
                      }
                    });
                  });
                  }
                });
                l++;
                i = req.session.r.length;
              }
            }
            });
          }
        }
        else{
      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
        if(result12.length>0){
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera natural join amigo where id_us = ? and ida_us = ?',[req.session.prof,result[0].id_us],(err555,result555)=>{
            mysqlConnection.query('select * from chat natural join msgchat where id_us = ? and ida_us = ? or ida_us=? and id_us = ?',[result[0].id_us,result555[0].id_us,result[0].id_us,result555[0].id_us],(err444,result444)=>{
              mysqlConnection.query("select * from publicaciones natural join registro natural join usuario where use_us = ?",[result555[0].use_us],(err1234,result1234)=>{
              mysqlConnection.query('select * from registro where id_us = ?',[result555[0].id_us],(err610,result610)=>{
                for(var i = 0; i<result444.length; i++){
                  if(result444[i].msg_ms!=undefined){
                    result444[i].msg_ms = prueba.decipher(result444[i].msg_ms);
                  }
                }
                if(result610[0]!=undefined){
                   result555[0].log = result610[result610.length-1].log;
                }else{
                   result555[0].log = "El usuario no ha entrado a chat aún";
                }
              mysqlConnection.query('select * from rp where id_us = ? and id_usa = ?',[result555[0].ida_us, result555[0].id_us],(err57,result57)=>{
                var block = false;
                if(result57[0]!=undefined){
                  block = true;
                }
                result555[0].blocked = block;
                result16[0].nom_us=prueba.decipher(result16[0].nom_us);
                      result16[0].gru_us=prueba.decipher(result16[0].gru_us);
                      result16[0].con_us=prueba.decipher(result16[0].con_us);
                      result16[0].bol_us=prueba.decipher(result16[0].bol_us);
                      result16[0].fot_us=prueba.decipher(result16[0].fot_us);
                      result16[0].eda_us=prueba.decipher(result16[0].eda_us);
                      for(var i = 0; i<friends.length; i++){
                        friends[i].nom_us = prueba.decipher(friends[i].nom_us);
                        friends[i].con_us = prueba.decipher(friends[i].con_us);
                        friends[i].gru_us = prueba.decipher(friends[i].gru_us);
                        friends[i].bol_us = prueba.decipher(friends[i].bol_us);
                        friends[i].eda_us = prueba.decipher(friends[i].eda_us);
                        friends[i].fot_us = prueba.decipher(friends[i].fot_us);
                      }
                      result555[0].nom_us=prueba.decipher(result555[0].nom_us);
                      result555[0].gru_us=prueba.decipher(result555[0].gru_us);
                      result555[0].con_us=prueba.decipher(result555[0].con_us);
                      result555[0].bol_us=prueba.decipher(result555[0].bol_us);
                      result555[0].fot_us=prueba.decipher(result555[0].fot_us);
                      result555[0].eda_us=prueba.decipher(result555[0].eda_us);
                      console.log("h");
                      if(result1234.length == 0){
                        res.render('Profile',{
                          data: result16[0],
                          amigos: friends,
                          chat: result555[0],
                          msg: result444,
                          user: req.session.nombre,
                          pub: result1234,
                          com: com
                          });
                      }else{
                      for(var phi = 0; phi<result1234.length; phi++){
                        mysqlConnection.query('select * from comentarios natural join usuario where id_pub = ?',[result1234[geta].id_pub],(err,result1206)=>{
                            if(result1206.length>0){
                              id_pub = result1206[0].id_pub;
                            }
                            console.log(id_pub);
                          mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err2160,result2160)=>{
                                    heta = 0;
                                if(result1206.length>0){
                                  result1206.id_pub = result1206[0].id_pub;
                                }
                                  com.push(result1206);
                                
                          if(teta==result1234.length-1){
                            phi = result1234.length;
                              req.session.data = result16[0];
                              req.session.amigos = friends;
                              req.session.chat = result555[0];
                              req.session.msg = result444;
                              req.session.pub = result1234;
                              req.session.com = com;
                              res.redirect('/ProfDos');
                            }
                            teta++;
                          });
                          });
                          geta++;
                        }
                      }
            });
          });
        });
            });
          });
        }
        else{
          mysqlConnection.query('SELECT * FROM usuario WHERE use_us = ?', [req.session.nombre] , (err,result)=>{
            res.render('User',{
              data: result[0],
              amigos: null,
              error: req.session.error,
              user: req.session.nombre,
              pub: null
            });
          });
        }
        
      });
        }
      });
    });
    });
  }else{
    res.redirect('/Inicio');
  }
}
prueba.ProfileDos = (req,res)=>{
  if(req.session.data!=""&&req.session.nombre!=""&&req.session.nombre!=undefined){
  let com = req.session.com;
  let heta = 0;
  let comm = "";
  let data = req.session.data;
  let amigos = req.session.amigos;
  let chat = req.session.chat;
  let msg = req.session.msg;
  let pub = req.session.pub;
  let user = req.session.nombre;
  let rel = "";
  let nom = "";
  let fot = "";
  let f = 0;
  req.session.data = "";
  req.session.amigos = "";
  req.session.chat = "";
  req.session.msg = "";
  req.session.pub = "";
  mysqlConnection.query('select * from usuario',(err,resultf)=>{
    mysqlConnection.query('select * from amigo where id_us = ? ',[data.id_us],(err3465,result3465)=>{
      mysqlConnection.query('select * from reacciones',(err2789,result2789)=>{
      rel = result3465;
      rea = result2789;
      for(let g = 0; g<rea.length; g++){
        for(let f = 0; f<pub.length; f++){
          if(pub[f].liked == undefined){
            pub[f].liked = false;
          }
          if(pub[f].likes == undefined){
            pub[f].likes = 0;
          }
          if(pub[f].id_pub == rea[g].id_pub){
            pub[f].likes ++;
            console.log(rea[g].id_us);
            console.log(data.id_us);
            if(rea[g].id_us == data.id_us){
              pub[f].liked = true;
            }
          }
        }
      }
      for(let yy = 0; yy<com.length; yy++){
        for(let xx = 0; xx<com[yy].length; xx++){
          comm += "|||||-----|||||" + com[yy][xx].tex_com;
          console.log("--");
          for(let zz = 0; zz<rel.length; zz++){
            f = 0;
            if(rel[zz].ida_us == com[yy][xx].id_us||data.id_us == com[yy][xx].id_us){
              f++;
              if(rel[zz].ref_am||data.id_us == com[yy][xx].id_us){
                if(rel[zz].ref_am&&data.id_us != com[yy][xx].id_us){
                  for(let jji = 0; jji<resultf.length; jji++){
                    if(resultf[jji].id_us == rel[zz].ida_us){
                      console.log("a");
                      fot += "|||||-----|||||" + prueba.decipher(resultf[jji].fot_us);
                      nom += "|||||-----|||||" + prueba.decipher(resultf[jji].nom_us);
                    }
                  }
                }else if(data.id_us == com[yy][xx].id_us){
                  for(let jjl = 0; jjl<resultf.length; jjl++){
                    if(resultf[jjl].id_us == data.id_us){
                      console.log("b");
                      fot += "|||||-----|||||" + prueba.decipher(resultf[jjl].fot_us);
                      nom += "|||||-----|||||" + prueba.decipher(resultf[jjl].nom_us);
                    }
                  }
                }
              }else{
                for(let jjj = 0; jjj<resultf.length; jjj++){
                  if(resultf[jjj].id_us == rel[zz].ida_us){
                    console.log("c");
                    fot += "|||||-----|||||" + resultf[jjj].ftp_us;
                    nom += "|||||-----|||||" + resultf[jjj].use_us;
                  }
                }
              }
              zz = rel.length;
            }
          }
          if(f==0){
            for(let jjk = 0; jjk<resultf.length; jjk++){
              if(resultf[jjk].id_us == com[yy][xx].id_us){
                console.log("d");
                fot += "|||||-----|||||" + resultf[jjk].ftp_us;
                nom += "|||||-----|||||" + resultf[jjk].use_us;
              }
            }
          }
        }
        com[yy].fot = fot;
        com[yy].nom = nom;
        com[yy].tex_com = comm;
        fot = "";
        nom = "";
        comm = "";
      }
      res.render('Profile',{
        data: data,
        amigos: amigos,
        chat: chat,
        msg: msg,
        user: user,
        pub: pub,
        com: com
        });
      });
    });
  });
  }else if(req.session.data==""&&req.session.nombre!=""&&req.session.nombre!=undefined){
    res.redirect('/Prof');
  }else{
    res.redirect('/Inicio');
  }
  
    /*if(result1206[kl].trf){
      if(result1206.fot==undefined){
        result1206.fot = "|||||-----|||||" + prueba.decipher(result1206[kl].fot_us);
      }else{
        result1206.fot += "|||||-----|||||" + prueba.decipher(result1206[kl].fot_us);
      }
      if(result1206.nom==undefined){
        result1206.nom = "|||||-----|||||" + prueba.decipher(result1206[kl].nom_us);
      }else{
        result1206.nom += "|||||-----|||||" + prueba.decipher(result1206[kl].nom_us);
      }
    }else{
      if(result1206.fot==undefined){
        result1206.fot = "|||||-----|||||" + result1206[kl].ftp_us;
      }else{
        result1206.fot += "|||||-----|||||" + result1206[kl].ftp_us;
      }
      if(result1206.nom==undefined){
        result1206.nom = "|||||-----|||||" + result1206[kl].use_us;
      }else{
        result1206.nom += "|||||-----|||||" + result1206[kl].use_us;
      }
    }*/
}
prueba.com = (req,res)=>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
    let id = req.body.id;
    let tex = req.body.def;
    console.log(id + " " + tex);
    mysqlConnection.query("select * from usuario where use_us = ?",[req.session.nombre],(err,result)=>{
      mysqlConnection.query("insert into registro(id_us) values(?)",[result[0].id_us],(err1,result1)=>{
        mysqlConnection.query("select * from registro where id_us = ?",[result[0].id_us],(err2,result2)=>{
          mysqlConnection.query('INSERT into comentarios(tex_com, id_us, id_reg, id_pub) values(?,?,?,?)',[tex,result[0].id_us,result2[result2.length-1].id_reg,id],(err32,result32)=>{
            res.redirect('/Prof');
          });
        });
      });
    });
  }else{
    res.redirect('/Inicio');
  }
}
prueba.SelfPub = (req,res)=>{
  let h = 0;
  let com = [];
  mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err, result)=>{
    mysqlConnection.query('select * from publicaciones where id_us = ?',[result[0].id_us],(err, respub)=>{
      if(respub.length>0){
        for(let kk = 0; kk<respub.length; kk++){
          mysqlConnection.query('select * from reacciones where id_pub = ?',[respub[h].id_pub],(err, resrea)=>{
            mysqlConnection.query('select * from comentarios where id_pub = ?',[respub[h].id_pub],(err,rescom)=>{
              if(rescom.length>0){
                rescom.id_pub = rescom[0].id_pub;
                com.push(rescom);
              }
              respub[h].likes = resrea.length;
              if(h==respub.length-1){
                req.session.rescom = com;
                req.session.respub = respub;
                res.redirect('/SelfPub2');
              }
              h++;
            });
          });
        }
      }else{
        res.redirect('/SelfPub2');
      }
    });
  });
}
prueba.SelfPub2 = (req,res)=>{
  let com = req.session.rescom;
  let pub = req.session.respub;
  console.log(com);
  console.log(pub);
  
}
prueba.regNot = (req,data) => {
  let cont = -1;
  mysqlConnection.query('select * from notifications natural join usuario',(err, result)=>{
    for(var f = 0; f<result.length; f++){
      if(result[f].end_not == data.endpoint||result[f].p256dh_not == data.keys.p256dh||result[f].auth_not == data.keys.auth){
        cont = f;
      }
    }
    if(cont==-1){
      mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err, result6)=>{
        mysqlConnection.query('insert into notifications(id_us,end_not,p256dh_not,auth_not) values(?,?,?,?)',[result6[0].id_us,data.endpoint,data.keys.p256dh,data.keys.auth],(err, result4)=>{
              if(err){
                console.log(err);
              }
        });
      });
    }else{
      mysqlConnection.query('select * from usuario where use_us = ?',[req.session.nombre],(err, result1)=>{
        if(result1[0].id_us == result[cont].id_us){
          mysqlConnection.query('update notifications set end_not = ?, p256dh_not = ?, auth_not = ? where id_us = ?',[data.endpoint,data.keys.p256dh,data.keys.auth,result1[0].id_us],(err,result2)=>{
            if(err){
              console.log(err);
            }
          });
        }else{
          mysqlConnection.query('delete from notifications where id_us = ?',[result[cont].id_us],(err, result3)=>{
            if(err){
              console.log(err);
            }
            mysqlConnection.query('insert into notifications(id_us,end_not,p256dh_not,auth_not) values(?,?,?,?)',[result[cont].id_us,data.endpoint,data.keys.p256dh,data.keys.auth],(err, result4)=>{

            });
          });
        }
      });
    }
  });
}
prueba.getRegNot = (req,res) =>{
  if(req.session.nombre!=""&&req.session.nombre!=undefined){
  let push = undefined;
  mysqlConnection.query('select * from notifications natural join usuario where use_us = ?',[req.session.nombre],(err, result)=>{
    if(result!=undefined){
      if(result.length>0){
        push = {
          endpoint: result[0].end_not,
          expirationTime: null,
          keys:{
            p256dh: result[0].p256dh_not,
            auth: result[0].auth_not
          }
        }
        console.log(push);
      }
    }
  });
  return push;
  }else{
    res.redirect('/Inicio');
  }
}

/*
res.render('Profile',{
        data: data,
        amigos: amigos,
        chat: chat,
        msg: msg,
        user: user,
        pub: pub,
        com: com
        });
*/

module.exports = prueba;

