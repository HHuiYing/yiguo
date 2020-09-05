
const common = {
    state: {
        username:'',
        showTabbar: true,

    },
    getters: {

    },
    mutations: {
        login(){
            let currentUser = localStorage.getItem("currentUser");
            currentUser = JSON.parse(currentUser);
            if (!currentUser) {
              this.$router.push("/login");
            } else {
              // 校验token的有效性
              const result = await fetch(
                `http://10.3.138.12:2003/api/jwtverify?authorization=${currentUser.authorization}`
              ).then((res) => res.json());
        
              if (result.code === 0) {
                localStorage.removeItem("currentUser");
                this.$router.push("/login");
              } else {
                // 显示用户信息
                state.username = currentUser.username;
              }
            }
        },
        displayTabbar(state, payload) {
            state.showTabbar = payload
        }

    },
    actions: {

    }
}

export default common