
module.exports.requireAuth = function(req, res, next){
    
    const{cookies} =req;
    // console.log(cookies.nv);
    var ms = cookies.nv;
    if(!cookies.nv){
        //return res.render('./bodyChung/TrangChu',{layout: './layouts/layoutChung' , title: 'Trang Chủ'}, mess='');
        return res.redirect('/');
    }
    const nhanvienSQL = require('../SQLquery/nhanvien');
    nhanvienSQL.getPassNV(ms, function (resultQuery1){
        if (resultQuery1.length <= 0) {
            return res.redirect('/');
        }
    }); 
    next();
};