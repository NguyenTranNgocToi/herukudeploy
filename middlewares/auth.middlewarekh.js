module.exports.requireAuth = function(req, res, next){
    
    const{cookies} =req;
    // console.log(cookies.khachhang);
    var ms = cookies.khachhang;
    if(!cookies.khachhang){
        //return res.render('./bodyChung/TrangChu',{layout: './layouts/layoutChung' , title: 'Trang Chủ'}, mess='');
        return res.redirect('/');
    }

    const KhachHangSQL = require('../SQLquery/khachhang');
    KhachHangSQL.getPassKH(ms, function (resultQuery1){
        if (resultQuery1.length <= 0) {
            return res.redirect('/');
        }
    }); 
    next();
};