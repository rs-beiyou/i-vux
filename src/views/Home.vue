<template>
  <div class="home">
    <Layout>
      <Header class="app-header">
        <div class="header-body">
          <div class="logo-item">
            <router-link to="/car">
              <img alt="Vue logo" src="../assets/logo.png">
            </router-link>
          </div>
          <div class="login-item">
            <Dropdown v-if="token">
              <a href="javascript:void(0)">
                <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
              </a>
              <DropdownMenu slot="list">
                  <div class="user-info">
                    {{userName}}
                  </div>
                  <DropdownItem divided class="common-menu">
                    <router-link to="/console"><Icon type="ios-apps" />控制台</router-link>
                  </DropdownItem>
                  <DropdownItem class="common-menu">
                    <router-link to="/console"><Icon type="md-settings" />个人设置</router-link>
                  </DropdownItem>
                  <DropdownItem divided @click.native="logout">退出</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <router-link v-else to="/login">登录</router-link>
          </div>
          <div class="login-tel">
            123-123123
          </div>
        </div>
      </Header>
      <Content class="app-content">
        <router-view class="content-body"/>
      </Content>
      <Footer class="app-footer">
        <div class="footer-body">最全的二手车资讯，尽在XX二手车平台</div>
      </Footer>
      <BackTop></BackTop>
    </Layout>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      // userInfo: this.$store.state.user.userInfo,
      token: this.$store.state.user.token,
      userName: this.$store.state.user.userName
    }
  },
  methods: {
    ...mapActions([
      'handleLogout'
    ]),
    logout () {
      this.$Message.loading({
        content: '正在注销账号',
        duration: 0
      })
      this.handleLogout().then(() => {
        location.reload()
      })
    }
  }
}
</script>
<style lang="less">
.app-header{
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  .header-body{
    display: flex;
    align-items: center;
    width: 1200px;
    .logo-item{
      width: 50px;
      height: 50px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .login-item{
      margin-left: auto;
      flex-basis: 100px;
      text-align: center;
      .common-menu{
        text-align: left;
        i{
          margin-right: 1em;
        }
      }
    }
    .login-tel{
      flex-basis: auto;
      text-align: center;
    }
  }
  .user-info{
    line-height: 40px;
  }
}
.app-content{
  display: flex;
  justify-content: center;
  padding: 10px 50px;
  .content-body{
    display: flex;
    width: 1200px;
    min-height: 600px;
  }
}
.app-footer{
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .footer-body{
    display: flex;
    width: 1200px;
    justify-content: center;
  }
  &.ivu-layout-footer{
    color: #fff;
  }
}

@media (max-width : 1250px){
  .app-header .header-body, .app-content .content-body, .app-footer .footer-body{
    width: 1100px;
  }
}
</style>
