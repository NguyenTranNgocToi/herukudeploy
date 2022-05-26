const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
const multer = require('multer');
const upload = multer();
router.use(express.json({ extended: false }));
router.use(express.static('../views'));
router.use(expressLayouts);


const controllerQL = require('../controller/quanly/quanly.controller');
const cntaikhoan = require('../controller/quanly/cnTaiKhoan.controller');
const cnloaiphong = require('../controller/quanly/cnLoaiPhong.controller');
const cnphong = require('../controller/quanly/cnPhong.controller');
const cnloaidv = require('../controller/quanly/cnLoaiDichVu.controller');
const cndv = require('../controller/quanly/cnDichVu.controller');
const cnnv = require('../controller/quanly/cnNhanVien.controller');
const cnkh = require('../controller/quanly/cnKhachHang.controller');
const doimk = require('../controller/quanly/doimk.controller');
const timkiem = require('../controller/quanly/timkiem.controller')
const cntkkh = require('../controller/quanly/cntkKhachHang.controller')
const cntknv = require('../controller/quanly/cntkNhanVien.controller')
const thongke = require('../controller/quanly/thongke.controller')
var authmiddleql = require('../middlewares/auth.middlewareql');
//Trang chu
router.get('/', controllerQL.trangchu);

//Timkiem
router.get('/timkh', timkiem.trangtimkh);
router.get('/timphong',  authmiddleql.requireAuth ,timkiem.trangtimphong);
router.get('/timdv', timkiem.trangtimdv);
router.get('/timnv', timkiem.trangtimnv);
//Cập nhật loại phòng
router.get('/cnloaiphong', cnloaiphong.trangcnloaiphong);
router.get('/cnloaiphong/xoalph/:id', cnloaiphong.xoaloaiphong);
router.get('/cnloaiphong/sualph/:id', cnloaiphong.chuyentrangsua);
// router.get('/cnloaiphong/timkiem', cnloaiphong.timkiemlph);
router.post('/cnloaiphong/themlph',upload.fields([]), cnloaiphong.themloaiphong);
router.post('/cnloaiphong/suatt',upload.fields([]), cnloaiphong.suathongtin);

//Cập nhật phòng
router.get('/cnphong', cnphong.trangcnphong);
router.get('/cnphong/suaph/:id', cnphong.chuyentrangsua);
router.get('/cnphong/xoaph/:id', cnphong.xoaphong);
router.post('/cnphong/themphong',upload.fields([]),cnphong.themphong);
router.post('/cnphong/suatt',upload.fields([]),cnphong.suathongtin);
//Cập nhật loại dịch vụ
router.get('/cnloaidv',cnloaidv.trangcnloaidv);
router.get('/cnloaidv/xoaldv/:id',cnloaidv.xoaloaidv);
router.get('/cnloaidv/sualdv/:id',cnloaidv.chuyentrangsua);
router.post('/cnloaidv/suatt',upload.fields([]),cnloaidv.suathongtin);
router.post('/cnloaidv/addloaidv',upload.fields([]),cnloaidv.themloaidichvu);

//Cập nhật  dịch vụ
router.get('/cndichvu', cndv.trangcndichvu);
router.get('/cndichvu/xoadv/:id', cndv.xoadichvu);
router.get('/cndichvu/suadv/:id', cndv.chuyentrangsua);
router.post('/cndichvu/adddichvu',upload.fields([]) ,cndv.themdichvu);
router.post('/cndichvu/suatt',upload.fields([]) ,cndv.suathongtin);

//Cập nhật nhân viên
router.get('/cnnhanvien', cnnv.trangcnnhanvien);
router.get('/cnnhanvien/xoanv/:id', cnnv.xoanv);
router.get('/cnnhanvien/suanv/:id', cnnv.chuyentrangsua);
router.post('/cnnhanvien/themnv',upload.fields([]) ,cnnv.themnv);
router.post('/cnnhanvien/suatt',upload.fields([]) ,cnnv.suathongtin);

//Cập nhật khách hàng
router.get('/cnkhachhang', cnkh.trangcnkhachhang);
router.get('/cnkhachhang/xoakh/:id', cnkh.xoakhachhang);
router.get('/cnkhachhang/suakh/:id', cnkh.chuyentrangsua);
router.post('/cnkhachhang/themkh',upload.fields([]), cnkh.themkhachhang);
router.post('/cnkhachhang/suatt',upload.fields([]), cnkh.suathongtin);

//Cập nhật tài khoản khách hàng
router.get('/cntkkhachhang', cntkkh.trangcntkkh);
router.get('/cntkkhachhang/suatkkh/:id', cntkkh.chuyentrangsua);
router.post('/cntkkhachhang/suatt',upload.fields([]), cntkkh.suathongtin);

//Cập nhật tài khoản nhân viên
router.get('/cntknhanvien', cntknv.trangcntknv);
router.get('/cntknhanvien/suatknv/:id', cntknv.chuyentrangsua);
router.post('/cntknhanvien/suatt',upload.fields([]), cntknv.suathongtin);

//Đổi mật khẩu
router.get('/doimk', doimk.trangdoimk);
router.post('/doimktk',upload.fields([]), doimk.doimk);

router.get('/dangxuat', (req, res) => {
    res.clearCookie('nv');
    res.clearCookie('ql');
    return res.redirect('/');
});

router.get('/thongkedoanhthu', thongke.thongKeDoanhThu );
router.get('/getthongkedoanhthudichvuthang', thongke.getthongKeDoanhThuDichVu );
router.get('/getthongkedoanhthuphongthang', thongke.getthongKeDoanhThuPhong );

module.exports = router;