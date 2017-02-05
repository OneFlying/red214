<template>
  <div class="red_user_login">
    <a v-link="{path:'/setting/lang'}" class="red_user_login_lang">{{ $t("base.language") }}</a>
    <div class="red_my_user_logo">
      <img src="../assets/user.jpg" alt="logo" v-if="isNone">
      <img src="../assets/user.jpg" :src="userico" alt="logo" v-else>
    </div>
    <box gap="20px 0">
      <group>
        <x-input title="" type="text" :placeholder="$t('login.username')"
                 :min="6" :max="16" :value.sync="username" @change="getusericon()"></x-input>
        <x-input title="" type="password" :placeholder="$t('login.password')"
                 :min="6" :max="16" :value.sync="password"></x-input>
      </group>
    </box>
    <box gap="30px 10px 5px 10px">
      <x-button class="btn-blueer" @click="login()">{{ $t("login.login") }}</x-button>
    </box>
    <box gap="0 10px">
      <a v-link="{path:'/register'}" class="red_link_reg">{{ $t("login.newRegister") }}</a>
    </box>
    <alert :show.sync="showToast" :title="$t('register.title')">{{ errorText }}</alert>
    <alert :show.sync="showAlert" :title="$t('register.title')">{{ $t('base.incognitoMode') }}</alert>
  </div>
</template>
<script>
  import {
    XInput,
    Box,
    Group,
    XButton,
    Alert
  } from 'vux/src/components'
  import {
    baseServerPath,
    baseImgSrc,
    getUserInfo,
    getLanguage,
    getHeaders
  } from '../vuex/getters'
  import {
    setUserInfo
  } from '../vuex/actions'

  export default {
    components: {
      XInput,
      Box,
      Group,
      XButton,
      Alert
    },
    data () {
      return {
        username: '', // 登录用户名
        password: '', // 登录密码
        showToast: false, // 是否显示错误提示框
        errorText: '', // 错误提示信息
        userico: '', // 用户头像
        isNone: true, // 是否获取头像
        showAlert: false
      }
    },
    vuex: {
      getters: {
        baseServerPath,
        baseImgSrc,
        getUserInfo,
        getLanguage,
        getHeaders
      },
      actions: {
        setUserInfo
      }
    },
    methods: {
      // 用户登录
      login () {
        let storage = window.localStorage
        this.$http({
          url: this.baseServerPath,
          method: 'POST',
          headers: this.getHeaders,
          params: {
            act: 'login',
            lang: this.getLanguage,
            isMobile: true
          },
          body: {
            username: this.username,
            password: this.password
          }
        }).then((response) => {
          let res = JSON.parse(response.body)
          if (res.success) {
            // 成功回调，同步数据
            this.setUserInfo(res.msg)
            storage.setItem('userinfo', JSON.stringify(res.msg))
            storage.setItem('mypals', JSON.stringify(res.mypals))
            window.router.go({
              path: '/',
              replace: false
            })
          } else {
            this.errorText = res.msg
            this.showToast = true
          }
        }, (response) => {
          console.log(response)
        })
      },
      // 获取用户头像
      getusericon () {
        this.$http({
          url: this.baseServerPath,
          method: 'POST',
          headers: this.getHeaders,
          params: {
            act: 'login',
            lang: this.getLanguage,
            isMobile: true
          },
          body: {
            username: this.username,
            icon: 'true'
          }
        }).then((response) => {
          let res = JSON.parse(response.body)
          if (res.icon) {
            // 显示高清头像
            if (res.icon.indexOf('_small') !== -1) {
              res.icon = res.icon.replace(/_small/g, '')
            }
            this.isNone = false
            this.userico = this.baseImgSrc + res.icon
          }
        }, (response) => {
          console.log(response)
        })
      }
    },
    created () {
      let storage = window.sessionStorage
      this.username = storage.getItem('username')
      this.password = storage.getItem('password')
    }
  }
</script>
<style>
  .red_user_login {
    position: absolute;
    background: url(../assets/site_bg.jpg) no-repeat;
    height: 100%;
    top: 0;
    bottom: 0;
    z-index: 100;
  }
  .red_user_login .red_my_user_logo {
    text-align: center;
  }
  .red_user_login .red_my_user_logo img {
    width: 8.5em;
    height: 8.5em;
    display: inline-block;
  }
  .red_user_login .red_my_user_logo {
    margin-top: 20px;
  }
  .red_user_login .weui_cell:before {
    left: 0;
  }
  .red_user_login .weui_cell input {
    text-align: center;
  }
  .red_link_reg {
    color: #20a0ff;
    font-size: 14px;
  }
  .red_user_login .weui_btn_dialog.primary {
    color: #20a0ff;
  }
  .red_user_login_lang {
    position: absolute;
    right: 15px;
    top: 20px;
    color: #20a0ff;
  }
</style>
