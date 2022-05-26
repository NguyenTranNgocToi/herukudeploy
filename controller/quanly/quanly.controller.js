//Trang chu quan ly
module.exports.trangchu = function (req, res) {
    return res.render('./bodyQuanLy/TrangChuQL',{layout: './layouts/layoutQuanLy' , title: 'Trang chủ quản lý',});
};
