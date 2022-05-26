const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
router.use(express.json({ extended: false }));
router.use(express.static('../views'));
router.use(expressLayouts);
const multer = require('multer');
const upload = multer();

const controllerNV = require('../controller/nhanvien.controller');
const controllerCNThuePhong = require('../controller/nhanvien/cnThuePhong.controller');
const controllerCNdsDatPhong = require('../controller/nhanvien/cndsDatPhongController');
const controllerCNMatKhau = require('../controller/nhanvien/cnMatKhauController');

router.get('/', controllerNV.trangchu);
router.get('/cnthuephong', controllerCNThuePhong.cnThuePhong);
router.get('/cndsDatPhong', controllerCNdsDatPhong.cndsDatPhong);
router.get('/cnthuephongchitiet', controllerCNThuePhong.cnThuePhongChiTiet);
router.get('/cnmatkhau', controllerCNMatKhau.cnMatKhau);
router.get('/formdatphong', controllerCNdsDatPhong.formDatPhong);
router.post('/formdatphong', upload.fields([]), controllerCNdsDatPhong.formDatPhongPost);
router.get('/cndsDatPhong/xoa/:idPhieu', controllerCNdsDatPhong.cndsDatPhongXoa);
router.get('/cndsDatPhong/xem/:idPhieu', controllerCNdsDatPhong.cndsDatPhongXem);
router.get('/cnthuephong/xemnhanphong/:idPhong', controllerCNThuePhong.cnXemNhanPhong);
router.get('/cnthuephong/nhanphong/:idPhieu', controllerCNThuePhong.cnNhanPhong);
router.get('/cnthuephong/chothue/:maPhong', controllerCNThuePhong.cnThuePhongChiTiet);
router.get('/cnthuephong/chothue/kttrunglich/:maPhong/:ngayTra', controllerCNThuePhong.KtTrungNgay);
router.get('/cnthuephong/cndichvu/:maPhong/:status', controllerCNThuePhong.cnDichVu);
router.post('/cnthuephong/cndichvu/:maPhong', upload.fields([]), controllerCNThuePhong.cnDichVuPost);
router.get('/cnthuephong/chothue/getlistthanhtoan/:maPhong', controllerCNThuePhong.cnGetListPhongDangThue);

router.post('/cnthuephong/thanhtoan', upload.fields([]), controllerCNThuePhong.cnThanhToan);


router.get('/cnthuephong/xemkhachhangdangthue',  controllerCNThuePhong.danhSachKhachHangDangThue)

router.get('/cnthuephong/chitiethoadonvualap',  controllerCNThuePhong.chiTietHoaDonVuaLap)

router.get('/cnthuephong/listhoadon',  controllerCNThuePhong.listHoaDon)


router.get('/cnthuephong/chitiethoadon/:maHoaDon',  controllerCNThuePhong.chiTietHoaDonByMa)


router.get('/cndsDatPhong/phieudatphongvuanay', controllerCNdsDatPhong.phieuDatPhongVuaNay);

router.get('/cndsDatPhong/xacthucphieu/:idphieu', controllerCNdsDatPhong.xacThucPhieu);

router.get('/dangxuat', (req, res) => {
    res.clearCookie('nv');
    res.clearCookie('ql');
    return res.redirect('/');
});


router.post('/thuephongtructiep/:maPhong',   upload.fields([]), controllerCNThuePhong.cnThuePhongTrucTiep);

module.exports = router;