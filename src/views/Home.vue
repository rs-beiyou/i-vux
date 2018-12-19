<template>
  <div class="home">
    <x-header>This is the page title.</x-header>
    <group>
      <cell title="title" value="value"></cell>
    </group>
  </div>
</template>
<script>
import { Group, Cell, XHeader } from 'vux'
export default {
  name: 'home',
  components: {
    Group,
    Cell,
    XHeader
  }
}
</script>
<style lang="less">
</style>
