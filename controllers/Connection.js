const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'meetu'
  });
  
  mysqlConnection.connect((err)=>{
    if(!err){
      console.log("Conectó");
    }else{
      console.log("No Conectó",err);
    }
  });
  module.exports = mysqlConnection;