

const thuephongSQL = require('../../SQLquery/thuephong');
module.exports.thongKeDoanhThu = function (req, res) {
    return res.render('./bodyQuanLy/thongke',{layout: './layouts/layoutQuanLy' , title: 'Thống Kê Doanh Thu',});
};


module.exports.getthongKeDoanhThuDichVu = function (req, res) {
    // var thang = req.params['thang'];
    // res.send(thang)
    // console.log(thang);
    var ngaybatdau=req.query.dateBegin
    var ngayketthuc=req.query.dateEnd
    // console.log("chay here");
    thuephongSQL.doanhThuDichVuVaSoDichVuDaSuDung(ngaybatdau,ngayketthuc, function(resultsDichVu){
        res.send(resultsDichVu)
    })
  
};
module.exports.getthongKeDoanhThuPhong = function (req, res) {
    // var thang = req.params['thang'];
    // res.send(thang)
    var ngaybatdau=req.query.dateBegin
    var ngayketthuc=req.query.dateEnd
    thuephongSQL.doanhThuPhongVaSoPhongDaThue(ngaybatdau,ngayketthuc, function(resultsPhong){
        res.send(resultsPhong)
    })
  
};