
//SQLquery
const { redirect } = require('express/lib/response');
const datphongSQL = require('../../SQLquery/datphong');
module.exports.cndsDatPhong = function (req, res) {
    datphongSQL.getListDatPhong(function (resultQuery1) {
        // var list = resultQuery1
        return res.render('./bodyNhanVien/cndsDatPhong',{layout: './layouts/layoutNhanVien' , title: 'Danh sách đặt phòng',list:resultQuery1});
    })
    
};
module.exports.formDatPhong = function(req, res) {
    var ngaybatdau = req.query.ngaybatdau;
    var ngaytra=req.query.ngaytra;
    var listPhongString =req.query.listPhong;
    if(ngaybatdau && ngaytra){
    //    console.log("not null 2");
       ngaytra = ngaytra.toString()
       ngaytra =ngaytra.replace("T", " ")
       //console.log(ngaytra);
       ngaybatdau = ngaybatdau.toString()
       ngaybatdau =ngaybatdau.replace("T", " ")

       datphongSQL.getLisPhongTrong(ngaybatdau,ngaytra,function(resultQuery1) {
        var list = resultQuery1
        // console.log("controll");
        // for(let i=0;i< list.length;i++){
          
        //     console.log(list[i].maPhong);
        // }
        // return res.render('./bodyNhanVien/formDatPhong',{layout: './layouts/layoutNhanVien' , title: 'Đặt phòng',list:resultQuery1, ngaybatdau,ngaytra});
        // var stringRespon =""
        // for(let i=0;i< list.length;i++){
        //   stringRespon = stringRespon +   
        //     "<tr id=\"idrow"+list[i].maPhong+"\">"+
        //         "<td>"+ list[i].maPhong+"</td>"+
        //         "<td>"+list[i].tenLoaiPhong+"</td>"
        //         +"<td>"
        //         +"<button type=\"button\" class=\"btn\" onclick=\"themPhong('"+list[i].maPhong+"','"+list[i].tenLoaiPhong+"','idrow+"+list[i].maPhong+"')\"  id=\"button"+list[i].maPhong+"\" >Chon</button>"+
        //         "</td>"+
        //     "</tr>"
           
        // }
        return res.send(list);

        });
    }
    else if(listPhongString){
        datphongSQL.getPhong_LoaiPhong(function(resultQuery1) {
            
            return res.send(resultQuery1);
            
        })
    } 
    else
        return res.render('./bodyNhanVien/formDatPhong',{layout: './layouts/layoutNhanVien' , title: 'Đặt phòng',list:""});
    
};


