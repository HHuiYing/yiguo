import Vue from 'vue'
import App from './App.vue'
import router from './router'
import request from './utils/request'

Vue.config.productionTip = false
Vue.prototype.$request = request

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')