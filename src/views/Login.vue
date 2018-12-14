<template>
<div class="login">
  <div class="layer-title">Login</div>
  <div class="layer-tip">最新二手车资讯</div>
  <div class="circle">
    <CircleStar></CircleStar>
  </div>
  <Row class="login-body">
    <Col span="10">
      <div class="login-form">
        <div class="dot-orange"></div>
        <div class="login-logo">
          <h2>Login</h2>
        </div>
        <Form ref="formValidate" :model="loginForm" :rules="ruleValidate" @submit.native.prevent>
          <FormItem prop="userName">
            <Input v-model="loginForm.userName" prefix="ios-contact" clearable placeholder="用户名" />
          </FormItem>
          <FormItem prop="password">
            <Input v-model="loginForm.password" type="password" clearable prefix="md-lock" placeholder="密码" />
          </FormItem>
        </Form>
        <Row>
          <Col span="10">
            <Button long>注册</Button>
          </Col>
          <Col span="10" offset="4">
            <Button long type="primary" :loading="loading" @click="login">
              <span v-if="!loading">登入</span>
              <span v-else>登入中...</span>
            </Button>
          </Col>
        </Row>
      </div>
    </Col>
    <Col span="14">
      <img v-if="randomImgUrl" :src="randomImgUrl" alt="img">
      <div class="layer-gray"></div>
      <div class="unaplash-tip" v-show="randomUserName">
        Photo by <a :href="randomUserLink" target="_blank">{{randomUserName}}</a> / <a href="https://unsplash.com/" target="_blank">Unsplash</a>
      </div>
    </Col>
  </Row>
</div>
</template>
<script>
import CircleStar from '@/components/CircleStar'
import { mapActions } from 'vuex'
export default {
  name: 'login',
  components: {
    CircleStar
  },
  data () {
    return {
      randomImgUrl: '',
      randomUserName: '',
      randomUserLink: '',
      loading: false,
      loginForm: {
        userName: '',
        password: ''
      },
      ruleValidate: {
        userName: [
          { required: true, message: '我还不知道您的名字呢', trigger: 'change' }
        ],
        password: [
          { required: true, message: '您没有告诉我暗号哦', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.getUnsplash()
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),
    getUnsplash () {
      this.$http.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'bf36da88e188269284415bae6e228c514a6d811950493612ed992b9d87e9e817',
          orientation: 'portrait',
          query: 'car'
        }
      }).then(res => {
        this.randomImgUrl = res.urls.small
        this.randomUserName = res.user.name
        this.randomUserLink = res.user.links.html
      })
    },
    login () {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          this.loading = true
          this.handleLogin(this.loginForm).then(res => {
            this.loading = false
            this.$router.replace('/car')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
<style lang="less">
.login{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #f8f6f9;
  .layer-title{
    position: absolute;
    font-size: 120px;
    font-weight: bolder;
    color: #ebeeef;
    z-index: 1;
    top: 50%;
    left: 60%;
    transform: translate(-190%, 0);
  }
  .layer-tip{
    position: absolute;
    top: 20%;
    left: 10%;
    z-index: 10;
    line-height: 20px;
    color: #b7b7b7;
    &:before{
      content: '';
      display: inline-block;
      width: 40px;
      height: 1px;
      background-color: #b7b7b7;
      margin-right: 1em;
      margin-bottom: 5px;
    }
  }
  .circle{
    position: absolute;
    top: 50%;
    left: 35%;
    width: 620px;
    height: 620px;
    transform: translate(-50%, -50%);
    z-index: 5;
  }
  .login-body{
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 60%;
    width: 700px;
    height: 450px;
    border-radius: 3px;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
    background-color: #fff;
    overflow: hidden;
    & > div{
      height: 100%;
      overflow: hidden;
    }
    .dot-orange{
      position: absolute;
      top: 40px;
      left: 50px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 5px solid #fd661d;
    }
    .login-logo{
      padding: 40px 0 60px;
      text-align: center;
    }
    .login-form{
      display: inline-block;
      width: 80%;
      margin: 0 10%;
      padding: 30px 0;
    }
    img{
      width: 100%;
    }
    .layer-gray{
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #b7b7b7;
      opacity: .3;
    }
  }
  .unaplash-tip{
    position: absolute;
    bottom: 1em;
    right: 1em;
    color: #fff;
    a{
      font-weight: bold;
      color: #fff;
    }
  }
}
</style>
