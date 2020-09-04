const express = require('express')
const router = express.Router()
const mongo = require('../utils/mongo')
const { formatData } = require('../utils/tools')

//  查询到所有的商品

//  api/binxian
router.get('/', async (req, res) => {
    let { page = 1, size = 100, sort = "framesIndex" } = req.query
    //  处理排序参数
    const skip = (page - 1) * size
    const limit = size * 1
    sort = sort.split(',')
    const result = await mongo.find('goods', {}, { skip, limit, sort })
    res.send(formatData({ data: result[0] }))
})

module.exports = router