const express = require('express')
const router = express.Router()
const mongo = require('../utils/mongo')
const { formatData, md5 } = require('../utils/tools')

router.get('/', async (req, res) => {
    //  读取数据库mongo,获取所有用户
    const { pape = 1, size = 10 } = req.query
    const limit = size * 1
    const skip = (pape - 1) * size
    const result = await mongo.find('user', {}, { limit, skip, field: { password: false } })
    res.send(formatData({ data: result }))
})

//  获取单个用户信息
router.get('/:id', async (req, res) => {
    const { id } = req.params
    const result = await mongo.find('user', { _id: id }, {
        field: { password: false }
    })
    res.send(formatData({ data: result[0] }))
})

//  删除数据
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await mongo.remove("user", { _id: id })
        res.send(formatData())
    } catch (err) {
        res.send(formatData({ code: 0 }))
    }
})

//  修改数据
router.put('/:id', async (req, res) => {

    const { id } = req.params
    let { age, gender, phone, address, birthday } = req.body
    let newData = { age, gender, phone, address, birthday }

    try {
        await mongo.update("user", { _id: id }, { $set: newData })
        res.send(formatData({ data: { _id: id, ...newData } }))
    } catch (err) {
        res.send(formatData({ code: 0 }))
    }
})

//  添加用户
router.post('/', async (req, res) => {
    let { username, password, gender, age } = req.body
    password = md5(password)
    try {
        const result = await mongo.insert('user', { username, password, gender, age })
        res.send(formatData())
    } catch (err) {
        res.send(formatData({ code: 0 }))
    }
})
module.exports = router