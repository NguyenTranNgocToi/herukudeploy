const { STRING } = require('mysql/lib/protocol/constants/types');
const connection = require('../database');
exports.getListDatPhong = function(callbackQuery){
   
    connection.query("SELECT  pdp.maPhieu , kh.tenKH, pdp.ngayDat, nv.tenNV,  kh.soCMND, kh.soDT FROM phieudatphong pdp join chitietdatphong ctdp  on pdp.maPhieu = ctdp.maPhieu left join nhanvien nv on nv.id = pdp.maNVDat join khachhang kh on kh.soCMND = pdp.soCMND where pdp.maPhieu not in (SELECT  pdp1.maPhieu  FROM phieudatphong pdp1 join chitietdatphong ctdp1 on pdp1.maPhieu = ctdp1.maPhieu join nhanvien nv1 on nv1.id = pdp1.maNVDat join khachhang kh1 on kh1.soCMND = pdp1.soCMND  left join chitietthuephong cttp1 on ctdp1.idChiTietDatPhong = cttp1.idChiTietDatPhong where cttp1.IdChiTietThuePhong is not null) GROUP BY pdp.maPhieu;", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.getListDatPhongKH = function(tenDangNhap,callbackQuery){
   
    connection.query("SELECT   pdp.maPhieu , kh.tenKH, pdp.ngayDat, nv.tenNV,  kh.soCMND, kh.soDT FROM phieudatphong pdp join chitietdatphong ctdp  on pdp.maPhieu = ctdp.maPhieu left join nhanvien nv on nv.id = pdp.maNVDat join khachhang kh on kh.soCMND = pdp.soCMND  join taikhoankhachhang tkkh on tkkh.idkhachhang = kh.id where tkkh.tenDangNhap =? and pdp.maPhieu not in (SELECT  pdp1.maPhieu  FROM phieudatphong pdp1 join chitietdatphong ctdp1 on pdp1.maPhieu = ctdp1.maPhieu join nhanvien nv1 on nv1.id = pdp1.maNVDat join khachhang kh1 on kh1.soCMND = pdp1.soCMND  left join chitietthuephong cttp1 on ctdp1.idChiTietDatPhong = cttp1.idChiTietDatPhong where cttp1.IdChiTietThuePhong is not null) GROUP BY pdp.maPhieu;",[tenDangNhap] ,function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.getLisPhongTrong = function(ngaybatdau1,ngaytra1,callbackQuery){
   
    connection.query( "select p1.*,l.* from phong p1 join loaiphong l on p1.loaiphong_maLPH = l.maLPH  where p1.maPhong not in( select  p.maPhong from chitietdatphong ctdp  right join phong p on p.maPhong = ctdp.maPhong join loaiphong l on p.loaiphong_maLPH = l.maLPH  left join chitietthuephong cttp on cttp.IdChiTietDatPhong =  ctdp.idChiTietDatPhong where ctdp.ngayTra is not null  and cttp.ngayTraPhong is null   and   ( (ctdp.ngayBatDauThue <? and ctdp.ngayTra > ? ) or (ctdp.ngayTra > ? and  ctdp.ngayTra < ? ) or (ctdp.ngayBatDauThue >? and ctdp.ngayBatDauThue < ? ))    );"
        // connection.query( "select p1.*,l.* from phong p1 join loaiphong l on p1.loaiphong_maLPH = l.maLPH where p1.maPhong not in(select p.maPhong from chitietdatphong ctdp  right join phong p on p.maPhong = ctdp.maPhong join loaiphong l on p.loaiphong_maLPH = l.maLPH where ctdp.ngayTra is not null and( (ctdp.ngayBatDauThue <? and ctdp.ngayTra > ? ) or (ctdp.ngayBatDauThue <? and ctdp.ngayTra > ?)or(ctdp.ngayBatDauThue>? and ctdp.ngayTra<?))GROUP BY p.maPhong);"
    // connection.query( "select p1.*,l.* from phong p1 join loaiphong l on p1.loaiphong_maLPH = l.maLPH where p1.maPhong not in(select p.maPhong from chitietdatphong ctdp  right join phong p on p.maPhong = ctdp.maPhong join loaiphong l on p.loaiphong_maLPH = l.maLPH right join chitietthuephong cttp on cttp.IdChiTietDatPhong =  ctdp.idChiTietDatPhong  and cttp.ngayTraPhong is null where ctdp.ngayTra is not null and( (ctdp.ngayBatDauThue <? and ctdp.ngayTra > ? )or (ctdp.ngayBatDauThue <? and ctdp.ngayTra > ?)or(ctdp.ngayBatDauThue>? and ctdp.ngayTra<?))GROUP BY p.maPhong);"
    ,[ngaybatdau1,ngaytra1,ngaybatdau1,ngaytra1,ngaybatdau1,ngaytra1],function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
        
    })
    
    
};
exports.kiemtraTrungCmnd = function(scmnd,callbackQuery){
 connection.query( "SELECT * FROM khachhang kh where kh.soCMND =?"
    ,[scmnd],function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
        
    })
};
exports.themKhachHang = function(sdt,tenKH,scmnd,diachi,gioitinh,callbackQuery){
    connection.query("INSERT INTO khachhang (soDT, tenKH, soCMND, diaChi, gioiTinh) VALUES (?, ?, ?, ?, ?);",
    [sdt,tenKH,scmnd,diachi,gioitinh],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    });  
};

exports.themPhieuDatPhong = function(ngayDat, soCMND, tenNV,coc,callbackQuery){
    var id = 0;
    connection.query("select tknv.idNhanVien from taikhoannhanvien tknv where tknv.tenDangNhap = ?;",
    [tenNV],(err,results)=>{
        if(!err){
            id = results[0].idNhanVien ;
            // console.log("id here"+id);
           
            connection.query("INSERT INTO phieudatphong (ngayDat, soCMND, maNVDat,tienCoc) VALUES (?, ?, ?,?);",
            [ngayDat, soCMND, id, coc],(err,results)=>{
                if(!err){
                    callbackQuery(results);
                }else{
                    console.log(err);
                    results = null;
                }
            });
        }else{
            console.log(err);
            results = null;
        }
    });
   
    
};

exports.themPhieuDatPhongKH = function(ngayDat, soCMND,coc,callbackQuery){
   
           
    connection.query("INSERT INTO phieudatphong (ngayDat, soCMND, tienCoc) VALUES ( ?, ?,?);",
    [ngayDat, soCMND, coc],(err,results)=>{
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    });
       
   
   
    
};

exports.themPhieuDatPhongChiTiet = function(ngayLapPhieu, soCMND, maPhong,ngayDatCTP,ngaytraCTP,callbackQuery){
    var idPhieu = 0;
    connection.query("SELECT p.maPhieu FROM phieudatphong p where p.ngayDat =? and p.soCMND =?;",
    [ngayLapPhieu,soCMND],(err,results)=>{
        if(!err){
            idPhieu = results[0].maPhieu;
            // console.log("id phieu");
            // console.log(idPhieu);
            connection.query("INSERT INTO chitietdatphong (maPhieu, maPhong, ngayBatDauThue, ngayTra) VALUES (?, ?, ?, ?);",
            [idPhieu, maPhong, ngayDatCTP,ngaytraCTP],(err,results)=>{
                if(!err){
                    callbackQuery(results);
                }else{
                    console.log(err);
                    results = null;
                }
            });
        }else{
            console.log(err);
            results = null;
        }
    });
   
    
};
exports.xoaPhieu = function(maPhieu,callbackQuery){
    connection.query("DELETE FROM `chitietdatphong` WHERE (`maPhieu` = ?);",
    [maPhieu],(err,results)=>{
        if(!err){
            connection.query("DELETE FROM `phieudatphong` WHERE (`maPhieu` = ?);",
            [maPhieu],(err,results)=>{
                if(!err){
                    callbackQuery(results);
                }else{
                    console.log(err);
                    results = null;
                }
            });
        }else{
            console.log(err);
            results = null;
        }
    });  
};
exports.getListChiTietPhieu = function(maPhieu,callbackQuery){
   
    connection.query("SELECT pdp.maPhieu, ctdp.maPhong, ctdp.ngayBatDauThue, ctdp.ngayTra, nv.tenNV, kh.tenKH, kh.soDT FROM phieudatphong pdp join chitietdatphong ctdp on pdp.maPhieu = ctdp.maPhieu left join nhanvien nv on nv.id = pdp.maNVDat join khachhang kh on kh.soCMND = pdp.soCMND where ctdp.maPhieu = ?;",[maPhieu], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.getTienCocVaSoNguoi = function(listMaPhong,callbackQuery){
    connection.query(" select SUM(lp.donGia) as \"donGia\",  SUM(lp.soNguoi ) as \"soNguoi\"   from phong p join loaiphong lp on p.loaiphong_maLPH = lp.maLPH where p.maPhong in (?)",[listMaPhong], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
};

exports.getPhong_LoaiPhong = function(callbackQuery){
    connection.query("select lp.*, p.* from phong p join loaiphong lp on p.loaiphong_maLPH = lp.maLPH", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
};



exports.getPhieuDatPhongVuaNay = function(callbackQuery){
    connection.query("   select kh.*, pdp.*, ctdp.*, nv.tenNV, p.*, lp.* from phieudatphong pdp left join khachhang kh on kh.soCMND = pdp.soCMND left join chitietdatphong ctdp on ctdp.maPhieu = pdp.maPhieu left join nhanvien nv on nv.id = pdp.maNVDat left join phong p on p.maPhong = ctdp.maPhong left join loaiphong lp on lp.maLPH = p.loaiphong_maLPH where pdp.maPhieu =  (select MAX(pdp.maPhieu) from  phieudatphong pdp) order by ctdp.maPhong;", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
};

exports.getPhieuDatPhongByMaPhieu = function(maPhieu,callbackQuery){
    connection.query("   select kh.*, pdp.*, ctdp.*, nv.tenNV, p.*, lp.* from phieudatphong pdp left join khachhang kh on kh.soCMND = pdp.soCMND left join chitietdatphong ctdp on ctdp.maPhieu = pdp.maPhieu left join nhanvien nv on nv.id = pdp.maNVDat left join phong p on p.maPhong = ctdp.maPhong left join loaiphong lp on lp.maLPH = p.loaiphong_maLPH where pdp.maPhieu = ? order by ctdp.maPhong;",[maPhieu] ,function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
};

exports.xacNhanPhieuById = function(tenNV,maPhieu,callbackQuery){
    var id = 0;
    connection.query("select tknv.idNhanVien from taikhoannhanvien tknv where tknv.tenDangNhap = ?;",
    [tenNV],(err,results)=>{
        if(!err){
            id = results[0].idNhanVien ;
            // console.log("id here"+id);
           
            connection.query("UPDATE `phieudatphong` SET `maNVDat` = ? WHERE (`maPhieu` = ?);",
            [id, maPhieu],(err,results)=>{
                if(!err){
                    callbackQuery(results);
                }else{
                    console.log(err);
                    results = null;
                }
            });
        }else{
            console.log(err);
            results = null;
        }
    });
   
    
};

