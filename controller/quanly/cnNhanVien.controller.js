//Trang cập nhân viên
const connection = require('../../database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//chuyển trang cập nhập nhân viên
module.exports.trangcnnhanvien = function (req, res) {
    var sql = "select * from nhanvien ORDER BY id";
    var sqllayvaitro = "select vaitro.ten from vaitro"
    var querylayvaitro = connection.query(sqllayvaitro, (errvaitro, datavt) => {
        if (errvaitro) throw errvaitro;
        var querylaynv = connection.query(sql, (err, data) => {
            if (err) {
                res.send('Server error 500');
            } else {
                return res.render('./bodyQuanLy/TrangCNNhanvien', { layout: './layouts/layoutQuanLy', title: 'Cập nhật nhân viên', dsnv: data, dsvt: datavt,kt:'' });
            }
        });
    })
};

//Thêm nhân viên
module.exports.themnv = function (req, res) {
    //lenh sql
    var sqlthem = "Insert into nhanvien Set ?";//thêm khách hàng
    var sqlthem_nhanvien_vt = "Insert into nhanvien_vaitro Set ?"
    var sqlthemtk = "Insert into taikhoannhanvien Set ?"
    var sqlma = "select count(*) as soluong from nhanvien";//lấy mã tự động
    var sqllaymavt = "select id from vaitro where ten = ?"
    var sqlktcmnd = "select * from nhanvien where soCMND = ?"
    var sqlkttk = "select * from taikhoannhanvien where tenDangNhap = ?"

    var sql = "select * from nhanvien ORDER BY id";
    var sqllayvaitro = "select vaitro.ten from vaitro"

    var matudong;
    var defautpassword = '123456'
    var vaitro = req.body.vaitro
    var soCMND = req.body.soCMND
    var tenDangNhap = req.body.tenDangNhap

    var queryktcmnd = connection.query(sqlktcmnd, [soCMND], (errktcmnd, cmndkt) => {
        if (errktcmnd) {
            res.send('Lỗi kiểm tra chứng minh nhân dân');
        } else {
            if (cmndkt.length == 0) {
                var querykttk = connection.query(sqlkttk, [tenDangNhap], (errkttk, tkkt) => {
                    if (errkttk) {
                        res.send('Lỗi kiểm tra tài khoản');
                    } else {
                        if (tkkt.length == 0) {
                            var query1 = connection.query(sqlma, (err1, data1) => {
                                if (err1) {
                                    res.send('Server 500')
                                } else {
                                    if (data1.length > 0) {
                                        matudong = parseInt(data1[0].soluong);
                                        matudong += 1;
                                    } else {
                                        matudong = 1;
                                    }
                                    bcrypt.hash(defautpassword, saltRounds, function (err, hash) {
                                        var nv = { id: matudong, ngaySinh: req.body.ngaySinh, soDT: req.body.soDT, tenNV: req.body.ten, soCMND: req.body.soCMND, diaChi: req.body.diachi };
                                        // console.log(nv);
                                        var tk = {idNhanVien:nv.id,tenDangNhap:tenDangNhap,matKhau:hash}
                                        var queryLayvaitro = connection.query(sqllaymavt, [vaitro], (errmavt, mavt) => {
                                            if (errmavt) throw errmavt;
                                            var nvvt = { nhanVienId: matudong, vaiTroId: mavt[0].id }
                                            var querythemnv = connection.query(sqlthem, nv, (err, data) => {
                                                if (err) {
                                                    console.log(err);
                                                    res.send('Lỗi thêm nhân viên');
                                                } else {
                                                    
                                                    var querythemtk = connection.query(sqlthemtk,tk,(errthemtk,datathemtk)=>{
                                                        if (errthemtk) throw errthemtk;
                                                        var querythemnvvt = connection.query(sqlthem_nhanvien_vt, [nvvt], (errthem, datathem) => {
                                                            if (errthem) throw errthem;
                                                            res.redirect('/quanly/cnnhanvien');
                                                        })
                                                    })
                                                    
                                                }
                                            })
                                        })

                                    });

                                }
                            })
                        } else {
                            var querylayvaitro = connection.query(sqllayvaitro, (errvaitro, datavt) => {
                                if (errvaitro) throw errvaitro;
                                var querylaynv = connection.query(sql, (err, data) => {
                                    if (err) {
                                        res.send('Server error 500');
                                    } else {
                                        return res.render('./bodyQuanLy/TrangCNNhanvien', { layout: './layouts/layoutQuanLy', title: 'Cập nhật nhân viên', dsnv: data, dsvt: datavt,kt:'Tài khoản này đã tồn tại' });
                                    }
                                });
                            })
                            // res.send('Tài khoản này đã tồn tại');
                        }
                    }
                })
            } else {
                var querylayvaitro = connection.query(sqllayvaitro, (errvaitro, datavt) => {
                    if (errvaitro) throw errvaitro;
                    var querylaynv = connection.query(sql, (err, data) => {
                        if (err) {
                            res.send('Server error 500');
                        } else {
                            return res.render('./bodyQuanLy/TrangCNNhanvien', { layout: './layouts/layoutQuanLy', title: 'Cập nhật nhân viên', dsnv: data, dsvt: datavt,kt:'Số chứng minh này đã tồn tại' });
                        }
                    });
                })
                // res.send('Số chứng minh này đã tồn tại')
            }
        }
    })



};

//Xóa nhân viên
module.exports.xoanv = function (req, res) {
    var id = req.params.id;
    var sqlcheck = 'Select * from phieudatphong where maNVDat = ?';
    var sqldelete = 'Delete from nhanvien where id = ?';
    var sqldelete1 = 'Delete from nhanvien_vaitro where nhanVienId = ?'
    var sqldeletetk = 'Delete from taikhoannhanvien where idNhanVien = ?'

    var sql = "select * from nhanvien ORDER BY id";
    var sqllayvaitro = "select vaitro.ten from vaitro"

    var querycheck = connection.query(sqlcheck, [id], (err, datacheck) => {
        if (err) {
            res.send('Lỗi kiểm tra trước khi xóa')
        } else {
            if (datacheck.length == 0) {
                var queryxoa1 = connection.query(sqldelete1, [id], (err, data) => {
                    if (err){
                        res.send('Không xóa vai trò nhân viên được');
                    }else{
                        var queryxoatk = connection.query(sqldeletetk,[id],(errtk,datatk)=>{
                            if(errtk){
                                res.send('Lỗi xóa tài khoản nhân viên');
                            }else{
                                var queryxoa = connection.query(sqldelete, [id], (err, data) => {
                                    if (err){
                                        res.send('Lỗi xóa nhân viên')
                                    }
                                    res.redirect('/quanly/cnnhanvien');
                                })
                            }
                        })
                        
                    }
                    
                })
            } else {
                var querylayvaitro = connection.query(sqllayvaitro, (errvaitro, datavt) => {
                    if (errvaitro) throw errvaitro;
                    var querylaynv = connection.query(sql, (err, data) => {
                        if (err) {
                            res.send('Server error 500');
                        } else {
                            return res.render('./bodyQuanLy/TrangCNNhanvien', { layout: './layouts/layoutQuanLy', title: 'Cập nhật nhân viên', dsnv: data, dsvt: datavt,kt:'Mã nhân viên đang được sử dụng không được quyền xóa' });
                        }
                    });
                })
                // res.send('Không được quyền xóa');
            }
        }
    })
};

//Chuyển sang trang sửa
module.exports.chuyentrangsua = function (req, res) {
    var id = req.params.id;
    var query = connection.query('select * from nhanvien where id = ?', [id], (err, data) => {
        if (err) throw err;
        return res.render('./bodyKhongMenu/GD_Sua_NV', { layout: './layouts/layoutKhongMenu', title: 'Sửa thông tin nhân viên', nv: data[0] });
    })
};

module.exports.suathongtin = function (req, res) {
    var id = req.body.id;
    var soDT = req.body.soDT;
    var ten = req.body.ten;
    var diachi = req.body.diachi;
    var ngaySinh = req.body.ngaySinh

   
    var query = connection.query('update nhanvien set ngaySinh = ?, soDT = ?, tenNV = ? , diachi = ? where id = ? '
        , [ngaySinh, soDT, ten, diachi, id], (err, data) => {
            if (err) throw err;
            res.redirect('/quanly/cnnhanvien');
        })
    
};




