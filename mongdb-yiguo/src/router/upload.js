const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const mongo = require('../utils/mongo')
const { formatData } = require('../utils/tools')

//  配置上传参数
let storage = multer.diskStorage({

    //  上传文件保存目录，如果没有此目录则新建
    destination: path.join(__dirname, '../public/uploads/'),

    //  格式化文件名，字段名+时间戳+扩展名
    filename: function(req, file, cb) {

        //  获取文件后缀名
        let ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})

//  设置中间件
const uploadMiddleware = multer({ storage })

//  post请求 /api/upload/avatar   
router.post('/avatar', uploadMiddleware.single('avatar'), (req, res) => {
    const { _id } = req.body

    //  更新用户信息
    const avatarUrl = '/uploads/' + req.file.filename
    mongo.update('user', { _id }, { $set: { avatarUrl } })

    res.send(formatData({ data: { _id, avatarUrl } }))
})

module.exports = router