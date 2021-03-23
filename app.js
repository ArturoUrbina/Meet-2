require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var formidable = require("express-form-data");
var indexRouter = require('./routes/index');
var session = require('express-session');
const mysql = require('mysql');
var CryptoJS = require("crypto-js");
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'meetu'
  });
var app = express();
const natural = require('natural');
const classifier = new natural.BayesClassifier();

//ISA Trainer
  natural.BayesClassifier.load('JSON/Globals.json',null,(err,classifiers)=>{
    if(err!=null){
      if(err.errno == -4058||err.errno == -2){
        classifier.addDocument('Hola, me caes muy bien','Bueno');
        classifier.addDocument('Eres muy agradable','Bueno');
        classifier.addDocument('Eres muy inteligente','Bueno');
        classifier.addDocument('Todo el tiempo me haces reír','Bueno');
        classifier.addDocument('Eres un buen amigo','Bueno');
        classifier.addDocument('Cada vez que hablo contigo me la paso muy bien','Bueno');
        classifier.addDocument('No puedo esperar a verte en persona','Bueno');
        classifier.addDocument('Me agrada el soccer y a tí?','Bueno');
        classifier.addDocument('Qué es lo que más te gusta hacer?','Bueno');
        classifier.addDocument('¿Te gusta el helado?','Bueno');
        classifier.addDocument('¿Cómo te sientes el día de hoy?','Bueno');
        classifier.addDocument('Extrañaba hablar contigo','Bueno');
        classifier.addDocument('Eres muy acertado','Bueno');
        classifier.addDocument('Has sido consciente','Bueno');
        classifier.addDocument('Tienes buena actitud','Bueno');
        classifier.addDocument('Has puesto de tu parte','Bueno');
        classifier.addDocument('Has terminado a tiempo','Bueno');
        classifier.addDocument('Siempre has sido muy comprensivo','Bueno');
        classifier.addDocument('Que bueno que eres positiva','Bueno');
        classifier.addDocument('Vas haciendo tu camino al éxito','Bueno');
        classifier.addDocument('Está saliendo bien tu trabajo','Bueno');
        classifier.addDocument('Te ves bien con lentes','Bueno');
        classifier.addDocument('Me da mucho gusto saludarte','Bueno');
        classifier.addDocument('Eres increíble','Bueno');
        classifier.addDocument('Muchas Gracias','Bueno');
        classifier.addDocument('Con mucho gusto','Bueno');
        classifier.addDocument('A mi también me gusta','Bueno');
        classifier.addDocument('Aprecio mucho tu atención','Bueno');
        classifier.addDocument('Eres un encanto','Bueno');
        classifier.addDocument('Me encantaría conocerte','Bueno');
        classifier.addDocument('Suena bien','Bueno');
        classifier.addDocument('Que tengas bonita semana','Bueno');
        classifier.addDocument('Que buena idea','Bueno');
        classifier.addDocument('¿Cuál es tu equipo favorito?','Bueno');
        classifier.addDocument('¿Cuál es tu grupo favorito?','Bueno');
        classifier.addDocument('Perdón','Bueno');
        classifier.addDocument('No te preocupes','Bueno');
        classifier.addDocument('No hay problema','Bueno');
        classifier.addDocument('Todo bien','Bueno');

        classifier.addDocument('Hueles muy feo','Malo');
        classifier.addDocument('Eres muy desagradable','Malo');
        classifier.addDocument('Odio hablar contigo','Malo');
        classifier.addDocument('Cállate','Malo');
        classifier.addDocument('Tu foto es horrible','Malo');
        classifier.addDocument('Solo de hablar contigo ya tengo ganas de vomitar','Malo');
        classifier.addDocument('De seguro repruebas mucho','Malo');
        classifier.addDocument('Has de ser chaparro y feo en la vida real','Malo');
        classifier.addDocument('Eres repulsivo','Malo');
        classifier.addDocument('Me das asco','Malo');
        classifier.addDocument('No me gusta que me hables así','Malo');
        classifier.addDocument('Tu mirada fría lo dice todo','Malo');
        classifier.addDocument('Tus palabras me han herido','Malo');
        classifier.addDocument('Ese comentario no te lleva a ningún lado','Malo');
        classifier.addDocument('Eso fue muy grosero','Malo');
        classifier.addDocument('No tires el dinero en tonterías','Malo');
        classifier.addDocument('Exprésate bien','Malo');
        classifier.addDocument('No comas tanto maldito gordo','Malo');
        classifier.addDocument('Ve más despacio','Malo');
        classifier.addDocument('Te desprecio','Malo');
        classifier.addDocument('Vete al diablo','Malo');
        classifier.addDocument('Déjame en paz','Malo');
        classifier.addDocument('No estés fregando','Malo');
        classifier.addDocument('Deja de perder el tiempo','Malo');
        classifier.addDocument('¿Qué más quieres?','Malo');
        classifier.addDocument('Que bien mueles','Malo');
        classifier.addDocument('Mejor aquí le paramos','Malo');
        classifier.addDocument('Tu estás siendo muy ingrato','Malo');
        classifier.addDocument('Vete a hablar con alguien más','Malo');
        classifier.addDocument('Tu no has valorado nada','Malo');
        classifier.addDocument('Feo','Malo');
        classifier.addDocument('Odio','Malo');
        classifier.addDocument('Malo','Malo');
        classifier.addDocument('Eres molesto','Malo');
        classifier.addDocument('Grosero','Malo');
        classifier.addDocument('Maleducado','Malo');
        classifier.addDocument('Cállate','Malo');
        classifier.addDocument('Molesto','Malo');
        classifier.addDocument('Eres molesto','Malo');
        classifier.addDocument('Odio tu equipo','Malo');
        classifier.addDocument('Es pésimo','Malo');
        classifier.addDocument('Que mal equipo','Malo');
        classifier.addDocument('Me caes muy gordo','Malo');
        classifier.addDocument('Eres un pesado','Malo');

        classifier.train();
        classifier.save('JSON/Globals.json',(err,classifierz)=>{
        });
        }
    }
  });
