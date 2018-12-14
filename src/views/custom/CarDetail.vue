<template>
  <div class="detail">
    这是详情页面
  </div>
</template>
<script>
export default {
  name: 'detail',
  data () {
    return {
      id: this.$route.params.id
    }
  }
}
</script>
<style lang="less">

</style>
