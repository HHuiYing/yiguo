
import request from "../utils/request"
const common = {
    state: {
        username: '',
        ifLogin: false,
        showTabbar: true,

    },
    getters: {

    },
    mutations: {
        user(state, username) {
            state.username = username
            state.ifLogin = true
        },
        logout(state) {
            state.username = ''
            state.ifLogin = false
        },
        displayTabbar(state, payload) {
            state.showTabbar = payload
        }

    },
    actions: {
        async login(context) {

            let currentUser = localStorage.getItem("currentUser");
            currentUser = JSON.parse(currentUser);
            if (!currentUser) {
                // this.$router.push("/login");
                context.commit('logout')
            } else {
                // 校验token的有效性
                const { data } = await request.get(
                    `/jwtverify?authorization=${currentUser.authorization}`
                )

                if (data.code === 0) {
                    localStorage.removeItem("currentUser");
                    // this.$router.push("/login");
                } else {
                    // 显示用户信息
                    context.commit('user', currentUser.username)

                }
            }
        },
    }
}

export default common