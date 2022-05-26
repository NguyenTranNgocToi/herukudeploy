const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
router.use(express.json({ extended: false }));
router.use(express.static('../views'));
router.use(expressLayouts);
const multer = require('multer');
const upload = multer();


const controllerKH = require('../controller/khachhang.controller');
const controllerCNdsDatPhong = require('../controller/khachhang/cndsDatPhongController');

router.get('/', controllerKH.trangchu);
router.get('/doimk', controllerKH.trangdoimk);
router.post('/doimktk',upload.fields([]), controllerKH.doimk);
router.get('/dangxuat', (req, res) => {
    res.clearCookie('khachhang');
    return res.redirect('/');
});


router.get('/cndsDatPhong', controllerCNdsDatPhong.cndsDatPhong);
router.get('/cndsDatPhong/xoa/:idPhieu', controllerCNdsDatPhong.cndsDatPhongXoa);
router.get('/cndsDatPhong/xem/:idPhieu', controllerCNdsDatPhong.cndsDatPhongXem);

router.get('/formdatphong', controllerCNdsDatPhong.formDatPhong);
router.post('/formdatphong', upload.fields([]), controllerCNdsDatPhong.formDatPhongPost);
router.get('/phieudatphongvuanay', controllerCNdsDatPhong.phieuDatPhongVuaNay);

module.exports = router;