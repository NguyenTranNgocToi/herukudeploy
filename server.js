//server
const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();
const { Connect } = require('aws-sdk');

const cookieParser = require('cookie-parser');
//mã hóa
const bcrypt = require('bcrypt');
const saltRounds = 10;
//layout
const expressLayouts = require('express-ejs-layouts');
app.use(express.json({ extended: false }));
app.use(express.static('./views'));
app.use(cookieParser());
app.use(expressLayouts);
app.set('view engine', 'ejs');





// const multer = require('multer');
// const upload = multer();

//router
const nhanvienRoute = require('./routers/nhanvien.router');
const khachhangRoute = require('./routers/khachhang.router');
const quanlyRouter = require('./routers/quanly.router');

//auth
var authmiddlenv = require('./middlewares/auth.middlewarenv');
var authmiddlekh = require('./middlewares/auth.middlewarekh');
var authmiddleql = require('./middlewares/auth.middlewareql');


const dangkyController = require('./controller/dangki.controller');
const quenmkController = require('./controller/quenmk.controller');



//goi den trang chu
app.get('/', (req, res) => {
    return res.render('./bodyChung/TrangChu',{layout: './layouts/layoutChung' , title: 'Trang Chủ'}, mess='');
});


//controller
const controllerDN = require('./controller/dangnhap.controller');

//Đăng kí tài khoản
app.get('/dangky',dangkyController.chuyentrangdk)
app.post('/dangky',upload.fields([]),dangkyController.dangky);
app.get('/verify-email',dangkyController.xacthuc)
//Quên mật khẩu
app.get('/quenmk',quenmkController.chuyentrangqmk)
app.post('/quenmk',upload.fields([]),quenmkController.kiemtraemail)
app.post('/quenmk1',upload.fields([]),quenmkController.kiemtraCMND)
app.post('/quenmk2',upload.fields([]),quenmkController.doimk)



//goi den cac router
//nhan vien
app.use('/nhanvien', authmiddlenv.requireAuth ,nhanvienRoute);
//khachhang
app.use('/khachhang', authmiddlekh.requireAuth,khachhangRoute);
//quan ly
// app.use('/quanly', authmiddleql.requireAuth,quanlyRouter);

app.use('/quanly', authmiddlenv.requireAuth,quanlyRouter);

//nhan vien
// app.use('/nhanvien',nhanvienRoute);
// //khachhang
// app.use('/khachhang',khachhangRoute);
// //quan ly
// app.use('/quanly',quanlyRouter);

app.post('/dangnhap', upload.fields([]), controllerDN.dangnhap);


//port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port 3000!');
});
//test