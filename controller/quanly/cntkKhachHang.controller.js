//Trang cập nhật tài khoản
const connection = require('../../database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Chuyển trang cập nhật khách hàng
module.exports.trangcntkkh = function (req, res) {
    var sql = "select tkkh.idtaikhoankhachhang,tkkh.idKhachHang,kh.tenKH,tkkh.tenDangNhap from taikhoankhachhang tkkh join khachhang kh on tkkh.idKhachHang = kh.id ORDER BY idtaikhoankhachhang";
    var querylaykh = connection.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            res.send('Server error 500');
        } else {
            return res.render('./bodyQuanLy/TrangCNTKKhachH', { layout: './layouts/layoutQuanLy', title: 'Cập nhật tài khoản khách hàng', dstkkh: data});
        }
    });
};

//chuyentrangsua
module.exports.chuyentrangsua = function (req, res) {
    var id = req.params.id;
    var query = connection.query('select * from taikhoankhachhang where idtaikhoankhachhang = ?', [id], (err, data) => {
        if (err) throw err;
        return res.render('./bodyKhongMenu/GD_Sua_TK_KH', { layout: './layouts/layoutKhongMenu', title: 'Sửa tài khoản khách hàng', tkkh: data[0] });
    })
};

//sửa thông tin
module.exports.suathongtin = function (req, res) {
    var idtaikhoankhachhang = req.body.idtaikhoankhachhang;
    var tenDangNhap = req.body.tenDangNhap;
    var reset = req.body.reset;
    var defautpassword = '123456'
    
    if (reset == 'true') {
        bcrypt.hash(defautpassword, saltRounds, function (err, hash) {
            var query = connection.query('update taikhoankhachhang set matKhau = ?, tenDangNhap = ? where idtaikhoankhachhang = ? '
                , [hash,tenDangNhap,idtaikhoankhachhang], (err, data) => {
                    if (err) throw err;
                    res.redirect('/quanly/cntkkhachhang');
                })
        });
    } else {
        var query = connection.query('update taikhoankhachhang set tenDangNhap = ? where idtaikhoankhachhang = ? '
            , [tenDangNhap,idtaikhoankhachhang], (err, data) => {
                if (err) throw err;
                res.redirect('/quanly/cntkkhachhang');
            })
    }
};