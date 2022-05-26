//Trang cập dịch vụ
const connection = require('../../database');

//chuyển trang cập nhật dịch vụ
module.exports.trangcndichvu = function (req, res) {
    var sql = "SELECT dv.maDichVu, ldv.tenLoaiDichVu,dv.tenDichVu,dv.donGia FROM dichvu dv INNER JOIN loaidichvu ldv on dv.loaidichvu_maLoaiDichVu = ldv.maLoaiDichVu order by dv.maDichVu";
    var sqltenldv = "select loaidichvu.tenLoaiDichVu from loaidichvu";
    var querylayldy = connection.query(sqltenldv, (err1, listldv) => {
        if (err1) {
            res.send('Server error 500');
        } else {
            var query = connection.query(sql, (err, data) => {
                if (err) res.send('Server error 500');
                return res.render('./bodyQuanLy/TrangCNDichVu', { layout: './layouts/layoutQuanLy', title: 'Cập nhật dịch vụ', listdv: data, dsldv: listldv,kt:'' });
            });
        }
    });

};

//Thêm loại dịch vụ
module.exports.themdichvu = function (req, res) {
    //lenh sql
    var sqlma = "select count(*) as soluong from dichvu";//lay ma tu dong
    var sqlthem = "Insert into dichvu Set ?";//them dich vu
    var sqllaymaldv = "select maLoaiDichVu from loaidichvu where tenLoaiDichVu = ?";

    var matudong;
    var tenldv = req.body.tenldv;

    var querymatudong = connection.query(sqlma, (err1, data1) => {
        if (err1){
            console.log(err1);
            res.send('Lỗi lấy mã tự động')
        } 
        else {
            if (data1.length > 0) {
                matudong = parseInt(data1[0].soluong);
                matudong = matudong +1;
            } else {
                matudong = 1;
            }
            // console.log(matudong);
            var querylaymaldv = connection.query(sqllaymaldv, [tenldv], (err2, maloaidv) => {
                if (err2) {
                    res.send('Server 500 không lấy mã loại dịch vụ được');
                } else {
                    var dichvu = { maDichVu: matudong, donGia: req.body.donGia, loaidichvu_maLoaiDichVu: maloaidv[0].maLoaiDichVu, tenDichVu: req.body.tenDichVu };
                    var querythemdichvu = connection.query(sqlthem, [dichvu], (err3, data3) => {
                        if (err3){
                            console.log(err3);
                            res.send('Server 500 khong them dich vu dc');
                        } 
                        else {
                            res.redirect('/quanly/cndichvu');
                        }
                    })
                }
            });
        }
    })
};


//Xóa dịch vụ
module.exports.xoadichvu = function (req, res) {
    var id = req.params.id;
    var sqlcheck = 'Select * from sudungdichvu where maDichVu = ?';
    var sqldelete = 'Delete from dichvu where maDichVu = ?';
    var sql = "SELECT dv.maDichVu, ldv.tenLoaiDichVu,dv.tenDichVu,dv.donGia FROM dichvu dv INNER JOIN loaidichvu ldv on dv.loaidichvu_maLoaiDichVu = ldv.maLoaiDichVu order by dv.maDichVu";
    var sqltenldv = "select loaidichvu.tenLoaiDichVu from loaidichvu";

    var querycheck = connection.query(sqlcheck, [id], (err, datacheck) => {
        if (err) {
            res.send('Lỗi kiểm tra')
        } else {
            if (datacheck.length == 0) {
                var query = connection.query(sqldelete, [id], (err, data) => {
                    if (err) throw err;
                    res.redirect('/quanly/cndichvu');
                })
            } else {
                var querylayldy = connection.query(sqltenldv, (err1, listldv) => {
                    if (err1) {
                        res.send('Server error 500');
                    } else {
                        var query = connection.query(sql, (err, data) => {
                            if (err) res.send('Server error 500');
                            return res.render('./bodyQuanLy/TrangCNDichVu', { layout: './layouts/layoutQuanLy', title: 'Cập nhật dịch vụ', listdv: data, dsldv: listldv,kt:'Dịch vụ đang được sử dụng không được xóa' });
                        });
                    }
                });
                // res.send('Không được quyền xóa');
            }
        }
    })
};


//Chuyển sang trang sửa
module.exports.chuyentrangsua = function (req, res) {
    var id = req.params.id;
    var sqltenldv = "select loaidichvu.tenLoaiDichVu from loaidichvu";
    var querylayldy = connection.query(sqltenldv, (err1, listldv) => {
        if (err1) {
            res.send('Không lấy mã dịch vụ được');
        } else {
            var query = connection.query('select * from dichvu where maDichVu = ?', [id], (err, data) => {
                if (err) throw err;
                return res.render('./bodyKhongMenu/GD_Sua_DV', { layout: './layouts/layoutKhongMenu', title: 'Sửa thông tin dịch vụ', dv: data[0], dsldv: listldv });
            })
        }
    });

};


//Sửa thông tin
module.exports.suathongtin = function (req, res) {
    var maDichVu = req.body.maDichVu;
    var donGia = req.body.donGia;
    var maLoaiDichVu = req.body.maLoaiDichVu;
    var tenDichVu = req.body.tenDichVu;
    var tenldv = req.body.tenldv;
    if (tenldv == 'default') {
        var query = connection.query('update dichvu set donGia = ?, tenDichVu = ? where maDichVu = ? '
            , [donGia, tenDichVu, maDichVu], (err, data) => {
                if (err) throw err;
                res.redirect('/quanly/cndichvu');
            })
    } else {
        var querykt = connection.query('select maLoaiDichVu from loaidichvu where tenLoaiDichVu = ?', [tenldv], (errkt, datakt) => {
            if (errkt) {
                res.send('Lỗi lấy tên loại dịch vụ')
            }
            else {
                var query = connection.query('update dichvu set donGia = ?, loaidichvu_maLoaiDichVu = ?, tenDichVu = ? where maDichVu = ? '
                    , [donGia, datakt[0].maLoaiDichVu, tenDichVu, maDichVu], (err, data) => {
                        if (err) throw err;
                        res.redirect('/quanly/cndichvu');
                    })
            }
        })
    }


};


