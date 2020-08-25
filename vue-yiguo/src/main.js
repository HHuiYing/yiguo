import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'   //webpack
import router from './router'
import request from './utils/request'
Vue.prototype.$request = request   //原型链，通过原型链共享ajax请求的方法,request前面加$,告诉别人这个请求比较特殊
// Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router:router,   //4.把router实例注入到Vue实例
  render: h => h(App),
}).$mount('#app')