//ISA Trainer

app.use(formidable.parse({ keepExtensions: true, uploadDir:"./public/img" }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT||4000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const server = app.listen(app.get('port'), ()=>{
  console.log('Servidor en el puerto: ', app.get('port'));
});

app.use(session({
  resave:false,
  saveUninitialized: true,
  secret: "EYEMeetU2019"
}));

const SocketIO = require('socket.io');
const io = SocketIO(server); 

//websockets
io.on('connection',(socket)=>{
  socket.on('TRFSoli:Accept',(data)=>{
    mysqlConnection.query('update amigo set isf_am = true, rec_am= false, ref_am = true, trf_am = false where id_us = ? and ida_us = ?',[data.idus,data.idFR],(err)=>{
      if(err){
        console.log(err);
      }
    });
    mysqlConnection.query('update amigo set isf_am = true, rec_am= false, ref_am = true, trf_am = false where id_us = ? and ida_us = ?',[data.idFR,data.idus],(err1)=>{
      if(err1){
        console.log(err1);
      }
    });
    mysqlConnection.query('select * from usuario where id_us = ?', [data.idFR] ,(err, result)=>{
      mysqlConnection.query('select * from usuario where id_us = ?', [data.idus] ,(err, result1)=>{
        io.sockets.emit('TRFSoli:Accept',{
          friend: result[0],
          self: result1[0],
          idus: data.idus,
          idFR: data.idFR
        });
      });
    });
  });
  socket.on('TRFSoli:Denied',(data)=>{
    mysqlConnection.query('update amigo set isf_am = true, rec_am= false, ref_am = false, trf_am = false where id_us = ? and ida_us = ?',[data.idus,data.idFR],(err)=>{
      if(err){
        console.log(err);
      }
    });
    mysqlConnection.query('update amigo set isf_am = true, rec_am= false, ref_am = false, trf_am = false where id_us = ? and ida_us = ?',[data.idFR,data.idus],(err1)=>{
      if(err1){
        console.log(err1);
      }
    });
    mysqlConnection.query('select * from usuario where id_us = ?', [data.idFR] ,(err, result)=>{
      mysqlConnection.query('select * from usuario where id_us = ?', [data.idus] ,(err, result1)=>{
        io.sockets.emit('TRFSoli:Denied',{
          friend: result[0],
          self: result1[0],
          idus: data.idus,
          idFR: data.idFR
        });
      });
    });
  });
  socket.on('Soli:Accept',(data)=>{
    mysqlConnection.query('update amigo set isf_am = true, rec_am= false where id_us = ? and ida_us = ?',[data.idFR,data.idus],(err,result34)=>{
    });
    mysqlConnection.query('INSERT INTO amigo(id_us,ida_us,isf_am,ref_am,rec_am,trf_am) values(?,?,true,false,false,false)',[data.idus,data.idFR],(err1)=>{
      if(err1){
        console.log(err1);
      }
    });
      mysqlConnection.query('select * from usuario where id_us = ?', [data.idFR] ,(err, result)=>{
            mysqlConnection.query('select * from usuario where id_us = ?', [data.idus] ,(err, result1)=>{
              io.sockets.emit('Soli:Accept',{
                friend: result[0],
                self: result1[0],
                idus: data.idus,
                idFR: data.idFR
              });
            });
          });
  });
  socket.on('SoliTRF:Send',(data)=>{
        mysqlConnection.query('update amigo set isf_am = true, rec_am= true, ref_am = false, trf_am = true where id_us = ? and ida_us = ?',[data.idus,data.idFR],(err1)=>{
          if(err1){
            console.log(err1);
          }
          mysqlConnection.query('update amigo set isf_am = true, rec_am= false, ref_am = false, trf_am = true where id_us = ? and ida_us = ?',[data.idFR,data.idus],(err1)=>{
            if(err1){
              console.log(err1);
            }
          });
            mysqlConnection.query('select * from usuario where id_us = ?', [data.idFR] ,(err, result)=>{
              mysqlConnection.query('select * from usuario where id_us = ?', [data.idus] ,(err, result1)=>{
                io.sockets.emit('SoliTRF:Send',{
                  friend: result[0],
                  self: result1[0],
                  idus: data.idus,
                  idFR: data.idFR
                });
              });
            });
        });
  });
  socket.on('Soli:Send',(data)=>{
      mysqlConnection.query('select * from usuario natural join agrupardeportes natural join agruparlectura natural join agruparpeliculas natural join agruparvideojuegos natural join generosmusica natural join deportes natural join gustos natural join lectura natural join musica natural join peliculas natural join videojuegos where id_us = ?', [data.idFR] ,(err, result)=>{
        if(err){
          console.log(err);
        }
        mysqlConnection.query('select * from usuario natural join agrupardeportes natural join agruparlectura natural join agruparpeliculas natural join agruparvideojuegos natural join generosmusica natural join deportes natural join gustos natural join lectura natural join musica natural join peliculas natural join videojuegos where id_us = ?', [data.idus] ,(err1, result1)=>{
          if(err1){
            console.log(err1);
          }
          console.log(result[0]);
          console.log(result1[0]);
          io.sockets.emit('Soli:Send',{
            friend: result[0],
            self: result1[0],
            idus: data.idus,
            idFR: data.idFR
          });
        });
      });
  });
  socket.on('Soli:Denied',(data)=>{
      mysqlConnection.query('update amigo set isf_am = false, rec_am= true where id_us = ? and ida_us = ?',[data.idFR,data.idus],(err,result34)=>{
      });
      mysqlConnection.query('INSERT INTO amigo(id_us,ida_us,isf_am,ref_am,rec_am,trf_am) values(?,?,false,false,true,false)',[data.idus,data.idFR],(err1)=>{
          if(err1){
            console.log(err1);
          }
      });
  });
  socket.on('ISA:Predict',(data)=>{
    console.log("Hola ISA");
    mysqlConnection.query('select * from usuario where id_us = ?',[data.idusa],(err,userData)=>{
      console.log("Hola ISA 2");
      natural.BayesClassifier.load('JSON/PerfilEntrenadoAI'+ userData[0].use_us +'.json',null,(err,classifiersc)=>{
        console.log("Hola ISA 3");
        console.log(err);
        if(err!=null){
          if(err.errno == -4058||err.errno == -2){
            natural.BayesClassifier.load('JSON/Globals.json',null,(err,classifierc)=>{
              console.log("Hola ISA 4");
              var oldmsgS = [];
              var oldmsgR = [];
              var warn = "";
              var ids = [];
              var co = 0;
              var lo = false;
              var ee = 0;
              
                mysqlConnection.query('select * from msgchat natural join chat where ida_us = ?',[data.idusa],(err,result)=>{
                  for(var j = 0; j<result.length; j++){
                    for(var l = 0; l<ids.length; l++){
                      if(ids[l]==result[j].id_us){
                        co++;
                      }
                    }
                    if(co==0){
                      ids.push(result[j].id_us);
                    }
                    co = 0;
                  }
                  for(var v = 0; v<ids.length; v++){
                    for(var i = 0; i<result.length; i++){
                      if(result[i].id_us == ids[v]){
                        if(ee==0){
                          //Caso de nuevo intercambio de mensajes
                          if(result[i].sdr_ms){
                            oldmsgS.push(decipher(result[i].msg_ms));
                          }else{
                            oldmsgR.push(decipher(result[i].msg_ms));
                          }
                          lo = result[i].sdr_ms;
                        }else{
                          //Mismo amigo de mensajes
                          if(result[i].sdr_ms == lo){
                            //Mensaje con destino igual que el anterior, se concatena al viejo array dependiendo si es R o S
                            if(result[i].sdr_ms){
                              oldmsgS[oldmsgS.length-1] += " " + decipher(result[i].msg_ms);
                            }else{
                              oldmsgR[oldmsgR.length-1] += " " + decipher(result[i].msg_ms);
                            }
                          }else{
                            //Mensaje con destino diferente al anterior, se añade a un nuevo array dependiendo si es R o S
                            if(result[i].sdr_ms){
                              oldmsgS.push(decipher(result[i].msg_ms));
                            }else{
                              oldmsgR.push(decipher(result[i].msg_ms));
                            }
                          }
                          lo = result[i].sdr_ms;
                        }
                        ee++
                      }
                    }
                    ee = 0;
                    if(oldmsgS.length!=oldmsgR.length){
                      if(oldmsgS.length<oldmsgR.length){
                        oldmsgS.push("01234567890|||VACÍO");
                      }else if(oldmsgS.length>oldmsgR.length){
                        oldmsgR.push("01234567890|||VACÍO");
                      }
                    }
                  }
                  console.log("Hola ISA 5");
                  for(var t = 0; t<oldmsgS.length;t++){
                    if(oldmsgR[t]=="01234567890|||VACÍO"){
                      classifierc.addDocument(oldmsgS[t],'Malo');
                    } 
                    classifierc.addDocument(oldmsgS[t],classifierc.classify(oldmsgR[t]));
                  }
                  classifierc.train();
                  classifierc.save('JSON/PerfilEntrenadoAI'+ userData[0].use_us +'.json',(err,classifierz)=>{
                  });
                  if(classifierc.classify(decipher(data.message))=="Bueno"){
                    warn = "Algo me dice que tu mensaje puede ser adecuado y bien recibido en esta conversación";
                  }else{
                    warn = "Puede que tu mensaje no sea de su agrado";
                  }
                  let cl = classifierc.classify(decipher(data.message));
                  var mesg = data.message;
                  io.sockets.emit('ISA:Predict',{
                    warning: warn,
                    msg: mesg,
                    cl: cl,
                    id: userData[0].id_us
                  });
                });

              });
          }
        }else{
          console.log("H");
            var oldmsgS = [];
            var oldmsgR = [];
            var warn = "";
            var ids = [];
            var co = 0;
            var lo = false;
            var ee = 0;
              mysqlConnection.query('select * from msgchat natural join chat where ida_us = ?',[data.idusa],(err,result)=>{
                for(var j = 0; j<result.length; j++){
                  for(var l = 0; l<ids.length; l++){
                    if(ids[l]==result[j].id_us){
                      co++;
                    }
                  }
                  if(co==0){
                    ids.push(result[j].id_us);
                  }
                  co = 0;
                }
                for(var v = 0; v<ids.length; v++){
                  for(var i = 0; i<result.length; i++){
                    if(result[i].id_us == ids[v]){
                      if(ee==0){
                        //Caso de nuevo intercambio de mensajes
                        if(result[i].sdr_ms){
                          oldmsgS.push(decipher(result[i].msg_ms));
                        }else{
                          oldmsgR.push(decipher(result[i].msg_ms));
                        }
                        lo = result[i].sdr_ms;
                      }else{
                        //Mismo amigo de mensajes
                        if(result[i].sdr_ms == lo){
                          //Mensaje con destino igual que el anterior, se concatena al viejo array dependiendo si es R o S
                          if(result[i].sdr_ms){
                            oldmsgS[oldmsgS.length-1] += " " + decipher(result[i].msg_ms);
                          }else{
                            oldmsgR[oldmsgR.length-1] += " " + decipher(result[i].msg_ms);
                          }
                        }else{
                          //Mensaje con destino diferente al anterior, se añade a un nuevo array dependiendo si es R o S
                          if(result[i].sdr_ms){
                            oldmsgS.push(decipher(result[i].msg_ms));
                          }else{
                            oldmsgR.push(decipher(result[i].msg_ms));
                          }
                        }
                        lo = result[i].sdr_ms;
                      }
                      ee++
                    }
                  }
                  ee = 0;
                  if(oldmsgS.length!=oldmsgR.length){
                    if(oldmsgS.length<oldmsgR.length){
                      oldmsgS.push("01234567890|||VACÍO");
                    }else if(oldmsgS.length>oldmsgR.length){
                      oldmsgR.push("01234567890|||VACÍO");
                    }
                  }
                }
                console.log(oldmsgS.length);
                for(var t = 0; t<oldmsgS.length;t++){
                  if(oldmsgR[t]=="01234567890|||VACÍO"){
                    console.log("Hola");
                    classifiersc.addDocument(oldmsgS[t],'Malo');
                  } 
                  classifiersc.addDocument(oldmsgS[t],classifiersc.classify(oldmsgR[t]));
                }
                classifiersc.train();
                classifiersc.save('JSON/PerfilEntrenadoAI'+ userData[0].use_us +'.json',(err,classifierz)=>{
                });
                if(classifiersc.classify(decipher(data.message))=="Bueno"){
                  warn = "Algo me dice que tu mensaje puede ser adecuado y bien recibido en esta conversación";
                }else{
                  warn = "Puede que tu mensaje no sea de su agrado";
                }
                let cl = classifiersc.classify(decipher(data.message));
                console.log(cl);
                var mesg = data.message;
                console.log(userData);
                io.sockets.emit('ISA:Predict',{
                  warning: warn,
                  msg: mesg,
                  cl: cl,
                  id: userData[0].id_us
                });
              });
        }
        });
      });
  });
  socket.on('chat:message', (data)=>{
    data.message = validaGroserias(data.message);
    data.blocked = false;
    mysqlConnection.query('select * from rp wher id_us = ? and id_usa = ?',[data.idus,data.idusa],(err987,result987)=>{
      if(result987==undefined&&data.message!=" "){
        mysqlConnection.query('select id_ch from chat where id_us = ?',[data.idus],(err, result)=>{
          if(result.length>0){
            mysqlConnection.query('insert into msgchat(ida_us,sdr_ms,id_ch,msg_ms) values(?,?,?,?)',[data.idusa,true,result[0].id_ch,data.message],(err1, result1)=>{
            });
          }else{
            mysqlConnection.query('insert into chat(id_us) values(?)',[data.idus],(err1, result2)=>{
              mysqlConnection.query('select id_ch from chat where id_us = ?',[data.idus],(err, result3)=>{
                mysqlConnection.query('insert into msgchat(ida_us,sdr_ms,id_ch,msg_ms) values(?,?,?,?)',[data.idusa,true,result3[0].id_ch,data.message],(err1, result1)=>{
    
                });
              });
            });
          }
        });
        mysqlConnection.query('select id_ch from chat where id_us = ?',[data.idusa],(err, result)=>{
          if(result.length>0){
            mysqlConnection.query('insert into msgchat(ida_us,sdr_ms,id_ch,msg_ms) values(?,?,?,?)',[data.idus,false,result[0].id_ch,data.message],(err1, result1)=>{
    
            });
          }else{
            mysqlConnection.query('insert into chat(id_us) values(?)',[data.idusa],(err1, result2)=>{
              mysqlConnection.query('select id_ch from chat where id_us = ?',[data.idusa],(err, result3)=>{
                mysqlConnection.query('insert into msgchat(ida_us,sdr_ms,id_ch,msg_ms) values(?,?,?,?)',[data.idus,false,result3[0].id_ch,data.message],(err1, result1)=>{
    
                });
              });
            });
          }
        });
        io.sockets.emit('chat:message',data);
      }else if(result987==undefined&&data.message==" "){

      }else{
        data.blocked = true;
        io.sockets.emit('chat:message',data);
      }
    });
    
    
  });
  socket.on('key:typing',(data)=>{
    io.sockets.emit('key:typing',data);
  });
  socket.on('profile:com',(data)=>{
    let id = data.idpub;
    let tex = data.com;
    let idus = data.idus;
    console.log(idus);
    mysqlConnection.query("select * from usuario where id_us = ?",[idus],(err,result)=>{
      mysqlConnection.query("insert into registro(id_us) values(?)",[result[0].id_us],(err1,result1)=>{
        mysqlConnection.query("select * from registro where id_us = ?",[result[0].id_us],(err2,result2)=>{
          mysqlConnection.query('INSERT into comentarios(tex_com, id_us, id_reg, id_pub) values(?,?,?,?)',[tex,result[0].id_us,result2[result2.length-1].id_reg,id],(err32,result32)=>{
            result[0].fot_us = decipher(result[0].fot_us);
            result[0].nom_us = decipher(result[0].nom_us);
            io.sockets.emit('profile:com',{
              img: result[0].fot_us,
              idus: idus,
              nom: result[0].nom_us,
              com: tex,
              idpub: id
            });    
          });
        });
      });
    });
  });
  socket.on('profile:mgu',(data)=>{
    console.log("Hey There");
    mysqlConnection.query('select * from reacciones where id_us = ? and id_pub = ?',[data.idus,data.idpub],(err2111,result2111)=>{
      if(result2111.length == 0){
        mysqlConnection.query('insert into registro(id_us) values(?)',[data.idus],(err1,result1)=>{
          mysqlConnection.query('select * from registro where id_us = ?',[data.idus],(err2,result2)=>{
            mysqlConnection.query('insert into reacciones(id_us,id_pub,id_reg) values(?,?,?)',[data.idus,data.idpub,result2[result2.length-1].id_reg],()=>{
              console.log("YiiiiiJaaaaa");
              io.sockets.emit('profile:mgu',{
                idus: data.idus,
                idpub: data.idpub
              });
            });
          });
        });
      }else{
        mysqlConnection.query('delete from reacciones where id_us = ? and id_pub = ?',[data.idus,data.idpub],()=>{
          io.sockets.emit('profile:ynmgu',{
            idus: data.idus,
            idpub: data.idpub
          });
        });
      }
    });
  });
  socket.on('chatIMG',(data)=>{
        mysqlConnection.query('select * from rp wher id_us = ? and id_usa = ?',[data.idus,data.idusa],(result2)=>{
          var blocked = false;
          if(result2.length>0){
            blocked = true;
          }
          io.sockets.emit('chatIMG',{
            username: data.username,
            foto: data.foto,
            amigo: data.friend,
            fotoamigo: data.fotoa,
            idus: data.idus,
            idusa: data.idusa,
            img: data.img,
            blc: blocked
          });
        });
  });
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

function validaGroserias(msg){

  msg = msg.replace(/Puto/g,'*Grosería*');
  msg = msg.replace(/Puta/g,'*Grosería*');
  msg = msg.replace(/puto/g,'*Grosería*');
  msg = msg.replace(/puta/g,'*Grosería*');
  msg = msg.replace(/PUTO/g,'*Grosería*');
  msg = msg.replace(/PUTA/g,'*Grosería*');
  msg = msg.replace(/PuTo/g,'*Grosería*');
  msg = msg.replace(/PuTa/g,'*Grosería*');
  msg = msg.replace(/puTo/g,'*Grosería*');
  msg = msg.replace(/puTa/g,'*Grosería*');
  msg = msg.replace(/pUTo/g,'*Grosería*');
  msg = msg.replace(/pUTa/g,'*Grosería*');

  msg = msg.replace(/PENDEJO/g,'*Grosería*');
  msg = msg.replace(/PENDEJA/g,'*Grosería*');
  msg = msg.replace(/Pendejo/g,'*Grosería*');
  msg = msg.replace(/Pendeja/g,'*Grosería*');
  msg = msg.replace(/pendejo/g,'*Grosería*');
  msg = msg.replace(/pendeja/g,'*Grosería*');
  msg = msg.replace(/PeNdEjO/g,'*Grosería*');
  msg = msg.replace(/PeNdEjA/g,'*Grosería*');
  msg = msg.replace(/PendejO/g,'*Grosería*');
  msg = msg.replace(/PendejA/g,'*Grosería*');

  msg = msg.replace(/Tonto/g,'*Grosería*');
  msg = msg.replace(/Tonta/g,'*Grosería*');
  msg = msg.replace(/TontO/g,'*Grosería*');
  msg = msg.replace(/TontA/g,'*Grosería*');
  msg = msg.replace(/tonta/g,'*Grosería*');
  msg = msg.replace(/tonto/g,'*Grosería*');
  msg = msg.replace(/ToNtO/g,'*Grosería*');
  msg = msg.replace(/ToNtA/g,'*Grosería*');
  msg = msg.replace(/TOntO/g,'*Grosería*');
  msg = msg.replace(/TOnTA/g,'*Grosería*');
  msg = msg.replace(/TONTO/g,'*Grosería*');
  msg = msg.replace(/TONTA/g,'*Grosería*');

  msg = msg.replace(/Idiota/g,'*Grosería*');
  msg = msg.replace(/IdIoTa/g,'*Grosería*');
  msg = msg.replace(/IDIOTA/g,'*Grosería*');
  msg = msg.replace(/idiota/g,'*Grosería*');
  msg = msg.replace(/IDioTA/g,'*Grosería*');
  msg = msg.replace(/IDIoTA/g,'*Grosería*');
  msg = msg.replace(/IDIOtA/g,'*Grosería*');
  msg = msg.replace(/IDIOTa/g,'*Grosería*');
  msg = msg.replace(/IdIOTA/g,'*Grosería*');
  msg = msg.replace(/IDiOTA/g,'*Grosería*');
  msg = msg.replace(/iDIOTA/g,'*Grosería*');
  msg = msg.replace(/IdIOTA/g,'*Grosería*');

  msg = msg.replace(/Bruto/g,'*Grosería*');
  msg = msg.replace(/Bruta/g,'*Grosería*');
  msg = msg.replace(/bruta/g,'*Grosería*');
  msg = msg.replace(/bruto/g,'*Grosería*');
  msg = msg.replace(/BrutO/g,'*Grosería*');
  msg = msg.replace(/BrutA/g,'*Grosería*');
  msg = msg.replace(/BRuTA/g,'*Grosería*');
  msg = msg.replace(/brUto/g,'*Grosería*');
  msg = msg.replace(/brUta/g,'*Grosería*');
  msg = msg.replace(/BRuTO/g,'*Grosería*');
  msg = msg.replace(/BRuto/g,'*Grosería*');
  msg = msg.replace(/BRuta/g,'*Grosería*');

  msg = msg.replace(/Gay/g,'*Grosería*');
  msg = msg.replace(/GAY/g,'*Grosería*');
  msg = msg.replace(/GaY/g,'*Grosería*');
  msg = msg.replace(/gaY/g,'*Grosería*');
  msg = msg.replace(/gay/g,'*Grosería*');
  msg = msg.replace(/gAy/g,'*Grosería*');

  msg = msg.replace(/Put/g,'*Grosería*');
  msg = msg.replace(/Put/g,'*Grosería*');
  msg = msg.replace(/put/g,'*Grosería*');
  msg = msg.replace(/put/g,'*Grosería*');
  msg = msg.replace(/PUT/g,'*Grosería*');
  msg = msg.replace(/PUT/g,'*Grosería*');
  msg = msg.replace(/PuT/g,'*Grosería*');
  msg = msg.replace(/PuT/g,'*Grosería*');
  msg = msg.replace(/puT/g,'*Grosería*');
  msg = msg.replace(/puT/g,'*Grosería*');
  msg = msg.replace(/pUT/g,'*Grosería*');
  msg = msg.replace(/pUT/g,'*Grosería*');

  msg = msg.replace(/Culero/g,'*Grosería*');
  msg = msg.replace(/Culera/g,'*Grosería*');
  msg = msg.replace(/culera/g,'*Grosería*');
  msg = msg.replace(/culerO/g,'*Grosería*');
  msg = msg.replace(/culerA/g,'*Grosería*');
  msg = msg.replace(/CulerO/g,'*Grosería*');
  msg = msg.replace(/CulerA/g,'*Grosería*');
  msg = msg.replace(/cuLEro/g,'*Grosería*');
  msg = msg.replace(/cuLEra/g,'*Grosería*');
  msg = msg.replace(/CUleRO/g,'*Grosería*');
  msg = msg.replace(/CUleRA/g,'*Grosería*');

  msg = msg.replace(/Culero/g,'*Grosería*');
  msg = msg.replace(/Culera/g,'*Grosería*');
  msg = msg.replace(/culera/g,'*Grosería*');
  msg = msg.replace(/culerO/g,'*Grosería*');
  msg = msg.replace(/culerA/g,'*Grosería*');
  msg = msg.replace(/CulerO/g,'*Grosería*');
  msg = msg.replace(/CulerA/g,'*Grosería*');
  msg = msg.replace(/cuLEro/g,'*Grosería*');
  msg = msg.replace(/cuLEra/g,'*Grosería*');
  msg = msg.replace(/CUleRO/g,'*Grosería*');
  msg = msg.replace(/CUleRA/g,'*Grosería*');

  msg = msg.replace(/CABRÓN/g,'*Grosería*');
  msg = msg.replace(/CABRONA/g,'*Grosería*');
  msg = msg.replace(/CABRON/g,'*Grosería*');
  msg = msg.replace(/Cabrón/g,'*Grosería*');
  msg = msg.replace(/Cabrona/g,'*Grosería*');
  msg = msg.replace(/Cabron/g,'*Grosería*');
  msg = msg.replace(/cabrón/g,'*Grosería*');
  msg = msg.replace(/cabrona/g,'*Grosería*');
  msg = msg.replace(/cabron/g,'*Grosería*');
  msg = msg.replace(/CabróN/g,'*Grosería*');
  msg = msg.replace(/CabronA/g,'*Grosería*');
  msg = msg.replace(/CabroN/g,'*Grosería*');
  msg = msg.replace(/cAbRóN/g,'*Grosería*');
  msg = msg.replace(/cAbRoNa/g,'*Grosería*');
  msg = msg.replace(/cAbRoN/g,'*Grosería*');
  msg = msg.replace(/CaBrÓn/g,'*Grosería*');
  msg = msg.replace(/CaBrOnA/g,'*Grosería*');
  msg = msg.replace(/CaBrOn/g,'*Grosería*');

  msg = msg.replace(/Gordo/g,'*Grosería*');
  msg = msg.replace(/Gorda/g,'*Grosería*');
  msg = msg.replace(/gordo/g,'*Grosería*');
  msg = msg.replace(/gorda/g,'*Grosería*');
  msg = msg.replace(/GordO/g,'*Grosería*');
  msg = msg.replace(/GordA/g,'*Grosería*');
  msg = msg.replace(/GoRdO/g,'*Grosería*');
  msg = msg.replace(/GoRdA/g,'*Grosería*');
  msg = msg.replace(/goRdo/g,'*Grosería*');
  msg = msg.replace(/goRda/g,'*Grosería*');
  msg = msg.replace(/GoRd/g,'*Grosería*');

  msg = msg.replace(/Feo/g,'*Grosería*');
  msg = msg.replace(/Fea/g,'*Grosería*');
  msg = msg.replace(/feo/g,'*Grosería*');
  msg = msg.replace(/fea/g,'*Grosería*');
  msg = msg.replace(/FeO/g,'*Grosería*');
  msg = msg.replace(/FeA/g,'*Grosería*');
  msg = msg.replace(/fEa/g,'*Grosería*');
  msg = msg.replace(/fEo/g,'*Grosería*');
  msg = msg.replace(/FEo/g,'*Grosería*');
  msg = msg.replace(/FEa/g,'*Grosería*');

  msg = msg.replace(/Obeso/g,'*Grosería*');
  msg = msg.replace(/Obesa/g,'*Grosería*');
  msg = msg.replace(/obeso/g,'*Grosería*');
  msg = msg.replace(/obesa/g,'*Grosería*');
  msg = msg.replace(/ObesO/g,'*Grosería*');
  msg = msg.replace(/ObesA/g,'*Grosería*');
  msg = msg.replace(/oBeSo/g,'*Grosería*');
  msg = msg.replace(/oBeSa/g,'*Grosería*');
  msg = msg.replace(/ObEsA/g,'*Grosería*');
  msg = msg.replace(/ObEsO/g,'*Grosería*');

  msg = msg.replace(/joto/g,'*Grosería*');
  msg = msg.replace(/Joto/g,'*Grosería*');
  msg = msg.replace(/jotO/g,'*Grosería*');
  msg = msg.replace(/JotO/g,'*Grosería*');
  msg = msg.replace(/jOTo/g,'*Grosería*');
  msg = msg.replace(/JOto/g,'*Grosería*');
  msg = msg.replace(/joTO/g,'*Grosería*');
  msg = msg.replace(/JOtO/g,'*Grosería*');
  msg = msg.replace(/JOTo/g,'*Grosería*');

  msg = msg.replace(/Estúpido/g,'*Grosería*');
  msg = msg.replace(/Estúpida/g,'*Grosería*');
  msg = msg.replace(/Estupido/g,'*Grosería*');
  msg = msg.replace(/estúpido/g,'*Grosería*');
  msg = msg.replace(/estúpida/g,'*Grosería*');
  msg = msg.replace(/Estupida/g,'*Grosería*');
  msg = msg.replace(/estupido/g,'*Grosería*');
  msg = msg.replace(/estupida/g,'*Grosería*');
  msg = msg.replace(/eStÚpIdA/g,'*Grosería*');
  msg = msg.replace(/eStÚpIdO/g,'*Grosería*');
  msg = msg.replace(/eStUpIdA/g,'*Grosería*');
  msg = msg.replace(/eStUpIdA/g,'*Grosería*');
  msg = msg.replace(/EsTúPiDa/g,'*Grosería*');
  msg = msg.replace(/EsTúPiDo/g,'*Grosería*');
  msg = msg.replace(/EsTuPiDa/g,'*Grosería*');
  msg = msg.replace(/EsTuPiDo/g,'*Grosería*');

  msg = msg.replace(/Mierda/g,'*Grosería*');
  msg = msg.replace(/mierda/g,'*Grosería*');
  msg = msg.replace(/MIERDA/g,'*Grosería*');

  msg = msg.replace(/Perra/g,'*Grosería*');
  msg = msg.replace(/perra/g,'*Grosería*');
  msg = msg.replace(/PERRA/g,'*Grosería*');

  msg = msg.replace(/Viola/g,' *PROHIBIDO* ');
  msg = msg.replace(/viola/g,' *PROHIBIDO* ');
  msg = msg.replace(/VIOLA/g,' *PROHIBIDO* ');

  msg = msg.replace(/Mata/g,' *PROHIBIDO* ');
  msg = msg.replace(/mata/g,' *PROHIBIDO* ');
  msg = msg.replace(/MATA/g,' *PROHIBIDO* ');

  msg = msg.replace(/Verga/g,'*Grosería*');
  msg = msg.replace(/verga/g,'*Grosería*');
  msg = msg.replace(/VERGA/g,'*Grosería*');

  msg = msg.replace(/VAGINA/g,' *PROHIBIDO* ');
  msg = msg.replace(/vagina/g,' *PROHIBIDO* ');
  msg = msg.replace(/Vagina/g,' *PROHIBIDO* ');

  msg = msg.replace(/Pene/g,' *PROHIBIDO* ');
  msg = msg.replace(/pene/g,' *PROHIBIDO* ');
  msg = msg.replace(/PENE/g,' *PROHIBIDO* ');

  msg = msg.replace(/Rica/g,' *PROHIBIDO* ');
  msg = msg.replace(/RICA/g,' *PROHIBIDO* ');
  msg = msg.replace(/rica/g,' *PROHIBIDO* ');

  msg = msg.replace(/Mamasita/g,' *PROHIBIDO* ');
  msg = msg.replace(/mamasita/g,' *PROHIBIDO* ');
  msg = msg.replace(/MAMASITA/g,' *PROHIBIDO* ');

  msg = msg.replace(/Papasito/g,' *PROHIBIDO* ');
  msg = msg.replace(/papasito/g,' *PROHIBIDO* ');
  msg = msg.replace(/PAPASITO/g,' *PROHIBIDO* ');

  msg = msg.replace(/Prostituta/g,' *PROHIBIDO* ');
  msg = msg.replace(/prostituta/g,' *PROHIBIDO* ');
  msg = msg.replace(/PROSTITUTA/g,' *PROHIBIDO* ');

  msg = msg.replace(/Pichacorta/g,' *PROHIBIDO* ');
  msg = msg.replace(/pichacorta/g,' *PROHIBIDO* ');
  msg = msg.replace(/PICHACORTA/g,' *PROHIBIDO* ');

  msg = msg.replace(/Masturba/g,' *PROHIBIDO* ');
  msg = msg.replace(/masturba/g,' *PROHIBIDO* ');
  msg = msg.replace(/MASTURBA/g,' *PROHIBIDO* ');

  msg = msg.replace(/Espantos/g,' *PROHIBIDO* ');
  msg = msg.replace(/espantos/g,' *PROHIBIDO* ');
  msg = msg.replace(/ESPANTOS/g,' *PROHIBIDO* ');

  msg = msg.replace(/Pito/g,' *PROHIBIDO* ');
  msg = msg.replace(/pito/g,' *PROHIBIDO* ');
  msg = msg.replace(/PITO/g,' *PROHIBIDO* ');

  msg = msg.replace(/Culo/g,' *PROHIBIDO* ');
  msg = msg.replace(/culo/g,' *PROHIBIDO* ');
  msg = msg.replace(/CULO/g,' *PROHIBIDO* ');

  msg = msg.replace(/Teta/g,' *PROHIBIDO* ');
  msg = msg.replace(/teta/g,' *PROHIBIDO* ');
  msg = msg.replace(/TETA/g,' *PROHIBIDO* ');

  msg = msg.replace(/Huevos/g,'*Grosería*');
  msg = msg.replace(/huevo/g,'*Grosería*');
  msg = msg.replace(/HUEVOS/g,'*Grosería*');

  return msg;
  
}
function decipher(text){
  var decrypted = CryptoJS.AES.decrypt(text, "EmilianeVícterLuesMigueleMeetUqw");
  decrypted = decrypted.toString(CryptoJS.enc.Utf8);
  return decrypted;
}