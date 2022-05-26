const connection = require('../../database');

//Trang cập loại dịch vụ
module.exports.trangcnloaidv = function (req, res) {
    var sql = "select * from loaidichvu";
    var query = connection.query(sql, (err, data) => {
        if (err) res.send('Server 500');
        return res.render('./bodyQuanLy/TrangCNLDichVu', {
            layout: './layouts/layoutQuanLy', title: 'Cập nhật loại dịch vụ',
            listLDV: data,kt:''
        });
    });
};

//Thêm loại dịch vụ
module.exports.themloaidichvu = function (req, res) {
    var matudong;
    var sqlma = " select count(*) as soluong from loaidichvu";
    var sqlthem = "Insert into loaidichvu Set ?";
    var query1 = connection.query(sqlma, (err1, data1) => {
        if (err1){
            res.send('Server 500')
        } else{
            if(data1.length > 0){
                matudong = parseInt(data1[0].soluong);
                matudong += 1;
            }else{
                matudong = 1;
            }
            var loaidichvu = { maLoaiDichVu: matudong, tenLoaiDichVu: req.body.tenloaidv }
            var query2 = connection.query(sqlthem, loaidichvu, (err, data) => {
                if (err) res.send('Lỗi thêm loại dịch vụ');
                res.redirect('/quanly/cnloaidv');
            })
        }
    })
};




//Xóa loại dịch vụ
module.exports.xoaloaidv = function (req,res) {
    var id = req.params.id;
    var sql = "select * from loaidichvu";
    var sqlcheck = 'Select * from dichvu where loaidichvu_maLoaiDichVu = ?';
    var sqldelete = 'Delete from loaidichvu where maLoaiDichVu = ?';
    var querycheck = connection.query(sqlcheck,[id],(err,datacheck)=>{
        if(err){
            res.send('Lỗi kiểm tra')
        }else{
            if(datacheck.length == 0){
                var query = connection.query(sqldelete,[id],(err,data)=>{
                    if(err) throw err;
                    res.redirect('/quanly/cnloaidv');
                })
            }else{
                var query = connection.query(sql, (err, data) => {
                    if (err) res.send('Server 500');
                    return res.render('./bodyQuanLy/TrangCNLDichVu', {
                        layout: './layouts/layoutQuanLy', title: 'Cập nhật loại dịch vụ',
                        listLDV: data,kt:'Loại dịch vụ đang được sử dụng không xóa được'
                    });
                });
            }
        }
    })
};


//Chuyển sang trang sửa
 module.exports.chuyentrangsua = function (req,res) {
    var id = req.params.id;
    let query = connection.query('select * from loaidichvu where maLoaiDichVu = ?',[id],(err,data)=>{
        if(err) throw err;
        return res.render('./bodyKhongMenu/GD_Sua_LDV', {layout: './layouts/layoutKhongMenu', title: 'Sửa thông tin loại dịch vụ',ldv: data[0]});
    })
};


//Sửa thông tin
module.exports.suathongtin = function (req,res) {
    var id = req.body.maLoaiDichVu;
    var tenldv = req.body.tenLoaiDichVu;
    let query = connection.query('update loaidichvu set tenLoaiDichVu = ? where maLoaiDichVu = ? ',[tenldv,id],(err,data)=>{
        if(err) throw err;
        res.redirect('/quanly/cnloaidv');
    })
};
 