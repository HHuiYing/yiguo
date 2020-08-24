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
    const result = await mongo.find('Haixian', {}, { skip, limit, sort })
    res.send(formatData({ data: result }))
})

//  查找某个商品
router.get('/:id', async (req, res) => {
    const { id } = req.params

    const result = await mongo.find('Haixian', { _id: id })
    res.send(formatData({ data: result }))
})

//  删除某个商品
router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        await mongo.remove('Haixian', { _id: id })
        res.send(formatData())
    } catch {
        res.send(formatData({ code: 0 }))
    }
})

//  修改商品
router.put('/:id', async (req, res) => {
    const { id } = req.params
    let { commodityName, commodityPrice, pictureUrl } = req.body


    let newData = { commodityName, commodityPrice, pictureUrl }

    try {
        await mongo.update('Haixian', { _id: id }, { $set: newData })
        res.send(formatData({ data: { _id: id, ...newData } }))
    } catch (err) {
        // console.log('err=',err)
        res.send(formatData({ code: 0 }))
    }
})

//  增加商品
router.post('/', async (req, res) => {
    let { commodityName, subTitle, pictureUrl, commodityPrice } = req.body
    try {
        const result = await mongo.insert('Haixian', { commodityName, subTitle, pictureUrl, commodityPrice })
        res.send(formatData())
    } catch {
        res.send(formatData({ code: 0 }))
    }
})

module.exports = router