const connection = require('../database');

exports.getPassKH = function(tendn,callbackQuery){
   
    connection.query("SELECT matkhau,isVerified FROM taikhoankhachhang where tenDangNhap = ?",[tendn], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};


exports.khlaymkduoicsdl = function(tendn,callbackQuery){
    connection.query("SELECT * FROM taikhoankhachhang where tenDangNhap = ?",[tendn],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

//cap nhat lại mật khẩu
exports.khdatlaimatkhau = function(mk,tendn,callbackQuery){
    connection.query("update taikhoankhachhang set matKhau = ? where tenDangNhap = ?",[mk,tendn],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

exports.getKhachHangByTenDangNhap = function(tendn,callbackQuery){
    connection.query(" select * from khachhang kh join taikhoankhachhang tkkh on tkkh.idKhachHang = kh.id where tkkh.tenDangNhap =? ",[tendn],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};