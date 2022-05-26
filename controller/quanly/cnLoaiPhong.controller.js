// Trang cập nhật loại phòng
const connection = require('../../database');

//chuyển trang cập nhật loại phòng
module.exports.trangcnloaiphong = function (req, res) {
    var sql = "select * from loaiphong";
    var querylaylp = connection.query(sql, (err, data) => {
        if (err) {
            res.send('Server error 500');
        } else {
            return res.render('./bodyQuanLy/TrangCNLoaiPhong', { layout: './layouts/layoutQuanLy', title: 'Cập nhật loại phòng', dsloaiphong: data, kt:'' });
        }
    });

};

//Thêm loại phòng
module.exports.themloaiphong = function (req, res) {
    //lenh sql
    var sqlma = "select loaiphong.maLPH from loaiphong order by loaiphong.maLPH desc";//lay ma tu dong
    var sqlthem = "Insert into loaiphong Set ?";//them dich vu
    var matudong;
    var sql = "select * from loaiphong";
    var querymatudong = connection.query(sqlma, (err1, data1) => {
        if (err1) {
            res.send('Server 500 khong lay ma tu dong dươc');
        } else {
            if(data1.length > 0){
                matudong = parseInt(data1[0].maLPH);
                matudong += 1;
            }else{
                matudong = 1;
            }
            var loaiphong = { maLPH: matudong, tenLoaiPhong: req.body.tenLoaiPhong, donGia: req.body.donGia, soNguoi: req.body.soNguoi };
            var querythemloaiphong = connection.query(sqlthem, [loaiphong], (err2, data2) => {
                if (err2){
                    var querylaylp = connection.query(sql, (err, data) => {
                        if (err) {
                            res.send('Server error 500');
                        } else {
                            return res.render('./bodyQuanLy/TrangCNLoaiPhong', { layout: './layouts/layoutQuanLy', title: 'Cập nhật loại phòng', dsloaiphong: data,kt:'Lỗi không thêm được loại phòng' });
                        }
                    });
                }
                else {
                    res.redirect('/quanly/cnloaiphong');
                }
            })
        }
    })
};

//Xóa loại phòng
module.exports.xoaloaiphong = function (req, res) {
    var id = req.params.id;
    var sqldelete = 'Delete from loaiphong where maLPH = ?';
    var sqlcheck = 'Select * from phong where loaiphong_maLPH = ?';
    var sql = "select * from loaiphong";
    var querycheck = connection.query(sqlcheck,[id],(err,datacheck)=>{
        if(datacheck.length == 0){
            var querydelete = connection.query(sqldelete, [id], (err, data) => {
                if (err) throw err;
                res.redirect('/quanly/cnloaiphong');
            })
        }else{
            var querylaylp = connection.query(sql, (err, data) => {
                if (err) {
                    res.send('Server error 500');
                } else {
                    return res.render('./bodyQuanLy/TrangCNLoaiPhong', { layout: './layouts/layoutQuanLy', title: 'Cập nhật loại phòng', dsloaiphong: data,kt:'Không được xóa mã phòng đã được sử dụng' });
                }
            });
        }
    })
};

//Chuyển sang trang sửa
module.exports.chuyentrangsua = function (req, res) {
    var id = req.params.id;
    var query = connection.query('select * from loaiphong where maLPH = ?', [id], (err, data) => {
        if (err) throw err;
        return res.render('./bodyKhongMenu/GD_Sua_LPH', { layout: './layouts/layoutKhongMenu', title: 'Sửa thông tin loại phòng', lph: data[0] });
    })
};

//Sửa thông tin
module.exports.suathongtin = function (req, res) {
    var maLPH = req.body.maLPH;
    var tenLoaiPhong = req.body.tenLoaiPhong;
    var donGia = req.body.donGia;
    var soNguoi = req.body.soNguoi;
    var query = connection.query('update loaiphong set tenLoaiPhong = ?, donGia = ?, soNguoi = ? where maLPH = ? '
        , [tenLoaiPhong, donGia, soNguoi, maLPH], (err, data) => {
            if (err) throw err;
            res.redirect('/quanly/cnloaiphong');
        })
};

//Tìm kiếm loại phòng
// module.exports.timkiemlph = function (req, res) {
//     var tukhoa = req.query.tukhoa;
//     if (tukhoa == '') {
//         res.redirect('/quanly/cnloaiphong');
//     } else {
//         var querytim = connection.query("select * from loaiphong where tenLoaiPhong like N'%" + tukhoa + "%' or tenLoaiPhong like N'%" + tukhoa + "'",
//             (err1, data1) => {
//                 if (err1) res.send('Server 500')
//                 else {
//                     if (data1.length > 0) {
//                         return res.render('./bodyQuanLy/TrangCNLoaiPhong', { layout: './layouts/layoutQuanLy', title: 'Cập nhật loại phòng', dsloaiphong: data1 });
//                     } else {
//                         return res.render('./bodyQuanLy/TrangCNLoaiPhong', { layout: './layouts/layoutQuanLy', title: 'Cập nhật loại phòng', dsloaiphong: 0 });
//                     }

//                 }
//             })
//     }

// };