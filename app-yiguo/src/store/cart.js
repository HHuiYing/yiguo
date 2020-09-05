import request from '../utils/request'

const cart = {
    //  添加命名空间
    //  namespaced:true

    //  共享的数据
    state: {
        goodslist: []
    },
    getters: {

    },
    mutations: {
        initCart(state, data) {
            state.goodslist = data
            console.log("state.goodslist", state.goodslist)
        }
    },
    actions: {
        async getCart(context) {
            const { data } = await request.get('/order')
            context.commit('initCart', data.data)

        }
    }
}

export default cart