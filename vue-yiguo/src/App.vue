<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App", //1.注册组件
  components: {
    //Reg
  },
};
</script>
 

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  height: 100%;
}
</style>