<template>
  <div class="red_user_regsiter">
    <div style="padding-bottom: 50px">
      <box gap="-25px 0 10px 0">
        <div class="red_my_user_logo">
          <img src="../assets/user.jpg" v-if="isNone" alt="logo">
          <img :src="imgsrc" alt="logo" v-else>
          <div class="red-file-upload-mask">
            <div class="red-file-upload">
              <span class="redfont red-icon icon-xiangji" style="color: #777; font-size: 25px;"></span>
              <input type="file" name="pic" id="pic" accept="image/gif,image/jpeg,image/png" @change="getfile">
            </div>
          </div>
        </div>
        <group>
          <x-input :placeholder="$t('register.username')" title="" :value.sync="username" :min="6" :max="16"></x-input>
          <x-input :placeholder="$t('register.email')" title="" is-type="email" :value.sync="email"></x-input>
          <x-input :placeholder="$t('register.password')" title="" type="password" :min="6" :max="16" :value.sync="password"></x-input>
          <x-input :placeholder="$t('register.rePassword')" title="" type="password" :equal-with="password" :value.sync="repassword"></x-input>
          <checker
            :value.sync="sex"
            default-item-class="red-register-item"
            selected-item-class="red-register-item-selected"
            @on-change="change">
            <checker-item :value="1">男</checker-item>
            <checker-item :value="0">女</checker-item>
          </checker>
        </group>
        <tip>{{ $t('register.tips') }}</tip>
      </box>
      <box gap="20px 10px">
        <x-button class="btn-blueer" @click="actregister">{{ $t('register.register') }}</x-button>
      </box>
    </div>
    <alert :title="$t('register.title')" :show.sync="showToast">{{ errorText }}</alert>
  </div>
</template>
<script>
  import {
    Group,
    Box,
    XInput,
    XButton,
    Checker,
    CheckerItem,
    Toast,
    Tip,
    Alert
  } from 'vux/src/components'
  import {
    getLanguage,
    baseServerPath,
    getError,
    getHeaders
  } from '../vuex/getters'

  export default {
    components: {
      Group,
      Box,
      XInput,
      XButton,
      Checker,
      CheckerItem,
      Toast,
      Tip,
      Alert
    },
    vuex: {
      getters: {
        getLanguage,
        baseServerPath,
        getError,
        getHeaders
      }
    },
    methods: {
      change (val) {
        this.sex = val
      },
      getfile (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        this.createImage(files[0])
      },
      createImage (file) {
        let reader = new window.FileReader()
        let vm = this
        reader.onload = (e) => {
          vm.imgsrc = e.target.result
          vm.userico = e.target.result
        }
        reader.readAsDataURL(file)
        this.isNone = false
      },
      checkusername () {
        if (this.username.length < 1) {
          this.showToast = true
          this.errorText = this.getError[this.getLanguage]['username_empty']
          return false
        }
        if (!/^[a-zA-Z][a-zA-Z0-9_]{5,15}/.test(this.username)) {
          this.showToast = true
          this.errorText = this.getError[this.getLanguage]['username_error']
          return false
        }
      },
      checkpassword () {
        if (this.password.length < 1) {
          this.showToast = true
          this.errorText = this.getError[this.getLanguage]['password_empty']
          return false
        }
        if (!/^[a-zA-Z0-9_]{6,16}/.test(this.password)) {
          this.showToast = true
          this.errorText = this.getError[this.getLanguage]['password_error']
          return false
        }
      },
      checkrepassword () {
        if (this.password !== this.repassword) {
          this.showToast = true
          this.errorText = this.getError[this.getLanguage]['password_equal']
          return false
        }
      },
      checkemail () {
        if (this.email.length < 1) {
          this.showToast = true
          this.errorText = this.getError[this.getLanguage]['email_empty']
          return false
        }
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(this.email)) {
          this.showToast = true
          this.errorText = this.getError[this.getLanguage]['email_error']
          return false
        }
      },
      actregister () {
        // 表单验证
        this.checkusername()
        this.checkemail()
        this.checkpassword()
        this.checkrepassword()
        // 注册
        this.$http({
          method: 'POST',
          url: this.baseServerPath,
          headers: this.getHeaders,
          params: {
            act: 'register',
            lang: this.getLanguage,
            isMobile: true
          },
          body: {
            username: this.username,
            password: this.password,
            email: this.email,
            sex: this.sex,
            userico: this.userico
          },
          credentials: false
        }).then((response) => {
          // 成功回调
          let res = JSON.parse(response.body)
          if (res.success) {
            let storage = window.sessionStorage
            storage.setItem('username', this.username)
            storage.setItem('password', this.password)
            window.router.go({
              path: '/login'
            })
          } else {
            this.showToast = true
            this.errorText = res.msg
          }
        }, (response) => {
          // 失败回调
          console.log(response.data)
        })
      }
    },
    data () {
      return {
        sex: 0,
        username: '',
        email: '',
        password: '',
        repassword: '',
        isNone: true,
        imgsrc: '',
        userico: '',
        showToast: false,
        errorText: ''
      }
    }
  }
</script>
<style>
  .red_user_regsiter .weui_cell:before {
    left: 0;
  }
  .red-file-upload-mask {
    width: 50px;
    margin: -40px auto 0;
    position: relative;
    height: 60px;
  }
  .red-file-upload {
    width: 40px;
    height: 40px;
    background: #000;
    position: relative;
    overflow: hidden;
    margin-left: 50px;
    border-radius: 100%;
  }
  .red-file-upload input {
    position: absolute;
    left: -1px;
    top: -1px;
    width: 1px;
    height: 1px;
    font-size: 60px;
  }
  .red-register-item {
    padding: 10px 15px 10px 45px;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    box-align: center;
    flex-align: center;
    align-items: center;
  }
  .red-register-item:before {
    width: 20px;
    height: 20px;
    position: absolute;
    content: '';
    background: #ddd;
    border-radius: 100%;
    left: 15px;
    margin-top: 2px;
  }
  .red-register-item:after {
    content: " ";
    position: absolute;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    left: 15px;
  }
  .red-register-item-selected:before {
    content: '\ea08';
    font-size: 14px;
    color: #fff;
    background: #20a0ff;
    font-family: "weui";
    position: absolute;
    text-indent: 3px;
    line-height: 20px;
  }
</style>
