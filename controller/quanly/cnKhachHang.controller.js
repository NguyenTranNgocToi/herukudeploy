//Trang cập khách hàng
const connection = require('../../database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//Chuyển trang cập nhật khách hàng
module.exports.trangcnkhachhang = function (req, res) {
    var sql = "select * from khachhang ORDER BY id";
    var querylaykh = connection.query(sql, (err, data) => {
        if (err) {
            res.send('Server error 500');
        } else {
            return res.render('./bodyQuanLy/TrangCNKhachHang', { layout: './layouts/layoutQuanLy', title: 'Cập nhật khách hàng', dskh: data, kt: '' });
        }
    });
};

//Thêm Khách Hàng
module.exports.themkhachhang = function (req, res) {
    //lenh sql
    var sqlthem = "Insert into khachhang Set ?";//thêm khách hàng
    var sqlthemtk = "Insert into taikhoankhachhang Set ?";
    var sqlma = "select khachhang.id from khachhang order by khachhang.id desc";//lấy mã tự động

    var sqlcheckSoCMND = "select * from khachhang where soCMND = ?"
    var sqlcheckGmail = "select * from taikhoankhachhang where tenDangNhap = ?"

    var sql = "select * from khachhang ORDER BY id";

    var matudong;
    var defautpassword = '123456'
    var soCMND = req.body.soCMND
    var gmail = req.body.gmail

    var querycheckCMND = connection.query(sqlcheckSoCMND, [soCMND], (errktcmnd, cmndkt) => {
        if (errktcmnd) {
            res.send('Lỗi kiểm tra số chứng minh');
        } else {
            if (cmndkt.length == 0) {
                var queryktgmail = connection.query(sqlcheckGmail, [gmail], (errktmail, mailkt) => {
                    if (errktmail) {
                        res.send('Lỗi kiểm tra mail');
                    } else {
                        if (mailkt.length == 0) {
                            var query1 = connection.query(sqlma, (err1, data1) => {
                                if (err1) {
                                    res.send('Server 500')
                                } else {
                                    if (data1.length > 0) {
                                        matudong = parseInt(data1[0].id);
                                        matudong += 1;
                                    } else {
                                        matudong = 1;
                                    }
                                    bcrypt.hash(defautpassword, saltRounds, function (err, hash) {
                                        var kh = { id: matudong, soDT: req.body.soDT, tenKH: req.body.ten, soCMND: req.body.soCMND, diaChi: req.body.diaChi, gioiTinh: req.body.gioiTinh };
                                        var querythemkh = connection.query(sqlthem, kh, (err, data) => {
                                            if (err) {
                                                ('Lỗi thêm khách hàng');
                                            } else {
                                                var tkkh = { matKhau: hash, tenDangNhap: gmail, idKhachHang: kh.id,isVerified: 'true', emailToken: '1' }
                                                var querythemtk = connection.query(sqlthemtk, tkkh, (errthemtk, datathemtk) => {
                                                    if (errthemtk) throw errthemtk;
                                                    res.redirect('/quanly/cnkhachhang');
                                                })
                                            }
                                        })
                                    });

                                }
                            })

                        } else {
                            var querylaykh = connection.query(sql, (err, data) => {
                                if (err) {
                                    res.send('Server error 500');
                                } else {
                                    return res.render('./bodyQuanLy/TrangCNKhachHang', { layout: './layouts/layoutQuanLy', title: 'Cập nhật khách hàng', dskh: data, kt: 'Địa chỉ email này đã được đăng kí' });
                                }
                            });
                        }
                    }
                })
            } else {
                var querylaykh = connection.query(sql, (err, data) => {
                    if (err) {
                        res.send('Server error 500');
                    } else {
                        return res.render('./bodyQuanLy/TrangCNKhachHang', { layout: './layouts/layoutQuanLy', title: 'Cập nhật khách hàng', dskh: data, kt: 'Số CMND đã được đăng kí' });
                    }
                });
            }
        }
    })


};

//Xóa khách hàng
module.exports.xoakhachhang = function (req, res) {
    var id = req.params.id;
    var sql = "select * from khachhang ORDER BY id";
    var queryCMND = connection.query('Select soCMND from khachhang where id = ?', [id], (errktlcmnd, laycmnd) => {
        if (errktlcmnd) {
            res.send('Lỗi lấy chứng minh nhân dân');
        } else {
            var querykt = connection.query('Select * from phieudatphong where soCMND = ?', [laycmnd[0].soCMND], (errkt, datakt) => {
                if (errkt) {
                    res.send('Lỗi kiểm tra ở phiếu nhập');
                } else {
                    if (datakt.length == 0) {
                        var querryxoatk = connection.query('Delete from taikhoankhachhang where idKhachHang = ?',[id],(errtk,datatk)=>{
                            if(errtk) throw errtk;
                            var query = connection.query('Delete from khachhang where id = ?', [id], (err, data) => {
                                if (err) throw err;
                                res.redirect('/quanly/cnkhachhang');
                            })
                        }) 
                    } else {
                        var querylaykh = connection.query(sql, (err, data) => {
                            if (err) {
                                res.send('Server error 500');
                            } else {
                                return res.render('./bodyQuanLy/TrangCNKhachHang', { layout: './layouts/layoutQuanLy', title: 'Cập nhật khách hàng', dskh: data, kt: 'Không thể xóa khách hàng này được' });
                            }
                        });
                    }
                }
            })
        }
    })

};

//Chuyển sang trang sửa
module.exports.chuyentrangsua = function (req, res) {
    var id = req.params.id;
    var query = connection.query('select * from khachhang where id = ?', [id], (err, data) => {
        if (err) throw err;
        return res.render('./bodyKhongMenu/GD_Sua_KH', { layout: './layouts/layoutKhongMenu', title: 'Sửa thông tin khách hàng', kh: data[0] });
    })
};

//Sửa thông tin
module.exports.suathongtin = function (req, res) {
    var id = req.body.id;
    var soDT = req.body.soDT;
    var ten = req.body.ten;
    var diaChi = req.body.diaChi;
    var gioiTinh = req.body.gioiTinh;

    var query = connection.query('update khachhang set soDT = ?, tenKH = ?, diaChi = ?, gioiTinh = ? where id = ? '
        , [soDT, ten, diaChi, gioiTinh, id], (err, data) => {
            if (err) throw err;
            res.redirect('/quanly/cnkhachhang');
        })
};

//Tìm kiếm khách hàng
module.exports.timkiemkh = function (req, res) {
    var tukhoa = req.query.tukhoa;
    if (tukhoa == '') {
        res.redirect('/quanly/cnkhachhang');
    } else {
        var querytim = connection.query("select * from khachhang where tenKH like N'%" + tukhoa + "%' or tenKH like N'%" + tukhoa + "'",
            (err1, data1) => {
                if (err1) res.send('Server 500')
                else {
                    if (data1.length > 0) {
                        return res.render('./bodyQuanLy/TrangCNKhachHang', { layout: './layouts/layoutQuanLy', title: 'Cập nhật khách hàng', dskh: data1 });
                    } else {

                        return res.render('./bodyQuanLy/TrangCNKhachHang', { layout: './layouts/layoutQuanLy', title: 'Cập nhật khách hàng', dskh: 0 });
                    }

                }
            })
    }

};
