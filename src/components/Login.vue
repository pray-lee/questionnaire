<template>
    <div>
        <div class="logo">
            <img src="../assets/logo.png" alt="">
            <p>体验用户管理系统</p>
        </div>
        <input type="text" placeholder="请填写用户名" v-model="userName">
        <input type="password" placeholder="请填写密码" v-model="password">
      <button class="login-btn" @click="handleLogin">登录</button>
        <p class="introduction">© 财咖科技版权所有</p>
    </div>
</template>
<script>
import { login } from '@/api/questionnaire/login'
import {Notification} from 'element-ui'
export default {
    name: 'login',
    data() {
        return {
          userName: '',
          password: '',
        }
    },
    methods: {
        handleLogin() {
            if(this.valid()) {
                login(this.userName, this.password)
                    .then(res => {
                        const result = res.data
                        if(!result.success) {
                            Notification.error({
                                message: result.msg,
                                position: 'top-left',
                                duration: 1500,
                            })
                            return
                        }
                        this.$emit('change-login-status', {isLogin: true, userName: this.userName})
                        this.setuserName(this.userName)
                    })
            }
        },
        setuserName(userName) {
            window.localStorage.setItem('userName', userName)
        },
        valid() {
            if(!this.userName) {
                Notification.error({
                    message: '请输入用户名',
                    position: 'top-left',
                    duration: 1500,
                })
                return false
            }
            return true
        }
    }
}
</script>
<style scoped>
div > *{
    font-size: 32px;
}
.logo{
    width: 750px;
    height: 500px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
.logo p{
    padding-top: 60px;
    font-size: 36px;
    color:#333;
    font-weight:bold;
}
img{
    display:block;
    width: 400px;
}
input {
    -webkit-appearance: none;
    background: none;
    outline: 0;
    margin: 0 auto;
    margin-bottom: 40px;
    display:block;
    width: 80%;
    height: 80px;
    line-height: 80px;
    padding: 0 30px;
    border: 4px solid #3276c3;
    color:#3276c3;
    border-radius: 10px;
}
input:focus{
    outline: 0
}
.login-btn{
    -webkit-appearance: none;
   display: block;
   outline: none;
   margin: 0 auto; 
   width: 80%;
   height: 80px;
   line-height: 80px;
   text-align:center;
   color:#fff;
   border-radius: 10px;
   background:#3276c3;
   letter-spacing: 2px;
   border: 0
}
.introduction{
    padding-top: 40px;
    font-size: 28px;
    color:#3276c3;
    text-align:center;
    font-weight:bold;
}
</style>