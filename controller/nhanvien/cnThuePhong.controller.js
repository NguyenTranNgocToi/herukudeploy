
const thuephongSQL = require('../../SQLquery/thuephong');
var sleep = require('system-sleep');
const datphongSQL = require('../../SQLquery/datphong');
module.exports.cnThuePhong = function (req, res) {
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

    thuephongSQL.getListPhongDaDat(dateTime, function(results){
        thuephongSQL.getListPhongChuaDat(dateTime, function(results1){
            return res.render('./bodyNhanVien/cnThuePhong',{layout: './layouts/layoutNhanVien' , title: 'Thuê Phòng',list:results, list1:results1});
        })
      
    })
   
};
module.exports.cnThuePhongChiTiet = function (req, res) {
    var maPhong = req.params['maPhong'];
        return res.render('./bodyNhanVien/cnThuePhongChiTiet',{layout: './layouts/layoutNhanVien' , title: 'Thuê Phòng Chi Tiết',maPhong});
 
};
module.exports.KtTrungNgay = function (req, res) {
    var maPhong = req.params['maPhong'];
    var ngaytra = req.params['ngayTra'];
    ngaytra = ngaytra.toString()
    ngaytra =ngaytra.replace("T", " ")
    console.log(maPhong +" "+ ngaytra);
    thuephongSQL.ktTrungNgayThue(ngaytra,maPhong, function (results) {
        if(results.length>0){
          res.send(results[0])
        }else{
            res.send("Rỗng")    
        }
    })
    
};
module.exports.cnThuePhongTrucTiep= function (req, res) {
    var maPhong = req.params['maPhong'];
    var tenKH = req.body.ten;
    var scmnd = req.body.scmnd;
    var sdt = req.body.sdt;
    var gioitinh = req.body.gioitinh;
    var diaChi = req.body.diachi;
    var tienCoc = 0

    var stringngaybatdau = req.body.ngaydat;
    stringngaybatdau = stringngaybatdau.toString()
    stringngaybatdau =stringngaybatdau.replace("T", " ")
    

    var stringngaytra = req.body.ngaytra;
    console.log("erro:" +stringngaytra );

    stringngaytra  =  stringngaytra.toString()
    stringngaytra =stringngaytra.replace("T", " ")

    // console.log("erro:" +stringngaybatdau );
    // console.log("erro:" +stringngaytra );

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
          
                datphongSQL.themPhieuDatPhongChiTiet(dateTime,scmnd ,maPhong, stringngaybatdau, stringngaytra, function(results){
                    // res.redirect("/nhanvien/cndsDatPhong/phieudatphongvuanay");
                    thuephongSQL.getMaPhieuVuaLap( function(results){
                        console.log("ma phiếu lỗi"+results[0].maPhieu);
                        res.redirect("/nhanvien/cnthuephong/nhanphong/"+results[0].maPhieu);
                        // res.redirect("/nhanvien/cnthuephong/nhanphong/1000")


                       
                    })
                  

                 }); 
                
            })
 
        })
   
};

