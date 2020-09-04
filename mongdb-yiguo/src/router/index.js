const { Router, urlencoded, json } = require('express');
const router = Router();
const session = require('express-session')
const token = require('../utils/token')
const cors = require('../filter/cors');
const { formatData } = require("../utils/tools")

const vcodeRouter = require("../router/vcode")
const userRouter = require("../router/user")
const BinxianRouter = require("./Binxian")
const HaixianRouter = require("./Haixian")
const LiaoliRouter = require("./Liaoli")
const LongxiaRouter = require("./Longxia")
const ShuicanRouter = require("./Shuican")
const orderRouter = require("./order")
const regRouter = require('./reg')
const loginRouter = require('./login')
const uploadRouter = require('./upload')
const goodsRouter = require('./goods')

const lunboRouter = require('./lunbo')
const ZhongbangRouter = require("./Zhongbang")
const surpriseRouter = require('./surprise')



//  CORS跨域
router.use(cors)

//  数据格式化中间件
router.use(urlencoded({ extended: false }), json())

//  使用session会话
//  通过req.session获取存储会话中的数据
router.use(session({
    secret: 'yiguo',
    resave: false,
    saveUninitialized: true,
    cookie: {
        //  设置cookie有效期
        maxAge: 1000 * 60 * 60 * 2
    }
}))

//  校验token
router.get('/jwtverify', (req, res) => {
    const { authorization } = req.query
    if (token.verify(authorization)) {
        res.send(formatData())
    } else {
        res.send(formatData({ code: 0 }))
    }
})

//  验证码 /api/vcode
router.use('/vcode', vcodeRouter)

//  用户 /api/user
router.use('/user', userRouter)

//  用户注册 /api/reg  验证用户名 /api/reg/check
router.use('/reg', regRouter)

//  用户登录
router.use('/login', loginRouter)

//  上传
router.use('/upload', uploadRouter)

//  冰鲜 /api/Binxian
router.use('/Binxian', BinxianRouter)

//  海鲜 /api/Haixian
router.use('/Haixian', HaixianRouter)

//  料理 /api/Liaoli
router.use('/Liaoli', LiaoliRouter)

//  龙虾 /api/Longxia
router.use('/Longxia', LongxiaRouter)

//  水产 /api/Shuican
router.use('/Shuican', ShuicanRouter)

//  重磅 /api/Zhongbang
router.use('/Zhongbang', ZhongbangRouter)

//  订单 /api/order
router.use('/order', orderRouter)

//  轮播 /api/lunbo
router.use('/lunbo', lunboRouter)

//  商品分类 /api/goods
router.use('/goods', goodsRouter)

//  每日惊喜 /api/surprise
router.use('/surprise', surpriseRouter)

module.exports = router;