var database = require("../database");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var multer = require('multer');

//SQLquery
const nhanvienSQL = require('../SQLquery/nhanvien');
const KhachHangSQL = require('../SQLquery/khachhang');
module.exports.dangnhap = function (req, res) {
    var username = req.body.tendn;
    var pass = req.body.matkhau;
    // console.log("tendn" + username);
    // console.log("mk" + pass);
   
    
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(pass, salt, function (err, hash) {
            encryptedPass = hash;
            // console.log("hash pass" + hash);

            nhanvienSQL.getPassNV(username,  function (resultQuery1) {
                if (resultQuery1.length > 0) {
                // console.log("passSQL"+ resultQuery1[0].matKhau);
                bcrypt.compare(pass, resultQuery1[0].matKhau.toString(), function (err, result) {
                       
                    if (result) {
                        nhanvienSQL.getVaiTro(username,  function (resultQueryVaiTro) {
                            if(resultQueryVaiTro[0].ten == "QuanLy" )
                            {
                                res.cookie('ql', username);
                                res.cookie('nv', username);
                                return res.redirect('/quanly');
                            }
                            if(resultQueryVaiTro[0].ten == "NhanVien" ){
                                res.cookie('ql', "0");
                                res.cookie('nv', username);
                                return res.redirect('/nhanvien');
                            }
                        })
                       
                    } else {
                        
                        res.render('./bodyChung/TrangChu',{layout: './layouts/layoutChung' , title: 'Trang Chủ', mess:'Mật khẩu hoặc tài khoản bị sai' });
                    }
                });
        
                }else{
                    KhachHangSQL.getPassKH(username,function (resultQuery2) {
                        if (resultQuery2.length > 0) {
                            // console.log("passKhachSQL"+ resultQuery2[0].matkhau);
                            bcrypt.compare(pass, resultQuery2[0].matkhau, function (err, result) {
                                if (result) {
                                    if(resultQuery2[0].isVerified == 'true'){
                                        res.cookie('khachhang', username);
                                        return res.redirect('khachhang');
                                    }else{
                                        res.render('./bodyChung/TrangChu',{layout: './layouts/layoutChung' , title: 'Trang Chủ', mess:'Tài khoản chưa được xác thực' });
                                    }
                                } else {
                                    res.render('./bodyChung/TrangChu',{layout: './layouts/layoutChung' , title: 'Trang Chủ', mess:'Mật khẩu hoặc tài khoản bị sai' });
                                }
                            });
                        }else{
                            res.render('./bodyChung/TrangChu',{layout: './layouts/layoutChung' , title: 'Trang Chủ', mess:'Tài khoản không tồn tại' });
                        }
                    }) 
                }
            })
        });   
    });
    
};