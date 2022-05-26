//Trang cập nhật tài khoản
const connection = require('../../database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Chuyển trang
module.exports.trangcntknv = function (req, res) {
    var sql = "select tknv.idtaikhoannhanvien,tknv.idNhanVien,nv.tenNV,tknv.tenDangNhap from taikhoannhanvien tknv join nhanvien nv on tknv.idNhanVien = nv.id ORDER BY idtaikhoannhanvien";
    var querylaykh = connection.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            res.send('Server error 500');
        } else {
            return res.render('./bodyQuanLy/TrangCNTKNhanV', { layout: './layouts/layoutQuanLy', title: 'Cập nhật tài khoản nhân viên', dstkkh: data});
        }
    });
};

//chuyentrangsua
module.exports.chuyentrangsua = function (req, res) {
    var id = req.params.id;
    var query = connection.query('select * from taikhoannhanvien where idtaikhoannhanvien = ?', [id], (err, data) => {
        if (err) throw err;
        return res.render('./bodyKhongMenu/GD_Sua_TK_NV', { layout: './layouts/layoutKhongMenu', title: 'Sửa tài khoản nhân viên', tkkh: data[0] });
    })
};

//sửa thông tin
module.exports.suathongtin = function (req, res) {
    var idtaikhoannhanvien = req.body.idtaikhoannhanvien;
    var tenDangNhap = req.body.tenDangNhap;
    var reset = req.body.reset;
    var defautpassword = '123456'
    
    if (reset == 'true') {
        bcrypt.hash(defautpassword, saltRounds, function (err, hash) {
            var query = connection.query('update taikhoannhanvien set matKhau = ?, tenDangNhap = ? where idtaikhoannhanvien = ? '
                , [hash,tenDangNhap,idtaikhoannhanvien], (err, data) => {
                    if (err) throw err;
                    res.redirect('/quanly/cntknhanvien');
                })
        });
    } else {
        var query = connection.query('update taikhoannhanvien set tenDangNhap = ? where idtaikhoannhanvien = ? '
            , [tenDangNhap,idtaikhoannhanvien], (err, data) => {
                if (err) throw err;
                res.redirect('/quanly/cntknhanvien');
            })
    }
};