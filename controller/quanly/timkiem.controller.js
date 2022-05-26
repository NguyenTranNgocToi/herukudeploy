const connection = require('../../database');

//trang tim kh
module.exports.trangtimkh = function (req, res) {
    var sql = "select * from khachhang ORDER BY id";
    var querylaykh = connection.query(sql, (err, data) => {
        if (err) {
            res.send('Server error 500');
        } else {
            return res.render('./bodyQuanLy/TrangTimKH', { layout: './layouts/layoutQuanLy', title: 'Tìm kiếm khách hàng', dskh: data });
        }
    });
};

module.exports.trangtimphong = function (req, res) {
    var sql = "SELECT ph.maPhong,lph.tenLoaiPhong,ph.trinhTrang FROM phong ph INNER JOIN loaiphong lph on ph.loaiphong_maLPH = lph.maLPH order by ph.maPhong";
    var query = connection.query(sql, (err, data) => {
        if (err) {
            res.send('Server error 500');
        } else {
            return res.render('./bodyQuanLy/TrangTimPhong', { layout: './layouts/layoutQuanLy', title: 'Tìm kiếm phòng', dsphong: data });
        }
    });
};

module.exports.trangtimdv = function (req, res) {
    var sql = "SELECT dv.maDichVu, ldv.tenLoaiDichVu,dv.tenDichVu,dv.donGia FROM dichvu dv INNER JOIN loaidichvu ldv on dv.loaidichvu_maLoaiDichVu = ldv.maLoaiDichVu order by dv.maDichVu";
    var query = connection.query(sql, (err, data) => {
        if (err) res.send('Server error 500');
        return res.render('./bodyQuanLy/TrangTimDV', { layout: './layouts/layoutQuanLy', title: 'Tim dịch vụ', listdv: data });
    });
};

//chuyển trang cập nhập nhân viên
module.exports.trangtimnv = function (req, res) {
    var sql = "select * from nhanvien ORDER BY id";
        var querylaynv = connection.query(sql, (err, data) => {
            if (err) {
                res.send('Server error 500');
            } else {
                return res.render('./bodyQuanLy/TrangTimNV', { layout: './layouts/layoutQuanLy', title: 'Tìm nhân viên', dsnv: data});
            }
        });
};