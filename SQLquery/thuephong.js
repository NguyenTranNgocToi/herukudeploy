const connection = require('../database');
exports.getListPhongDaDat = function(ngayhientai,callbackQuery){
   
    connection.query("SELECT  p1.* , lp1.* FROM phieudatphong pdp1 join chitietdatphong ctdp1 on pdp1.maPhieu = ctdp1.maPhieu join nhanvien nv1 on nv1.id = pdp1.maNVDat join khachhang kh1 on kh1.soCMND = pdp1.soCMND  join phong p1 on p1.maPhong = ctdp1.maPhong join loaiphong lp1 on lp1.maLPH = p1.loaiphong_maLPH left join chitietthuephong cttp1 on ctdp1.idChiTietDatPhong = cttp1.idChiTietDatPhong where cttp1.idChiTietDatPhong is  null and ctdp1.ngayBatDauThue <= ? and ctdp1.ngayTra >=?", 
    [ngayhientai,ngayhientai],function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.getListPhongChuaDat = function(ngayhientai,callbackQuery){
   
    connection.query("SELECT p.*, lp.*FROM phong p join loaiphong lp on lp.maLPH = p.loaiphong_maLPH where p.maPhong not in (SELECT  p1.maPhong FROM phieudatphong pdp1 join chitietdatphong ctdp1 on pdp1.maPhieu = ctdp1.maPhieu join nhanvien nv1 on nv1.id = pdp1.maNVDat join khachhang kh1 on kh1.soCMND = pdp1.soCMND  join phong p1 on p1.maPhong = ctdp1.maPhong join loaiphong lp1 on lp1.maLPH = p1.loaiphong_maLPH left join chitietthuephong cttp1 on ctdp1.idChiTietDatPhong = cttp1.idChiTietDatPhong where cttp1.idChiTietDatPhong is  null and ctdp1.ngayBatDauThue <= ? and ctdp1.ngayTra >=?)", 
    [ngayhientai,ngayhientai],function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.getThongTinNhanPhong = function(thoiGianHienTai,maPhong,callbackQuery){
   
    // connection.query("select * from chitietdatphong ctdp inner join phieudatphong pdp on pdp.maPhieu =ctdp.maPhieu inner join khachhang kh on kh.soCMND = pdp.soCMND inner join chitietthuephong cttp on cttp.IdChitietDatPhong = ctdp.idChiTietDatPhong where ctdp.maPhong = ? and cttp.ngayNhanPhong is not null and cttp.ngayTraPhong is null ORDER BY pdp.maPhieu DESC;",[maPhong], function(err, results,fields){
    connection.query("select kh.tenKH, kh.soCMND, ctdp.maPhong, pdp.ngayDat, ctdp.ngayBatDauThue, ctdp.ngayTra, pdp.maPhieu from chitietdatphong ctdp inner join phieudatphong pdp on pdp.maPhieu =ctdp.maPhieu inner join khachhang kh on kh.soCMND = pdp.soCMND where ctdp.maPhong = ? and ctdp.ngayBatDauThue < ? and ctdp.ngayTra >? ORDER BY pdp.maPhieu DESC; ",[maPhong,thoiGianHienTai,thoiGianHienTai], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.getThongTinPhongDangThueCuaKhach = function(thoiGianHienTai,maPhong,callbackQuery){
   
    connection.query("select * from chitietdatphong ctdp inner join phieudatphong pdp on pdp.maPhieu =ctdp.maPhieu inner join khachhang kh on kh.soCMND = pdp.soCMND inner join chitietthuephong cttp on cttp.IdChitietDatPhong = ctdp.idChiTietDatPhong where ctdp.maPhong = ? and cttp.ngayNhanPhong is not null and cttp.ngayTraPhong is null ORDER BY pdp.maPhieu DESC;",[maPhong], function(err, results,fields){
    // connection.query("select kh.tenKH, kh.soCMND, ctdp.maPhong, pdp.ngayDat, ctdp.ngayBatDauThue, ctdp.ngayTra, pdp.maPhieu from chitietdatphong ctdp inner join phieudatphong pdp on pdp.maPhieu =ctdp.maPhieu inner join khachhang kh on kh.soCMND = pdp.soCMND where ctdp.maPhong = ? and ctdp.ngayBatDauThue < ? and ctdp.ngayTra >? ORDER BY pdp.maPhieu DESC; ",[maPhong,thoiGianHienTai,thoiGianHienTai], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.getThongTinChiTietDatPhongByMaPhieu = function(maPhieu,callbackQuery){
   
    connection.query("SELECT * FROM chitietdatphong ctdp where ctdp.maPhieu =?;",[maPhieu], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.createChiTietHoaDon = function(idChiTietDatPhong, ngayNhanPhong,callbackQuery){
   
    connection.query("INSERT INTO chitietthuephong (IdChitietDatPhong, ngayNhanPhong) VALUES (?, ?);",[idChiTietDatPhong, ngayNhanPhong], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.updateTrangThaiDangThueChoPhong = function(maPhong,callbackQuery){
   
    connection.query("UPDATE phong SET trinhTrang = 'Đang Thuê' WHERE maPhong = ?",[maPhong], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};

exports.getListPhongByMaPhieu = function(maPhieu,callbackQuery){
   
    connection.query("select ctdp.maPhong from chitietdatphong ctdp where ctdp.maPhieu = ?", 
    [maPhieu],function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};

exports.getThongTinThemDichVu = function(maPhong,callbackQuery){
   
    connection.query("select kh.* , cttp.*,ctdp.*   from chitietdatphong ctdp join chitietthuephong cttp on ctdp.idChiTietDatPhong = cttp.IdChitietDatPhong join phieudatphong pdp on pdp.maPhieu = ctdp.maPhieu join khachhang kh on kh.soCMND = pdp.soCMND where ctdp.maPhong =? and cttp.ngayNhanPhong is not null and cttp.ngayTraPhong is null",[maPhong], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.getDichVu = function(callbackQuery){
   
    connection.query("select * from dichvu dv join loaidichvu ldv on dv.loaidichvu_maLoaiDichVu = ldv.maLoaiDichVu", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.getSuDungDichVu = function(maChiTietThuePhong,callbackQuery){
   
    connection.query("select * from sudungdichvu sddv join dichvu dv on sddv.maDichVu =dv.maDichVu join loaidichvu ldv on ldv.maLoaiDichVu = dv.loaidichvu_maLoaiDichVu where sddv.IdChiTietThue =?",[maChiTietThuePhong], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.getMaDichVuByTen = function(tenDV,callbackQuery){
    connection.query("select * from dichvu dv where dv.tenDichVu =?",[tenDV], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
}
exports.deleteSuDungDichVu = function(maDV,idChiTietThuePhong,callbackQuery){
    connection.query("DELETE FROM sudungdichvu  WHERE IdChiTietThue = ? and maDichVu = ?;",[idChiTietThuePhong,maDV], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
}
exports.addSuDungDichVu = function(maDV,soLuong,idChiTietThuePhong,callbackQuery){
    connection.query("INSERT INTO `sudungdichvu` (`maDichVu`, `soLuong`, `IdChiTietThue`) VALUES (?, ?, ?);",[maDV,soLuong,idChiTietThuePhong], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
}
exports.getCacDichVuCanXoa = function(maPhong,callbackQuery){
   
    connection.query("select sddv.*  from chitietdatphong ctdp join chitietthuephong cttp on ctdp.idChiTietDatPhong = cttp.IdChitietDatPhong join phieudatphong pdp on pdp.maPhieu = ctdp.maPhieu join khachhang kh on kh.soCMND = pdp.soCMND join sudungdichvu sddv on sddv.IdChiTietThue = cttp.idchiTietThuePhong  where ctdp.maPhong =? and cttp.ngayNhanPhong is not null and cttp.ngayTraPhong is null",[maPhong], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.getListPhongFULLByMaPhieu = function(maPhieu,callbackQuery){
   
    connection.query("select ctdp.maPhong,ctdp.maPhieu, pdp.ngayDat, cttp.*  from chitietdatphong ctdp join phieudatphong pdp on pdp.maPhieu = ctdp.maPhieu join chitietthuephong cttp on cttp.IdChitietDatPhong = ctdp.idChiTietDatPhong where ctdp.maPhieu = ? and cttp.ngayTraPhong is null", 
    [maPhieu],function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.getListCTTPByMaPHong = function(maPhong,callbackQuery){
   
    connection.query("select  cttp.* , ctdp.*  from chitietdatphong ctdp join phieudatphong pdp on pdp.maPhieu = ctdp.maPhieu join chitietthuephong cttp on cttp.IdChitietDatPhong = ctdp.idChiTietDatPhong where ctdp.maPhong = ? and cttp.ngayTraPhong is null", 
    [maPhong],function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.updateNgayTraPhong = function(idchiTietThuePhong, datetime,callbackQuery){
   
    connection.query("UPDATE `chitietthuephong` SET `ngayTraPhong` = ? WHERE (`idchiTietThuePhong` = ?);", 
    [datetime,idchiTietThuePhong],function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.updateTrangThaiPhong = function(maPhong,callbackQuery){
   
    connection.query("UPDATE `phong` SET `trinhTrang` = 'còn trống' WHERE `maPhong` = ?", 
    [maPhong],function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.getPhieuByMaPhieu = function(maPhieu,callbackQuery){
   
    connection.query("SELECT * FROM phieudatphong pdp where pdp.maPhieu =?;", 
    [maPhieu],function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};


exports.themHoaDon = function(ngay, soCMND, tenNV,callbackQuery){
    var id = 0;
    connection.query("select tknv.idNhanVien from taikhoannhanvien tknv where tknv.tenDangNhap = ?;",
    [tenNV],(err,results)=>{
        if(!err){
            id = results[0].idNhanVien ;
            // console.log("id here"+id);
           
            connection.query("INSERT INTO `hoadon` (`maNV`, `ngayLapHoaDon`, `soCMND`) VALUES (?,?,?);",
            [id, ngay, soCMND],(err,results)=>{
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


exports.addChiTietHoaDon = function(idChiTietThuePhong,callbackQuery){
    connection.query("INSERT INTO `chitiethoadon` (`maHoaDon`, `IdChiTietThuePhong`) VALUES ((SELECT MAX(hd.maHoaDon) FROM hoadon hd), ?);",[idChiTietThuePhong], function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
}

exports.danhSachKhachHangDangThue = function(callbackQuery){
    connection.query("select * from chitietthuephong cttp join chitietdatphong ctdp on cttp.IdChitietDatPhong = ctdp.idChiTietDatPhong join phieudatphong pdp on pdp.maPhieu = ctdp.maPhieu join khachhang kh on kh.soCMND = pdp.soCMND     join phong p on p.maPhong = ctdp.maPhong join loaiphong lp on lp.maLPH = p.loaiphong_maLPH where cttp.ngayNhanPhong is not null and cttp.ngayTraPhong is null", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
}
exports.dsPhongCuaHoaDonVuaLap = function(callbackQuery){
    connection.query("select kh.*, nv.tenNV, lp.*, p.*, hd.*, cthd.*, cttp.*, ctdp.* , pdp.*, TIMESTAMPDIFF(hour, cttp.ngayNhanPhong,  cttp.ngayTraPhong ) %24 AS hours,  (TIMESTAMPDIFF(hour, cttp.ngayNhanPhong,  cttp.ngayTraPhong ) - TIMESTAMPDIFF(hour, cttp.ngayNhanPhong,  cttp.ngayTraPhong ) %24)/24 AS days,TIMESTAMPDIFF(second, cttp.ngayNhanPhong,  cttp.ngayTraPhong ) AS seconds from hoadon hd inner join chitiethoadon cthd on cthd.maHoaDon = hd.maHoaDon inner join khachhang kh on kh.soCMND = hd.soCMND inner join chitietthuephong cttp on cttp.idchiTietThuePhong = cthd.IdChiTietThuePhong inner join chitietdatphong ctdp on ctdp.idChiTietDatPhong = cttp.IdChitietDatPhong inner join phong p on p.maPhong = ctdp.maPhong inner join loaiphong lp on lp.maLPH = p.loaiphong_maLPH  inner join nhanvien nv on nv.id = hd.maNV   inner join phieudatphong pdp on pdp.maPhieu = ctdp.maPhieu where hd.maHoaDon =  (select MAX(hd.maHoaDon) from hoadon hd) order by ctdp.maPhong;", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
}


exports.dsDichVuCuaHoaDonVuaLap = function(callbackQuery){
    connection.query(" select ctdp.maPhong, ldv.*, dv.*, sddv.* from hoadon hd inner join chitiethoadon cthd on cthd.maHoaDon = hd.maHoaDon inner join khachhang kh on kh.soCMND = hd.soCMND inner join chitietthuephong cttp on cttp.idchiTietThuePhong = cthd.IdChiTietThuePhong inner join chitietdatphong ctdp on ctdp.idChiTietDatPhong = cttp.IdChitietDatPhong inner join phong p on p.maPhong = ctdp.maPhong inner join loaiphong lp on lp.maLPH = p.loaiphong_maLPH      inner join sudungdichvu sddv on sddv.IdChiTietThue = cttp.idchiTietThuePhong inner join dichvu dv on dv.maDichVu = sddv.maDichVu inner join loaidichvu ldv on ldv.maLoaiDichVu = dv.loaidichvu_maLoaiDichVu where hd.maHoaDon =  (select MAX(hd.maHoaDon) from hoadon hd) order by ctdp.maPhong;", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
}

exports.dsHoaDon = function(callbackQuery){
    connection.query("select hd.*, kh.*, nv.tenNV from hoadon hd join khachhang kh on kh.soCMND = hd.soCMND join nhanvien nv on nv.id = hd.maNV join chitiethoadon cthd on cthd.maHoaDon = hd.maHoaDon  group by hd.maHoaDon", function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
}



exports.dsPhongCuaHoaDonByMaHoaDon = function(maHoaDon,callbackQuery){
    connection.query("select kh.*, nv.tenNV, lp.*, p.*, hd.*, cthd.*, cttp.*, ctdp.* , pdp.*, TIMESTAMPDIFF(hour, cttp.ngayNhanPhong,  cttp.ngayTraPhong ) %24 AS hours,  (TIMESTAMPDIFF(hour, cttp.ngayNhanPhong,  cttp.ngayTraPhong ) - TIMESTAMPDIFF(hour, cttp.ngayNhanPhong,  cttp.ngayTraPhong ) %24)/24 AS days,TIMESTAMPDIFF(second, cttp.ngayNhanPhong,  cttp.ngayTraPhong ) AS seconds from hoadon hd inner join chitiethoadon cthd on cthd.maHoaDon = hd.maHoaDon inner join khachhang kh on kh.soCMND = hd.soCMND inner join chitietthuephong cttp on cttp.idchiTietThuePhong = cthd.IdChiTietThuePhong inner join chitietdatphong ctdp on ctdp.idChiTietDatPhong = cttp.IdChitietDatPhong inner join phong p on p.maPhong = ctdp.maPhong inner join loaiphong lp on lp.maLPH = p.loaiphong_maLPH  inner join nhanvien nv on nv.id = hd.maNV   inner join phieudatphong pdp on pdp.maPhieu = ctdp.maPhieu where hd.maHoaDon =  ? order by ctdp.maPhong;",[maHoaDon] ,function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
}


exports.dsDichVuCuaHoaDonByMaHoaDon = function(maHoaDon, callbackQuery){
    connection.query(" select ctdp.maPhong, ldv.*, dv.*, sddv.* from hoadon hd inner join chitiethoadon cthd on cthd.maHoaDon = hd.maHoaDon inner join khachhang kh on kh.soCMND = hd.soCMND inner join chitietthuephong cttp on cttp.idchiTietThuePhong = cthd.IdChiTietThuePhong inner join chitietdatphong ctdp on ctdp.idChiTietDatPhong = cttp.IdChitietDatPhong inner join phong p on p.maPhong = ctdp.maPhong inner join loaiphong lp on lp.maLPH = p.loaiphong_maLPH      inner join sudungdichvu sddv on sddv.IdChiTietThue = cttp.idchiTietThuePhong inner join dichvu dv on dv.maDichVu = sddv.maDichVu inner join loaidichvu ldv on ldv.maLoaiDichVu = dv.loaidichvu_maLoaiDichVu where hd.maHoaDon =  ? order by ctdp.maPhong;",[maHoaDon] ,function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
}

exports.ktTrungNgayThue = function(ngaytra,maPhong,callbackQuery){
   
    connection.query("SELECT * FROM chitietdatphong ctdp join phieudatphong p on p.maPhieu = ctdp.maPhieu join khachhang kh on kh.soCMND = p.soCMND where ctdp.ngayBatDauThue > (SELECT NOW() today) and  ctdp.ngayBatDauThue < ? and ctdp.maPhong =? ORDER BY ctdp.ngayBatDauThue  ASC ;", 
    [ngaytra,maPhong],function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};
exports.getMaPhieuVuaLap= function(callbackQuery){
    connection.query("SELECT * FROM phieudatphong pdp  ORDER BY  pdp.maPhieu DESC;" ,function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
};
exports.doanhThuDichVuVaSoDichVuDaSuDung = function(ngaybatdau,ngayketthuc,callbackQuery){
   
    connection.query("select  * from hoadon hd join chitiethoadon cthd on cthd.maHoaDon = hd.maHoaDon join chitietthuephong cttp on cttp.idchiTietThuePhong = cthd.IdChiTietThuePhong left join sudungdichvu sddv on sddv.IdChiTietThue = cttp.idchiTietThuePhong left join dichvu dv on dv.maDichVu =sddv.maDichVu join nhanvien nv on nv.id = hd.maNV where hd.ngayLapHoaDon >= ? and  hd.ngayLapHoaDon <= ? and dv.maDichVu is not null;", 
    [ngaybatdau,ngayketthuc],function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};

exports.doanhThuPhongVaSoPhongDaThue = function(ngaybatdau,ngayketthuc,callbackQuery){
   
    connection.query("select *,TIMESTAMPDIFF(hour, cttp.ngayNhanPhong,  cttp.ngayTraPhong ) %24 *(lp.donGia/24)+ ((TIMESTAMPDIFF(hour, cttp.ngayNhanPhong,  cttp.ngayTraPhong ) - TIMESTAMPDIFF(hour, cttp.ngayNhanPhong,  cttp.ngayTraPhong ) %24)/24 *lp.donGia ) as \"tienThu\",((TIMESTAMPDIFF(hour, cttp.ngayNhanPhong,  cttp.ngayTraPhong ) - TIMESTAMPDIFF(hour, cttp.ngayNhanPhong,  cttp.ngayTraPhong ) %24)/24) as \"soNgayThue\", TIMESTAMPDIFF(hour, cttp.ngayNhanPhong,  cttp.ngayTraPhong ) %24 as \"soGioThue\"  from hoadon hd join chitiethoadon cthd on cthd.maHoaDon = hd.maHoaDon join chitietthuephong cttp on cttp.idchiTietThuePhong = cthd.IdChiTietThuePhong join chitietdatphong ctdp on ctdp.idChiTietDatPhong = cttp.IdChitietDatPhong    join phong p on p.maPhong = ctdp.maPhong    join loaiphong lp on lp.maLPH = p.loaiphong_maLPH join nhanvien nv on nv.id = hd.maNV	where hd.ngayLapHoaDon >= ? and  hd.ngayLapHoaDon <= ? ;", 
    [ngaybatdau,ngayketthuc],function(err, results,fields){
        if(!err){
            callbackQuery(results);
        }else{
            console.log(err);
            results = null;
        }
    })
 
};