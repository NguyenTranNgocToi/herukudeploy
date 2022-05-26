//Trang cap nhat tai khoan
module.exports.trangcntaikhoan = function (req, res) {
    return res.render('./bodyQuanLy/TrangCNTaiKhoan',{layout: './layouts/layoutQuanLy' , title: 'Cập nhật tài khoản',});
};
