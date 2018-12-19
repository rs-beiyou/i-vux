<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    this.$vux.alert.show({
      title: 'Vux is Cool',
      content: 'Do you agree?',
      onShow () {
        console.log('Plugin: I\'m showing')
      },
      onHide () {
        console.log('Plugin: I\'m hiding')
      }
    })
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
