import request from '../utils/request'

const cart = {
    //  添加命名空间
    //  namespaced:true

    //  共享的数据
    state: {
        goodslist: []
    },
    getters: {
        totalPrice(state) {
            return state.goodslist.reduce((pre, item) => item.checked
                ? pre + item.commodityNum * item.commodityPrice
                : pre, 0) * 100
        }
    },
    mutations: {
        //  获取所有订单
        initCart(state, data) {
            state.goodslist = data
        },

        //  修改数量
        changeQty(state, { commodityCode, qty }) {
            state.goodslist = state.goodslist.map(item => {
                if (item.commodityCode === commodityCode) {
                    item.commodityNum = qty
                }
                return item
            })
        },

        // 添加商品
        add(state, goods) {
            state.goodslist.unshift(goods)
        },

        // 删除某个商品
        remove(state, _id) {
            state.goodslist = state.goodslist.filter(item => item._id !== _id)
        },

        // 全部删除
        clear(state) {
            state.goodslist = []
        },
        //  全选
        checkedAll(state, val) {
            state.goodslist = state.goodslist.map(item => {
                item.checked = val
                return item
            })
        }
    },
    actions: {
        async getCart(context) {
            const { data } = await request.get('/order')
            context.commit('initCart', data.data)
        },
    },

}

export default cart