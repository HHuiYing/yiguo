import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router:router,   //4.把router实例注入到Vue实例
  render: h => h(App),
}).$mount('#app')
