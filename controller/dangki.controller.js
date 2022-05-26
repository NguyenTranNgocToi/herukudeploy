const connection = require('../database');
const crypto = require('crypto')
const nodemailer = require("nodemailer");
const Verifier = require("email-verifier");
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports.chuyentrangdk = function (req, res) {
    return res.render('./bodyChung/DangKi', { layout: './layouts/layoutChung', title: 'Đăng kí', kt: '' });
};

//gui email xac nhan
var tranporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "hoangmy8333@gmail.com",// thay bang tai khoan email 
        pass: "gpzezutoqtwjxlkq" // thay bang mat khau email 
    },
})

module.exports.dangky = function (req, res) {
    //lệnh sql
    var sqlthem = "Insert into khachhang Set ?";//thêm khách hàng
    var sqlthemtk = "Insert into taikhoankhachhang Set ?";//thêm tài khoản
    var sqlma = "select khachhang.id from khachhang order by khachhang.id desc";//lấy mã tự động
    var sqlcheckSoCMND = "select * from khachhang where soCMND = ?"
    var sqlcheckGmail = "select * from taikhoankhachhang where tenDangNhap = ?"
    var sqlcheckid = "select * from taikhoankhachhang where idKhachHang = ?"

    var matudong;
    var defautpassword = '123456'
    var soCMND = req.body.soCMND
    var gmail = req.body.gmail
    var ten = req.body.tenKH

    let verifier = new Verifier("at_6tE6svhp9tyd1o8RHVTpQN8vvnajf");
    verifier.verify(gmail, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            if (data.smtpCheck == 'true') {
                var querycheckGmail = connection.query(sqlcheckGmail, [gmail], (err, kh) => {
                    if (err) {
                        res.send('Lỗi kiểm tra Mail');
                    } else {
                        if (kh.length == 0) {
                            var querycheckCMND = connection.query(sqlcheckSoCMND, [soCMND], (err1, kh1) => {
                                if (err1) {
                                    res.send('Lỗi kiểm số CMND');
                                } else {
                                    if (kh1.length == 0) {
                                        // return res.render('./bodyChung/DangKi', { layout: './layouts/layoutChung', title: 'Đăng kí', kt:'' });
                                        var querymatudong = connection.query(sqlma, (err1, data1) => {
                                            if (err1) {
                                                res.send('Không lấy mã được')
                                            } else {
                                                if (data1.length > 0) {
                                                    matudong = parseInt(data1[0].id);
                                                    matudong += 1;
                                                } else {
                                                    matudong = 1;
                                                }
                                                bcrypt.hash(defautpassword, saltRounds, function (err, hash) {
                                                    var kh = {
                                                        id: matudong, soDT: req.body.soDT, tenKH: req.body.ten,
                                                        soCMND: req.body.soCMND, diaChi: req.body.diaChi,
                                                        gioiTinh: req.body.gioiTinh,
                                                    };
                                                    var tkkh = {
                                                        matKhau: hash, tenDangNhap: req.body.gmail, idKhachHang: kh.id, isVerified: 'false', emailToken: crypto.randomBytes(64).toString('hex')
                                                    }
                                                    //  console.log(kh);
                                                    var querythemkh = connection.query(sqlthem, [kh], (err, data) => {
                                                        if (err) {
                                                            res.send('Lỗi đăng kí tài khoản');
                                                        } else {
                                                            var querythemtk = connection.query(sqlthemtk, [tkkh], (errtk, datatk) => {
                                                                if (errtk) {
                                                                    res.send('Lỗi thêm tài khoản')
                                                                } else {
                                                                    let mailOptions = {
                                                                        from: '"Khách sạn Hoàng Mỹ"<demo@gmail.com>',
                                                                        to: req.body.gmail,
                                                                        subject: 'appchat - Xác minh tài khoản',
                                                                        html: `<h2>${kh.tenKH}! Cảm ơn bạn đã đăng kí tài khoản </h2>
                                                                        <h4>Nhấn vào liên kết phía dưới để xác minh tài khoản..</h4>
                                                                        <h4>Mật khẩu mặc định của bạn là: 123456</h4>
                                                                        <a href="http://localhost:3000/verify-email?token=${tkkh.emailToken}">Xác minh tài khoản</a>`
                                                                    }
                                                                    tranporter.sendMail(mailOptions, function (err, info) {
                                                                        if (err) {
                                                                            console.log(err);
                                                                        } else {

                                                                            console.log("verify email");
                                                                            // res.redirect("/");
                                                                            return res.render('./bodyChung/DangKiTC', { layout: './layouts/layoutChung', title: 'Đăng kí thành công'})
                                                                        }
                                                                    })
                                                                }
                                                            })
                                                            // res.send('Đăng kí thành công')


                                                        }

                                                    })
                                                });

                                            }
                                        })
                                    } else {

                                        var checkidtk = connection.query(sqlcheckid, [kh1[0].id], (errcheckid, datacheckid) => {
                                            if (errcheckid) {
                                                res.send('Không kiểm tra được mã khách hàng');
                                            } else {
                                                if (datacheckid.length == 0) {
                                                    bcrypt.hash(defautpassword, saltRounds, function (err, hash) {
                                                        var tkkh = {
                                                            matKhau: hash, tenDangNhap: req.body.gmail, idKhachHang: [kh1[0].id], isVerified: 'false', emailToken: crypto.randomBytes(64).toString('hex')
                                                        }
                                                        var querythemtk = connection.query(sqlthemtk, [tkkh], (errtk, datatk) => {
                                                            if (errtk) {
                                                                res.send('Lỗi thêm tài khoản')
                                                            } else {
                                                                let mailOptions = {
                                                                    from: '"Khách sạn Hoàng Mỹ"<demo@gmail.com>',
                                                                    to: req.body.gmail,
                                                                    subject: 'appchat - Xác minh tài khoản',
                                                                    html: `<h2>${kh1[0].tenKH}! Cảm ơn bạn đã đăng kí tài khoản </h2>
                                                                            <h4>Nhấn vào liên kết phía dưới để xác minh tài khoản..</h4>
                                                                            <h4>Mật khẩu mặc định của bạn là: 123456</h4>
                                                                            <a href="http://localhost:3000/verify-email?token=${tkkh.emailToken}">Xác minh tài khoản</a>`
                                                                }
                                                                tranporter.sendMail(mailOptions, function (err, info) {
                                                                    if (err) {
                                                                        console.log(err);
                                                                    } else {

                                                                        console.log("verify email");
                                                                        return res.render('./bodyChung/DangKiTC', { layout: './layouts/layoutChung', title: 'Đăng kí thành công'});
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    });
                                                } else {
                                                    return res.render('./bodyChung/DangKi', { layout: './layouts/layoutChung', title: 'Đăng kí', kt: 'Số CMND đã được đăng kí tài khoản' });
                                                }
                                            }
                                        })
                                    }
                                }
                            });
                        } else {
                            return res.render('./bodyChung/DangKi', { layout: './layouts/layoutChung', title: 'Đăng kí', kt: 'Địa chỉ email đã được đăng kí' });
                        }
                    }
                })
            } else {
                return res.render('./bodyChung/DangKi', { layout: './layouts/layoutChung', title: 'Đăng kí', kt: 'Email này không tồn tại' });
            }
        }
    });
};

module.exports.xacthuc = function (req, res) {
    const token = req.query.token;
    // console.log(token);
    var querytoken = connection.query('select emailToken from taikhoankhachhang where emailToken = ?', [token], (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(data);
            var queryupdate = connection.query('Update taikhoankhachhang set emailToken = ?,isVerified = ? where emailToken = ?', ['1', 'true', token], (err1, data1) => {
                if (err1) {
                    console.log(err1);
                    res.redirect("/dangky");
                } else {
                    res.redirect("/");
                }
            })

        }
    })
};

