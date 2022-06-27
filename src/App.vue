<template>
  <div id="app">
    <Login v-if="!isLogin" @change-login-status="changeLoginStatus"/>
    <template v-if="showDetail">
      <Detail :userName="userName" @logout="logOut"/>
    </template>
  </div>
</template>

<script>
import Login from '_c/Login.vue'
import Detail from '_c/Detail.vue'
export default {
  name: 'App',
  data() {
    return {
      isLogin:false,
      showDetail: false,
      userName: ''
    }
  },
  components: {
    Login,
    Detail
  },
  mounted() {
    const userName = this.getuserName()
    this.isLogin = userName ? true : false
    this.showDetail = userName ? true : false
    this.userName = userName ? userName : ''
  },
  methods: {
    logOut() {
      this.isLogin = false
      this.showDetail = false
      this.userName = ''
    },
    getuserName() {
      const userName = window.localStorage.getItem('userName')
      return userName
    },
    changeLoginStatus(status) {
      this.isLogin = status.isLogin
      this.showDetail = status.isLogin
      this.userName = status.userName
    },
  }
}
</script>

<style>
#app {
  width: 750px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
