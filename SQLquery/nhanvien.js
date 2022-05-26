const connection = require('../database');

exports.getPassNV = function(tendn,callbackQuery){
   
    connection.query("SELECT matKhau FROM taikhoannhanvien where tenDangNhap = ?",[tendn], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.getVaiTro = function(tendn,callbackQuery){
    connection.query("SELECT vaitro.ten FROM taikhoannhanvien tknv join nhanvien_vaitro on  tknv.idNhanVien = nhanvien_vaitro.nhanVienId join vaitro on nhanvien_vaitro.vaiTroId = vaitro.id where  tknv.tenDangNhap = ?",[tendn], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
};

exports.nvlaymkduoicsdl = function(tendn,callbackQuery){
    connection.query("SELECT * FROM taikhoannhanvien where tenDangNhap = ?",[tendn],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

//cap nhat lại mật khẩu
exports.nvdatlaimatkhau = function(mk,tendn,callbackQuery){
    connection.query("update taikhoannhanvien set matKhau = ? where tenDangNhap = ?",[mk,tendn],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    }) 
};

