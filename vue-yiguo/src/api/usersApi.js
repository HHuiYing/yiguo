//存放关于用户的接口
import request from '@/utils/request'

export default {
    //验证用户名是否存在
    checkName(username) {
        return request.get('/reg/checkname', {
            params: {
                username
            }
        })
    },
    //功能：注册
    reg(username, password) {
        return request.post('/reg', {
            username,
            password
        })
    },

    //功能：登陆
    login(username, password) {
        return request.get('/login', {
            params: {
                username,
                password
            },
            withCredentials: true,
        })
    },
}