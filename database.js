const mysql = require('mysql');

const connection = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: '123456',
    // database: 'quanlykhachsan2'

    host: 'database-1.cghxoveoeumb.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: '123456789',
    database: 'quanlykhachsan2'
});

connection.connect(err=>{
    if(err) throw err;
    console.log('Connect to database');
});

module.exports = connection;