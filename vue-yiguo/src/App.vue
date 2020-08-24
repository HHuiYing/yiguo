<template>
  <div id="app">
    <!-- 登录 -->
      <router-view/>
      <!-- <Reg/> -->
    <!-- 3.调用组件 -->
    <!-- <app-head></app-head> -->
    <!-- 核心区域 -->
    <!-- <app-main></app-main> -->
  </div>
</template>

<script>
//2.导入组件
//import Reg from './pages/reg/index'
//import Login from './pages/login/index'
export default {
  name: 'App',
  //1.注册组件
  components: {
      //Reg
  },
}
</script>

<style lang='scss'>
*{
  margin: 0;
  padding: 0;
}
</style>