const express = require('express')
const router = express.Router()
const mongo = require('../utils/mongo')
const { formatData } = require('../utils/tools')

//  查询到所有的商品

//  api/binxian
router.get('/', async (req, res) => {
    let { page = 1, size = 10, sort = "add_time" } = req.query
    const skip = (page - 1) * size
    const limit = size * 1
    console.log(req.query)
    //  处理排序参数
    sort = sort.split(',')
    const result = await mongo.find('Binxian', {}, { skip, limit, sort })
    console.log(result)
    res.send(formatData({ data: result }))
})

//  删除某个商品
router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        await mongo.remove('Binxian', { commodityComponentId: id })
        res.send(formatData())
    } catch {
        res.send(formatData({ code: 0 }))
    }
})

module.exports = router