module.exports.cnXemNhanPhong = function (req, res) {
    var idPhong = req.params['idPhong'];
    // console.log("id Phong:"+ idPhong);
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

    thuephongSQL.getThongTinNhanPhong(dateTime,idPhong, function(results){
        // var min = results[0].maPhieu;
        // var max = results[0].maPhieu;
        // for(var i=0; i<results.length; i++){
        //     if(results[i].maPhieu<min)
        //         min=results[i].maPhieu
        //     if(results[i].maPhieu>max)
        //         max=results[i].maPhieu    
        // }
        thuephongSQL.getListPhongByMaPhieu(results[0].maPhieu, function(results1){
            return res.render('./bodyNhanVien/cnNhanPhong',{layout: './layouts/layoutNhanVien' , title: 'Xem Nhận Phòng',list:results, list1:results1});
        })
       
    })
   
};
module.exports.cnNhanPhong = function (req, res) {
    var idPhieu = req.params['idPhieu'];
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    // console.log("id Phieu:"+ idPhieu);
    thuephongSQL.getThongTinChiTietDatPhongByMaPhieu(idPhieu, function(results1){
        var list = results1
        for(i = 0; i<list.length; i++){
            // console.log("maPhong getthong nhận phòng:"+ results[i].maPhong);
            // console.log("idchitietdatphong getthong nhận phòng:"+ results[i].idChiTietDatPhong);
            thuephongSQL.createChiTietHoaDon(list[i].idChiTietDatPhong, dateTime, function(results2){
            })
            thuephongSQL.updateTrangThaiDangThueChoPhong(list[i].maPhong, function(results){
            })
        }
        res.redirect("/nhanvien/cnthuephong");
       
    })
   
};
module.exports.cnDichVu = function (req, res) {
    var idPhong = req.params['maPhong'];
    var status = req.params['status'];
    // console.log("id phong"+ idPhong);
    // console.log("status"+ status);
    var mess =""
    if(status =="1"){
        // console.log("status"+ status);
        mess ="Đã Lưu"
    }
    thuephongSQL.getThongTinThemDichVu(idPhong, function(results){
        var list = results
        var date_ob = new Date(list[0].ngayNhanPhong.getFullYear().toString()+"-"+
                                (list[0].ngayNhanPhong.getMonth()+1).toString()+"-"+
                                list[0].ngayNhanPhong.getDate().toString())

       
        var day=0

        var one_day = 1000 * 60 * 60 * 24

        var date_ob2 = new Date();
        // var day = ("0" + date_ob.getDate()).slice(-2);
        // var month = ("0" + (date_ob.getMonth() + 2)).slice(-2);
        // var year = date_ob.getFullYear();
        // var hours = date_ob.getHours();
        // var minutes = date_ob.getMinutes();
        // var seconds = date_ob.getSeconds();
        
        var Result = Math.round(date_ob2.getTime()-date_ob.getTime()) / (one_day);
            
        // To remove the decimals from the (Result) resulting days value
        var Final_Result = Result.toFixed(2);

        console.log(date_ob2.getDate()+"/"+date_ob2.getMonth()+"/"+date_ob2.getFullYear());
        console.log(date_ob.getDate()+"/"+date_ob.getMonth()+"/"+date_ob.getFullYear());
        console.log(Final_Result);
        console.log(list[0].ngayNhanPhong.getMonth());
        day = Final_Result
       
        thuephongSQL.getDichVu( function(results1){
            var list1 = results1
            // console.log("ten dichvu"+results1[0].tenDichVu);
            var idChiTietThuePhong =results[0].idchiTietThuePhong

           // console.log("id chi tiet dat phong"+ idChiTietThuePhong);
             thuephongSQL.getSuDungDichVu( idChiTietThuePhong, function(results2){
                //  console.log("ten su dung dich vu"+ results2[0].tenDichVu);
                var list2 = results2
                return res.render('./bodyNhanVien/cnDichVu',{layout: './layouts/layoutNhanVien' , title: 'Thêm Dịch Vụ',list,list1,list2,mess,day});
             })
           
        })
        
    })
   
};
module.exports.cnDichVuPost = function (req, res) {
    var idPhong = req.params['maPhong'];
    // console.log("id phong"+ idPhong);
    var mess ="Lưu thành công"
    var stringlistDichVu = req.body.listDichVu;
    var stringlistSoLuongDichVu=req.body.listSoLuongDichVu;

    if(stringlistDichVu !="-1"){
        
    
    var listDichVu = []
    listDichVu = stringlistDichVu.split("-")

    var listSoLuongDichVu =[]
    listSoLuongDichVu = stringlistSoLuongDichVu.split("-")
    // console.log("listDV"+listSoLuongDichVu[0]);
    // console.log("listDV"+listDichVu[0]);

    // console.log("listdv"+listDichVu+listSoLuongDichVu);
    thuephongSQL.getCacDichVuCanXoa(idPhong, function(resultsCDVCXOA){
        for(var i =0; i< resultsCDVCXOA.length ; i++){
            // console.log("xoa"+resultsCDVCXOA[i].maDichVu+resultsCDVCXOA[i].IdChiTietThue);
            thuephongSQL.deleteSuDungDichVu(resultsCDVCXOA[i].maDichVu, resultsCDVCXOA[i].IdChiTietThue ,function(resultsdelete){ 

            })
        }
    })


    for(var i =0; i< listDichVu.length ; i++){
        updatedichvu(listDichVu,listSoLuongDichVu,idPhong,i)
        if(i== listDichVu.length-1){
            return res.redirect('/nhanvien/cnthuephong/cndichvu/'+idPhong+'/1')
        }    
    }

    }else{
        thuephongSQL.getCacDichVuCanXoa(idPhong, function(resultsCDVCXOA){
            for(var i =0; i< resultsCDVCXOA.length ; i++){
                // console.log("lỗi here");
                // console.log("xoa"+resultsCDVCXOA[i].maDichVu+resultsCDVCXOA[i].IdChiTietThue);
                thuephongSQL.deleteSuDungDichVu(resultsCDVCXOA[i].maDichVu, resultsCDVCXOA[i].IdChiTietThue ,function(resultsdelete){ 
                  
                })
                if(i==  resultsCDVCXOA.length-1){
                    return res.redirect('/nhanvien/cnthuephong/cndichvu/'+idPhong+'/1')
                }   
            }
            if(resultsCDVCXOA.length==0){
                return res.redirect('/nhanvien/cnthuephong/cndichvu/'+idPhong+'/1')
            }  
        })
    }


  

   
};
function updatedichvu(listDichVu,listSoLuongDichVu,idPhong,i) {
    thuephongSQL.getThongTinThemDichVu(idPhong, function(results){
        var list = results
        // console.log("ten kh h"+list[0].tenKH);
        thuephongSQL.getDichVu( function(results1){
            var list1 = results1
            // console.log("ten dichvu"+results1[0].tenDichVu);
            var idChiTietThuePhong =results[0].idchiTietThuePhong

           // console.log("id chi tiet dat phong"+ idChiTietThuePhong);
         
           
          
            // console.log("i not erro: "+i);
            thuephongSQL.getMaDichVuByTen(listDichVu[i] ,function(resultsIdDV){

                // console.log(resultsIdDV[0].maDichVu);
                // console.log("IDChitietthuephong"+list[0].idchiTietThuePhong);
               
                    thuephongSQL.addSuDungDichVu(resultsIdDV[0].maDichVu,listSoLuongDichVu[i], list[0].idchiTietThuePhong ,function(resultsIdDV){
                       
                    })
                    // console.log("i erro: "+i);
                    // console.log("so luong here: "+listSoLuongDichVu[i]);
            
            })
        })
    })
}

