const connection = require('../database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.chuyentrangqmk = function (req, res) {
    return res.render('./bodyChung/QuenMK', { layout: './layouts/layoutChung', title: 'Quên mật khẩu',kt:''});
};

module.exports.kiemtraemail = function (req, res) {
    var sqlcheckGmail = "select * from taikhoankhachhang where tenDangNhap = ?"
    var gmail = req.body.gmail
    // console.log(gmail);
    var queryktemail = connection.query(sqlcheckGmail,[gmail],(err,data)=>{
        if(err){
            res.send('Lỗi kiểm tra email');
        }else{
            if(data.length > 0){
                return res.render('./bodyChung/QuenMK_2', { layout: './layouts/layoutChung', title: 'Quên mật khẩu',kt:'',email:gmail});
            }else{
                return res.render('./bodyChung/QuenMK', { layout: './layouts/layoutChung', title: 'Quên mật khẩu',kt:'Email không tồn tại trên hệ thống'});
            }
        }
    })
};

module.exports.kiemtraCMND = function (req, res) {
    var sqlcheckCMND = "select tkkh.idtaikhoankhachhang from quanlykhachsan2.khachhang kh join quanlykhachsan2.taikhoankhachhang tkkh on kh.id = tkkh.idKhachHang where kh.soCMND = ? and tkkh.tenDangNhap = ?"
    var soCMND = req.body.soCMND
    var email = req.body.gmail;
    // console.log(soCMND,email);
    var queryktCMND = connection.query(sqlcheckCMND,[soCMND,email],(err,data)=>{
        if(err){
            res.send('Lỗi kiểm tra số chứng minh');
        }else{
            // console.log(data);
            if(data.length > 0){
                return res.render('./bodyChung/QuenMK_3', { layout: './layouts/layoutChung', title: 'Quên mật khẩu',id:data[0].idtaikhoankhachhang});
            }else{
                return res.render('./bodyChung/QuenMK_2', { layout: './layouts/layoutChung', title: 'Quên mật khẩu',kt:'Sai số chứng minh nhân dân',email:email});
            }
        }
    })
};

module.exports.doimk = function (req, res) {
    var idtaikhoankhachhang = req.body.idtaikhoankhachhang
    var mk = req.body.pass;

    bcrypt.hash(mk, saltRounds, function (err, hash) {
        var querydoimk = connection.query('update taikhoankhachhang set matKhau = ? where idtaikhoankhachhang = ?',[hash,idtaikhoankhachhang],(err,data)=>{
            if(err){
                res.send('Lỗi đổi mật khẩu');
            }else{
                return res.render('./bodyChung/QuenMK_4', { layout: './layouts/layoutChung', title: 'Thành công'});
            }
        })
    });
};