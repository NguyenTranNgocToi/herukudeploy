//Trang cập nhật phòng
const connection = require('../../database');
//chuyển trang cập nhật phòng
module.exports.trangcnphong = function (req, res) {
    var sql = "SELECT ph.maPhong,lph.tenLoaiPhong,ph.trinhTrang FROM phong ph INNER JOIN loaiphong lph on ph.loaiphong_maLPH = lph.maLPH order by ph.maPhong";
    var sqllaytenloaiphong = "select loaiphong.tenLoaiPhong from loaiphong";
    var querylaytenloaiphong = connection.query(sqllaytenloaiphong, (err1, dsTenLP) => {
        if (err1) {
            res.send('Server error 500');
        } else {
            var query = connection.query(sql, (err, data) => {
                if (err) {
                    res.send('Server error 500');
                } else {
                   return res.render('./bodyQuanLy/TrangCNPhong', { layout: './layouts/layoutQuanLy', title: 'Cập nhật phòng', dsphong: data, dsTenLP: dsTenLP,kt:'' }); 
                }
            });
        }
    });

};

//Thêm phòng
module.exports.themphong = function (req, res) {
    //lenh sql
    var sqlthem = "Insert into phong Set ?";//them phong
    var sqllayloaiphong = "select maLPH from loaiphong where tenLoaiPhong = ?";
    var sqlkiemtrama = "select * from phong where maPhong = ?"

    var sql = "SELECT ph.maPhong,lph.tenLoaiPhong,ph.trinhTrang FROM phong ph INNER JOIN loaiphong lph on ph.loaiphong_maLPH = lph.maLPH order by ph.maPhong";
    var sqllaytenloaiphong = "select loaiphong.tenLoaiPhong from loaiphong";

    var tenloaiph = req.body.tenlph;
    var querylayloaiphong = connection.query(sqllayloaiphong, [tenloaiph], (err2, maloaiphong) => {
        if (err2) {
            res.send('Server 500 không lấy mã loại phòng được');
        } else {
            var phong = { maPhong: req.body.maPhong, loaiphong_maLPH: maloaiphong[0].maLPH };
            var querykt = connection.query(sqlkiemtrama, [phong.maPhong], (errkt, datakt) => {
                if (errkt) {
                    res.send('Lỗi kiểm tra mã');
                } else {
                    if (datakt.length == 0) {
                        var querythemphong = connection.query(sqlthem, [phong], (err3, data3) => {
                            if (err3) res.send('Server 500 khong thêm phòng được');
                            else {
                                res.redirect('/quanly/cnphong');
                            }
                        })

                    } else {
                        var querylaytenloaiphong = connection.query(sqllaytenloaiphong, (err1, dsTenLP) => {
                            if (err1) {
                                res.send('Server error 500');
                            } else {
                                var query = connection.query(sql, (err, data) => {
                                    if (err) {
                                        res.send('Server error 500');
                                    } else {
                                            return res.render('./bodyQuanLy/TrangCNPhong', { layout: './layouts/layoutQuanLy', title: 'Cập nhật phòng', dsphong: data, dsTenLP: dsTenLP,kt:'Mã phòng đã tồn tại' });
                                    }
                                });
                            }
                        });
                        // res.send('Mã phòng đã tồn tại')
                    }
                }
            })

        }
    });
};

//Chuyển sang trang sửa
module.exports.chuyentrangsua = function (req, res) {
    var sqllaytenloaiphong = "select loaiphong.tenLoaiPhong from loaiphong";
    
    var id = req.params.id;
    var querylaytenloaiphong = connection.query(sqllaytenloaiphong, (err1, dsTenLP) => {
        if (err1) {
            res.send('Không lấy tên loại phòng được');
        } else {
            var query = connection.query('select * from phong where maPhong = ?', [id], (err, data) => {
                if (err) throw err;
                return res.render('./bodyKhongMenu/GD_Sua_Phong', { layout: './layouts/layoutKhongMenu', title: 'Sửa thông tin phòng', phong: data[0], dsTenLP: dsTenLP });
            })
        }
    });

};

//Xóa phòng
module.exports.xoaphong = function (req, res) {
    var id = req.params.id;
    var sqldelete = 'Delete from phong where maPhong = ?';
    var sqlcheck = 'Select * from chitietdatphong where maPhong = ?';

    var sql = "SELECT ph.maPhong,lph.tenLoaiPhong,ph.trinhTrang FROM phong ph INNER JOIN loaiphong lph on ph.loaiphong_maLPH = lph.maLPH order by ph.maPhong";
    var sqllaytenloaiphong = "select loaiphong.tenLoaiPhong from loaiphong";

    var querycheck = connection.query(sqlcheck, [id], (err, datacheck) => {
        if (datacheck.length == 0) {
            var querydelete = connection.query(sqldelete, [id], (err, data) => {
                if (err) throw err;
                res.redirect('/quanly/cnphong');
            })
        } else {
            var querylaytenloaiphong = connection.query(sqllaytenloaiphong, (err1, dsTenLP) => {
                if (err1) {
                    res.send('Server error 500');
                } else {
                    var query = connection.query(sql, (err, data) => {
                        if (err) {
                            res.send('Server error 500');
                        } else {
                            return res.render('./bodyQuanLy/TrangCNPhong', { layout: './layouts/layoutQuanLy', title: 'Cập nhật phòng', dsphong: data, dsTenLP: dsTenLP,kt:'Mã phòng đang được sử dụng không thể xóa' });
                        }
                    });
                }
            });
            // res.send('Không được quyền xóa')
        }
    })
};

// Sửa thông tin
module.exports.suathongtin = function (req, res) {
    var maPhong = req.body.maPhong;
    var tenloaiph = req.body.tenlph;
    // console.log(tenloaiph);
    if (tenloaiph == 'defaut') {
        res.redirect('/quanly/cnphong');
    } else {
        var querykt = connection.query('select maLPH from loaiphong where tenLoaiPhong = ?', [tenloaiph], (errkt, datakt) => {
            if (errkt) {
                res.send('Lỗi lấy mã loại phòng')
            }
            else {
                var query = connection.query('update phong set loaiphong_maLPH = ? where maPhong = ? '
                    , [datakt[0].maLPH, maPhong], (err, data) => {
                        if (err) throw err;
                        res.redirect('/quanly/cnphong');
                    })
            }
        })
    }


};

