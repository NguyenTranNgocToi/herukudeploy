const database = require('../SQLquery/khachhang')
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.trangchu = function (req, res) {
    return res.render('./bodyKhachHang/TrangChuKH',{layout: './layouts/layoutKhachHang' , title: 'Trang chủ khách hàng',});
};

module.exports.trangdoimk = function (req, res) {
    const { cookies } = req;
    var taikhoan = cookies.khachhang;
    return res.render('./bodyKhachHang/TrangKhDoiMK.ejs',{layout: './layouts/layoutKhachHang' , title: 'Đổi mật khẩu',tendn:taikhoan,kt:'',tc:''});
};

module.exports.doimk = function (req, res) {
    var tendn = req.body.tendn;
    var mkcu = req.body.mkc;
    var mkmoi1 = req.body.mkmoi1;
 //    console.log(tendn,mkcu,mkmoi1);
 
    let doimatkhauthanhcong = 0;
     database.khlaymkduoicsdl(tendn,function (result) {
         bcrypt.compare(mkcu, result[0].matKhau, function (err, kq) {
             if(kq){
                 doimatkhauthanhcong = 1;
                 bcrypt.hash(mkmoi1, saltRounds, function (err, hash) {
                     database.khdatlaimatkhau(hash,tendn,function (params) {
                     });
                 });
             }else{
                 doimatkhauthanhcong = 0;
             }
             if (doimatkhauthanhcong == 1) {
                return res.render('./bodyKhachHang/TrangKhDoiMK.ejs',{layout: './layouts/layoutKhachHang' , title: 'Đổi mật khẩu',tendn:tendn,kt:'',tc:'Đổi mật khẩu thành công'});
             } else {
                return res.render('./bodyKhachHang/TrangKhDoiMK.ejs',{layout: './layouts/layoutKhachHang' , title: 'Đổi mật khẩu',tendn:tendn,kt:'Mật khẩu cũ không đúng',tc:''});
             }
 
         });   
     });
 };