module.exports.cnGetListPhongDangThue = function (req, res) {
    var idPhong = req.params['maPhong'];
    console.log("id Phong:"+ idPhong);
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

    thuephongSQL.getThongTinPhongDangThueCuaKhach(dateTime,idPhong, function(results){
        
        thuephongSQL.getListPhongFULLByMaPhieu(results[0].maPhieu, function(results1){
            return res.send(results1);
        })
       
    })
    // console.log("lỗi here");
    
};
module.exports.cnThanhToan = function (req, res) {
    var stringlistPhong =req.body.listmaphong;
   
    var listphong = []
    listphong= stringlistPhong.split("-")

    // for(var i=0; i<listphong.length; i++ )
    //     console.log(listphong[i]);
    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    var dateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    const{cookies} =req;
    // console.log("cookie");
    
    var tenNV = cookies.nv;
    // console.log(tenNV);
    for(var i=0; i<listphong.length; i++ ){
        lapHoaDon(dateTime,listphong,tenNV ,i);
        // if(i==listphong.length-1)
        //     res.redirect("/nhanvien/cnthuephong/chitiethoadonvualap");
    }
  
    thuephongSQL.dsPhongCuaHoaDonVuaLap(function(results){ 
        thuephongSQL.dsDichVuCuaHoaDonVuaLap(function(results1){ 
        // console.log("erro here");    
        // console.log(results.length);   
        // console.log(results1.length);    
        var kq =0
        return res.render('./bodyNhanVien/chiTietHoaDon',{layout: './layouts/layoutNhanVien' , title: 'Hóa Đơn', list:results,list1:results1, kq});
    }) })
}
  

