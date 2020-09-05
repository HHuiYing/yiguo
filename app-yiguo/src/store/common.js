
import request from "../utils/request"
const common = {
    state: {
        username: '',
        showTabbar: true,

    },
    getters: {

    },
    mutations: {
        async login(state) {

            let currentUser = localStorage.getItem("currentUser");
            currentUser = JSON.parse(currentUser);
            if (!currentUser) {
                // this.$router.push("/login");
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
                    state.username = currentUser.username;
                }
            }
        },
        logout(state) {
            state.username=''
         },
        displayTabbar(state, payload) {
            state.showTabbar = payload
        }

    },
    actions: {

    }
}

export default common