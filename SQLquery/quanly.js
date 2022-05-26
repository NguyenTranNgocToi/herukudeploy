const connection = require('../database');

exports.getPassQL = function(tendn,callbackQuery){
   
    connection.query("SELECT matKhau FROM nhanvien where tenDangNhap = ?",[tendn], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};