function lapHoaDon(dateTime,listphong,tenNV,i  ) {
    console.log(listphong[i])
    thuephongSQL.updateTrangThaiPhong(listphong[i], function(results){
              
    })
    thuephongSQL.getListCTTPByMaPHong(listphong[i], function(results1){ 
        if(results1.length>0){
            // console.log(results1[0])
            // console.log(results1[0].idchiTietThuePhong)
            thuephongSQL.updateNgayTraPhong(results1[0].idchiTietThuePhong,dateTime, function(results2){

            })
            // console.log(results1[0].maPhieu)
            thuephongSQL.getPhieuByMaPhieu(results1[0].maPhieu, function(results3){ 
                if(results3.length>0){
                    // console.log(results3[0].soCMND) 
                    thuephongSQL.themHoaDon(dateTime, results3[0].soCMND, tenNV, function(results4){
                        thuephongSQL.addChiTietHoaDon(results1[0].idchiTietThuePhong, function(results5){
                           
                        })
                    })
                   
                
                }
                // if(i==listphong.length-1)
                // console.log("hrere");
            })
           

        }
       
    })
    
}

    
  
   




module.exports.danhSachKhachHangDangThue = function (req, res) {
  
    thuephongSQL.danhSachKhachHangDangThue(function(results){ 
        // console.log(results[0].soDT);
        return res.render('./bodyNhanVien/danhSachKhachHangDangThue',{layout: './layouts/layoutNhanVien' , title: 'Khách Thuê Phòng', list:results});
    })
    
};


module.exports.chiTietHoaDonVuaLap= function (req, res) {
   
        thuephongSQL.dsPhongCuaHoaDonVuaLap(function(results){ 
            thuephongSQL.dsDichVuCuaHoaDonVuaLap(function(results1){ 
            // console.log(results.length);   
            // console.log(results1.length);    
            var kq =1
            return res.render('./bodyNhanVien/chiTietHoaDon',{layout: './layouts/layoutNhanVien' , title: 'Hóa Đơn', list:results,list1:results1, kq});
        }) })
     
};

module.exports.listHoaDon= function (req, res) {
    thuephongSQL.dsHoaDon(function(results1){
        // console.log(results1);
        return res.render('./bodyNhanVien/dsHoaDon',{layout: './layouts/layoutNhanVien' , title: 'Hóa Đơn', list1:results1});
    })
};
module.exports.chiTietHoaDonByMa= function (req, res) {
  
    var maHoaDon = req.params['maHoaDon'];
    // console.log(maHoaDon);
    thuephongSQL.dsPhongCuaHoaDonByMaHoaDon(maHoaDon,function(results){ 
        thuephongSQL.dsDichVuCuaHoaDonByMaHoaDon(maHoaDon,function(results1){ 
        // console.log(results.length);   
        // console.log(results[0].tenKH);
        // console.log(results1.length);    
        var kq = 1
        return res.render('./bodyNhanVien/chiTietHoaDon',{layout: './layouts/layoutNhanVien' , title: 'Hóa Đơn', list:results,list1:results1,kq});
    }) })
    
};