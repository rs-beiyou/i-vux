<template>
  <div class="radio-list">
    <label class="radio-label">{{label}}</label>
    <span v-for="item in list" class="radio-item" :class="{'radio-item-active': item.value === currentValue}" @click="change(item)">{{item.key}}</span>
  </div>
</template>
<script>
export default {
  name: 'RadioList',
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  methods: {
    change (item) {
      this.currentValue = item.value
      this.$emit('input', item.value)
      this.$emit('on-change', item.value)
    }
  },
  watch: {
    value () {
      if(this.currentValue !== this.value){
        this.currentValue = this.value
      }
    }
  }
}
</script>
<style lang="less">
.radio-list{
  .radio-item{
    padding: 4px 8px;
    cursor: pointer;
    transition: all .1s linear;
    border-radius: 2px;
    &:hover{
      color: #fd521d;
    }
    &.radio-item-active{
      background-color: #fd521d;
      color: #fff;
      &:hover{
        color: #fff;
      }
    }
  }
}
.radio-label{
  margin-right: 2em;
  font-weight: bold;
  color: #515a6e;
}
</style>