module.exports.formDatPhongPost = function(req, res){
    var tenKH = req.body.ten;
    var scmnd = req.body.scmnd;
    var sdt = req.body.sdt;
    var gioitinh = req.body.gioitinh;
    var diaChi = req.body.diachi;
    var stringListmaphong = req.body.listmaphong;
    var stringngaybatdau = req.body.ngaydat;
    var stringngaytra = req.body.ngaytra;
    var tienCoc =req.body.coc;
    var listmaPhong = [];
    var listngaybatdau = [];
    var listngaytra = [];
    listmaPhong = stringListmaphong.split("-")
    listngaybatdau = stringngaybatdau.split("|")
    listngaytra = stringngaytra.split("|")
    // for(var i =0; i< listmaPhong.length ; i++){
    //     console.log(listmaPhong[i]);
    // }
    // console.log(ten);
    // console.log(scmnd);
    // console.log(sdt);
    // console.log(gioitinh);
    // console.log(diaChi);
    // console.log(listmaphong);
    // console.log(ngaybatdau);
    // console.log(ngaytra);
    
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    // console.log(dateTime);

    const{cookies} =req;
    // console.log("cookie");
    // console.log(cookies.msnv);
    var tenNV = cookies.nv;
    // console.log("tenNV"+tenNV);
    datphongSQL.kiemtraTrungCmnd(scmnd, function(params) {
        var kt = params;
        // console.log(kt.length);
        //khach hang da ton tai
        if(kt.length<=0){
            datphongSQL.themKhachHang(sdt,tenKH,scmnd,diaChi,gioitinh, function(results){
            });         
        }
        datphongSQL.themPhieuDatPhong(dateTime, scmnd, tenNV,tienCoc, function(results){
            for(var i =0; i< listmaPhong.length ; i++){
                // console.log(listmaPhong[i]);
                datphongSQL.themPhieuDatPhongChiTiet(dateTime,scmnd ,listmaPhong[i],listngaybatdau[i],listngaytra[i], function(results){
    
                 }); 
                 if(i == (listmaPhong.length -1)){
                      // res.redirect("/nhanvien/cndsDatPhong");
                    res.redirect("/nhanvien/cndsDatPhong/phieudatphongvuanay");
                 
                    // datphongSQL.getPhieuDatPhongVuaNay(function(resultQuery1){ 
                    //     var mess ="Cảm Ơn Quý Khách Hàng Đã Tin Tưởng Chúng Tôi!"
                    //     var kq=0;
                    //     return res.render('./bodyNhanVien/chiTietPhieuDatPhong',{layout: './layouts/layoutNhanVien' , title: 'Phiếu Đặt Phòng', list:resultQuery1,mess,kq});
                    //  })
                 }
                   
                    
                   
            }
            // datphongSQL.getListDatPhong(function (resultQuery1) {
            //     // var list = resultQuery1
            //     return res.render('./bodyNhanVien/cndsDatPhong',{layout: './layouts/layoutNhanVien' , title: 'Danh sách đặt phòng',list:resultQuery1});
            // })
            
        });
    
    })
   
  
    
};
module.exports.cndsDatPhongXoa = function (req, res) {
    var idPhieu = req.params['idPhieu'];
    // console.log("idPhieu");
    // console.log(idPhieu);
    datphongSQL.xoaPhieu(idPhieu, function(results){
        res.redirect("/nhanvien/cndsDatPhong");
    });         
   
    
};
module.exports.cndsDatPhongXem= function (req, res) {
    var idPhieu = req.params['idPhieu'];
    // console.log("idPhieuXem");
    // console.log(idPhieu);
    
    // datphongSQL.getListChiTietPhieu(idPhieu,function(resultQuery1){
    //     // var list = resultQuery1
    //     return res.render('./bodyNhanVien/cndsDatPhongChiTiet',{layout: './layouts/layoutNhanVien' , title: 'Danh sách đặt phòng',list:resultQuery1});
    // })
    // return res.render('./bodyNhanVien/cndsDatPhongChiTiet',{layout: './layouts/layoutNhanVien' , title: 'Danh sách đặt phòng',list:""});
    datphongSQL.getPhieuDatPhongByMaPhieu(idPhieu,function(resultQuery1){ 
        var mess =""
        var kq =1;
        return res.render('./bodyNhanVien/chiTietPhieuDatPhong',{layout: './layouts/layoutNhanVien' , title: 'Phiếu Đặt Phòng', list:resultQuery1,mess,kq});
     })
}


module.exports.phieuDatPhongVuaNay= function (req, res) {
    datphongSQL.getPhieuDatPhongVuaNay(function(resultQuery1){ 
        var mess ="Cảm Ơn Quý Khách Hàng Đã Tin Tưởng Chúng Tôi!"
        var kq=1;
        return res.render('./bodyNhanVien/chiTietPhieuDatPhong',{layout: './layouts/layoutNhanVien' , title: 'Phiếu Đặt Phòng', list:resultQuery1,mess,kq});
     })
}


module.exports.xacThucPhieu= function (req, res) {
   
    const{cookies} =req;
    console.log("cookie");
  
    var tenNV = cookies.nv;
    console.log("tenNV"+tenNV);

    var idPhieu = req.params['idphieu'];
    console.log(idPhieu);
    datphongSQL.xacNhanPhieuById(tenNV,idPhieu, function(results){
        res.redirect("/nhanvien/cndsDatPhong");
    })    
}
//test win 11
